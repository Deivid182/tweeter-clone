import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    
    if(!params.userId) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    const notifications = await prismadb.notification.findMany({
      where: {
        userId: params.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    await prismadb.user.update({
      where: {
        id: params.userId
      },
      data: {
        hasNotification: false
      }
    })

    return NextResponse.json(notifications)

  } catch (error) {
    console.log(error, 'ERROR_GET_NOTIFICATION')
    return new NextResponse('Something went wrong' , { status: 500  });
  }
}