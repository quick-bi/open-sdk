import type { Interfaces } from 'bi-open-sdk';
import './index.scss';

class MyComponent {
  render(props: Interfaces.LifecycleProps<Interfaces.CustomPageProps>) {
    console.log(props);

    // 清空容器
    props.container!.innerHTML = '';

    // 创建标题元素
    const title = document.createElement('h1');
    title.textContent = 'Custom Page';

    const subtitle = document.createElement('h3');
    subtitle.textContent = 'Everything is created by yourself';

    // 添加到容器中
    props.container!.appendChild(title);
    props.container!.appendChild(subtitle);
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
