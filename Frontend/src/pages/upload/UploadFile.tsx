import React, { useState, useEffect } from 'react';
import {
    Book,
    Settings,
    SquareUser,
  } from "lucide-react"

import { Table, TableBody, TableRow, TableHead, TableHeader, TableCell } from '@/components/table/Table';
import { ScrollArea } from '@/components/scroll-area/ScrollArea';
import { Badge } from '@/components/badge/Badge';
import { Checkbox } from '@/components/checkbox/Checkbox';
import { Button } from '@/components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import SideNav from '@/components/navbar/SideNav';

type CourseData = {
    Filename: string;
    status: 'Processing' | 'Uploaded';
    fileType: 'Class Slide' | 'Syllabus' | 'Class Notes' | 'Announcement' | 'Resources';
}

const sampleData: CourseData[] = [
    {
        Filename: 'syllabus.pdf',
        status: 'Uploaded',
        fileType: 'Syllabus'
    },
    {
        Filename: 'slides-1.pdf',
        status: 'Uploaded',
        fileType: 'Class Slide'
    },
    {
        Filename: 'slides-2.pdf',
        status: 'Uploaded',
        fileType: 'Class Slide'
    },
    {
        Filename: 'slides-3.pdf',
        status: 'Uploaded',
        fileType: 'Class Slide'
    },
    {
        Filename: 'slides-4.pdf',
        status: 'Uploaded',
        fileType: 'Class Slide'
    },
    {
        Filename: 'announcement-1.pdf',
        status: 'Uploaded',
        fileType: 'Announcement'
    }
]

const UploadFile = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [files, setFiles] = useState<any[]>([]);
    const [hover, setHover] = useState('#fda29b');
    const [uploadProgress, setUploadProgress] = useState(0); // New state for upload progress
    const course = localStorage.getItem('selectedCourse');
    const courseId = course ? JSON.parse(course).id : null;

    useEffect(() => {
        const getFiles = async () => {
            const response = await fetch('http://127.0.0.1:5000/courses/' + courseId + '/documents', {
                method: 'GET',
            });

            const json = await response.json();

            if (response.ok) {
                console.log('Files fetched: ' + json);
                console.log('Files before: ' + files);

                setFiles([...files, ...json]);
                console.log('Files after: ' + files)
            } else {
                console.error('Failed to fetch files');
            }
        }

        getFiles();
    }, []);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingOver(false);
        const file = event.dataTransfer.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('document', file);

            try {
                const response = await fetch('http://127.0.0.1:5000/courses/' + courseId + '/documents', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    console.log('File uploaded successfully');
                } else {
                    console.error('Failed to upload file');
                }
            } catch (error) {
                console.error('Network error occurred', error);
            }

            setSelectedFile(file);
            setFiles([...files, file]); // Push the new file to the files state
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingOver(true);
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    return (
        <>
            <div className='flex flex-row' >
                <SideNav navItems={[
                    {
                        url: "/instructor",
                        name: "Courses",
                        icon: <Book size={24} />,
                    }, 
                    {
                        url: "/settings",
                        name: "Settings",
                        icon: <Settings size={24} />,
                    },
                ]} />
                <ScrollArea className="h-screen w-full rounded-md border pl-12 pr-12 ">
                    <div className="flex justify-between items-center mt-2">
                        <h1 className='text-xl font-bold'>Documents</h1>
                        <div>
                            <Button variant={'outline'} className='mr-2'><FontAwesomeIcon icon={faUpload} className='mr-2' /> Upload</Button>
                            <Button variant={'destructive'} className='hidden'>Delete</Button>
                        </div>
                    </div>

                    <Table>
                        <TableHeader >
                            <TableRow>
                                <TableHead><Checkbox /></TableHead>
                                <TableHead>Filename</TableHead>
                                <TableHead>File Type</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        {
                            files.map((data: CourseData) => (
                                <TableBody>
                                    <TableRow>
                                        <TableCell><Checkbox /></TableCell>
                                        <TableCell className="font-medium">{data.Filename}</TableCell>
                                        <TableCell><Badge>{data.fileType}</Badge></TableCell>
                                        <TableCell><FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" /></TableCell>
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

export default UploadFile;