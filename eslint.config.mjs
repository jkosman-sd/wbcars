// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import js from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier/flat';
import checkFilePlugin from 'eslint-plugin-check-file';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import storybook from "eslint-plugin-storybook";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  js.configs.recommended,
  prettierConfig,
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  {
    plugins: {
      'check-file': checkFilePlugin,
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'app/**': 'NEXT_JS_APP_ROUTER_CASE',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          name: 'tailwind-merge',
          message: 'Please use cn "import { cn } from "@/lib/utils"" instead.',
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'TSTypeReference[typeName.type="TSQualifiedName"][typeName.left.name="React"][typeName.right.name="FC"]',
          message: 'Do not use React.FC. Use regular function declarations instead.',
        },
        {
          selector:
            'TSTypeReference[typeName.type="TSQualifiedName"][typeName.left.name="React"][typeName.right.name="FunctionComponent"]',
          message: 'Do not use React.FunctionComponent. Use regular function declarations instead.',
        },
      ],
      'no-unused-vars': 'off',
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports
            ['^\\u0000'],
            // Node.js builtins prefixed with `node:`
            ['^node:'],
            // Packages
            ['^react', '^@(?!assets|lib|components|styles|icons|features)\\w', '^'],
            // Absolute imports by alias
            ['^@lib/', '^@components/', '^@styles/', '^@assets/', '^@icons/', '^@features/', '^@/'],
            // Relative imports
            ['^\\.'],
          ],
        },
      ],
    },
  },
  ...storybook.configs["flat/recommended"]
];

export default eslintConfig;
