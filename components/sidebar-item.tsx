import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { IconType } from 'react-icons';
import { BsDot } from 'react-icons/bs';

interface SidebarItemProps {
  href?: string;
  icon: IconType;
  onClick?: () => void;
  label: string;
  alert?: boolean | null;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon: Icon,
  onClick,
  label,
  alert
}) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (href) {
      router.push(href);
    }
  }, [href, onClick, router]);

  return (
    <div
      onClick={handleClick}
      role='button'
      tabIndex={0}
      onKeyDown={handleClick}
      aria-label={label}
      data-testid='sidebar-item'
      data-href={href}
      data-label={label}
      className='flex flex-row items-center relative'
    >
      <div
        className='
        relative
        h-16 
        w-16 
        rounded-full 
        flex 
        items-center 
        justify-center p-4 
        hover:bg-neutral-300 
        hover:bg-opacity-60 
        lg:hidden 
        cursor-pointer'
      >
        <Icon size={28} className='text-white' />
        {alert ? <BsDot size={70} className='text-sky-500 absolute -top-4 left-0' /> : null}
      </div>
      <div
        className='hidden 
        lg:flex 
        gap-4 
        p-4 
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        items-center
        cursor-pointer'
      >
        <Icon size={24} color='white' />
        <p className='text-white hidden lg:block text-xl'>{label}</p>
        {alert ? <BsDot size={70} className='text-sky-500 absolute -top-4 left-0' /> : null}
      </div>
    </div>
  );
};

export default SidebarItem;
