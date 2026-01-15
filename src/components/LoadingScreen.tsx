import { Container, Box, CircularProgress, Typography } from '@mui/material'

export const LoadingScreen = () => {
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
          加载中...
        </Typography>
      </Box>
    </Container>
  )
}
