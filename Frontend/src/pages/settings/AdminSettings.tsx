import { Button } from "@/components/button/Button";
import SideNav from '@/components/navbar/SideNav';
import { Input } from "@/components/input/Input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dialog/Dialog";
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
import Loading from "@/components/loading/Loading";

const AdminSettings = () => {
    const [color, setColor] = React.useState('#000000');
    const [logo, setLogo] = React.useState('');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [loadingFade, setLoadingFade] = React.useState(false);
    const token = localStorage.getItem('token');

    const handleColorChange = (color: any) => {
        setColor(color.hex);
    }

    const encodeImageToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const saveChanges = async () => {
        const logoInput = document.getElementById('picture') as HTMLInputElement;
        const logoFile = logoInput.files?.[0];

        const requestBody = {} as any;

        if (logoFile) {
            if(logoFile.type == 'image/png') {
                const base64Logo = await encodeImageToBase64(logoFile);
                requestBody.logo = base64Logo;
                setError(false)
            } else {
                setError(true)
                return;
            }
        }

        if (color) {
            requestBody.primaryColour = color;
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/admin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,

            },
            body: JSON.stringify(requestBody),
        });

        const json = await response.json();

        if (response.ok) {
            console.log(json);
        } else {
            console.log(json);
        }

    }

    const getInstitutionConfig = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        const json = await response.json();

        if (response.ok) {
            setColor(json.colour);
            setLogo(`data:image/png;base64,${json.logo}`);
        } else {
            console.log(json);
        }
    }

    React.useEffect(() => {
        getInstitutionConfig();
        setTimeout(() => {
            setLoadingFade(true)
            setTimeout(() => setLoading(false), 250)
        }, 1200)
    }, []);

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
                    <Button variant={'default'} onClick={saveChanges}>Save Changes</Button>
                </div>

                <div className="border-b border-gray-200 mt-6">
                    <div className="flex items-center mt-8 mr-4">
                        <h3 className="text-lg mr-6 w-40">Institution Logo</h3>
                        <div className="flex flex-col items-center">
                            <img className="h-20 m-8" src={logo ? logo : "courseqa-logo.png"} alt="Logo" />
                            <Input id="picture" type="file" />
                        </div>
                    </div>
                    {error && <p className="text-red-500">Please upload a png file</p>}

                    <div className="flex items-center mt-8 mb-6">
                        <h3 className="text-lg mr-6 w-40">Primary Color</h3>
                        <Popover >
                            <PopoverTrigger className='w-10 h-10 border-solid border-2 border-black' style={{ backgroundColor: color }} />
                            <PopoverContent className='w-50'>
                                <BlockPicker color={color} onChange={handleColorChange} />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
            {loading ? <Loading loadingFade={loadingFade} /> : ''}
        </div>
    );
};

export default AdminSettings;


