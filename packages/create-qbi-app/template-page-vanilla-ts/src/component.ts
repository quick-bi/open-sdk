import type { Interfaces } from '@quickbi/bi-open-sdk';
import './component.scss';

class MyComponent {
  render(props: Interfaces.LifecycleProps<Interfaces.PageComponentProps>) {
    props.container!.textContent = 'My Custom Page';
  }

  /**
   * trigger when component mounted
   */
  mount(props: Interfaces.LifecycleProps<Interfaces.PageComponentProps>) {
    props.container!.classList.add('custom-page');
    console.log('trigger when component mount', props);
    this.render(props);
  }

  /**
   * trigger when component updated
   */
  update(props: Interfaces.LifecycleProps<Interfaces.PageComponentProps>) {
    console.log('trigger when component update', props);
    this.render(props);
  }

  /**
   * trigger when component unmount
   */
  unmount(props: Interfaces.LifecycleProps<Interfaces.PageComponentProps>) {
    console.log('trigger when component unmount', props);
  }
}

export default MyComponent;
