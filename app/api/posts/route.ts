import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/actions/get-current-user';

export async function POST(request: Request) {
  try {
    
    const body = await request.json();
    const currentUser = await getCurrentUser();

    if(!currentUser) return new NextResponse('Unauthenticated', { status: 401 })

    const post = await prismadb.post.create({
      data: {
        content: body.content,
        userId: currentUser.id,
      }
    })

    return NextResponse.json(post, { status: 200 })

  } catch (error) {
    console.log(error, 'ERROR_CREATE_POST')
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500  });
  }
}