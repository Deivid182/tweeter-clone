import NextAuth, { AuthOptions } from 'next-auth';
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProviderr from 'next-auth/providers/credentials';
import prismadb from '@/lib/prismadb';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
    })
    ,CredentialsProviderr({
      name: 'credentials',
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if(!user || !user.hashedPassword) {
          throw new Error('User not found')
        }

        const matchPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

        if(!matchPassword) {
          throw new Error('Invalid credentials')
        }

        return user
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }