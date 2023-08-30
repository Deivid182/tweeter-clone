import getNotifications from '@/actions/get-notifications'
import { Notification, User } from '@prisma/client'
import { BsTwitter } from 'react-icons/bs'

interface NotificationsFeedProps {
  currentUser: User | null
}

const NotificationsFeed: React.FC<NotificationsFeedProps> = async ({ currentUser }) => {

  const notifications = await getNotifications(currentUser?.id!) ?? []

  if(notifications?.length === 0) {
    return (
      <div className='text-neutral-600 text-center p-6 text-xl'>
        There is no notifications to show
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      {notifications.map((notification: Notification) => (
        <div key={notification.id} className="flex items-center p-6 gap-x-4 border-b-[1px] border-neutral-800">
        <BsTwitter color="white" size={32} />
        <p className="text-white">
          {notification.body}
        </p>
      </div>
      ))}
    </div>
  )
}

export default NotificationsFeed