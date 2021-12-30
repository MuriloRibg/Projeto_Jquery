$(() => { //assim que ele carregar
    atualizarTabela();
    buscarFrase();
});

$("#botao-sync").click((event) => {
    event.preventDefault();
    pegarPlacar()
})

$("#botao-frase").click((event) => {
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
    $("#botao-frase-id").click((event) => {
        21
        let num = $("#frase-id").val()
        let dados = {
            id: num
        }

        $.get("http://localhost:3000/frases/", dados, trocaFrase).fail(() => { //tem q enviar um objeto
            console.error()
        }).always(() => {
            notificacaoCerto("Frase: " + num);
        })
    })
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

