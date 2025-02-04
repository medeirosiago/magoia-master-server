function formatTimestamp(timestamp) {
	// Converte a string ISO para um objeto Date (considerando o fuso horário local)
	const date = new Date(timestamp);

	// Extrai os componentes da data
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() retorna mês de 0 a 11
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	// Retorna o objeto formatado conforme o padrão desejado
	return `${year}-${month}-${day}, ${hours}:${minutes}`;
}

export default formatTimestamp;