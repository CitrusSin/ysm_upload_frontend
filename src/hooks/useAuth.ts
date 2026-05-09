import { useState, useEffect } from 'react'
import type { UserInfo } from '../types'
import { withBasePath } from '../utils/basePath'

export const useAuth = () => {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(withBasePath('/api/user'))
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return null
      })
      .then(data => {
        if (data) {
          setUser(data)
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const handleLogin = (provider: string) => {
    window.location.href = withBasePath(`/api/oauth/${provider}/login`)
  }

  const handleLogout = () => {
    window.location.href = withBasePath('/api/logout')
  }

  return { user, loading, handleLogin, handleLogout }
}
