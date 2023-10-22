module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
  env: {
    browser: true,
    es2021: true
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.json']
      }
    }
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false
      }
    ],
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-floating-promises': 0,
    'react/no-array-index-key': 0,
    '@typescript-eslint/no-unsafe-enum-comparison': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: 1
      }
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'last',
        ignoreCase: true,
        reservedFirst: true
      }
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', disallowTypeAnnotations: false }
    ],
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'import/export': 0,
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '~pages/*',
            group: 'parent'
          },
          {
            pattern: '~*',
            group: 'internal'
          },
          {
            pattern: '~*/**',
            group: 'internal'
          },
          {
            pattern: './**',
            group: 'index'
          }
        ],
        alphabetize: {
          order: 'asc'
        }
      }
    ]
  }
};
