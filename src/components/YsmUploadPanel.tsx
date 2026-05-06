import { useMemo, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { CloudUpload as CloudUploadIcon, CheckCircleOutline as CheckCircleOutlineIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import type { YggdrasilProfile, YsmUploadResult } from '../types'

interface YsmUploadPanelProps {
  profiles: YggdrasilProfile[]
}

export const YsmUploadPanel = ({ profiles }: YsmUploadPanelProps) => {
  const { t } = useTranslation()
  const initialProfileUuid = profiles[0]?.id ?? ''
  const [profileUuid, setProfileUuid] = useState(initialProfileUuid)
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<YsmUploadResult | null>(null)

  const selectedProfile = useMemo(
    () => profiles.find((profile) => profile.id === profileUuid) ?? null,
    [profileUuid, profiles],
  )

  const canSubmit = useMemo(
    () => Boolean(selectedProfile && file && !submitting),
    [file, selectedProfile, submitting],
  )

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null
    setFile(nextFile)
    setResult(null)
    setError(null)
  }

  const handleSubmit = async () => {
    if (!canSubmit || !file || !selectedProfile) {
      return
    }

    const formData = new FormData()
    formData.append('profile_uuid', selectedProfile.id)
    formData.append('file', file)

    setSubmitting(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/ysm/upload', {
        method: 'POST',
        body: formData,
      })

      const text = await response.text()
      let data: unknown = null

      if (text) {
        try {
          data = JSON.parse(text)
        } catch {
          data = text
        }
      }

      if (!response.ok) {
        const errorMessage =
          typeof data === 'string'
            ? data
            : typeof data === 'object' && data !== null && 'message' in data && typeof data.message === 'string'
              ? data.message
              : text || t('upload.uploadFailed')
        throw new Error(errorMessage)
      }

      setResult(data as YsmUploadResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('upload.uploadFailed'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card variant="outlined" sx={{ mt: 3 }}>
      <CardContent>
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="h6">{t('upload.title')}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {t('upload.description')}
            </Typography>
          </Box>

          <TextField
            select
            label={t('upload.profileLabel')}
            value={profileUuid}
            onChange={(event) => {
              setProfileUuid(event.target.value)
              setResult(null)
            }}
            fullWidth
          >
            {profiles.map((profile) => (
              <MenuItem key={profile.id} value={profile.id}>
                {profile.name} ({profile.id})
              </MenuItem>
            ))}
          </TextField>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
            <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
              {t('upload.selectFile')}
              <input hidden type="file" accept=".ysm,.zip,.7z" onChange={handleFileChange} />
            </Button>
            <Typography variant="body2" color="text.secondary">
              {file ? t('upload.fileSelected', { name: file.name }) : t('upload.fileHint')}
            </Typography>
          </Stack>

          <Box>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={!canSubmit}
              startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <CheckCircleOutlineIcon />}
            >
              {submitting ? t('upload.submitting') : t('upload.submit')}
            </Button>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          {result && (
            <Alert severity="success">
              <Stack spacing={0.5}>
                <Typography variant="body2">{t('upload.success', { profileName: result.profile_name, modelId: result.model_id })}</Typography>
                <Typography variant="body2" color="text.secondary">{t('upload.storedFile', { fileName: result.stored_file_name })}</Typography>
                <Typography variant="body2" color="text.secondary">{t('upload.uploadDir', { dir: result.upload_dir })}</Typography>
                <Typography variant="body2" color="text.secondary">{t('upload.reloadCommand', { command: result.reload_command })}</Typography>
                <Typography variant="body2" color="text.secondary">{t('upload.authorizeCommand', { command: result.authorize_command })}</Typography>
              </Stack>
            </Alert>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}