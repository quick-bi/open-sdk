import cac from 'cac';
import { cancel, isCancel, outro, select, text } from '@clack/prompts';
import type { Option } from '@clack/prompts';
import packageJson from '../package.json';
import { createApp } from './create';

interface PromptOption extends Option<string> {
  link?: string;
  children?: PromptOption[];
}

const prompts: PromptOption[] = [
  {
    label: 'Custom Chart',
    value: 'chart',
    link: 'https://help.aliyun.com/zh/quick-bi/user-guide/overview-of-custom-visualization?spm=a2c4g.11186623.help-menu-30343.d_2_10_4_0.2f795fb0wvme21&scm=20140722.H_3019886._.OR_help-T_cn~zh-V_1#cbf445b163edb',
    children: [
      {
        label: 'React + TypeScript',
        value: 'react-ts',
      },
      {
        label: 'Vue + TypeScript',
        value: 'vue-ts',
      },
      {
        label: 'Vanilla + TypeScript',
        value: 'vanilla-ts',
      },
    ],
  },
  {
    label: 'Custom Menu of Chart',
    value: 'menu-chart',
    link: 'https://help.aliyun.com/zh/quick-bi/user-guide/overview-of-custom-visualization?spm=a2c4g.11186623.help-menu-30343.d_2_10_4_0.2f795fb0wvme21&scm=20140722.H_3019886._.OR_help-T_cn~zh-V_1#b253a53779gj8',
    children: [
      {
        label: 'React + TypeScript',
        value: 'react-ts',
      },
    ],
  },
  {
    label: 'Custom Menu of Dashboard',
    value: 'menu-dashboard',
    children: [
      {
        label: 'React + TypeScript',
        value: 'react-ts',
      },
    ],
  },
  {
    label: 'Custom Menu of Workbook',
    value: 'menu-workbook',
    children: [
      {
        label: 'React + TypeScript',
        value: 'react-ts',
      },
    ],
  },
  {
    label: 'Custom Page',
    value: 'page',
    link: 'https://help.aliyun.com/zh/quick-bi/user-guide/overview-of-custom-visualization?spm=a2c4g.11186623.help-menu-30343.d_2_10_4_0.2f795fb0wvme21&scm=20140722.H_3019886._.OR_help-T_cn~zh-V_1#4268b3c9d7r3w',
    children: [
      {
        label: 'React + TypeScript',
        value: 'react-ts',
      },
      {
        label: 'Vue + TypeScript',
        value: 'vue-ts',
      },
      {
        label: 'Vanilla + TypeScript',
        value: 'vanilla-ts',
      },
    ],
  },
];

export async function cli() {
  const cli = cac(packageJson.name);
  const flattenPrompts = flatten(prompts);

  cli
    .command('[projectName]', 'Name of the project to create')
    .option('-t, --template [template]', 'Template you want to use')
    .action(async (name, options) => {
      const projectName =
        name ??
        checkCancel(
          await text({
            message: 'Project Name',
            validate: checkProjectName,
          }),
        );

      const templateOption = flattenPrompts.find(item => item.value === options.template || item.value === options.t);
      let template: string;

      if (templateOption) {
        template = templateOption.value;
        const text = await createApp(projectName, template);
        outro(text);
      } else {
        const type = checkCancel(
          await select({
            message: 'Template Type',
            options: prompts,
          }),
        );
        const { children: frameworks } = prompts.find(item => item.value === type) as PromptOption;

        const framework = checkCancel(
          await select({
            message: 'Framework',
            options: frameworks as PromptOption[],
          }),
        );

        template = [type, framework].join('-');
        const text = await createApp(projectName, template);
        outro(text);
      }
    });

  cli.help();
  cli.version(packageJson.version);
  cli.parse();
}

function checkCancel<T>(value: unknown) {
  if (isCancel(value)) {
    cancelAndExit();
  }
  return value as T;
}

function cancelAndExit() {
  cancel('Operation cancelled.');
  process.exit(0);
}

function checkProjectName(projectName: string) {
  if (projectName === undefined || projectName === null) {
    return 'Project name is required!';
  }
  if (!/^[a-z][a-z0-9_-]+$/.test(projectName)) {
    return `The project name must start with a letter and can only contain these symbols: a-z, 0-9, -, _`;
  }
}

function flatten(options: PromptOption[] = [], prefix?: string): PromptOption[] {
  return options.reduce<PromptOption[]>((acc, option) => {
    const value = [prefix, option.value].filter(Boolean).join('-');
    return [
      ...acc,
      {
        ...option,
        value,
      },
      ...flatten(option.children, value),
    ];
  }, []);
}
