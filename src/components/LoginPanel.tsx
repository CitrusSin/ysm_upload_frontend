import {
  Card,
  CardContent,
  Stack,
  Avatar,
  Typography,
  Button,
  Alert,
  Box,
  Divider,
} from '@mui/material'
import { Person as PersonIcon } from '@mui/icons-material'
import type { OAuthProvider } from '../types'
import { getProviderIcon, getProviderColor } from '../utils/providerHelpers'

interface LoginPanelProps {
  providers: OAuthProvider[]
  onLogin: (provider: string) => void
}

export const LoginPanel = ({ providers, onLogin }: LoginPanelProps) => {
  return (
    <Card sx={{ maxWidth: 600, width: '100%' }}>
      <CardContent>
        <Stack spacing={3} alignItems="center" py={3}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
            <PersonIcon sx={{ fontSize: 50 }} />
          </Avatar>
          <Typography variant="h6" color="text.secondary" align="center">
            请选择一个方式登录以查看你的 Minecraft 角色信息
          </Typography>

          {providers.length > 0 ? (
            <Stack spacing={2} width="100%" px={2}>
              {providers.map((provider) => {
                const Icon = getProviderIcon(provider.provider_type)
                return (
                  <Button
                    key={provider.name}
                    variant="contained"
                    size="large"
                    startIcon={<Icon />}
                    onClick={() => onLogin(provider.name)}
                    color={getProviderColor(provider.provider_type)}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                    }}
                  >
                    使用 {provider.display_name} 登录
                  </Button>
                )
              })}
            </Stack>
          ) : (
            <Alert severity="warning" sx={{ mt: 2 }}>
              暂无可用的登录方式，请联系管理员配置
            </Alert>
          )}

          {providers.length > 1 && (
            <Box width="100%" px={2}>
              <Divider sx={{ my: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  选择任意一种登录方式
                </Typography>
              </Divider>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
