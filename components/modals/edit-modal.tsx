'use client';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/inputs/input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from '@/components/modals/modal';
import { useEditModal } from '@/hooks/use-edit-modal';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import Button from '@/components/ui/button';
import { User } from '@prisma/client';

interface EditModalProps {
  currentUser: User | null;
}

const EditModal: React.FC<EditModalProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const editModal = useEditModal();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      username: currentUser?.username,
      bio: currentUser?.bio,
      coverImage: currentUser?.coverImage,
      image: currentUser?.image,
    },
  });

  const image = watch('image');
  const coverImage = watch('coverImage');

  const handleUploadImage = (result: any) => {
    setValue('image', result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const handleUploadCoverImage = (result: any) => {
    setValue('coverImage', result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await axios.patch(`/api/users/${currentUser?.id}`, data);
      toast.success('Profile updated');
      editModal.onClose();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }

    /* axios
      .patch('/api/update-profile', data)
      .then(() => {
        mutateFetchedUser();
        toast.success('Profile updated');
        editModal.onClose()
      })
      .catch((error) => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      }); */
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col sm:flex-row gap-y-4 items-center justify-between'>
        <div className='flex flex-col items-center gap-y-3'>
          <Image
            width='48'
            height='48'
            className='rounded-md'
            src={image || currentUser?.image || '/images/placeholder.jpg'}
            alt='Avatar'
          />
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUploadImage}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
          >
            <Button label='Upload Image' secondary disabled={isLoading} />
          </CldUploadButton>
        </div>
        <div className='flex flex-col items-center gap-y-3'>
          <Image
            width='100'
            height='48'
            className='rounded-md'
            src={
              coverImage ||
              currentUser?.coverImage ||
              '/images/placeholder-cover.jpg'
            }
            alt='Avatar'
          />
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUploadCoverImage}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
          >
            <Button label='Upload Image' secondary disabled={isLoading} />
          </CldUploadButton>
        </div>
      </div>
      <Input
        label='Name'
        register={register}
        errors={errors}
        id='name'
        disabled={isLoading}
        required
        type='text'
      />
      <Input
        label='Username'
        register={register}
        errors={errors}
        id='username'
        disabled={isLoading}
        required
        type='text'
      />
      <Input
        label='Bio'
        register={register}
        errors={errors}
        id='bio'
        disabled={isLoading}
        required
        type='text'
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title='Edit Profile'
      actionLabel='Save'
      body={bodyContent}
    />
  );
};

export default EditModal;
