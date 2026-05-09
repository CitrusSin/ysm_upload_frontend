declare global {
  interface Window {
    __APP_BASE_PATH__?: string
  }
}

const normalizeBasePath = (value: string | undefined): string => {
  if (!value) {
    return '/'
  }

  const trimmed = value.trim()
  if (!trimmed || trimmed === '/') {
    return '/'
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`
}

export const appBasePath = normalizeBasePath(window.__APP_BASE_PATH__)

export const withBasePath = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  if (appBasePath === '/') {
    return normalizedPath
  }

  return `${appBasePath}${normalizedPath}`
}