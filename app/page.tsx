import getCurrentUser from '@/actions/get-current-user'
import Form from '@/components/ui/form'
import Header from '@/components/ui/header'
import PostFeed from '@/components/post-feed'

const Home = async () => {

  const currentUser = await getCurrentUser()
  
  return (
    <>
      <Header label='Home'/>
      <Form 
        placeholder='What is happening?'
        currentUser={currentUser}
      />
      <PostFeed />
    </>
  )
}

export default Home