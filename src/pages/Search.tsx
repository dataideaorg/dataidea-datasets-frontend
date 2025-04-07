import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  Breadcrumbs,
  Chip
} from '@mui/material';
import { 
  Search as SearchIcon,
  Home as HomeIcon,
  DatasetLinked as DatasetIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import DatasetCard from '../components/DatasetCard';
import { searchDatasets } from '../utils/api';
import { Dataset } from '../types';

function Search() {
  const [searchResults, setSearchResults] = useState<Dataset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  
  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError('');
      
      try {
        const results = await searchDatasets(searchQuery);
        setSearchResults(results);
      } catch (err) {
        console.error('Error searching datasets:', err);
        setError('Failed to search datasets. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResults();
  }, [searchQuery]);
  
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          <Typography color="text.primary">Search Results</Typography>
        </Breadcrumbs>
        
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <SearchIcon sx={{ fontSize: 32, mr: 1, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Search Results
          </Typography>
        </Box>
        
        {/* Search query */}
        {searchQuery && (
          <Box sx={{ mb: 4 }}>
            <Chip 
              label={`Query: ${searchQuery}`} 
              color="primary" 
              icon={<SearchIcon />}
            />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{searchQuery}"
            </Typography>
          </Box>
        )}
        
        {/* Results */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : !searchQuery ? (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Please enter a search query
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Use the search box in the navigation bar to search for datasets
            </Typography>
          </Box>
        ) : searchResults.length === 0 ? (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No results found for "{searchQuery}"
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try using different keywords or browse all datasets
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Link to="/datasets" style={{ textDecoration: 'none' }}>
                <Chip 
                  icon={<DatasetIcon />} 
                  label="Browse All Datasets"
                  color="primary" 
                  clickable
                />
              </Link>
            </Box>
          </Box>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((dataset) => (
              <div key={dataset.id}>
                <DatasetCard dataset={dataset} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </Box>
  );
}

export default Search; 