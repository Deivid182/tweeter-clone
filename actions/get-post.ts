import prismadb from '@/lib/prismadb'

interface IParams {
  postId: string
}

export default async function getPost(params: IParams) {
  try {
    const { postId } = params

    if (!postId) return null

    const post = await prismadb.post.findUnique({
      where: {
        id: postId
      }, 
      include: {
        user: true,
        comments: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    return post

  } catch (error: any) {
    return null
  }
}