import getPosts from '@/actions/get-posts'
import PostItem from './post-item'
import getCurrentUser from '@/actions/get-current-user'

interface PostFeedProps {
  userId?: string
}

const PostFeed: React.FC<PostFeedProps> = async ({ userId }) => {

  const posts = await getPosts(userId)
  const currentUser = await getCurrentUser()

  return (
    <>
      {posts?.map(post => (
        <PostItem
          key={post.id}
          data={post}
          currentUser={currentUser}
        />
      ))}
    </>
  )
}

export default PostFeed