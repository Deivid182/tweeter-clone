'use client';
import Button from '@/components/ui/button';
import EditModal from '@/components/modals/edit-modal';
import { formatUsernameFromEmail } from '@/helpers';
import { useEditModal } from '@/hooks/use-edit-modal';
import { User } from '@prisma/client';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { BiCalendar } from 'react-icons/bi';
import useFollow from '@/hooks/use-follow';

interface UserBioProps {
  user: User | null;
  followersCount: number;
  currentUser: User | null;
}

const UserBio: React.FC<UserBioProps> = ({
  user,
  followersCount,
  currentUser,
}) => {

  const editModal = useEditModal()

  const { isFollowing, toggleFollow } = useFollow(currentUser, user?.id!);

  const createdAt = useMemo(() => {
    if (!user?.createdAt) return null;

    return format(new Date(user.createdAt), 'MMMM yyyy');
  }, [user?.createdAt]);

  return (
    <>
      <EditModal 
        currentUser={currentUser}
      />
      <div className='border-b-[1px] border-neutral-800 pb-4'>
        <div className='flex justify-end p-2'>
          {currentUser?.id === user?.id ? (
            <Button ghost label='Edit Profile' onClick={() => editModal.onOpen()} />
          ) : (
            <Button 
              secondary={!isFollowing}
              ghost={isFollowing} 
              label={isFollowing ? 'Unfollow' : 'Follow'} 
              onClick={toggleFollow} 
            />
          )}
        </div>
        <div className='mt-2 p-4 space-y-4'>
          <div>
            <p className='text-white text-2xl font-semibold'>{user?.name}</p>
            <p className='text-neutral-500'>
              {user?.username || formatUsernameFromEmail(user?.email || '')}
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='text-white'>
              {user?.bio || 'This user has no bio yet'}
            </p>
            <div className='flex flex-row items-center gap-x-2 text-neutral-500'>
              <BiCalendar size={24} />
              <p>Joined {createdAt}</p>
            </div>
          </div>
          <div className='flex items-center gap-x-4'>
            <div className='flex flex-row items-center gap-1'>
              <p className='text-white'>{user?.followingIds?.length}</p>
              <p className='text-neutral-500'>Following</p>
            </div>
            <div className='flex flex-row items-center gap-1'>
              <p className='text-white'>{followersCount || 0}</p>
              <p className='text-neutral-500'>Followers</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBio;
