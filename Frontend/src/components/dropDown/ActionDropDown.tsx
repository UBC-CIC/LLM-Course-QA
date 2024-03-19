import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./DropDownMenu"

const ActionDropDown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <FontAwesomeIcon icon={faEllipsisV} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuLabel>Manage User</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ActionDropDown;