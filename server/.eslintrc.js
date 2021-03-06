module.exports = {
	env: {
		node: true,
	},
	extends: ['airbnb-base', 'prettier'],
	plugins: ['prettier', 'import'],
	rules: {
		camelcase: 'off',
		'no-console': 'off',
		'prettier/prettier': ['error'],
		'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
	},
};
