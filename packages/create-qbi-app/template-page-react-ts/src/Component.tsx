import React from 'react';
import './Component.scss';

const MyComponent: React.FC = React.memo(() => {
  return (
    <div className="custom-page">
      <h1>My Custom Page</h1>
    </div>
  );
});

export default MyComponent;
