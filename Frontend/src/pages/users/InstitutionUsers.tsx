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

const InstitutionUsers = () => {
    const { id } = useParams<{ id: string }>()
    const [users, setUsers] = useState<any[]>([]);

    const getAllUsers = async () => {
        const response = await fetch('http://127.0.0.1:5000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json();

        if (response.ok) {
            setUsers(json);
        } else {
            console.log(json);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleDelete = (userId: string) => async () => {
        console.log(userId);
        const response = await fetch(`http://127.0.0.1:5000/courses/${id}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json();

        if (response.ok) {
            getAllUsers();
        } else {
            console.log(json);
        }
    }

    const updateUserRole = (userId: string, role: string) => async () => {
        console.log(userId);
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
                                <TableBody key={index}>
                                <TableRow>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>
                                        <Badge className={`${data.role === 'student' ? 'bg-blue-600' : data.role === 'instructor' ? 'bg-yellow-600' : 'bg-green-600'}`}>{data.role}</Badge>
                                    </TableCell>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button variant={'outline'}>
                                                <FontAwesomeIcon icon={faEllipsisV} className="my-auto cursor-pointer" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit User</DialogTitle>
                                                <DialogDescription>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select user role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                        <SelectLabel>Roles</SelectLabel>
                                                        <SelectItem value="Student">Student</SelectItem>
                                                        <SelectItem value="Instructor">Instructor</SelectItem>
                                                        <SelectItem value="Admin">Admin</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                    <Button variant={'default'} className="mt-4" onClick={updateUserRole(data.id, data.role)}>Save</Button>
                                                    <Button variant={'destructive'} className="mt-4">Delete</Button> 
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

export default InstitutionUsers;