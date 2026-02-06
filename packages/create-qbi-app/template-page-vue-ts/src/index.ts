import { createBIComponent } from '@quickbi/bi-open-vue-sdk';
import Component from './Component.vue';

export const { bootstrap, mount, unmount, update } = createBIComponent({
  element: Component,
});
