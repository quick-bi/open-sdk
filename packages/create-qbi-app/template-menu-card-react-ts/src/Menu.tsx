import React from 'react';
import { Interfaces, MenuItem } from 'bi-open-menu-sdk';
import { ModalContent } from './ModalContent';

export const MyCardMenu: React.FC<Interfaces.MenuComponentChartProps> = React.memo(props => {
  const handleClick = React.useCallback(() => {
    console.log('props', props);
    props.dispatch({
      type: 'openModal',
      payload: {
        title: 'My Modal Title',
        content: <ModalContent text="My Modal Content" />,
        onCancel: () => {
          console.log('trigger when cancel button clicked');
        },
        onOk: () => {
          console.log('trigger when ok button clicked');
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        },
        okText: 'Go to',
        cancelButtonProps: {
          style: { display: 'none' },
        },
      },
    });
  }, [props]);

  return (
    <MenuItem
      title="My Custom Menu"
      disabled={false}
      loading={false}
      onClick={handleClick}
      showTitle={true}
      showIcon={true}
      hoverTip="My Hover Tip"
    />
  );
});
