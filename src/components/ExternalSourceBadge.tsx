import { Chip, Tooltip } from '@mui/material';
import {
  Language as ExternalIcon,
  GitHub as GitHubIcon,
  Cloud as CloudIcon
} from '@mui/icons-material';
import { detectExternalSource, isExternalLink } from '../utils/externalSources';

interface ExternalSourceBadgeProps {
  url: string;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled';
}

function ExternalSourceBadge({ url, size = 'small', variant = 'filled' }: ExternalSourceBadgeProps) {
  if (!isExternalLink(url)) {
    return null; // Don't show badge for internal files
  }

  const source = detectExternalSource(url);

  if (!source) {
    return null;
  }

  // Select icon based on source
  const getIcon = () => {
    if (source.domain.includes('github')) {
      return <GitHubIcon fontSize="small" />;
    }
    if (source.domain.includes('cloud') || source.domain.includes('storage') ||
        source.domain.includes('s3') || source.domain.includes('drive')) {
      return <CloudIcon fontSize="small" />;
    }
    return <ExternalIcon fontSize="small" />;
  };

  return (
    <Tooltip title={`Hosted on ${source.name}`} arrow>
      <Chip
        icon={getIcon()}
        label={source.name}
        size={size}
        variant={variant}
        sx={{
          bgcolor: variant === 'filled' ? source.color : 'transparent',
          color: variant === 'filled' ? 'white' : source.color,
          borderColor: variant === 'outlined' ? source.color : undefined,
          fontWeight: 'bold',
          '& .MuiChip-icon': {
            color: variant === 'filled' ? 'white' : source.color
          }
        }}
      />
    </Tooltip>
  );
}

export default ExternalSourceBadge;
