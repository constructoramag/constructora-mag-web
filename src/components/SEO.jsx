import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.constructoramag.cl';

export const DEFAULT_OG_IMAGE = 'https://cdn.sanity.io/images/bdqq6fie/production/ea712b596f0967e827604724161182e14088cbe9-1568x1003.png?w=1200&h=630&fit=crop&auto=format';

export function buildCanonicalUrl(path) {
  if (!path) return `${SITE_URL}/`;
  const cleanPath = path.split('?')[0].split('#')[0].replace(/\/+$/, '');
  if (!cleanPath || cleanPath === '/') {
    return `${SITE_URL}/`;
  }
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function formatSocialImageUrl(rawUrl) {
  if (!rawUrl) return DEFAULT_OG_IMAGE;

  if (rawUrl.includes('cdn.sanity.io')) {
    const cleanUrl = rawUrl.split('?')[0];
    return `${cleanUrl}?w=1200&h=630&fit=crop&auto=format`;
  }

  if (rawUrl.startsWith('/')) {
    return `${SITE_URL}${rawUrl}`;
  }

  return rawUrl;
}

export default function SEO({
  title,
  description, 
  canonical, 
  image,
  ogImage, 
  schema 
}) {
  const fullCanonical = buildCanonicalUrl(canonical);
  const socialImage = formatSocialImageUrl(image || ogImage);

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonical !== undefined && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {canonical !== undefined && <meta property="og:url" content={fullCanonical} />}
      <meta property="og:image" content={socialImage} />
      <meta property="og:site_name" content="Constructora MAG" />
      <meta property="og:locale" content="es_CL" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={socialImage} />

      {/* JSON-LD Schema (Structured Data) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
