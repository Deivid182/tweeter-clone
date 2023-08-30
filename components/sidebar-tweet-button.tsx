"use client"
import { FaFeather } from 'react-icons/fa';
import { useLoginModal } from '@/hooks/use-login-modal';
import { useCallback } from 'react';

const SidebarTweetButton = () => {

  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal])

  return (
    <div
      onClick={onClick}
    >
      <div className='mt-6 lg:hidden rounded-full h-14 w-14 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition-colors cursor-pointer'>
        <FaFeather size={28} color='white' />
      </div>
      <div className='hidden lg:flex items-center justify-center mt-6 px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-80 cursor-pointer transition-colors'>
        <p className='hidden lg:block text-center font-semibold text-white text-xl'>
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;