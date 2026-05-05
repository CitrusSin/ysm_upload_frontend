export interface YggdrasilProfile {
  id: string
  name: string
}

export interface UserInfo {
  nickname: string
  email?: string
  premium_verification?: {
    verified: boolean
    uuid?: string
  }
  profiles: YggdrasilProfile[]
  provider?: string
}

export interface OAuthProvider {
  name: string
  display_name: string
  provider_type: string
  login_url?: string
}

export interface YsmUploadResult {
  success: boolean
  profile_name: string
  model_id: string
  stored_file_name: string
  upload_dir: string
  reload_command: string
  authorize_command: string
  reload_result: string
  authorize_result: string
}
