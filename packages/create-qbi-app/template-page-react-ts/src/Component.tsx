import React from 'react';
import './index.scss';

const MyComponent: React.FC = React.memo(() => {
  return (
    <div className="custom-page">
      <h1>Custom Page</h1>
      <h3>Everything is created by yourself</h3>
    </div>
  );
});

export default MyComponent;
