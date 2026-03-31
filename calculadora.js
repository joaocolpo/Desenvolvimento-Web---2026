const valorConta = 100;
const percentualGorjeta = 15;

const valorGorjeta = valorConta * (percentualGorjeta / 100);
const valorTotal = valorConta + valorGorjeta;

console.log(
    `Valor da Conta: R$${valorConta.toFixed(2)}, Gorjeta (${percentualGorjeta}%): R$${valorGorjeta.toFixed(2)}, Total a pagar: R$${valorTotal.toFixed(2)}`
);