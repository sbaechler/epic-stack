import { default as defaultConfig } from '@epic-web/config/eslint'

/** @type {import("eslint").Linter.Config} */
export default [
	...defaultConfig,
	// add custom config objects here:
	{
		files: ['**/tests/**/*.ts'],
		ignores: ['**/.react-router/**'],
		rules: { 'react-hooks/rules-of-hooks': 'off' },
	},
]
