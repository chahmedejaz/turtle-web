const getSummaryTable = () => {
	const summaryTable = localStorage.getItem("summaryTable");
	return JSON.parse(summaryTable);
};

const getDetails = () => {
	const details = localStorage.getItem("details");
	return JSON.parse(details);
};