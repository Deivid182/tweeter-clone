import { NextResponse } from 'next/server'
import getCurrentUser from '@/actions/get-current-user'
import prismadb from '@/lib/prismadb'

export async function POST(request: Request, { params }: { params: { postId: string } }) {
  try {
    const body = await request.json()
    const { content } = body
    const currentUser = await getCurrentUser()
    if(!currentUser) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if(!params.postId) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    const comment = await prismadb.comment.create({
      data: {
        body: content,
        userId: currentUser.id,
        postId: params.postId
      }
    })

    try {
      const post = await prismadb.post.findUnique({
        where: {
          id: params.postId
        }
      })

      if(post?.userId) {
        await prismadb.notification.create({
          data: {
            body: 'Somebody replied to your post!',
            userId: post.userId
          }
        })

        await prismadb.user.update({
          where: {
            id: post.userId
          },
          data: {
            hasNotification: true
          }
        })

      }

    } catch (error) {
      console.log(error)
    }
    
    return NextResponse.json(comment)

  } catch (error) {
    console.log(error, 'ERROR_CREATE_COMMENT')
    return new NextResponse('Something went wrong', { status: 500 })
  }
}