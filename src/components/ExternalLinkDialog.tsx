import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  Link as MuiLink
} from '@mui/material';
import {
  OpenInNew as ExternalIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { detectExternalSource, getDomainFromUrl } from '../utils/externalSources';

interface ExternalLinkDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  url: string;
  datasetTitle: string;
}

function ExternalLinkDialog({ open, onClose, onConfirm, url, datasetTitle }: ExternalLinkDialogProps) {
  const source = detectExternalSource(url);
  const domain = getDomainFromUrl(url);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ExternalIcon color="primary" />
        External Download
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            You're about to download <strong>{datasetTitle}</strong> from an external source.
          </Typography>
        </Box>

        <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 2 }}>
          <Typography variant="body2">
            {source ? (
              <>
                This dataset is hosted on <strong>{source.name}</strong>
              </>
            ) : (
              <>
                This dataset is hosted externally at <strong>{domain}</strong>
              </>
            )}
          </Typography>
        </Alert>

        <Alert severity="warning" icon={<WarningIcon />}>
          <Typography variant="body2" gutterBottom>
            <strong>Please note:</strong>
          </Typography>
          <Typography variant="body2" component="div">
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>You will be redirected to an external website</li>
              <li>Download speed depends on the external host</li>
              <li>We don't control the availability of external files</li>
              <li>Please review the source's terms of service</li>
            </ul>
          </Typography>
        </Alert>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" gutterBottom display="block">
            External URL:
          </Typography>
          <MuiLink
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              wordBreak: 'break-all',
              fontSize: '0.875rem'
            }}
          >
            {url}
          </MuiLink>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="primary"
          startIcon={<ExternalIcon />}
        >
          Continue to External Site
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExternalLinkDialog;
