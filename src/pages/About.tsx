import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Breadcrumbs,
  Card,
  CardContent,
  // Grid,
  Link as MuiLink,
  Stack
} from '@mui/material';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  DatasetLinked as DatasetIcon,
  Security as SecurityIcon,
  Code as CodeIcon,
  CloudDownload as DownloadIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

function About() {
  const features = [
    {
      icon: <DatasetIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'High-Quality Datasets',
      description: 'All datasets are curated and verified to ensure quality, completeness, and usability for various data science tasks.'
    },
    {
      icon: <DownloadIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'Free to Download',
      description: 'Every dataset is available for free download and can be used for personal projects, research, and education.'
    },
    {
      icon: <SecurityIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'Clear Licensing',
      description: 'All datasets come with clear licensing information so you know exactly how you can use the data.'
    },
    {
      icon: <CodeIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'Data Science Ready',
      description: 'Our datasets are prepared in formats that are ready for data analysis, machine learning, and visualization.'
    }
  ];

  const faqItems = [
    {
      question: 'How can I use these datasets?',
      answer: 'All datasets on DATAIDEA are free to download and can be used according to their respective licenses. Each dataset page displays the specific license information. Most datasets are available for personal, educational, and research purposes.'
    },
    {
      question: 'Can I contribute my own dataset?',
      answer: 'Yes! We welcome dataset contributions from the community. Please contact us through our submission form with details about your dataset, and our team will review it for inclusion in our library.'
    },
    {
      question: 'Are these datasets clean and ready to use?',
      answer: 'While we strive to provide high-quality datasets, the level of preprocessing varies. Some datasets may require additional cleaning or transformation depending on your specific needs. Each dataset description includes information about the data format and any preprocessing that has been applied.'
    },
    {
      question: 'How often are new datasets added?',
      answer: 'We regularly update our collection with new datasets. Check back frequently or subscribe to our newsletter to stay informed about new additions.'
    },
    {
      question: 'Can I request a specific dataset?',
      answer: 'Yes, we accept dataset requests. If you need a specific type of dataset for your project or research, let us know through our contact form, and we\'ll do our best to find or create it.'
    }
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          <Typography color="text.primary">About</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 6, 
            mb: 6, 
            textAlign: 'center',
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: 2
          }}
        >
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            About DATAIDEA
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto', fontWeight: 'normal' }}>
            Empowering data scientists, researchers, and developers with free, 
            high-quality datasets for analysis, machine learning, and visualization
          </Typography>
        </Paper>

        {/* Mission Statement */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon sx={{ mr: 1 }} />
            Our Mission
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" sx={{ mb: 2 }}>
            DATAIDEA was created to solve a common problem in the data science community: access to quality datasets. 
            We believe that data should be freely available to everyone, regardless of their background or resources.
          </Typography>
          <Typography variant="body1">
            Our mission is to collect, curate, and distribute high-quality datasets that can be used for 
            education, research, and development of data-driven applications. By providing easy access to diverse 
            datasets, we aim to foster innovation and accelerate progress in fields like machine learning, 
            data visualization, and statistical analysis.
          </Typography>
        </Box>

        {/* Features */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
            What We Offer
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card key={index} sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    {feature.icon}
                    <Typography variant="h6" component="h3">
                      {feature.title}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
            Frequently Asked Questions
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Stack spacing={3}>
            {faqItems.map((item, index) => (
              <Paper key={index} sx={{ p: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom color="primary.main">
                  {item.question}
                </Typography>
                <Typography variant="body1">
                  {item.answer}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Box>

        {/* Contact Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
            Contact Us
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" paragraph>
            Have questions or feedback? We'd love to hear from you! You can reach our team at:
          </Typography>
          <Typography variant="body1" paragraph>
            Email: <MuiLink href="mailto:contact@dataidea.com">contact@dataidea.com</MuiLink>
          </Typography>
          <Typography variant="body1">
            Follow us on social media for updates on new datasets and features.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default About; 