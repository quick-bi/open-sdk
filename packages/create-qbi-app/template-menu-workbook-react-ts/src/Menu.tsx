import React from 'react';
import type { Interfaces } from '@quickbi/bi-open-menu-sdk';
import { MenuItem } from '@quickbi/bi-open-menu-sdk';

export const MyCardMenu: React.FC<Interfaces.MenuComponentExcelProps> = React.memo(props => {
  const handleClick = React.useCallback(
    e => {
      console.log(props);
    },
    [props],
  );

  return (
    <MenuItem title="My Custom Menu" disabled={false} hoverTip="My Hover Tip" loading={false} onClick={handleClick} />
  );
});
