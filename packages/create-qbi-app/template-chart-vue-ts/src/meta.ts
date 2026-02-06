import type { Interfaces } from '@quickbi/bi-open-vue-sdk';

const componentMeta: Interfaces.ComponentMeta = {
  propsSchema: {
    styleSchema: {
      schema: {
        type: 'object',
        className: 'tabs-uischema-container',
        props: { mode: 'collapse' },
        properties: {
          // your custom style config
          fruit: {
            type: 'object',
            properties: {
              apple: {
                type: 'switch',
                defaultValue: true,
                props: {
                  mode: 'checkbox',
                  label: 'Apple',
                },
              },
              banana: {
                title: 'Banana',
                type: 'number',
                defaultValue: 1,
                props: {
                  maxLength: 20,
                },
              },
            },
          },
        },
      },
    },
    dataSchema: {
      areas: [
        {
          id: 'drill',
          name: '钻取/维度',
          queryAxis: 'drill',
          rule: {
            fieldTypes: ['dimension'],
            required: false,
            maxColNum: 6,
          },
        },
        {
          id: 'area_row',
          name: '维度',
          queryAxis: 'row',
          rule: {
            fieldTypes: ['dimension'], // [dimension, measure, all]
            maxColNum: 1,
            required: true,
          },
        },
        {
          id: 'area_column',
          name: '度量',
          queryAxis: 'column',
          rule: {
            fieldTypes: ['measure', 'dimension'],
            maxColNum: 3,
            required: true,
          },
        },
        {
          id: 'filters',
          name: '过滤器',
          queryAxis: 'filters',
          rule: {
            fieldTypes: ['dimension', 'measure'],
            required: false,
          },
        },
      ],
      resultDisplay: {
        upLimit: 1000,
      },
    },
  },
};

export default componentMeta;
