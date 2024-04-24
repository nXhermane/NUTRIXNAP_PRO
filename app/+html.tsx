import React from 'react';
import { ScrollViewStyleReset } from 'expo-router/html';

/**
 * This file is used to configure the root HTML for every web page during static rendering.
 * The contents of this function only run in Node.js environments and do not have access to the DOM or browser APIs.
 */
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="expo-app">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Disable body scrolling on web. This makes ScrollView components work closer to how they do on native. */}
        <ScrollViewStyleReset />

        {/* Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode. */}
        <style aria-hidden="true">{responsiveBackground}</style>

        {/* Add any additional <head> elements that you want globally available on web... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
  :root {
    --background-color: #fff;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background-color: #00
