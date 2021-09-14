import React from 'react';
import { Helmet } from 'react-helmet';

const MetaDecorator = () => {
  return (
    <Helmet>
      <title>Readable</title>
      <meta
        name="description"
        content="Readable - Social Media App"
      />
      <meta name="title" property="og:title" content="Readable"/>
      <meta property="og:type" content="Website"/>
      <meta
        name="image"
        property="og:image"
        content="https://live.staticflickr.com/65535/51465019123_58a99a518f_b.jpg"
      />
      <meta 
        name="description"
        property="og:description"
        content="Readable - Social Media App"
      />
      <meta name="author" content="Ruben Garcia Bri"/>
    </Helmet>
  )
}

export default MetaDecorator;
