import getCurrentUser from '@/actions/get-current-user';
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { postId: string } }) {
  try {
    
    const currentUser = await getCurrentUser()

    if(!currentUser) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const post = await prismadb.post.findUnique({
      where: {
        id: params.postId
      }
    })

    if(!post) {
      return new NextResponse('Post not found', { status: 404 })
    }

    let updatedLikeIds = [...(post.likeIds || [])]

    updatedLikeIds.push(currentUser.id)

    try {
      const post = await prismadb.post.findUnique({
        where: {
          id: params.postId
        }
      })

      if(post?.userId) {
        await prismadb.notification.create({
          data: {
            body: 'Somebody liked your post!',
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

    const updatedPost = await prismadb.post.update({
      where: {
        id: params.postId
      },
      data: {
        likeIds: updatedLikeIds
      }
    })

    return NextResponse.json(updatedPost)

  } catch (error) {
    console.log(error, 'ERROR_LIKE')
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { postId: string } }) {
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const post = await prismadb.post.findUnique({
      where: {
        id: params.postId
      }
    })

    if(!post) {
      return new NextResponse('Post not found', { status: 404 })
    }

    let updatedLikeIds = [...(post.likeIds || [])]

    updatedLikeIds = updatedLikeIds.filter(id => id !== currentUser.id)

    const updatedPost = await prismadb.post.update({
      where: {
        id: params.postId
      },
      data: {
        likeIds: updatedLikeIds
      }
    })

    return NextResponse.json(updatedPost)

  } catch (error) {
    console.log(error, 'ERROR_UNLIKE')
    return new NextResponse('Internal Error', { status: 500 });
  }
}