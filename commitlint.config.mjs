export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['fix', 'docs', 'style', 'refactor', 'test', 'chore']],
  },
};
