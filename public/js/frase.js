$(() => { //assim que ele carregar
    atualizarTabela();
});

$("#botao-sync").click(() => {
    event.preventDefault();
    pegarPlacar()
})

$("#botao-frase").click(() => {
    event.preventDefault();
    fraseAleatoria()
})

function atualizarTabela(){
    $.get("http://localhost:3000/placar", (data)=>{
        $(data).each(function(){
            let linha = novaLinha(this.usuario, this.pontos)
            linha.find(".botao-remover").click(remover)
            $("tbody").append(linha)
        })    
    })
}

function pegarPlacar() {
    let placar = [];
    let linhas = $("tbody>tr");
    linhas.each(function () {
        let usuario = $(this).find("td:nth-child(1)").text();
        let palavras = $(this).find("td:nth-child(2)").text();
        let score = {
            usuario: usuario,
            pontos: palavras
        };
        placar.push(score);

    });

    let dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", dados, ()=>{
        notificacaoCerto("Salvo com sucesso!")
    })
}

function fraseAleatoria() {
    $('#spinner').toggle();
    $.get("http://localhost:3000/frases", (data) => {
        trocaFraseAle(data);
    }).fail(() => {
        $("#erro").slideToggle(600)
        setTimeout(() => {
            $("#erro").slideToggle(600)
        }, 5000)
    }).always(() => { //sempre escondendo o spinner
        $('#spinner').toggle();
    })

}

function trocaFraseAle(data) {
    let frase = $(".frase");
    let numAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numAleatorio].texto);
    numeroPalavras();
    atualizaTamanhoFrase(data[numAleatorio].tempo);
}

function buscarFrase() {
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();

    //criacao do objeto JS que guarda a id
    var dados = {id : fraseId}; 

    //passando objecto como segundo parametro
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
    },2000);
    })
    .always(function(){
        notificacaoCerto("Frase: " + fraseId);
        $("#spinner").toggle();
    });
}



function trocaFrase(data) {
    let frase = $(".frase");
    frase.text(data.texto);
    numeroPalavras();
    atualizaTamanhoFrase(data.tempo);
}

function notificacaoCerto(frase) {
    Toastify({
        text: frase,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}
function notificacaoErro(frase) {
    Toastify({
        text: frase,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "background-color: darkred;",
            color: "white"
        }
    }).showToast();
}

