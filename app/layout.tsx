import Sidebar from '@/components/sidebar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Followbar from '@/components/followbar';
import ToasterProvider from '@/providers/toaster-provider';
import RegisterModal from '@/components/modals/register-modal';
import LoginModal from '@/components/modals/login-modal';
import getCurrentUser from '@/actions/get-current-user';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tweeter',
  description: 'Tweeter - Home',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const currentUser = await getCurrentUser()

  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <div className='h-screen bg-black'>
          <div className='container max-w-6xl mx-auto h-full xl:px-30'>
            <div className='grid grid-cols-4 h-full'>
              <Sidebar 
                currentUser={currentUser}
              />
              <div className='h-full col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800'>
                {children}
              </div>
              <Followbar />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
