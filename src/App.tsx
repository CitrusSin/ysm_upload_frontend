import { useEffect } from 'react'
import { Container, Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAuth } from './hooks/useAuth'
import { useProviders } from './hooks/useProviders'
import { LoadingScreen } from './components/LoadingScreen'
import { LoginPanel } from './components/LoginPanel'
import { UserProfile } from './components/UserProfile'

function App() {
  const { t, i18n } = useTranslation()
  const { user, loading: authLoading, handleLogin, handleLogout } = useAuth()
  const { providers } = useProviders()

  useEffect(() => {
    document.title = t('app.documentTitle')
  }, [i18n.resolvedLanguage, t])

  if (authLoading) {
    return <LoadingScreen />
  }

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        py={4}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            backgroundColor: '#000000',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4,
          }}
        >
          {t('app.title')}
        </Typography>

        {user ? (
          <UserProfile user={user} onLogout={handleLogout} />
        ) : (
          <LoginPanel providers={providers} onLogin={handleLogin} />
        )}
      </Box>
    </Container>
  )
}

export default App
