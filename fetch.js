const { promises: fs } = require('fs');
const got = require('got');
const { rollup } = require('rollup');

(async () => {
	const emojisJsonString = await got('https://api.github.com/emojis').text();
	const bundle = await rollup({
		input: '',
		plugins: [{
			resolveId: id => id,
			load: () => `export default ${emojisJsonString}`,
		}],
	});

	await Promise.all([
		fs.writeFile('emojis.json', emojisJsonString),
		bundle.write({
			file: 'emojis.umd.js',
			format: 'umd',
			name: 'githubEmojis',
		}),
		bundle.write({
			file: 'emojis.esm.js',
			format: 'esm',
		}),
	]);
})();
