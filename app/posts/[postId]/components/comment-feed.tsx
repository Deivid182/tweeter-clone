import { Comment, User } from '@prisma/client'
import CommentItem from './comment-item'

interface CommentFeedProps {
  data: (Comment & { user: User })[]
}

const CommentFeed: React.FC<CommentFeedProps> = ({ data = [] }) => {

  console.log(data)

  return (
    <>
      {data.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
        />
      ))}
    </>
  )
}

export default CommentFeed