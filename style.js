
class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', { //object.defineproperty = para definir as propriedades de cfpLimpo
            writable: false, // n pode escrever nela
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '') //para remover qqer coida que nao seja numero 
        });

    }
    // validar o cpfLimpo
    valida() {
        if (!this.cpfLimpo) return false; // si nao existir essa variavel limpo return false 
        if (typeof this.cpfLimpo !== 'string') return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.eSequencia()) return false;
        this.geraNovoCpf()

        return this.novoCpf === this.cpfLimpo;
    }

    // si for uma sequencia o cpf tbm vai retorn FALSE 
    eSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    // gerar um novo cpf 
    geraNovoCpf() {
        const cpfSemDigito = this.cpfLimpo.slice(0, -2); //é o limpo sem os dois ultimos digitos 
        const digito1 = ValidaCPF.geraDigito(cpfSemDigito);
        const digito2 = ValidaCPF.geraDigito(cpfSemDigito + digito1);
        this.novoCpf = cpfSemDigito + digito1 + digito2;
    }

    //metodo statico por nao usar this  
    static geraDigito(cpfSemDigito) { // onde precisar usar esse metodo colocaremos o nome da class
        let total = 0;
        let reverso = cpfSemDigito.length + 1; // aqui sao 10 caracter  + 1 = 11

        for (let stringNumerica of cpfSemDigito) {
            total += reverso * Number(stringNumerica); // é o total de numeros sme os digitos (11digitos)
            reverso--;
        }

        const digito = 11 - (total % 11); //essa conta 
        return digito <= 9 ? String(digito) : '0'; // re der menor ou igual a nove rerona digito ou si nao '0'
    }
}

let validaCpf = new ValidaCPF('070.987.720-03');

if (validaCpf.valida()) {
    console.log('CPF Valido ');
} else {
    console.log('CPF invalido')
}
             //1º  2º
/*705.484.450-  5  2

7x 0x 5x 4x 8x 4x 4x 5x 0x 
10 9  8  7  6  5  4  3   2 
=
70 0  40 28 48 20 16 15  0 = 237


11 - (237 % 11) = 5 (primeiro digito)
si for maior que 9 é 0(zero)


7x 0x 5x 4x 8x 4x 4x 5x 0x 5x (acrescenta o primero digito e coloca 11 )
11 10 9  8  7  6  5  4  3  2 
= 
77 0 45 32 56 24 20  20 0 10 = 284

11 - (284 % 11) = 2 (segundo digito)
*/

