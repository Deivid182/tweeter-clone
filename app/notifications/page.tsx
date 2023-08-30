import getCurrentUser from '@/actions/get-current-user'
import NotificationsFeed from '@/components/notifications-feed'
import Header from '@/components/ui/header'
import { redirect } from 'next/navigation'

const NotificationsPage = async () => {

  const currentUser = await getCurrentUser()

  if(!currentUser) {
    redirect('/')
  }
  return (
    <>
      <Header label='Notifications' showBack/>
      <NotificationsFeed currentUser={currentUser}/>
    </>
  )
}

export default NotificationsPage