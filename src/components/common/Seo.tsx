import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../../config/site';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
}

export function Seo({ title, description, image }: SeoProps) {
  const fullTitle = `${title} | ${siteConfig.name}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteConfig.name} />
      {image ? <meta property="og:image" content={image} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
