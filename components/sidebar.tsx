"use client"
import { useRouter } from 'next/navigation'
import { BsHouseFill, BsBellFill, BsFillBookmarkFill, BsSearch } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import SidebarItem from './sidebar-item';
import SidebarLogo from './sidebar-logo';
import SidebarTweetButton from './sidebar-tweet-button';
import { User } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { signOut } from 'next-auth/react';

interface SidebarProps {
  currentUser: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {

  const items = [
    {
      icon: BsHouseFill,
      label: "Home",
      href: "/",
    },
    {
      icon: BsBellFill,
      label: "Notifications",
      href: "/notifications",
      alert: currentUser?.hasNotification
    },
  
    {
      icon: FaUser,
      label: "Profile",
      href: `/users/${currentUser?.id}`,
    },
    {
      icon: BsFillBookmarkFill,
      label: "Bookmark",
      href: `/bookmark`,
    },
    {
      icon: BsSearch,
      label: "Explore",
      href: `/explore`,
    },
  ]

  return (
    <div className='col-span-1 h-full pr-4 md-pr-6'>
      <div className='flex flex-col p-1 items-end text-white'>
        <div className='space-y-4 lg:w-[230px]'>
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            alert={item.alert}
          />
          ))}
          {currentUser && (
            <SidebarItem 
              onClick={() => {
                signOut()
                toast.success('Logged out')
            }} label='Logout' icon={BiLogOut}/>
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar