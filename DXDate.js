class DXDate{
	/**************************
	* Classe: DXDate( [<date_in_format_yyyy_mm_dd>] )
	* Parameters: 
		- date_in_format_yyyy_mm_dd (opcional) - string da data no formato yyyy-mm-dd
	* Sintaxe: 
	*   - let a = new DXDate()  			//Cria com a data atual
	*   - let a = new DXDate('2021-03-25')  //Cria com uma data específica
	* 
	* Autor: Marcos Thomaz da Silva <marcosthomazs@gmail.com>
	* Livre para distribuição desde que citadas as fontes
	* Exemplos no final do arquivo
	***************************************************************************/
	
	constructor(valueDate){
		// param valueDate - date in format 'yyyy-mm-dd' ou objeto do tipo Date ou não informar
		this._monthNames = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ']
		this.instanceDateValues((valueDate ? valueDate : (new Date())));
	}
	
	mapDateToStr = (dateObject) => dateObject.toISOString().substr(0,10)
	
	instanceDateValues = (valueDate) => {
		// param valueDate - date in format 'yyyy-mm-dd' ou objeto do tipo Date
		let strDate = (typeof(valueDate) == 'object' && valueDate instanceof Date ? this.mapDateToStr(valueDate) : valueDate)
		let parts = strDate.split('-')
		this._day = parseInt(parts[2])
		this._month = parseInt(parts[1])
		this._year = parseInt(parts[0])
	}
	
	getStrDate = () => {
		let {day, month, year} = this
		return `${year}-${month}-${day}`
	}
		
	getDate = () => (new Date(this.getStrDate()))
	
	get day(){ return parseInt(this._day) }
	set day(newDay){this._day = newDay}
	
	get month(){ return parseInt(this._month) }
	set month(newMonth){this._month = newMonth}
	
	get year(){ return parseInt(this._year) }
	set year(newYear){this._year = newYear}
	
	getMonthName = () => { 
		return this.monthNames[ this._month - 1 ]
	}
	
	get monthNames(){ return this._monthNames }
	
	set monthNames(months){
		if (typeof(months) != 'object' || !(months instanceof Array) || months.length !== 12)
			throw 'Object is invalid'
		this._monthNames = months
	}
	
	decDay = (numberOfDays) => {
		let currDate = this.getDate()
		currDate.setDate(currDate.getDate() - numberOfDays)
		this.instanceDateValues(currDate)	
	}
	
	incDay = (numberOfDays) => {
		let currDate = this.getDate()
		currDate.setDate(currDate.getDate() + numberOfDays)
		this.instanceDateValues(currDate)
	}
	
	decMonth = (numberOfMonths) => {
		let currDate = this.getDate()
		currDate.setMonth(currDate.getMonth() - numberOfMonths)
		this.instanceDateValues(currDate)
	}
	
	incMonth = (numberOfMonths) => {
		let currDate = this.getDate()
		currDate.setMonth(currDate.getMonth() + numberOfMonths)
		this.instanceDateValues(currDate)
	}
	
	decYear = (numberOfYears) => {
		this.year -= numberOfYears
	}
	
	incYear = (numberOfYears) => {
		this.year += numberOfYears
	}
	
	getLastMonthDay = () => {
		let defaultMonths = [1,3,5,7,8,10,12]
		if (defaultMonths.indexOf(this.month) >= 0) 
			return 31
		if (this.month !== 2) 
			return 30
		return (this.year % 4 === 0 ? 29  : 28)
	}
	
	setToLastMonthDay = () => this.day = this.getLastMonthDay()
	
	setToFirstMonthDay = () => this.day = 1
	
	clone = () => new DXDate(this.getStrDate())
	
	intervalsBetween = (anotherDate, func_to_Label) => {
		//anotherDate é outro objeto DXDate
		let dI, dF, result = []
		
		const funcLabel = (func_to_Label ? func_to_Label : this.defaultLabelInterval)
		
		//Pega a menor entre as duas datas
		dI = (this.getDate() <  anotherDate.getDate() ? this.clone() : anotherDate.clone())
		
		//Pega a maior entre as duas datas
		dF = (this.getDate() <  anotherDate.getDate() ? anotherDate.clone() : this.clone())
		
		//Se as datas são iguais retorna um array vazio
		if (dI.getDate() === dF.getDate()) return result
		
		//Se não for o último dia do mês
		if (dF.day !== dF.getLastMonthDay()){
			dF.decMonth(1)  //substrai um mês. Isso para pegar apenas meses fechados		
			dF.setToLastMonthDay()  //vai para o último dia do mês anterior
		}

		while(dI.getDate() < dF.getDate()){
			let startInterval = dI.getStrDate()
			dI.setToLastMonthDay()
			let endInterval = dI.getStrDate()
			let labelInterval = funcLabel(dI.month, dI.year, this.monthNames)
			dI.incDay(1)
			result[result.length] = [startInterval, endInterval, labelInterval]
		}
		return result		
	}
	
	defaultLabelInterval = (currMonth, currYear, monthNames) => {
		// método que retorna o label dos intervalos. 
		//Serve como modelo, e não precisa ser utilizado, caso seja implementado um
		//  método equivalente (que recebe os mesmos parametros) e retorna uma string
		return monthNames[ currMonth - 1 ] + '/' + currYear;
	}
	
}



/***********************************************************************************
* EXEMPLOS
************************************************************************************/

// dataInicio pega a data de hoje (20/05/2021)
dataInicio1 = new DXDate()

// dataInicio pega a data do dia 23/04/2020
dataInicio2 = new DXDate('2020-04-23')

//Mostrar o dia 
console.log(dataInicio1.day)
// Mostra: 20

//Mostrar o mês 
console.log(dataInicio1.month)
//Mostra: 5

//Mostrar o ano
console.log(dataInicio1.year)
//Mostra: 2021

//Retornar a data em string
console.log(dataInicio1.getStrDate())
//Mostra: '2021-5-20'

//Retorna o último dia do mês
console.log(dataInicio1.getLastMonthDay())
//Mostra: 31

//Subtrai 10 dias de uma data
dataInicio1.decDays(10)
console.log(dataInicio1.getStrDate())
//Mostra: '2021-5-10'

//Subtrai 27 dias de uma data
dataInicio1.decDays(10)
console.log(dataInicio2.getStrDate())
//Mostra: '2021-3-26'

//Pegar o primeiro e o último dia do mês corrente (data atual: 21/05/2021):
dataPrimeiro = new DXDate()
dataPrimeiro.setToFirstMonthDay()
dataUltimo = new DXDate()
dataUltimo.setToLastMonthDay()
console.log(dataPrimeiro.getStrDate() , ' - ', dataUltimo.getStrDate())
//Mostra: '2021-5-1 - 2021-5-31'

//Pegar intervalo em meses entre duas datas, considerando apenas meses fechados
ini = new DXDate('2020-04-17')  //Data de início
fim = new DXDate()  //Data de fim. Aqui pega a data atual (21/05/2021)
r = fim.intervalsBetween(ini)  //Aqui pega o intervalo de datas
console.log(r);
/*
Mostra: 
0: (3) ["2020-4-17", "2020-4-30", "ABR/2020"]
1: (3) ["2020-5-1", "2020-5-31", "MAI/2020"]
2: (3) ["2020-6-1", "2020-6-30", "JUN/2020"]
3: (3) ["2020-7-1", "2020-7-31", "JUL/2020"]
4: (3) ["2020-8-1", "2020-8-31", "AGO/2020"]
5: (3) ["2020-9-1", "2020-9-30", "SET/2020"]
6: (3) ["2020-10-1", "2020-10-31", "OUT/2020"]
7: (3) ["2020-11-1", "2020-11-30", "NOV/2020"]
8: (3) ["2020-12-1", "2020-12-31", "DEZ/2020"]
9: (3) ["2021-1-1", "2021-1-31", "JAN/2021"]
10: (3) ["2021-2-1", "2021-2-28", "FEV/2021"]
11: (3) ["2021-3-1", "2021-3-31", "MAR/2021"]
12: (3) ["2021-4-1", "2021-4-30", "ABR/2021"]

Vale notar que o terceiro parâmetro é um rótulo para o intervalo,e o mesmo é flexível, isto é,
pode ser ajustado conforme a necessidade. Para isso, basta passar um segundo parâmetro para 
o método intervalsBetween. Esse segundo método seria uma função que recebe 3 parâmetros 
sendo (mesAtual, anoAtual e arrayComNomesDosMeses) e retorna uma String.
*/

//Pegar intervalo em meses entre duas datas, considerando apenas meses fechados, mudando o rótulo
novoRotulo = (mes, ano, meses) => {
	return `Referência ${mes} - ${ano} ` 
}
ini = new DXDate('2020-04-17')  //Data de início
fim = new DXDate()  //Data de fim. Aqui pega a data atual (21/05/2021)
r = fim.intervalsBetween(ini, novoRotulo)  //Aqui pega o intervalo de datas
console.log(r);
/*
Mostra: 
0: (3) ["2020-4-17", "2020-4-30", "Referência 4 - 2020 "]
1: (3) ["2020-5-1", "2020-5-31", "Referência 5 - 2020 "]
2: (3) ["2020-6-1", "2020-6-30", "Referência 6 - 2020 "]
3: (3) ["2020-7-1", "2020-7-31", "Referência 7 - 2020 "]
4: (3) ["2020-8-1", "2020-8-31", "Referência 8 - 2020 "]
5: (3) ["2020-9-1", "2020-9-30", "Referência 9 - 2020 "]
6: (3) ["2020-10-1", "2020-10-31", "Referência 10 - 2020 "]
7: (3) ["2020-11-1", "2020-11-30", "Referência 11 - 2020 "]
8: (3) ["2020-12-1", "2020-12-31", "Referência 12 - 2020 "]
9: (3) ["2021-1-1", "2021-1-31", "Referência 1 - 2021 "]
10: (3) ["2021-2-1", "2021-2-28", "Referência 2 - 2021 "]
11: (3) ["2021-3-1", "2021-3-31", "Referência 3 - 2021 "]
12: (3) ["2021-4-1", "2021-4-30", "Referência 4 - 2021 "]
*/


/*
//Parte de exemplo da classe criando um combobox

<div>
Meses:
<select name="intervalo" id="intervalo">
	<option> -- </option>
</select>
</div>
<div>Selecionado: <span id="r"></span></div>

<script>
var combo = document.querySelector('#intervalo')
var resultado = document.querySelector('#r')
let doc = document.querySelector('body')
doc.onload = () => {
	ini = new DXDate('2020-04-17')
	fim = new DXDate() 
	r = fim.intervalsBetween(ini)
	r.forEach((i, idx)=>{
		let elemento = document.createElement('option')
		elemento.value = i[0] + '_' + i[1]
		elemento.text = i[2]
		combo.append(elemento)
	})
	combo.onchange = () => {
		let valor = combo.value
		console.log(valor)
		if (valor) resultado.innerText = valor
		else resultado.innerText = ''
	}	
}
</script>