// ExternalMetaComponent.js

import React from 'react';
import { Helmet } from 'react-helmet-async';

const ExternalMetaComponent = ({ title, content, pictureUrl,url }) => {
  console.log('Props received by MetaTags:', { title, content, pictureUrl, url });

  return (
    <Helmet>
      <link rel="icon" href={pictureUrl} />
      <link rel="apple-touch-icon" href={pictureUrl} />
      <link rel="manifest" href={pictureUrl} />
      <link rel="icon" href={pictureUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={content} />
      <meta property="description" content={`${content}`} />
      <meta property="og:image" content={pictureUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="image" />
    </Helmet>
  );
};

export default ExternalMetaComponent;
