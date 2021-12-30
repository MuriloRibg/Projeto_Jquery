function verificarFrase(){
    campo.on("input", () => {
        let digitacao = campo.val();
        let comparavel = frase.substr(0, digitacao.length) // subString
        if(digitacao == comparavel){
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

let tabela = $(".placar").find("tbody")
    let numPalavrar = $("#contador-palavras").text();
    let usuario = "Murilo"
    let botRemover = "<a href='#' class='botao-remover'><i class='small material-icons'>delete</i></a>"

    let linha = "<tr class = 'campo' >"+
                    "<td>"+usuario+"</td>"+
                    "<td>"+numPalavrar+"</td>"+
                    "<td>"+botRemover+"</td>"+
                "</tr>";


## Anotações
- A prevenir um comportamento comum com o event.preventDefault().
- Como envolver um elemento do HTML com as funções do jQuery
- A função .remove() para remover um elemento do HTML
- A função .parent() do jQuery, para subir na árvore do HTML
- 
