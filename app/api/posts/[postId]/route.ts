import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { postId: string  } }) {

  try {
   
    const { postId } = params
    if(!postId) {
      return new NextResponse('Bad Request', { status: 400 })
    }

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

    return NextResponse.json(post)

  } catch (error) {
    console.log(error, 'ERROR_GET_POST')
    return new NextResponse('Internal Error', { status: 500 });
  }
}