
var botaodeChute = document.getElementsByClassName("chute");
var _aDica = document.getElementsByClassName("dica");
var _aPalavra = document.getElementsByClassName("palavra");

//valores chave
var dicas = ["Frutas", "Pássaro e Animal doméstico"];
//valores
var frutas = ["Banana", "Laranja"];
var passaropet = ["Calopsita", "Papagaio"];
//todas as palavras estão aqui em ordem de declaração
var todasPalavras = [];
todasPalavras.push(frutas);
todasPalavras.push(passaropet);
//cria mapa
var mapaDePalavras = new Map();
    for(let i =0; i<dicas.length; i++)
        mapaDePalavras.set(dicas[i], todasPalavras[i]);
//palavra selecionada para jogar e a dica
var palavraSelecionada, dica;
//quantidade de vidas do jogador
const vidasMax = 6;
var vidas = vidasMax;
//letras que já foram chutadas
var chutes = [];
//sorteia a palavra
function drawWord()
{   
    dica = dicas[Math.round(Math.random()*dicas.length)];
    //alert(dica);
    _aDica.textContent = "Dica: " + dica;
    let wordset = mapaDePalavras.get(dica);
    palavraSelecionada = wordset[Math.round(Math.random()*wordset.length)];
    //alert(palavraSelecionada); 
}
function showWord()
{

    for(let i = 0; i<palavraSelecionada.length; i++)
    {

    }
}
drawWord();
//alert(_aDica.textContent);