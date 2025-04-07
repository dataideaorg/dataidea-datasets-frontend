import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  TextField,
  InputAdornment,
  Breadcrumbs,
  Paper,
  Grid,
  Button,
  Divider
} from '@mui/material';
import { 
  Search as SearchIcon,
  Home as HomeIcon,
  CategoryRounded as CategoryIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import { fetchCategories, fetchDatasets } from '../utils/api';
import { Category, Dataset } from '../types';

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const [categoriesData, datasetsData] = await Promise.all([
          fetchCategories(),
          fetchDatasets()
        ]);
        setCategories(categoriesData);
        setFilteredCategories(categoriesData);
        setDatasets(datasetsData);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = categories.filter(
        category => 
          category.name.toLowerCase().includes(query) ||
          (category.description && category.description.toLowerCase().includes(query))
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [categories, searchQuery]);

  // Count datasets for each category
  const getDatasetCount = (categoryId: number) => {
    return datasets.filter(dataset => 
      dataset.categories.some(cat => cat.id === categoryId)
    ).length;
  };

  // Get popular categories (most datasets)
  const popularCategories = [...categories]
    .sort((a, b) => getDatasetCount(b.id) - getDatasetCount(a.id))
    .slice(0, 4);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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
          <Typography color="text.primary">Categories</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Dataset Categories
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse our dataset collections organized by category
          </Typography>
        </Box>

        {/* Popular Categories Section */}
        {!isLoading && !error && popularCategories.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <CategoryIcon sx={{ mr: 1 }} />
              Popular Categories
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {popularCategories.map((category) => (
                <div key={category.id}>
                  <CategoryCard 
                    category={category} 
                    datasetCount={getDatasetCount(category.id)} 
                  />
                </div>
              ))}
            </div>
          </Box>
        )}

        {/* Search and Filters */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <TextField
            fullWidth
            label="Search categories"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* Results count */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'}
          </Typography>
        </Box>

        {/* Results */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : filteredCategories.length === 0 ? (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No categories found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria
            </Typography>
          </Box>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCategories.map((category) => (
              <div key={category.id}>
                <CategoryCard 
                  category={category} 
                  datasetCount={getDatasetCount(category.id)} 
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </Box>
  );
}

export default Categories; 