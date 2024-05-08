/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb-base',
		'airbnb-typescript/base',
		'plugin:svelte/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
		project: './tsconfig.json',
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
	],
	rules: {
		'import/no-mutable-exports': 'off',
		'import/prefer-default-export': 'off',
		'import/extensions': 'off',
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'import/no-unresolved': 'off',
		'@typescript-eslint/no-throw-literal': 'off',
		'no-plusplus': 'off',
		'consistent-return': 'off',
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				"args": "all",
				"argsIgnorePattern": "^_",
				"caughtErrors": "all",
				"caughtErrorsIgnorePattern": "^_",
				"destructuredArrayIgnorePattern": "^_",
				"varsIgnorePattern": "^_",
				"ignoreRestSiblings": true
			}
		]
	},
};
