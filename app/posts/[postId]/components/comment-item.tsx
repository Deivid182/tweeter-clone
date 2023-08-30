"use client"
import Avatar from '@/components/ui/avatar'
import { Comment, User } from '@prisma/client'
import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { formatUsernameFromEmail } from '@/helpers'

interface CommentItemProps {
  comment: Comment & {
    user: User
  }
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {

  const router = useRouter()
  const goToUser = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    router.push(`/users/${comment.user.id}`)

  }, [router, comment.user.id])

  const createdAt = useMemo(() => {
    if(!comment?.createdAt) return null
    return formatDistanceToNowStrict(new Date(comment.createdAt))
  }, [comment.createdAt])

  return (
    <div className='border-b-[1px] border-neutral-800 cursor-pointer p-4 hover:bg-neutral-900 transition-colors'>
      <div className='flex gap-x-2'>
        <Avatar src={comment.user.image!} />
        <div className='space-y-2'>
          <div className='flex items-center gap-x-2'>
            <p onClick={goToUser} className='text-white font-semibold cursor-pointer hover:underline'>{comment.user.name}</p>
            <span onClick={goToUser} className='text-neutral-500 cursor-pointer hidden md:block hover:underline'>@{comment.user.username || formatUsernameFromEmail(comment.user.email!)}</span>
            <span className='text-neutral-500 text-sm'>{createdAt}</span>
          </div>
          <div className='text-white'>
            {comment.body}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem