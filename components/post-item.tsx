'use client';
import { useLoginModal } from '@/hooks/use-login-modal';
import { Comment, Post, User } from '@prisma/client';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import Avatar from './ui/avatar';
import { formatUsernameFromEmail } from '@/helpers';
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from 'react-icons/ai';
import { useLike } from '@/hooks/use-like';

interface PostItemProps {
  data: Post & {
    user: User;
    comments: Comment[];
  };
  currentUser?: User | null;
}

const PostItem: React.FC<PostItemProps> = ({ data, currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { hasLiked, toggleLike } = useLike(data, currentUser || null);

  const goToUser = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const createdAt = useMemo(() => {
    if (!data.createdAt) return;

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const onLike = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if(!currentUser) return loginModal.onOpen();
      toggleLike()
    }, [loginModal, toggleLike, currentUser]
  );

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart

  return (
    <div
      onClick={goToPost}
      className='border-b-[1px] border-neutral-800 p-4 cursor-pointer hover:bg-neutral-800 transition-colors'
    >
      <div className='flex gap-x-4'>
        <Avatar src={data.user.image!} />
        <div className='space-y-2'>
          <div className='flex items-center gap-x-2'>
            <p
              onClick={goToUser}
              className='text-white font-semibold cursor-pointer hover:underline'
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className='text-neutral-500 cursor-pointer hover:underline hidden md:block'
            >
              {data.user.username || formatUsernameFromEmail(data.user.email!)}
            </span>
            <span className='text-neutral-500 text-sm'>{createdAt}</span>
          </div>
          <div className='text-white text-sm'>{data.content}</div>
          <div className='flex items-center gap-x-6'>
            <div className='flex items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
              <AiOutlineMessage size={20} />
              <p>{data.comments.length || 0}</p>
            </div>
            <div 
              onClick={onLike}
              className='flex items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500'>
              <LikeIcon size={20} color={hasLiked ? 'red' : ''} />
              <p>{data.likeIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
