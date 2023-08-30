import prismadb from '@/lib/prismadb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
  const { username, password, email, name } = body

  if (!username || !password || !email || !name) {
    return new NextResponse('Invalid data', { status: 400 })
  }


  const existingUser = await prismadb.user.findFirst({
    where: {
      email
    }
  })

  if(existingUser) {
    return new NextResponse('User already exists', { status: 400 })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = await prismadb.user.create({
    data: {
      name,
      username,
      email,
      hashedPassword
    }
  })

  return NextResponse.json(newUser)
  } catch (error) {
    console.log('ERROR_CREATE_USER', error)
    return new NextResponse('Error creating user', { status: 500 })
  }
}