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
        fileType: 'Class Slide'
    },
    {
        Filename: 'class-notes.pdf',
        status: 'Processing',
        fileType: 'Class Notes'
    },
    {
        Filename: 'announcement.pdf',
        status: 'Uploaded',
        fileType: 'Announcement'
    },
    {
        Filename: 'resources.pdf',
        status: 'Processing',
        fileType: 'Resources'
    }
]

const UploadFile = () => {
    return (
        <>
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
                                <TableHead>Status</TableHead>
                                <TableHead>File Type</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        {
                            sampleData.map((data: CourseData) => (
                                <TableBody>
                                    <TableRow>
                                        <TableCell><Checkbox /></TableCell>
                                        <TableCell className="font-medium">{data.Filename}</TableCell>
                                        <TableCell>{data.status}</TableCell>
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