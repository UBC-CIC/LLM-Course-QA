import { Table, TableBody, TableRow, TableHead, TableHeader, TableCell } from '@/components/table/Table';
import { ScrollArea } from '@/components/scroll-area/ScrollArea';
import { Badge } from '@/components/badge/Badge';
import ActionDropDown from '@/components/dropDown/ActionDropDown';
import SideNav from '@/components/navbar/SideNav';

interface UserData {
    name: string;
    role: 'student' | 'instructor' | 'admin';
}

const sampleData: UserData[] = [
    {
        name: 'John Doe',
        role: 'student',
    },
    {
        name: 'Jane Doe',
        role: 'instructor',
    },
    {
        name: 'Test Student',
        role: 'admin',
    }
]

const AdminDashboard = () => {
    return (
        <>
            <div className='flex flex-row' >
                <SideNav />
                <ScrollArea className="h-screen w-full rounded-md border pl-12 pr-12 pt-12">
                    <div className="flex justify-between items-center mt-2">
                        <h1 className='text-3xl font-bold'>Users</h1>
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
                            sampleData.map((data: UserData, index: number) => (
                                <TableBody key={index}>
                                    <TableRow>
                                        <TableCell className='font-serif'>{data.name}</TableCell>
                                        <TableCell>
                                            <Badge className={`${data.role === 'student' ? 'bg-blue-600' : data.role === 'instructor' ? 'bg-yellow-600' : 'bg-green-600'}`}>{data.role}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <ActionDropDown />
                                        </TableCell>
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