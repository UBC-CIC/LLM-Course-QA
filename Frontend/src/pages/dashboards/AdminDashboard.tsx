import { Table, TableBody, TableRow, TableHead, TableHeader, TableCell } from '@/components/table/Table';
import { ScrollArea } from '@/components/scroll-area/ScrollArea';
import { Badge } from '@/components/badge/Badge';
import { faEllipsisV, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import SideNav from '@/components/navbar/SideNav';
import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"

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

import { Button } from "@/components/button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/select/Select"

import { Input } from "@/components/input/Input";


type CourseData = {
    id: string;
    name: string,
    description: string,
    course_code: string,
    course_section: string,
}

const AdminDashboard = () => {
    // const { id } = useParams<{ id: string }>()
    const [courses, setCourses] = useState<any[]>([]);
    const [instructors, setInstructors] = useState<any[]>([]);
    const [selectedCourseCode, setSelectedCourseCode] = useState<string>('');
    const [selectedCourseName, setSelectedCourseName] = useState<string>('');
    const [selectedCourseSection, setSelectedCourseSection] = useState<string>('');
    const [selectedCourseDescription, setSelectedCourseDescription] = useState<string>('');
    const [assignedInstructor, setAssignedInstructor] = useState<string>('');
    const [selectedCourseId, setSelectedCourseId] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [openAddCourse, setOpenAddCourse] = useState(false);


    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;
    const token = localStorage.getItem('token');

    const getAllCourses = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/courses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });

        const json = await response.json();

        if (response.ok) {
            setCourses(json);
        } else {
            console.log(json);
        }
    }
    const getAllInstructors = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/users/instructors`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });

        const json = await response.json();

        if (response.ok) {
            setInstructors(json);
        } else {
            console.log(json);
        }
    }

    useEffect(() => {
        getAllCourses();
        getAllInstructors();
    }, []);

    const updateCourse = async () => {
        if (!selectedCourseCode || !selectedCourseName || !selectedCourseSection || !selectedCourseDescription) {
            setAssignedInstructor('');
            setSelectedCourseCode('');
            setSelectedCourseName('');
            setSelectedCourseDescription('');
            setSelectedCourseSection('');
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/courses/${selectedCourseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                course_code: selectedCourseCode,
                name: selectedCourseName,
                course_section: selectedCourseSection,
                description: selectedCourseDescription
            })
        });

        const json = await response.json();

        if (response.ok) {
            getAllCourses();
        } else {
            console.log(json);
        }

        setOpen(false);

        setAssignedInstructor('');
        setSelectedCourseCode('');
        setSelectedCourseName('');
        setSelectedCourseDescription('');
        setSelectedCourseSection('');
    }

    const addCourse = async () => {

        console.log("Add course")

        if (!selectedCourseCode || !selectedCourseName || !selectedCourseSection || !selectedCourseDescription || !assignedInstructor) {
            setOpen(false);
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                course_code: selectedCourseCode,
                name: selectedCourseName,
                course_section: selectedCourseSection,
                description: selectedCourseDescription,
                instructor: assignedInstructor
            }),
        });

        const json = await response.json();

        if (response.ok) {
            console.log('Course added successfully');
            console.log(json);
            getAllCourses();
        } else {
            console.log(json);
        }
        setOpenAddCourse(false);

        setAssignedInstructor('');
        setSelectedCourseCode('');
        setSelectedCourseName('');
        setSelectedCourseDescription('');
        setSelectedCourseSection('');
    }

    return (
        <>
            <div className='flex flex-row' >
                <SideNav navItems={[
                    {
                        url: "/dashboard",
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
                ]} />
                <ScrollArea className="h-screen w-full rounded-md border pl-12 pr-12 pt-12">
                    <div className="flex justify-between items-center mt-2">
                        <h1 className='text-xl font-bold'>Courses</h1>
                        <Dialog open={openAddCourse} onOpenChange={setOpenAddCourse}>
                            <DialogTrigger>
                                <Button variant={'outline'}>
                                    <FontAwesomeIcon icon={faPlusCircle} className="my-auto cursor-pointer" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create Course</DialogTitle>
                                    <DialogDescription>
                                        <Select onValueChange={inst => setAssignedInstructor(inst)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select the Instructor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Instructors</SelectLabel>
                                                    {instructors && instructors.map((instructor: any, index: number) => (
                                                        <SelectItem key={index} value={instructor.id}>{instructor.name}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Input className='my-4' type="text" placeholder="Course Code" onChange={(e) => setSelectedCourseCode(e.target.value)} />
                                        <Input className='mb-4' type="text" placeholder="Course Name" onChange={(e) => setSelectedCourseName(e.target.value)} />
                                        <Input className='mb-4' type="text" placeholder="Course Section" onChange={(e) => setSelectedCourseSection(e.target.value)} />
                                        <Input className='mb-4' type="text" placeholder="Course Description" onChange={(e) => setSelectedCourseDescription(e.target.value)} />
                                        <Button variant={'default'} className="mt-4" onClick={addCourse}>Add Course</Button>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Table>
                        <TableHeader >
                            <TableRow>
                                <TableHead>Course Code</TableHead>
                                <TableHead>Course Name</TableHead>
                                <TableHead>Course Section</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        {courses &&
                            courses.map((data: CourseData, index: number) => (
                                <TableBody key={index}>
                                    <TableRow>
                                        <TableCell>{data.course_code}</TableCell>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell>{data.course_section}</TableCell>
                                        <Dialog  open={open} onOpenChange={setOpen}>
                                            <DialogTrigger>
                                                <Button variant={'outline'} onClick={() => {setSelectedCourseId(data.id)}}>
                                                    <FontAwesomeIcon icon={faEllipsisV} className="my-auto cursor-pointer" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Edit Course</DialogTitle>
                                                    <DialogDescription>
                                                        <Input className="my-4" type="text" placeholder="Course Code" onChange={(e) => setSelectedCourseCode(e.target.value)} />
                                                        <Input className="mb-4" type="text" placeholder="Course Name" onChange={(e) => setSelectedCourseName(e.target.value)} />
                                                        <Input className="mb-4" type="text" placeholder="Course Section" onChange={(e) => setSelectedCourseSection(e.target.value)} />
                                                        <Input className='mb-4' type="text" placeholder="Course Description" onChange={(e) => setSelectedCourseDescription(e.target.value)} />
                                                        <Button variant={'default'} className="mt-4" onClick={updateCourse}>Save</Button>
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </TableRow>
                                </TableBody>
                            ))
                        }

                    </Table>
                </ScrollArea>
            </div>
        </>
    );
};

export default AdminDashboard;