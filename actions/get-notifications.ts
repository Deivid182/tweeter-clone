import prismadb from '@/lib/prismadb';

export default async function getNotifications( userId: string ) {
  try {
    
    if(!userId) return

    const notifications = await prismadb.notification.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    await prismadb.user.update({
      where: {
        id: userId
      },
      data: {
        hasNotification: false
      }
    })

    return notifications

  } catch (error: any) {
    return null
  }
}