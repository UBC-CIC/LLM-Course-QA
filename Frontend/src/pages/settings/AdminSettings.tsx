import { Button } from "@/components/button/Button";
import SideNav from '@/components/navbar/SideNav';
import { Input } from "@/components/input/Input";
import { BlockPicker } from 'react-color';

import React from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/popover/Popover"

const AdminSettings = () => {
    const [color, setColor] = React.useState('#000000');

    const handleColorChange = (color: any) => {
        setColor(color.hex);
    }

    return (
        <div className='flex flex-row' >
            <SideNav />
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
                            <Input id="picture" type="file"/>
                        </div>
                    </div>

                    <div className="flex items-center mt-8 mb-6">
                        <h3 className="text-lg mr-6 w-40">Primary Color</h3>
                        <Popover>
                            <PopoverTrigger className='w-10 h-10' style={{ backgroundColor: color }}/>
                            <PopoverContent className='w-50'>
                                <BlockPicker color={color} onChange={handleColorChange} />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="border-b border-gray-200 mt-6">
                    <h2 className="text-xl font-bold">Admin settings</h2>
                    <div className="flex items-center mt-8">
                        <h3 className="text-lg mr-6 w-40">Username</h3>
                        <Input className="w-70" placeholder="admin01" />
                    </div>

                    <div className="flex items-center mt-8 mb-6">
                        <h3 className="text-lg mr-6 w-40">Password</h3>
                        <Input type ='password' className="w-70" placeholder="*****" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;


