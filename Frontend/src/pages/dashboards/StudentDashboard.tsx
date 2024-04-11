import CourseCard from "@/components/card/CourseCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'
import { Button } from "@/components/button/Button";
import SideNav, { NavItem } from '@/components/navbar/SideNav';
import { MdOutlineLibraryBooks, MdOutlineSettings } from "react-icons/md";
import { Input } from "@/components/input/Input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/dialog/Dialog"
import React, { useState, useEffect } from "react";

const navItems: NavItem[] = [
    {
        url: "/dashboard",
        name: "Courses",
        icon: <MdOutlineLibraryBooks size={'1.75rem'} />
    },
    {
        url: "/settings",
        name: "Settings",
        icon: <MdOutlineSettings size={'1.75rem'} />
    }
]

const StudentDashboard = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [courseAccessCode, setCourseAccessCode] = useState('');
    const getCourses = async () => {
        const user = localStorage.getItem('user');
        const userId = user ? JSON.parse(user).id : null;

        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/courses/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json();

        if (response.ok) {
            console.log('Courses fetched successfully');
            console.log(json);
            setCourses(json);
        }
    }

    useEffect(() => {
        getCourses();
    }, []);

    const handleJoinCourse = async () => {
        const user = localStorage.getItem('user');
        const userId = user ? JSON.parse(user).id : null;

        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/courses/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                access_code: courseAccessCode,
            }),
        });

        const json = await response.json();

        if (response.ok) {
            console.log('Course added successfully');
            console.log(json);
            setCourses([...courses, ...json]);
        }
        setCourseAccessCode('');
    }

    return (
        <div className='flex flex-row' >
            <SideNav navItems={navItems} />
            <div className="my-0 mx-auto grid grid-cols-3 gap-24 p-12 overflow-auto h-screen">
                <div>
                    <Dialog>
                        <DialogTrigger>
                            <Button variant={'outline'} className='flex flex-col justify-center rounded-lg shadow-lg w-96 h-52 col-span-1'>
                                <FontAwesomeIcon icon={faSignIn} size="2x" />
                                <p className="text-center mt-2">Join Course</p>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Join Course</DialogTitle>
                                <DialogDescription>
                                    Enter the share link to join a course
                                </DialogDescription>
                                <Input type="text" placeholder="Access Code" value={courseAccessCode} onChange={(e) => setCourseAccessCode(e.target.value)}/>
                                <Button variant="default" className="w-full mt-4" onClick={handleJoinCourse}>Join Course</Button>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                {courses.map((course) => (
                    <div>
                        <CourseCard courseId={course.id} courseCode={course.course_code} courseSection={course.course_section} courseName={course.name} isInstructor={false} />
                    </div>
                ))}
            </div>
        </div >
    );
};

export default StudentDashboard;