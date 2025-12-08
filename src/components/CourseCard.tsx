import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from '@mui/material';
import {
  Schedule as DurationIcon,
  TrendingUp as LevelIcon,
  MenuBook as ResourcesIcon,
  HowToReg as EnrollIcon,
} from '@mui/icons-material';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  const getLevelColor = () => {
    const level = course.level.toLowerCase();

    switch (level) {
      case 'beginner':
        return '#4caf50';
      case 'intermediate':
        return '#ff9800';
      case 'advanced':
        return '#f44336';
      default:
        return '#2196f3';
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
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
          <Chip
            icon={<LevelIcon fontSize="small" />}
            label={course.level}
            size="small"
            sx={{
              bgcolor: getLevelColor(),
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'capitalize'
            }}
          />
          <Chip
            icon={<DurationIcon fontSize="small" />}
            label={course.duration}
            size="small"
            variant="outlined"
          />
        </Box>

        <Typography variant="h6" component="div" gutterBottom>
          {course.title}
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
          {course.description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          {course.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              size="small"
              sx={{
                bgcolor: 'rgba(90, 90, 90, 0.2)',
                color: '#E0E0E0',
                fontSize: '0.7rem'
              }}
            />
          ))}
        </Box>
      </CardContent>

      <CardActions>
        {course.free_resources_link ? (
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<ResourcesIcon />}
            href={course.free_resources_link}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
          >
            Free Resources
          </Button>
        ) : (
          <Button
            size="small"
            variant="outlined"
            color="primary"
            fullWidth
            disabled
          >
            Coming Soon
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default CourseCard;