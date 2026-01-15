import {
  Box,
  Card,
  CardContent,
  Stack,
  Avatar,
  Typography,
  Button,
  Alert,
} from '@mui/material'
import { Person as PersonIcon, Logout as LogoutIcon } from '@mui/icons-material'
import type { UserInfo } from '../types'
import { PlayerList } from './PlayerList'

interface UserProfileProps {
  user: UserInfo
  onLogout: () => void
}

export const UserProfile = ({ user, onLogout }: UserProfileProps) => {
  return (
    <Box width="100%">
      <Card
        sx={{
          mb: 3,
          background: 'linear-gradient(135deg, rgba(184, 198, 229, 0.1) 0%, rgba(160, 231, 255, 0.1) 100%)',
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <PersonIcon />
            </Avatar>
            <Typography variant="h5">
              欢迎, {user.nickname}!
            </Typography>
          </Stack>

          {user.profiles && user.profiles.length > 0 ? (
            <PlayerList players={user.profiles} />
          ) : (
            <Alert severity="info" sx={{ mt: 2 }}>
              你还没有添加 Minecraft 角色
            </Alert>
          )}

          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={onLogout}
              size="large"
            >
              退出登录
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
