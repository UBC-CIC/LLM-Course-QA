import { MdPeopleOutline, MdOutlineSettings, MdOutlineLibraryBooks } from 'react-icons/md'
import '../../../public/ubclogo.png'

const navItems = {
    "Courses": {
        url: "/",
        icon: <MdOutlineLibraryBooks size={'1.75rem'}/>
    },
    "Users": {
        url: "/users",
        icon: <MdPeopleOutline size={'1.75rem'}/>
    },
    "Settings": {
        url: "/settings",
        icon: <MdOutlineSettings size={'1.75rem'}/>
    }
}

const SideNav = () => {

    return (
        <div
            className='h-screen w-28 border-r border-gray-200'>
            <div>
                <div className="text-lg border-b p-2">
                    <img src="/ubclogo.png" alt="UBC Logo" />
                </div>
                <nav>
                    {Object.entries(navItems).map(([name, data]) => (
                        <a
                            key={name}
                            href={data.url}
                            className="flex flex-col items-center p-3 hover:bg-gray-200 transition duration-200">
                            {data.icon}
                            {name}
                        </a>

                    ))}
                </nav>
            </div>
        </div>
    );
};

export default SideNav;