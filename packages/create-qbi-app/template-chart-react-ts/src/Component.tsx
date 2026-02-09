import React from 'react';
import type { Interfaces } from '@quickbi/bi-open-react-sdk';
import './Component.scss';

const MyComponent: React.FC<Interfaces.ComponentProps> = React.memo(props => {
  const viewConfig = props.viewConfig;

  const text = `I ${viewConfig.fruit?.apple ? 'like' : "don't like"} apple, I want to eat ${
    viewConfig.fruit?.banana
  } banana`;

  return <div>{text}</div>;
});

export default MyComponent;
