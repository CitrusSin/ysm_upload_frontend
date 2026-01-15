export interface YggdrasilProfile {
  id: string
  name: string
}

export interface UserInfo {
  nickname: string
  email: string
  profiles: YggdrasilProfile[]
  provider?: string
}

export interface OAuthProvider {
  name: string
  display_name: string
  provider_type: string
  enabled: boolean
}
