import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/actions/get-current-user'

export async function POST(request: Request, { params }: { params: { userId: string  } }) {

  try {  
    const currentUser = await getCurrentUser()

    if(!currentUser) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: params.userId
      }
    })

    if(!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    let updatedFollowingIds = [...(currentUser.followingIds || [])]

    updatedFollowingIds.push(params.userId)
  
    try {
      await prismadb.notification.create({
        data: {
          body: 'Somebody followed you!',
          userId: currentUser.id
        }
      })

      await prismadb.user.update({
        where: {
          id: params.userId
        },
        data: {
          hasNotification: true
        }
      })

    } catch (error) {
      console.log(error)
    }

    const updatedUser = await prismadb.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        followingIds: updatedFollowingIds
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error, 'ERROR_FOLLOW')
    return new NextResponse('Internal Error')
  }
}

export async function DELETE(request: Request, { params }: { params: { userId: string  } }) {
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: params.userId
      }
    })

    if(!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    let updatedFollowingIds = [...(currentUser.followingIds || [])]

    updatedFollowingIds = updatedFollowingIds.filter(id => id !== params.userId)

    const updatedUser = await prismadb.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        followingIds: updatedFollowingIds
      }
    })

    return NextResponse.json(updatedUser)

  } catch (error) {
    console.log(error, 'ERROR_UNFOLLOW')
    return new NextResponse('Internal Error', { status: 500 })
  }
}