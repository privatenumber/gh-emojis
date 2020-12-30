const { promises: fs } = require('fs');
const got = require('got');
const commentMark = require('comment-mark');

(async () => {
	const emojisJsonString = await got('https://api.github.com/emojis').text();

	await fs.writeFile('emojis.json', emojisJsonString);

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
