import type { Interfaces } from 'bi-open-sdk';
import { I18n } from 'bi-open-sdk';
import type { ECharts } from 'echarts';
import { init } from 'echarts';
import './component.scss';

const i18n = I18n.init({
  resources: {
    'en-US': {
      暂无数据: 'no data',
    },
  },
});

class MyComponent {
  chart!: ECharts;

  lastSize!: {
    width: number;
    height: number;
  };

  setOption(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    if (this.chart) {
      const customProps = props.customProps!;
      const data = customProps.data!;
      const dataConfig = customProps.dataConfig!;
      const viewConfig = customProps.viewConfig!;
      const chartSkin = viewConfig.chartSkin!;
      const fieldSettingMap = viewConfig.fieldSettingMap!;
      const formatAllGranularityTime = customProps?.utils?.formatAllGranularityTime;
      const formatNumberWithConfig = customProps?.utils?.formatNumberWithConfig;

      // 主题颜色
      const colorSeries = customProps.viewConfig?.chartColorSeries?.colors ?? [];

      // 所有度量
      const rowFields = dataConfig.find(each => each.areaType === 'row')?.fields ?? [];

      // 所有度量
      const columnsFields = dataConfig.find(each => each.areaType === 'column')?.fields ?? [];

      // 第一行数据
      const [firstRow] = data;

      // 数据每行的位置都是固定的, 通过建立数组下标与 fieldId 的映射关系, 方便通过 fieldId 取值
      const fieldColumnIndexMap: Record<string, number> = firstRow.reduce(
        (prev, curr, i: number) => ({
          ...prev,
          [curr.fieldId as string]: i,
        }),
        {},
      );

      // dataConfig 转为 echarts series 数据格式
      const series = columnsFields.map((each, i) => {
        const filedSetting = fieldSettingMap[each.fieldId];
        return {
          id: each.fieldId,
          type: 'bar',
          data: data.map(row => row[fieldColumnIndexMap[each.fieldId]]?.value),
          coordinateSystem: 'polar',
          // 设置别名
          name: filedSetting?.aliasName ?? each.showName,
          // 设置色系
          color: colorSeries[i],
        };
      });

      // 图例
      const legend = series.map(each => each.name);

      // meta 中限制了只有一个维度
      const [onlyRow] = rowFields;
      const category = data.map(row => {
        const value = row[fieldColumnIndexMap[onlyRow?.fieldId]]?.value;
        const { dimGranularity, timeFormat } = onlyRow || {};

        return formatAllGranularityTime ? formatAllGranularityTime(dimGranularity, timeFormat!, value) : value;
      });

      // 绘制图表
      this.chart.setOption({
        angleAxis: {
          // 样式面板中配置的起始角度
          startAngle: viewConfig.display?.startAngle,
        },
        radiusAxis: {
          type: 'category',
          data: category,
          z: 10,
        },
        polar: {
          radius: '60%',
        },
        tooltip: {
          trigger: 'item',
          // 对深色主题的兼容
          textStyle: {
            color: chartSkin.key === 'black' ? '#fff' : '#333',
          },
          backgroundColor: chartSkin.key === 'black' ? '#222' : '#fff',
          extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);',

          // 将 tooltips 显示的数据格式与字段里配置的数据格式对应上
          formatter: (param: any) => {
            const fieldSetting = fieldSettingMap[param.seriesId];
            const value = formatNumberWithConfig?.(param.value, fieldSetting?.numberFormat);

            return `${param.seriesName ?? i18n.t('暂无数据')}<br />${param.name}: ${param.marker}${value}`;
          },
        },
        series,
        legend: {
          // 样式面板中配置的是否显示图例
          show: viewConfig.display?.showLegend,
          data: legend,
          top: 10,
          padding: 0,
          // 对深色主题的兼容
          textStyle: {
            color: chartSkin.key === 'black' ? '#fff' : '#333',
          },
        },
        // 对深色主题的兼容
        textStyle: {
          color: chartSkin.key === 'black' ? '#fff' : '#333',
        },
      });
    }
  }

  /**
   * 绑定事件
   * @param props
   */
  bindEvents(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    const customProps = props.customProps!;
    const dispatch = customProps.dispatch;

    if (typeof dispatch === 'function') {
      // 下钻/联动/跳转事件
      this.chart.on('click', (serie: any) => {
        dispatch({
          type: 'select',
          payload: {
            dataIndex: serie.dataIndex, // dataIndex 为所点击的行在 data 中的数组下标
          },
        });
      });

      // 点击空白处事件, 用于适配移动端下钻
      this.chart.getZr().on('click', function (e) {
        if (!e.target) {
          dispatch({
            type: 'cancelSelect',
          });
        }
      });
    }
  }

  /**
   * 保存上次大小, 用于性能优化
   */
  setLastSize(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    if (!props.container) return;
    const width = props.container.offsetWidth;
    const height = props.container.offsetHeight;

    // 容器大小变更时触发 resize
    if (this.lastSize && (this.lastSize?.width !== width || this.lastSize?.height !== height)) {
      this.chart.resize();
    }

    this.lastSize = {
      width,
      height,
    };
  }

  /**
   * mount 生命周期, 在渲染时触发
   */
  mount(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    if (!props.container) return;
    props.container.classList.add('test-component');
    this.chart = init(props.container as HTMLDivElement);

    this.bindEvents(props);
    this.setOption(props);
    this.setLastSize(props);
  }

  /**
   * update 生命周期, 在更新时触发
   */
  update(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    this.setOption(props);

    this.setLastSize(props);
  }

  /**
   * umount 生命周期, 在卸载时触发
   */
  // umount(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
  //   console.log('trigger when component unmount');
  // }
}
export default MyComponent;
