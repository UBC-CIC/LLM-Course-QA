import { MdPeopleOutline, MdOutlineSettings, MdOutlineLibraryBooks } from 'react-icons/md'
import '../../../public/ubclogo.png'
import {
    LogOut
  } from "lucide-react"


export type NavItem = {
    url: string;
    name: string;
    icon: JSX.Element;
}

interface SideNavProps {
    navItems: NavItem[];
}

const SideNav = (props: SideNavProps) => {
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
                        href="/auth/logout"
                        className="flex flex-col items-center p-3">
                        <LogOut size={24} />
                    
                    </a>

                </nav>
            </div>
        </div>
    );
};

export default SideNav;