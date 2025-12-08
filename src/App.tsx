import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ReactGA from 'react-ga4';
import Layout from './components/Layout';
import Home from './pages/Home';
import Datasets from './pages/Datasets';
import Categories from './pages/Categories';
import About from './pages/About';
import Search from './pages/Search';
import DatasetDetail from './pages/DatasetDetail';
import theme from './utils/theme';
import './App.css';

// Initialize Google Analytics
ReactGA.initialize('G-ZD84FCME05');

function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return null;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Analytics />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/datasets" element={<Datasets />} />
            <Route path="/datasets/:slug" element={<DatasetDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
