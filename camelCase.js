toCamelCase = (texto, toIgnore, toFixLower, toFixUpper) => {
	/*
	Params:
		- texto: Text to convert to camelcase
	  - toIgnore: (optional) array with terms to keep as-is
	  - toFixLower: (optional) array with terms (in lowercase) to force in Lower Case
	  - toFixUpper: (optional) array with terms (in lowercase) to force in Upper Case
	Usage:
		> toCamelCase("teste teste de teste do teste com teste")
	    Output: Teste Teste de Teste do Teste Com Teste
		> toCamelCase("teste teste de teste do teste com teste", ["com"])
	    Output: Teste Teste de Teste do Teste com Teste
		> toCamelCase("teste teste de teste do teste com teste na AnBIMA do bacen BACEN", ["AnBIMA"], null, ['BACEN'])
	    Output: Teste Teste de Teste do Teste com Teste na AnBIMA do BACEN BACEN
	  // Using String Prototype
	  > let texto = 'teste de texto normal'
    > console.log(texto.toCamelCase())
      Output: Teste de Texto Normal
	*/
	let termsToFixLower = ['de', 'do', 'da', 'dos', 'das', 'o', 'a', 'os', 'as', 'e', 'no', 'na', 'nos', 'nas']
	let termsToFixUpper = ['SP', 'AC', 'RJ']
	let termsToIgnore = []
	let upperAfter = ['.', "'", "\`", "\´", ","]
	let parts = texto.split(' ')
	if (toIgnore) termsToIgnore.push(...toIgnore);
	if (toFixLower) termsToFixLower.push(...toFixLower);
	if (toFixUpper) termsToFixUpper.push(...toFixUpper);
	let resultado = ''
	for(k=0; k < parts.length; k++){
		var term = parts[k]
		if (resultado !== '') resultado = resultado + ' '
		if (termsToIgnore.indexOf(term) >= 0) {
			resultado += term
		} else if (termsToFixLower.indexOf(term.toLowerCase()) >= 0) {
			resultado += term.toLowerCase()
		} else if (termsToFixUpper.indexOf(term.toUpperCase()) >= 0) {
			resultado += term.toUpperCase()
		} else {
			let isUpper = true
			for (let i = 0; i < term.length; ++i) {
				let c = term.charAt(i)
				resultado += (isUpper ? c.toUpperCase() : c.toLowerCase())
				isUpper = (upperAfter.indexOf(c) >= 0)
			}
		}
	}
	return resultado
}
String.prototype.toCamelCase = function(){return toCamelCase(this)};