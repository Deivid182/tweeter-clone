import { User } from '@prisma/client';
import Avatar from '@/components/ui/avatar';
import Image from 'next/image';
interface UserHeroProps {
  user: User | null;
}

const UserHero: React.FC<UserHeroProps> = ({ user }) => {
  return (
      <div className='bg-neutral-700 h-44 relative'>
        {user?.coverImage && (
          <Image
            fill
            src={user.coverImage}
            alt={user.username!}
            className='object-cover object-center'
          />
        )}
        <div className='absolute -bottom-16 left-4'>
          <Avatar isLarge hasBorder userId={user?.id!} src={user?.image!} />
        </div>
      </div>
  );
};

export default UserHero;
