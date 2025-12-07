import { useState, ReactNode } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Container, 
  Button, 
  TextField,
  InputAdornment,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { 
  Search as SearchIcon,
  Menu as MenuIcon,
  DatasetLinked as DatasetIcon,
  CategoryRounded as CategoryIcon,
  Home as HomeIcon,
  InfoRounded as AboutIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'Datasets', path: '/datasets', icon: <DatasetIcon /> },
    { name: 'Categories', path: '/categories', icon: <CategoryIcon /> },
    { name: 'About', path: '/about', icon: <AboutIcon /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#2A2A2A' }}>
      <Typography variant="h6" sx={{ my: 2, color: '#E0E0E0', fontWeight: 'bold', fontFamily: 'DM Sans, sans-serif' }}>
        DATAIDEA
      </Typography>
      
      {/* Search box for mobile */}
      <Box sx={{ px: 2, mb: 2 }}>
        <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex' }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search datasets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end" sx={{ color: '#5A5A5A' }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                textAlign: 'center',
                color: '#E0E0E0',
                '&:hover': {
                  bgcolor: '#3D3D3D',
                  color: '#9E9E9E',
                },
                py: 1.5,
              }}
            >
              <Box sx={{ mr: 1 }}>{item.icon}</Box>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 500
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          © {new Date().getFullYear()} DATAIDEA
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      height: '100%', 
      width: '100%',
      overflow: 'hidden',
    }}>
      <AppBar position="sticky" sx={{ bgcolor: '#2A2A2A', boxShadow: 3 }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { md: 'none' }, color: '#E0E0E0' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', sm: 'flex' },
                fontWeight: 700,
                fontFamily: 'DM Sans, sans-serif',
                color: '#E0E0E0',
                textDecoration: 'none',
                alignItems: 'center'
              }}
            >
              <DatasetIcon sx={{ mr: 1 }} />
              DATAIDEA
            </Typography>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                mr: 1,
                display: { xs: 'flex', sm: 'none' },
                fontWeight: 700,
                fontFamily: 'DM Sans, sans-serif',
                color: '#E0E0E0',
                textDecoration: 'none',
                alignItems: 'center'
              }}
            >
              <DatasetIcon sx={{ mr: 0.5 }} />
              DATAIDEA
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: '#E0E0E0',
                    fontFamily: 'DM Sans, sans-serif',
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: '#9E9E9E',
                    }
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box 
              component="form" 
              onSubmit={handleSearch} 
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                width: { sm: '200px', md: '300px' }
              }}
            >
              <TextField
                size="small"
                fullWidth
                placeholder="Search datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" edge="end" sx={{ color: '#5A5A5A' }}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            
            {/* Search icon for mobile */}
            <IconButton
              sx={{ display: { sm: 'none' }, color: '#E0E0E0' }}
              onClick={handleDrawerToggle}
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: '100%', 
              maxWidth: '300px',
              height: '100%'
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: '100%',
          overflowX: 'hidden',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {children}
      </Box>
      <Box 
        component="footer" 
        sx={{ 
          mt: 'auto', 
          py: 3, 
          bgcolor: 'primary.main',
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            © {new Date().getFullYear()} DATAIDEA - Free Open Datasets for Data Analysis and Machine Learning
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Layout; 