import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Chip,
} from '@mui/material'
import { Badge as BadgeIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import type { YggdrasilProfile } from '../types'

interface PlayerListProps {
  players: YggdrasilProfile[]
}

export const PlayerList = ({ players }: PlayerListProps) => {
  const { t } = useTranslation()

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <BadgeIcon /> {t('players.title')}
      </Typography>
      <Stack spacing={2} mt={2}>
        {players.map((player, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateX(8px)',
                boxShadow: 3,
              },
            }}
          >
            <CardContent>
              <Stack spacing={1.5}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Chip
                    label={t('players.name')}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Typography variant="h6">{player.name}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Chip
                    label={t('players.uuid')}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'monospace',
                      backgroundColor: 'rgba(100, 108, 255, 0.1)',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    {player.id}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}
