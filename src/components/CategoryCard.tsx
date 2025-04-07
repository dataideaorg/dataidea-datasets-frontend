import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Chip
} from '@mui/material';
import { 
  Category as CategoryIcon,
  DatasetLinked as DatasetIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  datasetCount: number;
}

function CategoryCard({ category, datasetCount }: CategoryCardProps) {
  // Generate a pastel color based on the category name for visual distinction
  const generatePastelColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate pastel colors (lighter and less saturated)
    const h = hash % 360;
    return `hsl(${h}, 70%, 85%)`;
  };

  const bgColor = generatePastelColor(category.name);
  
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      <CardActionArea
        component={Link}
        to={`/datasets?category=${category.slug}`}
        sx={{ 
          flexGrow: 1,
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          height: '100%'
        }}
      >
        <Box
          sx={{
            py: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: bgColor,
          }}
        >
          <CategoryIcon sx={{ fontSize: 48, color: 'rgba(0,0,0,0.7)' }} />
        </Box>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="h3" gutterBottom>
            {category.name}
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
            {category.description || `Explore datasets in the ${category.name} category.`}
          </Typography>
          
          <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
            <Chip
              icon={<DatasetIcon fontSize="small" />}
              label={`${datasetCount} ${datasetCount === 1 ? 'dataset' : 'datasets'}`}
              size="small"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CategoryCard; 