import getCurrentUser from '@/actions/get-current-user'
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request, { params }: { params: { userId: string  } }) {
  const currentUser = await getCurrentUser()

  if(!currentUser) {
    return new Response('Unauthenticated', { status: 401 })
  }

  if(currentUser.id !== params.userId) {
    return new Response('Unauthorized', { status: 403 })
  }

  try {
    const body = await request.json()

    const { name, username, bio, image, coverImage } = body

    if(!name || !username) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    const updatedUser = await prismadb.user.update({
      where: {
        id: params.userId
      },
      data: {
        name, username, bio, image, coverImage
      }
    })

    return NextResponse.json(updatedUser)

  } catch (error) {
    console.log(error, 'ERROR_PATCH_USER')
    return new NextResponse('Internal Server Error', { status: 500 }) 
  }

}