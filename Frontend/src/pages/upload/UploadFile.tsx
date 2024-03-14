import Header from '@/components/header/Header';
import { Table, TableBody, TableRow, TableHead, TableHeader, TableCaption, TableCell, TableFooter } from '@/components/table/Table';
import { ScrollArea } from '@/components/scroll-area/ScrollArea';
import { Badge } from '@/components/badge/Badge';
import { Checkbox } from '@/components/checkbox/Checkbox';
import { Button } from '@/components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const UploadFile = () => {
    return (
        <>
            <Header />
            <ScrollArea className="h-screen w-full rounded-md border pl-12 pr-12 ">
                <div className="flex justify-between items-center mt-2">
                    <h1 className='text-xl font-bold'>Documents</h1>
                    <div>
                        <Button variant={'outline'} className='mr-2'><FontAwesomeIcon icon= {faUpload} className='mr-2'/> Upload</Button>

                        <Button variant={'destructive'} className='hidden'>Delete</Button>
                    </div>
                </div>

                <Table>
                    {/* table top that says "document on left h2 and 2 butons on right" */}


                    <TableHeader >
                        <TableRow>
                            <TableHead><Checkbox /></TableHead>
                            <TableHead>Filename</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>File Type</TableHead>
                            <TableHead></TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell><Checkbox /></TableCell>
                            <TableCell className="font-medium">syllabus.pdf</TableCell>
                            <TableCell>Uploaded</TableCell>
                            <TableCell><Badge>Class Slide</Badge></TableCell>
                            <TableCell><FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" /></TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell><Checkbox /></TableCell>
                            <TableCell className="font-medium">syllabus.pdf</TableCell>
                            <TableCell>Uploaded</TableCell>
                            <TableCell><Badge>Class Slide</Badge></TableCell>
                            <TableCell><FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" /></TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell><Checkbox /></TableCell>
                            <TableCell className="font-medium">syllabus.pdf</TableCell>
                            <TableCell>Uploaded</TableCell>
                            <TableCell><Badge>Class Slide</Badge></TableCell>
                            <TableCell><FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </ScrollArea>

        </>
    );
};

export default UploadFile;