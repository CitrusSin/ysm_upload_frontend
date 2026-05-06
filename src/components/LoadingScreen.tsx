import { Container, Box, CircularProgress, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const LoadingScreen = () => {
  const { t } = useTranslation()

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {t('loading.message')}
        </Typography>
      </Box>
    </Container>
  )
}
