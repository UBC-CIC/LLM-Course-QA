import { Button } from "@/components/button/Button";
import SideNav from '@/components/navbar/SideNav';
import { Input } from "@/components/input/Input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dialog/Dialog";
import {
    Book,
    Settings,
    SquareUser,
} from "lucide-react"
import { BlockPicker } from 'react-color';
import React from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/popover/Popover"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

const AdminSettings = () => {
    const [color, setColor] = React.useState('#000000');
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [comparePassword, setComparePassword] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleColorChange = (color: any) => {
        setColor(color.hex);
    }

    const handleChangePassword = () => {

        if (currentPassword === '' || newPassword === '' || comparePassword === '') {
            console.log('Please fill in all fields');
            setOpen(false);
            return;
        }

        if (newPassword !== comparePassword) {
            console.log('Passwords do not match');
            setOpen(false);
            return;
        }

        const user = localStorage.getItem('user');
        const userId = user ? JSON.parse(user).id : null;

        if (!userId) {
            console.log('User not found');
            setOpen(false);
            return;
        }

        const reqData = {
            user_id: userId,
            old_password: currentPassword,
            new_password: newPassword,
        }

        const url = 'http://127.0.0.1:5000/users';

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setOpen(false);
    }

    return (
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
            <div className="p-6 pt-12 w-screen">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold mb-6">Settings</h1>
                    <Button variant={'default'}>Save Changes</Button>
                </div>

                <div className="border-b border-gray-200 mt-6">
                    <h2 className="text-xl font-bold">Institution configuration</h2>
                    <div className="flex items-center mt-8">
                        <h3 className="text-lg mr-6 w-40">Institution Name</h3>
                        <Input className="w-72" placeholder="The University of British Columbia" />
                    </div>

                    <div className="flex items-center mt-8 mr-4">
                        <h3 className="text-lg mr-6 w-40">Institution Logo</h3>
                        <div className="flex flex-col items-center">
                            <img src="/ubclogo.png" alt="UBC Logo" className="w-20 h-20" />
                            <Input id="picture" type="file" />
                        </div>
                    </div>

                    <div className="flex items-center mt-8 mb-6">
                        <h3 className="text-lg mr-6 w-40">Primary Color</h3>
                        <Popover>
                            <PopoverTrigger className='w-10 h-10' style={{ backgroundColor: color }} />
                            <PopoverContent className='w-50'>
                                <BlockPicker color={color} onChange={handleColorChange} />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="border-b border-gray-200 mt-6">
                    <div className="flex items-center mt-8">
                        <h3 className="text-lg mr-6 w-40">Username</h3>
                        <Input className="w-70" placeholder="admin01" />
                    </div>
                    <div >
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger>
                                <Button variant={'outline'} className='w-64 my-8'>
                                    <p className="text-center">Change Password</p>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Change Password</DialogTitle>
                                    <Input type="text" placeholder="Current Password" onChange={(e) => setCurrentPassword(e.target.value)} />
                                    <Input type="text" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
                                    <Input type="text" placeholder="Re-Enter Password" onChange={(e) => setComparePassword(e.target.value)} />
                                    <Button variant="default" className="w-full mt-4" onClick={handleChangePassword}>Change Password</Button>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;


