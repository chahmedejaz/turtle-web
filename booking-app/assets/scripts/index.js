const formatDate = (date) => {
	if (date === "") return "<No date selected>";
	const dateObject = new Date(date);

	const year = dateObject.getFullYear();
	const month = String(dateObject.getMonth() + 1).padStart(2, "0");
	const day = String(dateObject.getDate()).padStart(2, "0");
	return `${day}/${month}/${year}`;
};

const currentDate = () => {
	const dateObject = new Date();

	const year = dateObject.getFullYear();
	const month = String(dateObject.getMonth() + 1).padStart(2, "0");
	const day = String(dateObject.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
};

const getTime = (selectedBeginTime, selectedEndTime, timeOptions) => {
	const beginTime = timeOptions.filter(
		(timeOption) => Number(selectedBeginTime) == timeOption.value
	)[0].label;
	const endTime = timeOptions.filter(
		(timeOption) => Number(selectedEndTime) == timeOption.value
	)[0].label;
	return `${beginTime} to ${endTime}`;
};

const getDuration = (selectedBeginTime, selectedEndTime) => {
	const durations = { normal: 0, peak: 0, total: 0 };
	for (
		let time = Number(selectedBeginTime);
		time < Number(selectedEndTime);
		time++
	) {
		durations.total += 1;
		// peak hrs
		if ([10, 11, 12, 13, 15, 16, 17, 18].includes(time)) {
			durations.peak += 1;
		} else {
			durations.normal += 1;
		}

		// 3 hrs ( 02 Normal : 01 Peak)
	}
	return `${durations.total} hrs ( ${durations.normal} Normal : ${durations.peak} Peak)`;
};

const ticketsInfo = (tickets, selectedBeginTime, selectedEndTime) => {
	const selectedTickets = tickets.filter((ticket) => ticket.quantity);
	const info = [];
	selectedTickets.forEach((ticket) => {
		info.push({
			ticket: ticket,
			charges: getCharges(ticket, selectedBeginTime, selectedEndTime),
		});
	});
	return info;
};

const getCharges = (ticket, selectedBeginTime, selectedEndTime) => {
	let totalCharges = 0;

	for (
		let time = Number(selectedBeginTime);
		time < Number(selectedEndTime);
		time++
	) {
		// peak hrs
		if ([10, 11, 12, 13, 15, 16, 17, 18].includes(time)) {
			switch (ticket.name) {
				case "SL Adult":
					totalCharges += 6;
					break;
				case "SL Child":
					totalCharges += 3;
					break;
				case "Foreigner Adult":
					totalCharges += 13;
					break;
				case "Foreigner Child":
					totalCharges += 8;
					break;
				default:
					break;
			}
		} else {
			switch (ticket.name) {
				case "SL Adult":
					totalCharges += 4;
					break;
				case "SL Child":
					totalCharges += 2;
					break;
				case "Foreigner Adult":
					totalCharges += 10;
					break;
				case "Foreigner Child":
					totalCharges += 5;
					break;
				default:
					break;
			}
		}
	}
	return ticket.quantity * totalCharges;
};

const shouldDisablePurchase = (tickets, selectedDate) => {
	return (
		tickets.every((ticket) => !ticket.quantity) || selectedDate === ""
	);
};

const storeSummaryTable = (
	selectedDate,
	tickets,
	selectedBeginTime,
	selectedEndTime,
	timeOptions
) => {
	const summaryTable = {
		date: formatDate(selectedDate),
		time: getTime(selectedBeginTime, selectedEndTime, timeOptions),
		duration: getDuration(selectedBeginTime, selectedEndTime),
		ticketsInfo: ticketsInfo(tickets, selectedBeginTime, selectedEndTime),
		totalCharges: getTotalCharges(tickets, selectedBeginTime, selectedEndTime)
	};
	localStorage.setItem("summaryTable", JSON.stringify(summaryTable));
};

const resetForm = () => {
	location.reload();
};

const getTotalCharges = (tickets, selectedBeginTime, selectedEndTime)=>{
	let charges = 0;
	ticketsInfo(tickets, selectedBeginTime, selectedEndTime).map((info) => charges += info.charges);
	return `$${charges}`
}