
var botaodeChute = document.getElementsByClassName("chute").item(0);
var _aDica       = document.getElementsByClassName("dica").item(0);/*Depois de muita pesquisa achei o problema*/
var _aPalavra    = document.getElementsByClassName("palavra").item(0);/* document.getElementsByClassName 
                                                                        retornava uma lista de elementos*/
var darth_vader = document.getElementsByClassName("parte-do-boneco");
botaodeChute.addEventListener('click', ()=>{
    chutarLetra();
});
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
//parte da palavra que está visivel para o jogador de acordo com as letras certas que ele digitou
var palavraAmostra = "";
//palavra selecionada para jogar e a dica
var palavraSelecionada, dica;
//letra chutada
var letraChutada = -1;//-1 significa que já chutou ou não chutou
//letras chutadas
var letrasChutadas = [];
//quantidade de vidas do jogador
const vidasMax = 6;
var vidas = vidasMax;
//letras que já foram chutadas
var chutes = [];
//sorteia a palavra
function sorteiaDicaePalavra()
{   
    dica = dicas[Math.round(Math.random()*dicas.length)%dicas.length];
    //alert(dica);
    _aDica.textContent = "Dica: " + dica;
    let wordset = mapaDePalavras.get(dica);
    palavraSelecionada = wordset[Math.round(Math.random()*wordset.length)%wordset.length];
    //alert(palavraSelecionada); 
}
function mostraPalavra()
{
    if(letrasChutadas.length==0)
    {
        let palavra = "";
        for(let i = 0; i<palavraSelecionada.length; i++)
        {
            palavra += " + ";
        }
        palavraAmostra = palavra;
        _aPalavra.textContent = palavraAmostra;
        return;
    }
    if(letraChutada!=-1)
    {
        let acertou = false;
        for(let k = 0; k<palavraSelecionada.length; k++)
        {
            if(letraChutada==palavraSelecionada[k]||letraChutada)
            {
                acertou = true;
                palavraAmostra[k] = letraChutada;
            }
        }
        if(!acertou)
        {
            
        }
        letraChutada = -1;
    }
    console.log(palavraAmostra);
    _aPalavra.textContent = palavraAmostra;
}
function chutarLetra()
{
    do
    {
        letraChutada = prompt("Entre uma letra.");
        console.log(letraChutada);
        if(letraChutada.length>1)
            alert("Entre apenas uma letra.");
    }while(letraChutada.length>1);
    letrasChutadas.push(letraChutada);
    mostraPalavra();
}
sorteiaDicaePalavra();
mostraPalavra();
console.log(palavraSelecionada);
//alert(_aDica.textContent);