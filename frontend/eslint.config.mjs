import eslintPluginReact from 'eslint-plugin-react';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'], // Apply to all JavaScript/TypeScript files
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        browser: true, // Browser environment globals
        node: true,    // Node.js environment globals
      },
      parser: typescriptEslintParser, // Use TypeScript parser
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX support
        },
      },
    },
    plugins: {
      react: eslintPluginReact,
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
    },
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
    ], // Ignore unnecessary directories
  },
];
