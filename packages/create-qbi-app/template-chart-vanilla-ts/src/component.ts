import type { Interfaces } from 'bi-open-sdk';
import './index.scss';

class MyComponent {
  render(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    const viewConfig = props.customProps!.viewConfig;

    props.container!.textContent = `I ${viewConfig?.fruit?.apple ? 'like' : "don't like"} apple, I want to eat ${
      viewConfig?.fruit?.banana
    } banana`;
  }

  /**
   * trigger when component mounted
   */
  mount(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    props.container!.classList.add('test-component');
    console.log('trigger when component mount');
    this.render(props);
  }

  /**
   * trigger when component updated
   */
  update(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    console.log('trigger when component update');
    this.render(props);
  }

  /**
   * trigger when component unmount
   */
  unmount(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    console.log('trigger when component unmount', props);
  }
}

export default MyComponent;
