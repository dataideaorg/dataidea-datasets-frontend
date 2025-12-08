import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  TextField, 
  InputAdornment,
  Stack,
  Paper
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #3D3D3D 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.15,
          backgroundImage: `url('/jigsaw.svg')`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
        }}
      />
      
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 6, md: 8 },
          }}
        >
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2
              }}
            >
              Find & Download Open Datasets
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 400,
                mb: 4,
                opacity: 0.9,
                maxWidth: '600px',
                mx: { xs: 'auto', md: 0 }
              }}
            >
              Access free datasets for data analysis, machine learning, and visualization projects
            </Typography>
            
            <Paper
              component="form"
              onSubmit={handleSearch}
              sx={{ 
                p: '4px 6px',
                display: 'flex',
                maxWidth: '600px',
                mx: { xs: 'auto', md: 0 },
                borderRadius: 2,
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              }}
            >
              <TextField
                fullWidth
                placeholder="Search for datasets (e.g., 'covid', 'finance', 'csv')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ ml: 1, flex: 1 }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ 
                  px: 3,
                  py: 1,
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }}
              >
                Search
              </Button>
            </Paper>
            
            <Stack 
              direction="row" 
              spacing={2} 
              sx={{ 
                mt: 4,
                justifyContent: { xs: 'center', md: 'flex-start' } 
              }}
            >
              <Button 
                variant="outlined" 
                color="inherit" 
                size="large"
                onClick={() => navigate('/datasets')}
                sx={{ 
                  borderColor: 'white', 
                  '&:hover': { 
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  } 
                }}
              >
                Browse All
              </Button>
              <Button 
                variant="outlined" 
                color="inherit" 
                size="large"
                onClick={() => navigate('/categories')}
                sx={{ 
                  borderColor: 'white', 
                  '&:hover': { 
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  } 
                }}
              >
                View Categories
              </Button>
            </Stack>
          </Box>
          
          {/* Right side illustration - hidden on mobile */}
          <Box 
            sx={{ 
              flex: 1, 
              display: { xs: 'none', md: 'block' },
              position: 'relative',
            }}
          >
            <svg 
              viewBox="0 0 500 500" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: 'auto' }}
            >
              <rect x="70" y="60" width="360" height="380" rx="15" fill="#E0E0E0" />
              <rect x="90" y="100" width="320" height="50" rx="8" fill="#5A5A5A" />
              <rect x="90" y="170" width="150" height="50" rx="8" fill="#9E9E9E" />
              <rect x="260" y="170" width="150" height="50" rx="8" fill="#9E9E9E" />
              <rect x="90" y="240" width="150" height="50" rx="8" fill="#9E9E9E" />
              <rect x="260" y="240" width="150" height="50" rx="8" fill="#9E9E9E" />
              <rect x="90" y="310" width="320" height="50" rx="8" fill="#9E9E9E" />
              <rect x="90" y="380" width="150" height="40" rx="8" fill="#3D3D3D" />
            </svg>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection; 