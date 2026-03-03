import React from 'react';
import type { Interfaces } from '@quickbi/bi-open-react-sdk';
import './Component.scss';

const MyComponent: React.FC<Interfaces.PageComponentProps> = React.memo(props => {

  React.useEffect(() => {
    console.log('trigger when component mount', props);
  }, [])

  return (
    <div className="custom-page">
      <h1>My Custom Page</h1>
    </div>
  );
});

export default MyComponent;
