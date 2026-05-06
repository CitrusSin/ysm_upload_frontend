import {
  Box,
  Card,
  CardContent,
  Stack,
  Avatar,
  Typography,
  Button,
  Alert,
  Chip,
} from '@mui/material'
import { Person as PersonIcon, Logout as LogoutIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import type { UserInfo } from '../types'
import { PlayerList } from './PlayerList'
import { YsmUploadPanel } from './YsmUploadPanel'

interface UserProfileProps {
  user: UserInfo
  onLogout: () => void
}

export const UserProfile = ({ user, onLogout }: UserProfileProps) => {
  const { t } = useTranslation()

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
            <Box>
              <Typography variant="h5">
                {t('profile.welcome', { nickname: user.nickname })}
              </Typography>
              {user.premium_verification && (
                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap" useFlexGap>
                  <Chip
                    size="small"
                    color={user.premium_verification.verified ? 'success' : 'default'}
                    label={user.premium_verification.verified ? t('profile.premiumVerified') : t('profile.premiumUnverified')}
                  />
                  {user.premium_verification.uuid && (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={t('profile.premiumUuid', { uuid: user.premium_verification.uuid })}
                    />
                  )}
                </Stack>
              )}
            </Box>
          </Stack>

          {user.profiles && user.profiles.length > 0 ? (
            <>
              <PlayerList players={user.profiles} />
              <YsmUploadPanel profiles={user.profiles} />
            </>
          ) : (
            <Alert severity="info" sx={{ mt: 2 }}>
              {t('profile.noPlayers')}
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
              {t('profile.logout')}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
