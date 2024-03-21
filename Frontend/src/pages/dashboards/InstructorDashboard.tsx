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
import { useState } from "react";
import Form from "@/components/form/Form";
import { Input } from "@/components/input/Input";

type CourseData = {
    courseCode: string;
    courseSections: string;
    courseName: string;
}

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


const InstructorDashboard = () => {
    return (
        <div className='flex flex-row' >
            <SideNav navItems={navItems} />
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
                                <Button variant="default" className="w-full mt-4">Add Course</Button>
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
};

export default InstructorDashboard;