exports.getDate = () => {
	const date = new Date();
	let month = addZero(date.getMonth() + 1);
	let day = addZero(date.getDate());

	return (dateStr = `${month}/${day}`);
};

exports.getMonth = () => {
	const date = new Date();
	let month = date.getMonth() + 1;

	if (month < 10) {
		month = "0" + month;
	}

	return month;
};

exports.getTime = () => {
	const date = new Date();
	let meridian = "AM";

	let hours = addZero(date.getHours());
	let minutes = addZero(date.getMinutes());

	if (hours > 12) {
		hours = hours - 12;
		meridian = "PM";
	}

	return `${hours}:${minutes} ${meridian}`;
};

const addZero = (value) => {
	return value < 10 ? `0${value}` : value;
};
