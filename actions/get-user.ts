import prismadb from '@/lib/prismadb';

interface IParams {
  userId: string
}

export default async function getUser(params: IParams) {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id: params.userId
      }
    })

    const followersCount = await prismadb.user.count({
      where: {
        followingIds: {
          has: params.userId
        }
      }
    })

    return {
      user, 
      followersCount
    }

  } catch (error) {
    return null
  }
}