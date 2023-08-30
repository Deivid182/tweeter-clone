import prismadb from '@/lib/prismadb';


export default async function getPosts(userId?: string) {
  try {

    let posts

    if(userId) {
      posts = await prismadb.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        }
      })
    } else {
      posts = await prismadb.post.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: true,
          comments: true,
        }
      })
    }

    return posts

  } catch (error) {
    return null
  }
}