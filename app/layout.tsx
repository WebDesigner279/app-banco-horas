"use client"; // Garanta que o componente seja renderizado no cliente

import React from 'react';
import '../styles/globals.scss';  // Verifique o caminho relativo

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Banco de Horas</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="container">
          <main>{children}</main>
          <footer>
            <p>&copy; {new Date().getFullYear()} Banco de Horas App</p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;
