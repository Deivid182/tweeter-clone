"use client"

import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  secondary?: boolean
  fullWidth?: boolean
  large?: boolean
  onClick?: () => void
  disabled?: boolean
  ghost?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  icon?: IconType
}

const Button: React.FC<ButtonProps> = ({
  label, secondary, type = 'button', fullWidth, large, onClick, disabled, ghost, icon: Icon
}) => {
  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
      flex flex-row items-center justify-center lg:gap-x-10 gap-x-
      disabled:opacity-70 opacity:cursor-not-allowed rounded-full font-semibold hover:opacity-80 border-[1px]
      ${fullWidth ? 'w-full' : 'w-fit'}
      ${secondary ? 'bg-white' : 'bg-sky-500'}
      ${secondary ? 'text-black' : 'text-white'}
      ${secondary ? 'border-black' : 'border-sky-500'}
      ${large ? 'text-xl' : 'text-base'}
      ${large ? 'px-5' : 'px-4'}
      ${large ? 'py-3' : 'py-2'}
      ${ghost ? 'bg-transparent' : ''}
      ${ghost ? 'border-gray-800' : ''}
      ${ghost ? 'text-white' : ''}
    `}>
      {Icon && <Icon size={24} />}
      {label}
    </button>
  )
}

export default Button