import {
    Book,
    Settings
  } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/dialog/Dialog"

import CourseCard from "@/components/card/CourseCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'
import { Button } from "@/components/button/Button";
import SideNav from '@/components/navbar/SideNav';
import React, { useState, useEffect } from "react";
import { Input } from "@/components/input/Input";

const InstructorDashboard = () => {
    type CourseData = {
        courseCode: string;
        courseSections: string;
        courseName: string;
    }

    const [courses, setCourses] = useState<any[]>([]);
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [courseSection, setCourseSection] = useState('');

    const getCourses = async () => {
        const user = localStorage.getItem('user');
        const userId = user ? JSON.parse(user).id : null;

        const response = await fetch('http://127.0.0.1:5000/courses/' + userId, {
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

    const handleAddCourse = async () => {
        const newCourse = {
            name: courseName,
            description: courseDescription,
            course_code: courseCode,
            section: courseSection,
        };

        setCourses([...courses, newCourse]);
        const user = localStorage.getItem('user');
        const userId = user ? JSON.parse(user).id : null;

        const response = await fetch('http://127.0.0.1:5000/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: courseName,
                description: courseDescription,
                course_code: courseCode,
                course_section: courseSection,
                instructor: userId
            }),
        });

        const json = await response.json();

        if (response.ok) {
            console.log('Course added successfully');
            console.log(json);
        }

        setCourseName('');
        setCourseDescription('');
        setCourseCode('');
        setCourseSection('');
    }

    return (
        <div className='flex flex-row' >
            <SideNav navItems={[
          {
            url: "/",
            name: "Courses",
            icon: <Book size={24} />,
          },
          {
            url: "/settings",
            name: "Settings",
            icon: <Settings size={24} />,
          },
        ]}/>
            <div className="my-0 mx-auto grid grid-cols-3 gap-24 p-12 overflow-auto h-screen">
                <div>
                    <Dialog>
                        <DialogTrigger>
                            <Button variant={'outline'} className='flex flex-col justify-center rounded-lg shadow-lg w-96 h-52 col-span-1'>
                                <FontAwesomeIcon icon={faPlus} size="2x" />
                                <p className="text-center mt-2">Add Course</p>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Course</DialogTitle>
                                <DialogDescription>
                                    Fill in the details of the course you want to add
                                </DialogDescription>
                                <Input type="text" placeholder="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}/>
                                <Input type="text" placeholder="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)}/>
                                <Input type="text" placeholder="Course Section" value={courseSection} onChange={(e) => setCourseSection(e.target.value)}/>
                                <Input type="text" placeholder="Course Description" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)}/>
                                <Button variant="default" className="w-full mt-4" onClick={handleAddCourse}>Add Course</Button>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                {courses.map((course) => (
                    <div>
                        <CourseCard courseId={course.id} courseCode={course.course_code} courseSection={course.course_section} courseName={course.name} isInstructor={true} />
                    </div>
                ))}
            </div>
        </div >
    );
}

export default InstructorDashboard;