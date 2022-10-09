exports.getDate = () => {
	const date = new Date();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (day < 10) {
		day = "0" + day;
	}

	if (month < 10) {
		month = "0" + month;
	}

	return dateStr = `${month}/${day}`;
}

exports.getMonth = () => {
	const date = new Date();
	let month = date.getMonth() + 1;

	if (month < 10) {
		month = "0" + month;
	}

	return month;
}