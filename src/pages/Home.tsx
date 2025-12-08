import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  // Grid,
  Box, 
  CircularProgress, 
  Alert,
  Button,
  Divider,
  Paper,
  Stack
} from '@mui/material';
import { 
  Insights as InsightsIcon, 
  Speed as SpeedIcon, 
  SecurityUpdateGood as QualityIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import DatasetCard from '../components/DatasetCard';
import CourseCard from '../components/CourseCard';
import { fetchFeaturedDatasets, fetchCourses } from '../utils/api';
import { Dataset, Course } from '../types';

function Home() {
  const [featuredDatasets, setFeaturedDatasets] = useState<Dataset[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const featured = await fetchFeaturedDatasets();
        setFeaturedDatasets(featured);
      } catch (err) {
        console.error('Error loading datasets:', err);
        setError('Failed to load datasets. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadCourses = async () => {
      setCoursesLoading(true);
      setCoursesError('');
      try {
        const coursesData = await fetchCourses();
        setCourses(coursesData);
      } catch (err) {
        console.error('Error loading courses:', err);
        setCoursesError('Failed to load courses. Please try again later.');
      } finally {
        setCoursesLoading(false);
      }
    };

    loadCourses();
  }, []);

  const features = [
    {
      icon: <InsightsIcon fontSize="large" sx={{ color: 'primary.main' }} />,
      title: 'Data Analysis',
      description: 'Curated datasets perfect for analysis and visualization projects.',
    },
    {
      icon: <SpeedIcon fontSize="large" sx={{ color: 'primary.main' }} />,
      title: 'Machine Learning',
      description: 'High-quality datasets optimized for training ML models.',
    },
    {
      icon: <QualityIcon fontSize="large" sx={{ color: 'primary.main' }} />,
      title: 'Quality Assured',
      description: 'All datasets are verified for quality and completeness.',
    },
  ];

  return (
    <Box>
      <HeroSection />
      
      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <Paper 
                key={index}
                elevation={0}
                sx={{ 
                  p: 4, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            ))}
          </div>
        </Container>
      </Box>
      
      {/* Featured Datasets Section */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h2" fontWeight="bold">
            Featured Datasets
          </Typography>
          <Button 
            component={Link} 
            to="/datasets" 
            color="primary"
            endIcon={<NavigateNextIcon />}
          >
            View All
          </Button>
        </Box>
        
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {featuredDatasets.map((dataset) => (
              <div key={dataset.id}>
                <DatasetCard dataset={dataset} />
              </div>
            ))}
          </div>
        )}
      </Container>

      <Divider />

      {/* Courses Section */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h2" fontWeight="bold">
            Learn with Our Courses
          </Typography>
          <Button
            href="https://science.dataidea.org/"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            endIcon={<NavigateNextIcon />}
          >
            View All Courses
          </Button>
        </Box>

        {coursesLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : coursesError ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {coursesError}
          </Alert>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {courses.map((course) => (
              <div key={course.id}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to find the perfect dataset?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 'normal' }}>
            Browse our collection of free, high-quality datasets for your next project
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
          >
            <Button 
              variant="contained" 
              size="large"
              component={Link}
              to="/datasets"
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              Browse Datasets
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              component={Link}
              to="/categories"
              sx={{ 
                borderColor: 'white', 
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Explore Categories
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 