import {
    Book,
    Settings,
    SquareUser,
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
import SideNav, { NavItem } from '@/components/navbar/SideNav';
import { MdOutlineLibraryBooks, MdOutlineSettings, MdPeopleOutline } from "react-icons/md";
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
        // Perform validation on course inputs

        // Push the new course to the courses list
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

    const redirectToUploadPage = (course: any) => {
        localStorage.setItem('selectedCourse', JSON.stringify(course));
        window.location.href = '/upload';
    };

    const sampleData: CourseData[] = [
        {
            courseCode: 'CPEN 491',
            courseSections: '101',
            courseName: 'Capstone Design Project'
        },
        {
            courseCode: 'CPEN 491',
            courseSections: '101',
            courseName: 'Capstone Design Project'
        },
        {
            courseCode: 'CPEN 491',
            courseSections: '101',
            courseName: 'Capstone Design Project'
        },
        {
            courseCode: 'CPEN 491',
            courseSections: '101',
            courseName: 'Capstone Design Project'
        },
        {
            courseCode: 'CPEN 491',
            courseSections: '101',
            courseName: 'Capstone Design Project'
        },
        {
            courseCode: 'CPEN 491',
            courseSections: '101',
            courseName: 'Capstone Design Project'
        },
    ]

    const navItems: NavItem[] = [
        {
            url: "/",
            name: "Courses",
            icon: <MdOutlineLibraryBooks size={'1.75rem'} />
        },
        {
            url: "/users",
            name: "Users",
            icon: <MdPeopleOutline size={'1.75rem'} />
        },
        {
            url: "/settings",
            name: "Settings",
            icon: <MdOutlineSettings size={'1.75rem'} />
        }
    ]

    return (
        <div className='flex flex-row' >
            <SideNav navItems={[
          {
            url: "/",
            name: "Courses",
            icon: <Book size={24} />,
          },
          {
            url: "/users",
            name: "Users",
            icon: <SquareUser size={24} />,
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
                                <Input type="text" placeholder="Course Code" />
                                <Input type="text" placeholder="Course Name" />
                                <Input type="text" placeholder="Course Section" />
                                <Input type="text" placeholder="Course Description" />
                                <Button variant="default" className="w-full mt-4" onClick={handleAddCourse}>Add Course</Button>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                {sampleData.map((course) => (
                    <div>
                        <CourseCard courseCode={course.courseCode} courseSection={course.courseSections} courseName={course.courseName} isInstructor={true} />
                    </div>
                ))}
            </div>
        </div >
    );
}

export default InstructorDashboard;