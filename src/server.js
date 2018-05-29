
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './client/App';
import Html from './client/Html';
import { ServerStyleSheet } from 'styled-components'; // <-- importing ServerStyleSheet

const port = 3000;
const server = express();

// Creating a single index route to server our React application from.
server.get('/', (req, res) => {
  const sheet = new ServerStyleSheet(); // <-- creating out stylesheet

  const body = renderToString(sheet.collectStyles(<App />)); // <-- collecting styles
  const styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet
  const title = 'Server side Rendering with Styled Components';

  res.send(
    Html({
      body,
      styles, // <-- passing the styles to our Html template
      title
    })
  );
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);