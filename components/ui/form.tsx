'use client';
import getCurrentUser from '@/actions/get-current-user';
import { useLoginModal } from '@/hooks/use-login-modal';
import { useRegisterModal } from '@/hooks/use-register-modal';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import Button from './button';
import Avatar from './avatar';

interface FormProps {
  currentUser: User | null;
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({
  placeholder,
  isComment,
  postId,
  currentUser,
}) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments/${postId}` : '/api/posts';
      const successMessage = isComment ? 'Comment created' : 'Post created';

      await axios.post(url, { content });
      toast.success(successMessage);
      setContent('');
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [router, content, postId, isComment]);

  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
      {currentUser ? (
        <div className='flex flex-row items-center gap-x-4'>
          <div>
            <Avatar src={currentUser.image!} />
          </div>
          <div className='w-full'>
            <textarea
              className='w-full peer disabled:opacity-70 resize-none mt-3 bg-black ring-0 outline-none focus:outline-none 
              text-xl placeholder:text-neutral-500 text-white p-1.5
            '
              placeholder={placeholder}
              onChange={(e) => setContent(e.target.value)}
              value={content}
              disabled={isLoading}
            ></textarea>
            <hr className='opacity-0 transition-colors w-full border-[1px] border-neutral-800 peer-focus:opacity-100' />
            <div className='mt-4 flex flex-row justify-end'>
              <Button
                label={isComment ? 'Reply' : 'Tweet'}
                onClick={onSubmit}
                disabled={isLoading || !content}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className='space-y-4'>
          <h1 className='text-white text-2xl font-bold text-center'>
            Welcome to Twitter
          </h1>
          <div className='flex flex-row items-center gap-x-4 justify-center'>
            <Button label='Login' onClick={() => loginModal.onOpen()} />
            <Button
              label='Register'
              onClick={() => registerModal.onOpen}
              secondary
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
