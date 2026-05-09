import { useState, useEffect } from 'react'
import type { OAuthProvider } from '../types'
import { withBasePath } from '../utils/basePath'

export const useProviders = () => {
  const [providers, setProviders] = useState<OAuthProvider[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(withBasePath('/api/oauth/providers'))
      .then(res => res.json())
      .then(data => {
        setProviders(data.providers || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch providers:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { providers, loading, error }
}
