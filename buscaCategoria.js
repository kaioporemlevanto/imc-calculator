const btn = document.querySelector('button')
var peso = document.getElementById('peso')
var altura = document.getElementById('altura')
var resultado = document.getElementById('resultado')
var resultadoCategoria = document.getElementById('resultadoImc')

var erro = '' // variavel que recebe mensagens de erro
var categoriaImc = '' // variavel que recebe categoria

btn.addEventListener('click', () => {
    if (peso.value == '') {
        erro = "informe um valor para o peso"
        alert(erro)
    } else if (altura.value == '') {
        erro = "informe um valor para a altura"
        alert(erro)
    } else {
        var peso_correto = parseFloat(peso.value)
        var altura_correta = parseFloat(altura.value)
        var imc = calculaImc(peso_correto, altura_correta)
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "listagem.js")

        xhr.addEventListener("load", function () {
            var resposta = xhr.responseText;
            var categorias = JSON.parse(resposta)
            var categoriaImc = ''

            categorias.forEach(function (categoria) {
                if ((imc > categoria.imc_minimo) && (imc < categoria.imc_maximo)) {
                    categoriaImc = categoria.categoria
                }
                resultadoCategoria.innerHTML = categoriaImc
            });
        });

        resultado.value = imc.toFixed(2)
        imcElement = document.getElementById('imc')
        imcElement.innerHTML = `IMC Calculado: ${imc.toFixed(2)}` // Atualiza o IMC calculado
        resultadoCategoria.innerHTML = categoriaImc
    }
    xhr.send()
});

function calculaImc(peso, altura) {
    return (peso / (altura * altura))
}