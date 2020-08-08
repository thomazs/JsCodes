/***
* @description Função codbar - para geração da sequencia númerica de código de barras de arrecadação e linha digitável
* @syntax codbar(fatura_id, valor, contrato_id, dtvencimento)
* @parameters fatura_id - inteiro - Número do documento (fatura)
* @parameters valor - float - Valor da fatura com 2 dígitos decimais
* @parameters contrato_id - int - Número do contrato
* @parameters dtvencimento - String - representa a data de vencimento no formato ddmmyyyy
***/
function codbar(fatura_id, valor, contrato_id, dtvencimento){

    /*
    * @description mod10 - função que calcula o módulo 10, para dígitos verificadores
    * @parameters codigo - string contendo apenas números, que irão originar o DV em MOD10
    */
    mod10 =(codigo) => {
        let VSoma=0, VDgMultiplicador, VTamOrgCalc=codigo.length, VDG_NN, X, Y;
        for(X=1; X<=VTamOrgCalc; ++X){
            if ((VTamOrgCalc + X) % 2 == 0){
                Y = parseInt(codigo.charAt(X-1)) * 2;
                if (Y >= 10){
                    Y = String(Y);
                    VSoma += parseInt(Y.charAt(0)) + parseInt(Y.charAt(1));
                }else{
                    VSoma += Y;
                }
            }else{
                VSoma += parseInt(codigo.charAt(X-1));
            }
        }
        Y = VSoma % 10;
        return ((Y == 0) ? 0 : 10 - Y);
    }
    
    let vvalor=String(valor*100).padStart(11, '0'), vcontrato_id=String(contrato_id).padStart(8, '0');
    let vfatura_id=String(fatura_id).padStart(8, '0'), p, r1, r2;
    
    p = vvalor + "0474" + dtvencimento + vfatura_id + vcontrato_id + "2";
    r1 = String("826" + mod10("826" + p) + p);
    r2 = r1.substr(0, 11) + "-" + mod10(r1.substr(0, 11)) + " " + r1.substr(11, 11) + "-" + mod10(r1.substr(11, 11)) + " " + r1.substr(22, 11) + "-" + mod10(r1.substr(22, 11)) + " " + r1.substr(33, 11) + "-" + mod10(r1.substr(33, 11));
    return [r1, r2];
}
var cod = codbar(21817790, 23.79, 1095670, '17072020');
console.log('Codigo de Barras: '+ cod[0]);
console.log('Linha Digitável: '+ cod[1]);