const applyCpfMask = (value) => {
	value = value.replace(/\D/g, '');
	//quebra e aplica a mascara
	if (value.length <= 3) return value;
	if (value.length <= 6) return `${value.slice(0, 3)}.${value.slice(3)}`;
	if (value.length <= 9) return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
	return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;
};

const applyCepMask = (value) => {
	value = value.replace(/\D/g, '');
	//aplica a mascara
	if (value.length <= 5) return value;
	return `${value.slice(0, 5)}-${value.slice(5, 8)}`;
};
const applyPhoneMask = (value) => {
	value = value.replace(/\D/g, '');

	if (value.length <= 2) return `(${value}`;
	if (value.length <= 5) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
	if (value.length <= 10) return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
	return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
};

const maskInput = (name,value) =>{
	if(name === "cpf"){
		value = applyCpfMask(value);
	}
	if(name === "cep"){
		value = applyCepMask(value);
	}
	if(name == "phone"){
		value= applyPhoneMask(value);
	}
	return value
}

export default maskInput;