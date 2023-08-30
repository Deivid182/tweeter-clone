
import prisma from "@/lib/prismadb";
import getSession from './get-session';

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      }
    });

    if (!currentUser) {
      return null;
    }

    return currentUser

  } catch (error: any) {
    return null;
  }
}