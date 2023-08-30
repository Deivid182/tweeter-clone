import prismadb from '@/lib/prismadb';
import getCurrentUser from './get-current-user';

export default async function getUsers() {
  try {
    
    const currentUser = await getCurrentUser()

    const users = await prismadb.user.findMany({
      where: {
        id: {
          not: currentUser?.id
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return users;
  }

   catch (error) {
    console.log(error)
    return null
  }
}