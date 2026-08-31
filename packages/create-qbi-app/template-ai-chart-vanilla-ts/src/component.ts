import type { Interfaces } from '@quickbi/bi-open-sdk';
import './component.scss';

class MyComponent {
  render(props: Interfaces.LifecycleProps<Interfaces.AIComponentProps>) {
    const customProps = props.customProps!;
    const { data, encoding } = customProps;

    props.container!.innerHTML = `<pre>${JSON.stringify(
      { encoding, rowCount: data?.values?.length ?? 0 },
      null,
      2,
    )}</pre>`;
  }

  /**
   * trigger when component mounted
   */
  mount(props: Interfaces.LifecycleProps<Interfaces.AIComponentProps>) {
    props.container!.classList.add('test-component');
    console.log('trigger when component mount', props);
    this.render(props);
  }

  /**
   * trigger when component updated
   */
  update(props: Interfaces.LifecycleProps<Interfaces.AIComponentProps>) {
    console.log('trigger when component update', props);
    this.render(props);
  }

  /**
   * trigger when component unmount
   */
  unmount(props: Interfaces.LifecycleProps<Interfaces.AIComponentProps>) {
    console.log('trigger when component unmount', props);
  }
}

export default MyComponent;
