import { Table, TableBody, TableRow, TableHead, TableHeader, TableCell } from '@/components/table/Table';
import { ScrollArea } from '@/components/scroll-area/ScrollArea';
import { Badge } from '@/components/badge/Badge';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
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
import Loading from '@/components/loading/Loading';

interface UserData {
    id: string;
    name: string;
    role: 'Student' | 'Instructor' | 'Admin';
}

const InstitutionUsers = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [loadingFade, setLoadingFade] = useState(false);

    const token = localStorage.getItem('token');

    const getAllUsers = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
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
        setTimeout(() => {
            setLoadingFade(true)
            setTimeout(() => setLoading(false), 250)
        }, 1200)
    }, []);

    const handleDelete = (userId: string) => async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/admin/users`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                user_id: userId
            })
        });

        const json = await response.json();

        if (response.ok) {
            getAllUsers();
        } else {
            console.log(json);
        }
    }

    const updateUserRole = (userId: string, role: string) => async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/admin/users` , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                id: userId,
                role: role
            })
        });

        const json = await response.json();

        if (response.ok) {
            getAllUsers();
        } else {
            console.log(json);
        }
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
                                        <Badge className={`${data.role === 'Student' ? 'bg-blue-600' : data.role === 'Instructor' ? 'bg-yellow-600' : 'bg-green-600'}`}>{data.role}</Badge>
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
                                                <Select onValueChange={role => setSelectedRole(role)}>
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
                                                    <Button variant={'default'} className="mt-4" onClick={updateUserRole(data.id, selectedRole)}>Save</Button>
                                                    <Button variant={'destructive'} className="mt-4" onClick={handleDelete(data.id)}>Delete</Button>
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
            {loading ? <Loading loadingFade={loadingFade} /> : ''}
        </>
    );
};

export default InstitutionUsers;