import getCurrentUser from '@/actions/get-current-user'
import getPost from '@/actions/get-post'
import PostItem from '@/components/post-item'
import EmptyState from '@/components/ui/empty-state'
import Form from '@/components/ui/form'
import Header from '@/components/ui/header'
import axios from 'axios'
import CommentFeed from './components/comment-feed'

const PostPage = async ({ params }: { params: { postId: string } }) => {

  const post = await getPost(params)
  const currentUser = await getCurrentUser()

  if(!post) {
    return (
      <EmptyState showReset/>
    )
  }

  return (
    <>
      <Header label='Tweet' showBack/>
      <PostItem data={post}/>
      <Form isComment placeholder="What's your reply?" currentUser={currentUser} postId={post.id}/>
      <CommentFeed data={post.comments}/>
    </>
  )
}

export default PostPage