module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'react-refresh'],
	rules: {
		'react-refresh/only-export-components': 'warn',
		'react/react-in-jsx-scope': 0,
		'no-console': 0,
		'linebreak-style': 0,
		'import/no-extraneous-dependencies': 0,
		'jsx-a11y/anchor-is-valid': 0,
		'max-len': 0,
	},
};
