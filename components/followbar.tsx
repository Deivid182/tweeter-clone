import getUsers from '@/actions/get-users'
import Avatar from '@/components/ui/avatar';
import { User } from '@prisma/client';
import { formatUsernameFromEmail } from '@/helpers';

const Followbar = async () => {

  const users = await getUsers();
  console.log(users)

  if(!users) return null

  return (
    <div className='px-4 py-4 hidden lg:block'>
      <div className='rounded-xl p-4 bg-neutral-700'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-white text-2xl font-bold'>Who to follow</h2>
          <div className='flex flex-col gap-y-4 mt-2'>
            {users.map((user: User) => (
              <div 
                key={user.id}
                className='flex flex-row gap-4'>
                <Avatar
                  userId={user.id}
                  src={user.image || ''}
                />
                <div className='flex flex-col'>
                  <p className='text-white text-sm font-semibold'>{user.name}</p>
                  <p className='text-neutral-400 text-xs font-medium'>@{user.username || formatUsernameFromEmail(user.email || '')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Followbar