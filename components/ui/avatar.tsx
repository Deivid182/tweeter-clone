"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface AvatarProps {
  src?: string
  userId?: string
  isLarge?: boolean
  hasBorder?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ src, userId, isLarge, hasBorder }) => {

  const router = useRouter()

  const onClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    if(!userId) return

    router.push(`/users/${userId}`)
  }, [router, userId])

  return (
    <div
      onClick={onClick}
      className={`
        ${hasBorder ? 'border-2 border-black' : ''}
        ${isLarge ? 'h-32 w-32' : 'h-10 w-10'}
        rounded-full relative hover:opacity-90 cursor-pointer transition-colors
      `}
    >
      <Image 
        src={src || '/images/placeholder.jpg'}
        alt='avatar'
        fill
        className='object-cover object-center rounded-full'
      />      
    </div>
  )
}

export default Avatar