function inserirPlacar(){
    let tabela = $(".placar").find("tbody")
    let numPalavras = $("#contador-palavras").text();
    let usuario = "Murilo"

    let linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(remover)
    tabela.append(linha); // prepend coloca como primeiro, append coloca como antes

    $(".placar").stop().slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate(
    {
        scrollTop: posicaoPlacar+"px"
    }, 1000);
}

function remover(){
    event.preventDefault(); // para o evento padrão
    let linha = $(this).parent().parent().fadeOut() // fadeOut() = colocar o display none com transition
    linha.fadeOut(()=>{
        linha.remove()
    });
}

function novaLinha(usuario, palavras){   
    let linha = $("<tr>").addClass("campo");
    let colunaUsuario = $("<td>").text(usuario);
    let colunaPalavras = $("<td>").text(palavras);
    let botRemover = $("<td>");
    let link = $("<a>").addClass("botao-remover").attr("href", "#");
    let icone = $("<i>").addClass("small material-icons").text("delete");

    link.append(icone);
    botRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(botRemover);
    return linha
}

function esconderPlacar(){
    let botEsconder = $("#botao-placar");
    botEsconder.click(()=>{
        $(".placar").stop().slideToggle(600);
        //show()=mostrar, hide()=esconder, toggle()= se estiver mostrando ele esconde, vice versa 
    })
  
}
