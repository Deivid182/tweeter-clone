'use client';

import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Modal from '@/components/modals/modal';
import Input from '@/components/inputs/input';
import Button from '@/components/ui/button';

import { useLoginModal } from '@/hooks/use-login-modal';
import { useRegisterModal } from '@/hooks/use-register-modal';
import { useCallback, useState } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { AiOutlineGithub } from 'react-icons/ai';

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      setIsLoading(true);

      try {
        const response = await axios.post('/api/register', data);

        toast.success('Account created successfully');
        registerModal.onClose();
        loginModal.onOpen()
      } catch (error) {
        if(error instanceof AxiosError) {
          toast.error(error?.response?.data);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [registerModal, loginModal]
  );

  const onToggle = useCallback(() => {
    if (isLoading) return;

    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal, isLoading]);

  const bodyContent = (
    <div className='flex flex-col gap-y-4'>
      <Input
        errors={errors}
        id='name'
        label='Name'
        register={register}
        disabled={isLoading}
        required
        type='text'
      />

      <Input
        errors={errors}
        id='username'
        label='Username'
        register={register}
        disabled={isLoading}
        required
        type='text'
      />

      <Input
        errors={errors}
        id='email'
        label='Email'
        register={register}
        disabled={isLoading}
        required
        type='text'
      />

      <Input
        errors={errors}
        id='password'
        label='Password'
        register={register}
        disabled={isLoading}
        required
        type='text'
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
          Already have an account?{' '}
          <span
            className='text-neutral-500 cursor-pointer hover:underline'
            onClick={onToggle}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title='Sign up'
      actionLabel='Create Account'
      disabled={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
