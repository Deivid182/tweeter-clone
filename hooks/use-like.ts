import { Post, User } from '@prisma/client';
import { useLoginModal } from './use-login-modal';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export const useLike = (post: (Post), currentUser: (User | null)) => {

  const loginModal = useLoginModal();
  const router = useRouter();

  const hasLiked = useMemo(() => {
    const list = post?.likeIds || [];

    return list.includes(currentUser?.id || '');

  }, [currentUser?.id, post]);


  const toggleLike = useCallback(async () => {
    if(!currentUser) {
      return loginModal.onOpen();
    }

    try {
      
      let request

      if(hasLiked) {
        request = () => axios.delete(`/api/like/${post.id}`);
      } else {
        request = () => axios.post(`/api/like/${post.id}`);
      }

      await request();
      toast.success('Success');
      router.refresh()

    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [router, loginModal, currentUser, post, hasLiked]);

  return {
    hasLiked,
    toggleLike
  }

}