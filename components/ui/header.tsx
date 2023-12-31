"use client";

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { BiArrowBack } from 'react-icons/bi';

interface HeaderProps {
  label: string
  showBack?: boolean
}

const Header: React.FC<HeaderProps> = ({ label, showBack }) => {

  const router = useRouter()

  const handleBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <div className='border-b-[1px] border-neutral-800 p-5'>
      <div className='flex flex-row items-center gap-2'>
        {showBack && (
          <BiArrowBack 
            onClick={handleBack}
            color='white'
            size={28}
            className='cursor-pointer hover:opacity-70 transition-colors'
          />
        )}
        <h1 className='text-white text-xl font-semibold'>{label}</h1>
      </div>
    </div>
  )
}

export default Header