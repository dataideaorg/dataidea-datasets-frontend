import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  Paper,
  Chip,
  Button,
  Divider,
  // Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Breadcrumbs,
  // Card,
  // CardContent,
  Tabs,
  Tab,
  Link as MuiLink
} from '@mui/material';
import { 
  CloudDownload as DownloadIcon,
  CalendarMonth as CalendarIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
  Home as HomeIcon,
  DatasetLinked as DatasetIcon,
  Label as TagIcon,
  Link as LinkIcon,
  Description as DescriptionIcon,
  ArrowBack as ArrowBackIcon,
  Article as FileIcon
} from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchDatasetDetails, fetchDatasets, incrementDownload } from '../utils/api';
import { Dataset } from '../types';
import DatasetCard from '../components/DatasetCard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dataset-tabpanel-${index}`}
      aria-labelledby={`dataset-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function DatasetDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [relatedDatasets, setRelatedDatasets] = useState<Dataset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadCount, setDownloadCount] = useState(0);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      setError('');
      
      try {
        // Get dataset details
        const datasetDetails = await fetchDatasetDetails(slug);
        setDataset(datasetDetails);
        setDownloadCount(datasetDetails.download_count);
        
        // Get all datasets to find related ones
        const allDatasets = await fetchDatasets();
        
        // Find related datasets by matching categories or tags
        if (datasetDetails) {
          const related = allDatasets
            .filter(d => d.id !== datasetDetails.id) // Exclude current dataset
            .filter(d => {
              // Check for common categories
              const hasCommonCategory = d.categories.some(cat => 
                datasetDetails.categories.some(dcat => dcat.id === cat.id)
              );
              
              // Check for common tags
              const datasetTags = datasetDetails.tags.split(',').map(t => t.trim().toLowerCase());
              const dTags = d.tags.split(',').map(t => t.trim().toLowerCase());
              const hasCommonTag = datasetTags.some(tag => dTags.includes(tag));
              
              return hasCommonCategory || hasCommonTag;
            })
            .slice(0, 3); // Limit to 3 related datasets
          
          setRelatedDatasets(related);
        }
      } catch (err) {
        console.error('Error loading dataset details:', err);
        setError('Failed to load dataset. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [slug]);

  const handleDownload = async () => {
    if (!dataset) return;
    
    try {
      const newCount = await incrementDownload(dataset.slug);
      setDownloadCount(newCount);
      window.open(dataset.file, '_blank');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderFileSize = () => {
    if (!dataset?.file_size) return 'Unknown size';
    
    if (dataset.file_size < 1024) {
      return `${dataset.file_size} KB`;
    } else {
      return `${(dataset.file_size / 1024).toFixed(2)} MB`;
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          <Link to="/datasets" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
            <DatasetIcon sx={{ mr: 0.5 }} fontSize="small" />
            Datasets
          </Link>
          <Typography color="text.primary">
            {isLoading ? 'Loading...' : dataset?.title || 'Dataset Details'}
          </Typography>
        </Breadcrumbs>

        {/* Back Button */}
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back
        </Button>
        
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : dataset ? (
          <>
            {/* Dataset Header */}
            <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                {/* Left Side - Info */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                    {dataset.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                    <Chip
                      icon={<CalendarIcon />}
                      label={`Added: ${formatDate(dataset.created_at)}`}
                      variant="outlined"
                      size="small"
                    />
                    <Chip
                      icon={<PersonIcon />}
                      label={`Author: ${dataset.author.username}`}
                      variant="outlined"
                      size="small"
                    />
                    <Chip
                      icon={<DownloadIcon />}
                      label={`Downloads: ${downloadCount}`}
                      variant="outlined"
                      size="small"
                    />
                    <Chip
                      icon={<FileIcon />}
                      label={dataset.file_type || 'Unknown type'}
                      variant="outlined"
                      size="small"
                      color="primary"
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {dataset.categories.map(category => (
                      <Chip
                        key={category.id}
                        icon={<CategoryIcon />}
                        label={category.name}
                        component={Link}
                        to={`/datasets?category=${category.slug}`}
                        clickable
                        color="primary"
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(0, 131, 116, 0.1)',
                          '&:hover': {
                            bgcolor: 'rgba(0, 131, 116, 0.2)'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                
                {/* Right Side - Download Button */}
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownload}
                    sx={{ 
                      px: 4, 
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    Download ({renderFileSize()})
                  </Button>
                  <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 1 }}>
                    {dataset.file_type && `File format: ${dataset.file_type}`}
                  </Typography>
                </Box>
              </Box>
            </Paper>
            
            {/* Tabs Navigation */}
            <Box sx={{ mb: 4 }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                aria-label="dataset detail tabs"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: 'primary.main',
                  },
                }}
              >
                <Tab label="Overview" id="dataset-tab-0" aria-controls="dataset-tabpanel-0" />
                <Tab label="Details" id="dataset-tab-1" aria-controls="dataset-tabpanel-1" />
                <Tab label="Related" id="dataset-tab-2" aria-controls="dataset-tabpanel-2" />
              </Tabs>
              
              {/* Overview Tab */}
              <TabPanel value={tabValue} index={0}>
                <Paper sx={{ p: 4, borderRadius: 2 }}>
                  <Typography variant="h6" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <DescriptionIcon sx={{ mr: 1 }} />
                    Description
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body1" paragraph whiteSpace="pre-line">
                    {dataset.description}
                  </Typography>
                  
                  {dataset.tags && (
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="subtitle1" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <TagIcon sx={{ mr: 1 }} fontSize="small" />
                        Tags
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {dataset.tags.split(',').map((tag, index) => (
                          tag.trim() && (
                            <Chip 
                              key={index} 
                              label={tag.trim()} 
                              size="small" 
                              component={Link}
                              to={`/search?q=${encodeURIComponent(tag.trim())}`}
                              clickable
                              sx={{ 
                                bgcolor: 'rgba(0, 131, 116, 0.1)',
                                color: 'primary.main',
                              }} 
                            />
                          )
                        ))}
                      </Box>
                    </Box>
                  )}
                </Paper>
              </TabPanel>
              
              {/* Details Tab */}
              <TabPanel value={tabValue} index={1}>
                <Paper sx={{ p: 4, borderRadius: 2 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Dataset Information
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <TableContainer component={Paper} elevation={0} sx={{ mb: 4 }}>
                    <Table aria-label="dataset details">
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row" sx={{ width: '30%', fontWeight: 'bold' }}>
                            Title
                          </TableCell>
                          <TableCell>{dataset.title}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            Author
                          </TableCell>
                          <TableCell>
                            {dataset.author.username}
                            {dataset.author.email && ` (${dataset.author.email})`}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            File Format
                          </TableCell>
                          <TableCell>{dataset.file_type || 'Not specified'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            File Size
                          </TableCell>
                          <TableCell>{renderFileSize()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            License
                          </TableCell>
                          <TableCell>{dataset.license || 'Not specified'}</TableCell>
                        </TableRow>
                        {dataset.source_url && (
                          <TableRow>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                              Source
                            </TableCell>
                            <TableCell>
                              <MuiLink href={dataset.source_url} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center' }}>
                                <LinkIcon fontSize="small" sx={{ mr: 0.5 }} />
                                {dataset.source_url}
                              </MuiLink>
                            </TableCell>
                          </TableRow>
                        )}
                        <TableRow>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            Categories
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {dataset.categories.map(category => (
                                <Chip
                                  key={category.id}
                                  label={category.name}
                                  component={Link}
                                  to={`/datasets?category=${category.slug}`}
                                  clickable
                                  size="small"
                                />
                              ))}
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            Created At
                          </TableCell>
                          <TableCell>{formatDate(dataset.created_at)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            Last Updated
                          </TableCell>
                          <TableCell>{formatDate(dataset.updated_at)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            Downloads
                          </TableCell>
                          <TableCell>{downloadCount}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </TabPanel>
              
              {/* Related Tab */}
              <TabPanel value={tabValue} index={2}>
                <Paper sx={{ p: 4, borderRadius: 2 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Related Datasets
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  {relatedDatasets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {relatedDatasets.map((relatedDataset) => (
                        <div key={relatedDataset.id}>
                          <DatasetCard dataset={relatedDataset} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
                      No related datasets found.
                    </Typography>
                  )}
                </Paper>
              </TabPanel>
            </Box>
          </>
        ) : (
          <Alert severity="warning" sx={{ mb: 4 }}>
            Dataset not found.
          </Alert>
        )}
      </Container>
    </Box>
  );
}

export default DatasetDetail; 