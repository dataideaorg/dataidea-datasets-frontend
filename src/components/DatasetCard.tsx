import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Tooltip,
  CardActionArea
} from '@mui/material';
import {
  CloudDownload as DownloadIcon,
  CalendarMonth as CalendarIcon,
  Visibility as ViewIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Dataset } from '../types';
import { useState } from 'react';
import { incrementDownload } from '../utils/api';
import ExternalSourceBadge from './ExternalSourceBadge';
import ExternalLinkDialog from './ExternalLinkDialog';
import { isExternalLink } from '../utils/externalSources';

interface DatasetCardProps {
  dataset: Dataset;
}

function DatasetCard({ dataset }: DatasetCardProps) {
  const [downloadCount, setDownloadCount] = useState(dataset.download_count);
  const [dialogOpen, setDialogOpen] = useState(false);
  const isExternal = isExternalLink(dataset.file);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Show warning dialog for external links
    if (isExternal) {
      setDialogOpen(true);
      return;
    }

    // Direct download for internal files
    try {
      const newCount = await incrementDownload(dataset.slug);
      setDownloadCount(newCount);
      window.open(dataset.file, '_blank');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleConfirmExternalDownload = async () => {
    setDialogOpen(false);
    try {
      const newCount = await incrementDownload(dataset.slug);
      setDownloadCount(newCount);
      window.open(dataset.file, '_blank');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const renderFileSize = () => {
    if (!dataset.file_size) return 'Unknown size';
    
    if (dataset.file_size < 1024) {
      return `${dataset.file_size} KB`;
    } else {
      return `${(dataset.file_size / 1024).toFixed(2)} MB`;
    }
  };

  const getFileTypeColor = () => {
    const fileType = dataset.file_type?.toLowerCase() || '';
    
    switch (true) {
      case fileType.includes('csv'):
        return '#4caf50';
      case fileType.includes('json'):
        return '#ff9800';
      case fileType.includes('xls') || fileType.includes('xlsx'):
        return '#2196f3';
      case fileType.includes('txt'):
        return '#9e9e9e';
      case fileType.includes('zip'):
        return '#673ab7';
      default:
        return '#f44336';
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        '&:hover': {
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out'
        }
      }}
    >
      <CardActionArea 
        component={Link} 
        to={`/datasets/${dataset.slug}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Chip
                label={dataset.file_type || 'Unknown'}
                size="small"
                sx={{
                  bgcolor: getFileTypeColor(),
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
              <ExternalSourceBadge url={dataset.file} size="small" />
            </Box>
            <Tooltip title="Downloads">
              <Chip
                icon={<DownloadIcon fontSize="small" />}
                label={downloadCount}
                size="small"
                variant="outlined"
              />
            </Tooltip>
          </Box>

          <Typography variant="h6" component="div" gutterBottom>
            {dataset.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              flexGrow: 1,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3
            }}
          >
            {dataset.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {dataset.tags.split(',').map((tag, index) => (
              tag.trim() && (
                <Chip 
                  key={index} 
                  label={tag.trim()} 
                  size="small" 
                  sx={{
                    bgcolor: 'rgba(61, 61, 61, 0.08)',
                    color: 'primary.main',
                    fontSize: '0.7rem'
                  }} 
                />
              )
            ))}
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mt: 'auto',
              color: 'text.secondary',
              fontSize: '0.8rem'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarIcon fontSize="small" sx={{ mr: 0.5 }} />
              {formatDate(dataset.created_at)}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
              {dataset.author.username}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button 
          size="small" 
          color="primary" 
          startIcon={<ViewIcon />}
          component={Link}
          to={`/datasets/${dataset.slug}`}
          fullWidth
          sx={{ mr: 1 }}
        >
          View Details
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          fullWidth
        >
          Download ({renderFileSize()})
        </Button>
      </CardActions>

      {/* External Link Warning Dialog */}
      <ExternalLinkDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmExternalDownload}
        url={dataset.file}
        datasetTitle={dataset.title}
      />
    </Card>
  );
}

export default DatasetCard; 