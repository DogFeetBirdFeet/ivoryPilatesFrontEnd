import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', '*.config.js'] },

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // Prettier는 마지막에 (다른 포맷팅 규칙을 덮어씀)
  prettier,

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // 포맷팅 관련 ESLint 규칙 명시적으로 끄기
      'max-len': 'off',
      'object-curly-newline': 'off',
      'function-paren-newline': 'off',
    },
  }
);
