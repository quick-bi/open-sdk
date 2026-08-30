/**
 * 自定义菜单元信息
 */
import type { Interfaces } from '@quickbi/bi-open-menu-sdk';
import { defineMeta } from '@quickbi/bi-open-menu-sdk';

export default defineMeta<Interfaces.MenuMeta>({
  order: 1, // 排列顺序, 从上到下
});
