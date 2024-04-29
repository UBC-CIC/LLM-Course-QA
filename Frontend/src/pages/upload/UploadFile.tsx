import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom"
import {
    Book,
    Settings,
    Trash2Icon
} from "lucide-react"

import { Table, TableBody, TableRow, TableHead, TableHeader, TableCell } from '@/components/table/Table';
import { ScrollArea } from '@/components/scroll-area/ScrollArea';
import { Checkbox } from '@/components/checkbox/Checkbox';
import { Button } from '@/components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import SideNav from '@/components/navbar/SideNav';
import Loading from '@/components/loading/Loading';

type CourseData = {
    id: string;
    name: string;
    status: 'Processing' | 'Uploaded';
    fileType: 'Class Slide' | 'Syllabus' | 'Class Notes' | 'Announcement' | 'Resources';
}


const UploadFile = () => {
    const { id } = useParams<{ id: string }>()
    const [files, setFiles] = useState<any[]>([]);
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [loadingFade, setLoadingFade] = useState(false);

    useEffect(() => {
        const getFiles = async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/courses/${id}/documents`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });

            const json = await response.json();

            if (response.ok) {
                setFiles([...files, ...json]);
            } else {
                console.error('Failed to fetch files');
            }
        }

        getFiles();
        setTimeout(() => {
            setLoadingFade(true)
            setTimeout(() => setLoading(false), 250)
        }, 1000)
    }, []);

    const inputFile = useRef<HTMLInputElement>(null);
    const handleUpload = () => {
        if (inputFile.current) {
            inputFile.current.click();
        }
    };

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('document', file);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/courses/${id}/documents`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            const json = await response.json();
            console.log(json);

            if (response.ok) {
                setFiles([...files, json.file_data]);
            } else {
                console.error('Failed to upload document');
            }
        }
    }

    const handleDelete = (documentId: string) => async () => {
        console.log('Deleting document with id: ' + documentId);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/courses/${id}/documents/${documentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });

        if (response.ok) {
            console.log('Document deleted successfully');
            setFiles(files.filter((file) => file.id !== documentId));
        } else {
            console.error('Failed to delete document');
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
                    // {
                    //     url: "/settings",
                    //     name: "Settings",
                    //     icon: <Settings size={24} />,
                    // },
                ]} />
                <ScrollArea className="h-screen w-full rounded-md border pl-12 pr-12 ">
                    <div className="flex justify-between items-center mt-2">
                        <h1 className='text-xl font-bold'>Documents</h1>
                        <div>
                            <Button variant={'outline'} className='mr-2' onClick={handleUpload}><FontAwesomeIcon icon={faUpload} className='mr-2' /> Upload</Button>
                            <input type='file' ref={inputFile} onChange={handleFileChange} className='hidden' />
                            <Button variant={'destructive'} className='hidden'>Delete</Button>
                        </div>
                    </div>

                    <Table>
                        <TableHeader >
                            <TableRow>
                                <TableHead><Checkbox /></TableHead>
                                <TableHead>Filename</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        {
                            files.map((data: CourseData) => (
                                <TableBody>
                                    <TableRow>
                                        <TableCell><Checkbox /></TableCell>
                                        <TableCell className="font-medium">{data.name}</TableCell>
                                        <TableCell><Trash2Icon className="text-red-500 cursor-pointer" onClick={handleDelete(data.id)} /></TableCell>
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

export default UploadFile;