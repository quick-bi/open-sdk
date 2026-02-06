import type { Interfaces } from '@quickbi/bi-open-sdk';
import './index.scss';

class MyComponent {
  render(props: Interfaces.LifecycleProps<Interfaces.CustomPageProps>) {
    console.log(props);

    props.container!.innerHTML = '';

    const title = document.createElement('h1');
    title.textContent = 'Custom Page';

    props.container!.appendChild(title);
  }

  /**
   * trigger when component mounted
   */
  mount(props: Interfaces.LifecycleProps<Interfaces.CustomPageProps>) {
    props.container!.classList.add('custom-page');
    console.log('trigger when component mount');
    this.render(props);
  }

  /**
   * trigger when component updated
   */
  update(props: Interfaces.LifecycleProps<Interfaces.CustomPageProps>) {
    console.log('trigger when component update');
    this.render(props);
  }

  /**
   * trigger when component unmount
   */
  unmount(props: Interfaces.LifecycleProps<Interfaces.CustomPageProps>) {
    console.log('trigger when component unmount', props);
  }
}

export default MyComponent;
