const shouldDisablePurchase = (cardNumber, expiryDate, CVC_CVV, name) => {
	return (
		cardNumber.value === "" ||
		expiryDate.value === "" ||
		CVC_CVV.value === "" ||
		name.value === "" ||
		!validateCardNumber(cardNumber) ||
		!validateExpiryDate(expiryDate) ||
		!validateCVC(CVC_CVV) ||
		!validateCardName(name)
	);
};

const touchedField = (field) => {
	field.touched = true;
};

// true means the field is valid
const validateField = (field) => {
	if (field.touched && field.value === "") return false;
	return true;
};

const getSummaryTable = () => {
	const summaryTable = localStorage.getItem("summaryTable");
	return JSON.parse(summaryTable);
};

const storePaymentDetails = (cardNumber, expiryDate, CVC_CVV, name) => {
	const paymentDetails = {
		cardNumber: cardNumber.value,
		expiryDate: expiryDate.value,
		CVC_CVV: CVC_CVV.value,
		name: name.value,
	};

	localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));
};

const validateCardNumber = (cardNumber) => {
	if(cardNumber.touched) {
		return cardNumber.value.length === 16;
	}
	return true;
}

const validateExpiryDate = (expiryDate) => {
	if (expiryDate.touched) {
		const dateObject = new Date();

		const currentYear = dateObject.getFullYear().toString().slice(2);
		const currentMonth = String(dateObject.getMonth() + 1).padStart(2, "0");
		const [cardMonth, cardYear] = expiryDate.value.split('/');
		
		return (
			(cardYear > currentYear) ||
			((cardYear === currentYear) && cardMonth >= currentMonth)
		);
	}
	return true;
}

const validateCVC = (CVC_CVV) => {
	if (CVC_CVV.touched) {
		return CVC_CVV.value.length === 3;
	}

	return true;
}

const validateCardName = (name) => {
	if(name.touched){
		return constainsAlphabets(name.value);
	};

	return true;
}

const constainsAlphabets = (str) => {
  return /^[A-Za-z\s]*$/.test(str);
}