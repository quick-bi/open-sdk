import React from 'react';
import type { Interfaces } from '@quickbi/bi-open-react-sdk';
import './Component.scss';

const MyComponent: React.FC<Interfaces.AIComponentProps> = React.memo(props => {
  const { data, encoding } = props;

  React.useEffect(() => {
    console.log('trigger when component mount', props);
  }, []);

  return (
    <div className="test-component">
      <pre>{JSON.stringify({ encoding, rowCount: data?.values?.length ?? 0 }, null, 2)}</pre>
    </div>
  );
});

export default MyComponent;
