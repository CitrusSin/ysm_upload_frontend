import {
  Login as LoginIcon,
  Person as PersonIcon,
  Computer as MicrosoftIcon,
} from '@mui/icons-material'

export const getProviderIcon = (providerType: string) => {
  if (providerType === 'microsoft') {
    return MicrosoftIcon
  }

  if (providerType === 'littleskin') {
    return PersonIcon
  }

  if (providerType.startsWith('blessingskin=') || providerType.startsWith('bs=')) {
    return PersonIcon
  }

  return LoginIcon
}

export const getProviderColor = (providerType: string): "primary" | "secondary" | "success" | "info" => {
  if (providerType === 'microsoft') {
    return 'info'
  }

  if (providerType === 'littleskin') {
    return 'success'
  }

  return 'primary'
}
