// ExternalMetaComponent.js

import React from 'react';
import { Helmet } from 'react-helmet-async';

const ExternalMetaComponent = ({ title, content, pictureUrl }) => {
  return (
    <Helmet>
      <link rel="icon" href={pictureUrl} />
      <link rel="apple-touch-icon" href={pictureUrl} />
      <link rel="manifest" href={pictureUrl} />
      <link rel="icon" href={pictureUrl} />
      <title>{title}</title>
      <meta property="og:title" content={content} />
      <meta property="description" content={`${content}`} />
      <meta property="og:image" content={pictureUrl} />
    </Helmet>
  );
};

export default ExternalMetaComponent;
