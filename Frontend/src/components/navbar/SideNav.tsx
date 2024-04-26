import '../../../public/ubclogo.png'
import {
    LogOut
  } from "lucide-react"

import { useNavigate } from 'react-router-dom';
import userpool from '@/lib/userpool';
import { useEffect, useState } from 'react';


export type NavItem = {
    url: string;
    name: string;
    icon: JSX.Element;
}

interface SideNavProps {
    navItems: NavItem[];
}

const SideNav = (props: SideNavProps) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [logo, setLogo] = useState('');
    const [colour, setColour] = useState('#fff');

    const getConfiguration = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/admin`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
          });

        const json = await response.json();

        if (response.ok) {
            setLogo(`data:image/png;base64,${json.logo}`);
            setColour(json.colour);
            console.log("logo: " + logo);
        }
    }

    useEffect(() => {
        getConfiguration();
    }, []);

    const onLogout = () => {
        const user = userpool.getCurrentUser()

        if (user) {
            user.signOut()
        }

        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/')
        window.location.reload()
    }

    return (
        <div
            className='h-screen w-28 border-r border-gray-200' style={{backgroundColor: colour}}>
            <div>
                <div className="text-lg border-b p-2">
                    <img src="/ubclogo.png" alt="Logo" />
                </div>
                <nav>
                    {props.navItems.map((data) => (
                        <a
                            key={data.name}
                            href={data.url}
                            className="flex flex-col items-center p-3 hover:bg-gray-200 transition duration-200">
                            {data.icon}
                            {data.name}
                        </a>
                    ))}
                    <a
                        className="flex flex-col items-center p-3 hover:bg-gray-200 transition duration-200" onClick={onLogout}>
                        <LogOut size={24} />
                    </a>
                </nav>
            </div>
        </div>
    );
};

export default SideNav;