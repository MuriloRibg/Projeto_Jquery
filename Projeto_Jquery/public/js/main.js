let campo = $(".campo-digitacao");
let tempoInicial =  $("#tempo-digitacao").text();// salvando o tempo inicial


$( () => { //Assim q a pág for carregada, ele vai rodar essa funções.
    numeroPalavras();
    tamanhoFrase();
    tempoJogo();
    verificarFrase();
    reiniciar();
    esconderPlacar();
})

function atualizaTamanhoFrase(tempo){
    $("#tempo-digitacao").text(tempo)
    tempoInicial = tempo;
}

function numeroPalavras(){
    let frase = $(".frase").text();
    let numPalavras = frase.split(" ").length;
    let tamFrase = $("#tamanho-frase")
    tamFrase.text(numPalavras);
}

function tamanhoFrase(){
    campo.on("input", () => {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length -1;  // qualquer espaço vazio
        $("#contador-palavras").text(qtdPalavras);
        $("#contador-caracteres").text(conteudo.length)
    });
}

function verificarFrase(){
    campo.on("input", () => {
        let frase = $(".frase").text();
        let digitado = campo.val()
        if(frase.startsWith(digitado)){ //começa com o valor digitado ou não
            campo.addClass("campo-correto");
            campo.removeClass("campo-errado");
            // campo.css("font-size", "2rem") // css direto do jquery
        }
        else{
            campo.addClass("campo-errado");
            campo.removeClass("campo-correto");
        }
    })
}


function tempoJogo() {
    campo.one("focus", () => {  // quando ele entrar no campo
        let tempoDigitacao = $("#tempo-digitacao").text();
        let tempo = setInterval( () => {
            tempoDigitacao--;
            $("#tempo-digitacao").text(tempoDigitacao);
            $("#botao-reiniciar").attr("disabled",  true);
            if(tempoDigitacao < 1){
                clearInterval(tempo); //parando a função
                fimJogo();
            } 
        },1000); //1000 ms = segundo parâmetro
    })
}

function fimJogo(){
    campo.attr("disabled", true);
    $("#botao-reiniciar").attr("disabled", false); // attr = criando uma tributo 
    campo.toggleClass("campo-desativado") // se vc estiver com a classe ele tira, e se vc estiver sem a classe ele coloca.
    inserirPlacar();
}


function reiniciar(){
    $("#botao-reiniciar").click(() => {
        campo.attr("disabled", false)
        campo.val("")
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0")
        $("#tempo-digitacao").text(tempoInicial);
        campo.toggleClass("campo-desativado")
        campo.removeClass("campo-correto campo-errado")
        tempoJogo();
    })
}


