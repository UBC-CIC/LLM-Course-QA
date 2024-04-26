import '../../../public/ubclogo.png'
import {
    LogOut
  } from "lucide-react"

import { useNavigate } from 'react-router-dom';
import userpool from '@/lib/userpool';


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
            className='h-screen w-28 border-r border-gray-200'>
            <div>
                <div className="text-lg border-b p-2">
                    <img src="/ubclogo.png" alt="UBC Logo" />
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