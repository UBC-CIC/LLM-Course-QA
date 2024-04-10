import { Table, TableBody, TableRow, TableHead, TableHeader, TableCell } from '@/components/table/Table';
import { ScrollArea } from '@/components/scroll-area/ScrollArea';
import { Badge } from '@/components/badge/Badge';
import ActionDropDown from '@/components/dropDown/ActionDropDown';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import SideNav, { NavItem } from '@/components/navbar/SideNav';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus, faCopy } from '@fortawesome/free-solid-svg-icons';

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
import { Input } from "@/components/input/Input";
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

interface UserData {
    id: string;
    name: string;
    role: 'student' | 'instructor' | 'admin';
}

const CourseUsers = () => {
    const { id } = useParams<{ id: string }>()
    const [users, setUsers] = useState<any[]>([]);
    const [accessCode, setAccessCode] = useState<string>('');


    const getEnrolledStudents = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/courses/${id}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json();
        
        if (response.ok) {
            setUsers(json.students);
            setAccessCode(json.access_code);
        } else {
            console.log(json);
        }
    }

    useEffect(() => {
        getEnrolledStudents();
    }, []);

    const handleDelete = (studentId: string) => async () => {
        console.log(studentId);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/courses/${id}/users/${studentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json();

        if (response.ok) {
            getEnrolledStudents();
        } else {
            console.log(json);
        }
    }

    const copyAccessCode = () => {
        navigator.clipboard.writeText(accessCode);
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
                        url: "/settings",
                        name: "Settings",
                        icon: <Settings size={24} />,
                    },
                ]} />
                <ScrollArea className="h-screen w-full rounded-md border pl-12 pr-12 pt-12">
                <div className="flex justify-between items-center mt-2">
                        <h1 className='text-xl font-bold'>Students</h1>
                        <div>
                            <Dialog>
                                            <DialogTrigger>
                                            <Button variant={'outline'} className='mr-2'><FontAwesomeIcon icon={faPlus} className='mr-2' />Invite Users</Button>

                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Access Code</DialogTitle>
                                                    <DialogDescription className='my-2'>
                                                        <div className='flex justify-between items-center'>
                                                            <div className='w-full p-2 rounded-lg border bg-gray-100 text-xl '>
                                                                {accessCode}
                                                            </div>
                                                            <FontAwesomeIcon icon={faCopy} className='cursor-pointer mx-2 hover:text-black' size='2x' onClick={copyAccessCode}/>
                                                        </div>


                                                    
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                        </div>
                    </div>
                    <Table>
                        <TableHeader >
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        {
                            users.map((data: UserData, index: number) => (
                                console.log(data.id),
                                <TableBody key={index}>
                                    <TableRow>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell>
                                            <Badge className={`${data.role === 'student' ? 'bg-blue-600' : data.role === 'instructor' ? 'bg-yellow-600' : 'bg-green-600'}`}>{data.role}</Badge>
                                        </TableCell>

                                        <TableCell><FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" onClick={handleDelete(data.id)} /></TableCell>
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

export default CourseUsers;