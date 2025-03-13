// codigo para executar projeto

//importando o modulo
import {calcularIMC, tabelaIMC} from "./calculadoraIMC.js"

console.log(">>> Calculadora IMC<<<")
console.table(tabelaIMC)

const peso = 80
const altura = 1.70

const resultado = calcularIMC(peso, altura)
console.log("o seu imc é: ")
console.log(resultado.toFixed(2))

//importar modulo externo, biblioteca
import moment from "moment"

const hoje = moment().locale('pt-br')
console.log("Data: ")
console.log(hoje.format("DD/MM/YYYY"))
console.log("Hora: ")
console.log(hoje.format("HH:MM"))

//Calculadora idade
import moment from 'moment';

const anoNascimento = 1999;
const idade = calcularIdade(anoNascimento);
console.log(`Idade: ${idade} anos`);
