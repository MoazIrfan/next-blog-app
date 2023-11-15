const ask = require('./ask');

module.exports = async () => {
	const name = await ask({
		name: `name`,
		message: `Project Name?`,
		hint: `(kebab-case only)`
	});
	const authorName = await ask({
		name: `authorName`,
		message: `author name?`
	});
	

	const vars = {
		name,
		authorName
	};

	return vars;
};