import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const HighlightCode = ({ language, style, children }) => (
  <SyntaxHighlighter language={language} style={style}>
    {children}
  </SyntaxHighlighter>
);