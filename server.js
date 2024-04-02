import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./src/App";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./src/theme";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  const context = {};

  const html = ReactDOMServer.renderToString(
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ChakraProvider>
    </HelmetProvider>
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(`
      <!doctype html>
      <html>
        <head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Web site created using create-react-app"
          />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body>
          <div id="root">${html}</div>
          <script src="/main.js"></script>
        </body>
      </html>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});