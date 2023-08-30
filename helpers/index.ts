const email = 'davidmendoza911119@gmail.com'

export const formatUsernameFromEmail = (email: string) => {
  const usernameFromEmail = email.split('@')[0]
  return usernameFromEmail
}

