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
  useMediaQuery,
  useTheme
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'Datasets', path: '/datasets', icon: <DatasetIcon /> },
    { name: 'Categories', path: '/categories', icon: <CategoryIcon /> },
    { name: 'About', path: '/about', icon: <AboutIcon /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main', fontWeight: 'bold' }}>
        DATAIDEA
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton 
              component={Link}
              to={item.path}
              sx={{ 
                textAlign: 'center',
                '&:hover': {
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                }
              }}
            >
              <Box sx={{ mr: 1 }}>{item.icon}</Box>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" sx={{ bgcolor: 'white', boxShadow: 1 }}>
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
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
                color: 'primary.main',
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
                mr: 2,
                display: { xs: 'flex', sm: 'none' },
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                alignItems: 'center'
              }}
            >
              <DatasetIcon sx={{ mr: 0.5 }} />
              DI
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, gap: 2 }}>
              {navItems.map((item) => (
                <Button 
                  key={item.name}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{ 
                    color: 'text.primary',
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: 'primary.main',
                    }
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex' }}>
              <TextField
                size="small"
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
                      <IconButton type="submit" edge="end" color="primary">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1 }}>
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
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} DATAIDEA - Free Open Datasets for Data Analysis and Machine Learning
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Layout; 