import { authentication } from '@commercelayer/js-auth'
import { useEffect, useState } from 'react'
import { customer, salesChannel } from '../assets/config'

interface UseGetTokenOptions {
  userMode?: boolean
}

export default function useGetToken<T extends UseGetTokenOptions>(
  options?: T
): {
  accessToken: string
  endpoint: string
} {
  const [token, setToken] = useState('')
  const clientId = salesChannel.clientId
  const slug = salesChannel.slug
  const scope = salesChannel.scope
  const domain = salesChannel.domain
  const user = options?.userMode
    ? {
        username: customer.username,
        password: customer.password
      }
    : undefined
  useEffect(() => {
    const getToken = async (): Promise<void> => {
      const token =
        user == null
          ? await authentication('client_credentials', {
              clientId,
              slug,
              scope,
              domain
            })
          : await authentication('password', {
              clientId,
              slug,
              scope,
              domain,
              ...user
            })
      if (token) setToken(token.accessToken)
    }
    void getToken()
  }, [])
  return {
    accessToken: token,
    endpoint: `https://${slug}.${domain}`
  }
}
