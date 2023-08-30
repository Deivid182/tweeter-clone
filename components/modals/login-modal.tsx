'use client';

import Modal from '@/components/modals/modal';
import { useLoginModal } from '@/hooks/use-login-modal';
import { useRegisterModal } from '@/hooks/use-register-modal';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Input from '@/components/inputs/input';
import Button from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineGithub } from 'react-icons/ai';
import { signIn } from 'next-auth/react';

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      setIsLoading(true);

      try {
        await signIn('credentials', data)
        loginModal.onClose();
      } catch (error) {
        if(error instanceof AxiosError) {
          toast.error(error?.response?.data);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [loginModal]
  );

  const onToggle = useCallback(() => {
    if (isLoading) return;

    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal, isLoading]);

  const bodyContent = (
    <div className='flex flex-col gap-y-4'>
      <Input
        errors={errors}
        id='email'
        label='Email'
        register={register}
        disabled={isLoading}
        required
        type='email'
      />

      <Input
        errors={errors}
        id='password'
        label='Password'
        register={register}
        disabled={isLoading}
        required
        type='password'
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-y-4'>
      <div className='relative my-2'>
        <hr className='w-full' />
        <span className='text-lg absolute z-20 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 px-2 bg-black text-white'>
          or
        </span>
      </div>
      <Button
        disabled={isLoading}
        secondary
        label='Continue with google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
        fullWidth
      />
      <Button
        disabled={isLoading}
        secondary
        label='Continue with Github'
        icon={AiOutlineGithub}
        onClick={() => signIn('github')}
        fullWidth
      />
      <div className='text-center text-neutral-200'>
        <p>
          New using tweeter?{' '}
          <span
            className='text-neutral-500 cursor-pointer hover:underline'
            onClick={onToggle}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title='Sign in to your account'
      actionLabel='Sign In'
      disabled={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
