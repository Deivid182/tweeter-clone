'use client';
import Button from '@/components/ui/button';
import { AiOutlineClose } from 'react-icons/ai';
import { useCallback } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return;
    onClose();
  }, [disabled, onClose]);

  const onSubmitHandler = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) return null;

  return (
    <div
      className='
      fixed 
      inset-0 
      z-50 
      flex 
      justify-center 
      overflow-x-hidden 
      overflow-y-auto 
      focus:outline-none 
      bg-neutral-800 
      bg-opacity-70'
    >
      <div className='relative w-5/6 lg:w-3/6 my-6 mx-auto lg:max-w-xl overflow-hidden rounded-lg h-full lg:h-auto'>
        <div className='h-full overflow-y-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none'>
          {/* header */}
          <div className='flex items-center justify-between p-6 rounded-t'>
            <h3 className='text-3xl font-semibold text-white'>{title}</h3>
            <button 
              onClick={handleClose}
              className='p-2 ml-auto border-0 text-white hover:bg-opacity-70 transition-colors'
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
          {/* body */}
          <div className='relative px-6 flex-auto'>
            {body}
          </div>
          {/* footer */}
          <div className='flex flex-col gap-y-4 p-4'>
            <Button 
              disabled={disabled}
              onClick={onSubmitHandler}
              label={actionLabel}
              fullWidth
              secondary
              large
            />
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
