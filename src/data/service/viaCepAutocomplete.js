import axios from "axios"

const translateViaCepToAddress = (viaCepData) => {
	return {
		street: viaCepData.logradouro,
		city: viaCepData.localidade,
		state: viaCepData.uf,
		cep: viaCepData.cep
	};
};

const getViaCepData= async (cep) => {
	cep = cep.replace(/\D/g, '')
	const autoCompleteCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
	console.log((autoCompleteCep));
	if (autoCompleteCep.data.erro) {
		return { cep: cep };
	}
	//retorna com os dados para o formulario
	return translateViaCepToAddress(autoCompleteCep.data)
}
export default getViaCepData;