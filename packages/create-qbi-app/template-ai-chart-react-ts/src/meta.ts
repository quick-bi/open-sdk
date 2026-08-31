import type { Interfaces } from '@quickbi/bi-open-react-sdk';
import { defineMeta } from '@quickbi/bi-open-react-sdk';

export default defineMeta<Interfaces.AICustomComponentMeta>({
  dataSchema: {
    areas: [
      {
        id: 'area_row',
        name: '维度',
        description: '分类轴，绑定维度字段',
        queryAxis: 'row',
        rule: {
          fieldTypes: ['dimension'],
          maxColNum: 1,
          required: true,
        },
      },
      {
        id: 'area_column',
        name: '度量',
        description: '数值轴，绑定度量字段',
        queryAxis: 'column',
        rule: {
          fieldTypes: ['measure'],
          maxColNum: 3,
          required: true,
        },
      },
    ],
  },
});
