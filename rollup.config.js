import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

export default {
	input: 'emojis.json',
	plugins: [
		json({
			namedExports: false,
		}),
		terser(),
	],
	output: [
		{
			format: 'esm',
			file: 'emojis.esm.js',
		},
		{
			format: 'umd',
			file: 'emojis.umd.js',
			name: 'githubEmojis',
		},
	],
};
