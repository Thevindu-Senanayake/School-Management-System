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