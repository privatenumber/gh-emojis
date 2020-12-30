const { promises: fs } = require('fs');
const got = require('got');
const { rollup } = require('rollup');
const commentMark = require('comment-mark');

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

	let mdString = await fs.readFile('./README.md');

	mdString = commentMark(mdString, {
		emojis: [
			'| Name | Emoji | Name | Emoji |',
			'| - | - | - | - |',
			...((rows) => {
				const emojis = Object.entries(JSON.parse(emojisJsonString));
				const emojiColumns = ([name, url] = []) => [
					name ? `\`${name}\`` : '',
					url ? `<img width="20" src="${url}">` : '',
				].join(' | ');

				for (let i = 0; i < emojis.length; i += 2) {
					rows.push(`| ${emojiColumns(emojis[i])} | ${emojiColumns(emojis[i + 1])} |`);
				}
				return rows;
			})([]),
		].join('\n'),
	});

	await fs.writeFile('./README.md', mdString);
})();
