import React from 'react';
import './styles.css';

export default function RootComponent({ children }) {
  return (
    <div className="container">
      <div className="page">
        {children}
      </div>
    </div>
  );
}