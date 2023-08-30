import getUser from '@/actions/get-user';
import EmptyState from '@/components/ui/empty-state';
import Header from '@/components/ui/header';
import UserHero from './components/user-hero';
import UserBio from './components/user-bio';
import getCurrentUser from '@/actions/get-current-user';
import PostFeed from '@/components/post-feed';

interface IParams {
  userId: string;
}

const UserPage = async ({ params }: { params: IParams }) => {
  const user = await getUser(params);
  const currentUser = await getCurrentUser()

  if(!user) {
    return (
      <EmptyState showReset/>
    )
  }

  return (
    <>
      <Header 
        label={`${user?.user?.name}'s profile`}
        showBack
      />
      <UserHero
        user={user.user}
      />
      <UserBio 
        user={user.user}
        currentUser={currentUser}
        followersCount={user.followersCount}
      />
      <PostFeed userId={user.user?.id}/>
    </>
  )
};

export default UserPage;
