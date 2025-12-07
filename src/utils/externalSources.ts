/**
 * Utility functions for handling external dataset sources
 */

export interface ExternalSource {
  name: string;
  domain: string;
  color: string;
  icon?: string;
  description: string;
}

// Known external data sources
export const EXTERNAL_SOURCES: Record<string, ExternalSource> = {
  kaggle: {
    name: 'Kaggle',
    domain: 'kaggle.com',
    color: '#20BEFF',
    description: 'Kaggle Datasets'
  },
  github: {
    name: 'GitHub',
    domain: 'github.com',
    color: '#181717',
    description: 'GitHub Repository'
  },
  'google-drive': {
    name: 'Google Drive',
    domain: 'drive.google.com',
    color: '#4285F4',
    description: 'Google Drive'
  },
  dropbox: {
    name: 'Dropbox',
    domain: 'dropbox.com',
    color: '#0061FF',
    description: 'Dropbox'
  },
  'data-gov': {
    name: 'Data.gov',
    domain: 'data.gov',
    color: '#112E51',
    description: 'U.S. Government Open Data'
  },
  uci: {
    name: 'UCI ML Repository',
    domain: 'archive.ics.uci.edu',
    color: '#003366',
    description: 'UCI Machine Learning Repository'
  },
  zenodo: {
    name: 'Zenodo',
    domain: 'zenodo.org',
    color: '#1E88E5',
    description: 'Research Data Repository'
  },
  figshare: {
    name: 'figshare',
    domain: 'figshare.com',
    color: '#999999',
    description: 'Research Repository'
  },
  'google-cloud': {
    name: 'Google Cloud Storage',
    domain: 'storage.googleapis.com',
    color: '#4285F4',
    description: 'Google Cloud Storage'
  },
  aws: {
    name: 'AWS S3',
    domain: 's3.amazonaws.com',
    color: '#FF9900',
    description: 'Amazon Web Services S3'
  },
  onedrive: {
    name: 'OneDrive',
    domain: 'onedrive.live.com',
    color: '#0078D4',
    description: 'Microsoft OneDrive'
  }
};

/**
 * Detect the external source from a URL
 */
export function detectExternalSource(url: string): ExternalSource | null {
  if (!url) return null;

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // Check for exact domain matches
    for (const source of Object.values(EXTERNAL_SOURCES)) {
      if (hostname.includes(source.domain)) {
        return source;
      }
    }

    // Check for common cloud storage patterns
    if (hostname.includes('amazonaws.com') || hostname.includes('s3')) {
      return EXTERNAL_SOURCES.aws;
    }

    if (hostname.includes('googleapis.com') || hostname.includes('gcs')) {
      return EXTERNAL_SOURCES['google-cloud'];
    }

    // Return generic external source
    return {
      name: 'External Source',
      domain: hostname,
      color: '#5A5A5A',
      description: 'External Dataset'
    };
  } catch (error) {
    console.error('Error parsing URL:', error);
    return null;
  }
}

/**
 * Check if a URL is an external link (not hosted on our domain)
 */
export function isExternalLink(url: string): boolean {
  if (!url) return false;

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // Check if it's our API domain
    const isOurDomain = hostname.includes('dataidea.org') ||
                       hostname.includes('localhost');

    return !isOurDomain;
  } catch (error) {
    // If URL parsing fails, assume it might be a relative path (our domain)
    return false;
  }
}

/**
 * Get a user-friendly display name for the source
 */
export function getSourceDisplayName(url: string): string {
  const source = detectExternalSource(url);
  return source ? source.name : 'Unknown Source';
}

/**
 * Get the domain from a URL for display purposes
 */
export function getDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return 'Unknown';
  }
}

/**
 * Validate if a URL is accessible (basic format check)
 * Note: This doesn't check if the link is actually working, just if it's a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
