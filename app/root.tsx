import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

// TODO: Move links into the Remix style of importing

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="stylesheet"
          href="https://unpkg.com/sakura.css/css/sakura.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/sakura.css/css/sakura-dark.css"
          media="screen and (prefers-color-scheme: dark)"
        />

        <link rel="stylesheet" href="main.css" type="text/css" />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
