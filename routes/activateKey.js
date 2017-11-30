const generateHash = require('../modules/generateHash');

module.exports = (context) => {
	let hash = '';
	let id = '';
	let associateText = '';

	if (context.body.key) {
		const key = context.body.key;
		hash = key.substring(0, 64 - 1);
		id = key.substring(64);
	}
	if (context.body.associateText) {
		associateText = context.body.associateText;
	}

	// check required parameters
	if(hash === '' || id === '' || associateText === '') {
		return context.response.error(0);
	}

	const idHash = generateHash(context.config.secretCode + id);

	// validate id hash
	if(idHash !== hash) {
		return context.response.error(1);
	}

	const associateHash = generateHash(context.config.secretCode2 + associateText);

	return context.response.success('activate key');
};
