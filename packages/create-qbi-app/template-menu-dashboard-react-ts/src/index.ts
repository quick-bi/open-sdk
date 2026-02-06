import type { Interfaces } from '@quickbi/bi-open-menu-sdk';
import { createBIComponent } from '@quickbi/bi-open-menu-sdk';
import { MyCardMenu } from './Menu';

export const { bootstrap, mount, unmount, update } = createBIComponent<Interfaces.MenuComponentDashboardProps>({
  element: MyCardMenu,
});
