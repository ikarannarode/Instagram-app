import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import axios from 'axios'
import { CloudCog, Compass, Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp, VideoIcon, } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
const sidebarItems = [
    {
        icon: <Home />,
        text: "Home"

    },
    {
        icon: <Search />,
        text: "Search"
    },
    {
        icon: <Compass />,
        text: "Explore"
    },
    {
        icon: <VideoIcon />,
        text: "Reels"
    },
    {
        icon: <MessageCircle />,
        text: "Messages"
    },
    {
        icon: <Heart />,
        text: "Notification",
    },
    {
        icon: <PlusSquare />,
        text: "Create"
    },
    {
        icon: (<Avatar className='h-6 w-6 rounded-full'>
            <AvatarImage src="https://github.com/shadcn.png" className="rounded-full" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>),
        text: "Profile"
    },
    {
        icon: <LogOut />,
        text: "Logout"
    }

]
function LeftSidebar() {
    const navigate = useNavigate();
    const logoutHandler = async (e) => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', {
                withCredentials: true
            });
            console.log(res)
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);

            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    const sidebarHandler = (textType) => {
        if (textType === "Logout") logoutHandler();
    }
    return (
        <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
            <div className='flex flex-col mt-11'>
                <div className='h-[30px] w-full logo-content'></div>
                <div>
                    {
                        sidebarItems.map((item, index) => {
                            return (
                                <div key={index} onClick={() => sidebarHandler(item.text)} className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
                                    {item.icon}
                                    <span className='ml-1.5'>{item.text}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar;