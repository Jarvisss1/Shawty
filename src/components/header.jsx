import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from 'lucide-react';



const Header = () => {
    const navigate = useNavigate();
    const user=true;
  return (
    <nav className="py-4 flex justify-between items-center">
      <Link to="/">
        <img
          src="/shawty-logo.png"
          alt="shawty logo"
          height={`50px`}
          width={`50px`}
        />
      </Link>
      <div>
        {!user ? (
          <Button
            onClick={() => {
              navigate("/auth");
            }}
          >
            Login{" "}
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
              <Avatar>
                <AvatarImage src="avatar.png" />
                <AvatarFallback>YS</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-center">Yatharth S</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LinkIcon size={16} className=" mr-2" />
                My Links
                </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400">
                <LogOut size={16} className=" mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}

export default Header
