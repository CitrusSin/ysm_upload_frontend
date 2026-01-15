import {
  Login as LoginIcon,
  Person as PersonIcon,
  Computer as MicrosoftIcon,
} from '@mui/icons-material'

export const getProviderIcon = (providerType: string) => {
  switch (providerType) {
    case 'microsoft':
      return MicrosoftIcon
    case 'blessingskin':
      return PersonIcon
    default:
      return LoginIcon
  }
}

export const getProviderColor = (providerType: string): "primary" | "secondary" | "success" | "info" => {
  switch (providerType) {
    case 'microsoft':
      return 'info'
    case 'blessingskin':
      return 'primary'
    default:
      return 'primary'
  }
}
