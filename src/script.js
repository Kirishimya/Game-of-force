//poderia transformar jogador em um objeto
var botaodeChutePalavra = document.getElementsByClassName("chute-palavra").item(0);
var botaodeChute = document.getElementsByClassName("chute").item(0);
var botaoNovaPalavra = document.getElementsByClassName("nova-palavra").item(0);
var entradaLetra = document.getElementsByClassName("entrada-de-letra").item(0);
var entradaPalavra = document.getElementsByClassName("entrada-de-palavra").item(0);
var _aDica       = document.getElementsByClassName("dica").item(0);/*Depois de muita pesquisa achei o problema*/
var _aPalavra    = document.getElementsByClassName("palavra").item(0);/* document.getElementsByClassName 
                                                                        retornava uma lista de elementos*/
var darth_vader = document.getElementsByClassName("parte-do-boneco");
var status_do_jogador = document.getElementsByClassName("status-do-jogador");
var aviso_endgame = document.getElementsByClassName("aviso");
const WIN = 1;const LOSE = 0;
botaodeChute.addEventListener('click', ()=>{
    chutarLetra();
    atualizarJogador();
});
botaodeChutePalavra.addEventListener('click', ()=>{
    chutarPalavra();
    atualizarJogador();
});
botaoNovaPalavra.addEventListener('click', ()=>{
    sorteiaDicaePalavra();
    atualizarJogador();
});
//valores chave
var dicas = ["Frutas", "Pássaro e Animal doméstico"];
//valores
var frutas = ["Banana", "Laranja"];
var passaropet = ["Calopsita", "Papagaio", "Galo"];
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
//pontuação do jogador
var pontuacao = 0;
//sorteia a palavra
var numeroMaxdeChutes = 999;
//para verificar se o jogador venceu a rodada
//compare a palavraAmostra com a selecionada
function sorteiaDicaePalavra()
{   
    resetDarthVader();
    resetAvisos();
    dica = dicas[Math.round(Math.random()*dicas.length)%dicas.length];
    //alert(dica);
    letrasChutadas = [];
    letraChutada = -1;
    vidas = vidasMax;
    _aDica.textContent = "Dica: " + dica;
    let wordset = mapaDePalavras.get(dica);
    palavraSelecionada = wordset[Math.round(Math.random()*wordset.length)%wordset.length];
    numeroMaxdeChutes = palavraSelecionada.length - Math.round(palavraSelecionada.length/3);//ao invés de usar um numero constante
                                               //poderia adicionar opcões de dificuldade
                                               //e obter esse valor baseado na dificuldade
                                               //selecionada
    //alert(palavraSelecionada); 
}
function mostraPalavra()
{
    if(aviso_endgame.item(WIN).style.visibility=="visible"||aviso_endgame.item(LOSE).style.visibility=="visible")
    {
        _aPalavra.textContent = palavraSelecionada;
        return;
    }
    if(letrasChutadas.length<numeroMaxdeChutes){ 
        if(letrasChutadas.length==0)
        {
            let palavra = "";
            for(let i = 0; i<palavraSelecionada.length; i++)
            {
                palavra += "?";
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
                if(letraChutada.toUpperCase()==palavraSelecionada[k]||letraChutada.toLowerCase()==palavraSelecionada[k])
                {
                    acertou = true;
                    palavraAmostra = palavraAmostra.substring(0, k)+(letraChutada.toLowerCase()==palavraSelecionada[k]?letraChutada[0]:letraChutada.toUpperCase())+palavraAmostra.substring(k+1);
                    //console.log(palavraAmostra);
                }
            }
            //se errou, então DÃ DÃ DÃ~ TÃ~ TÃ DÃ~
            erou(acertou);
            
            letraChutada = -1;
        }
    }
    else
    {
        alert("Numero de máximo de chutes alcançado. Tente chutar a palavra.")
    }
    
    _aPalavra.textContent = palavraAmostra;
}
function erou(acertou)
{
    if(!acertou)
    {
        darth_vader.item(vidasMax-vidas).style.visibility = "hidden";
        vidas--;
        //console.log(darth_vader);
    }
}
function chutarLetra()
{

    if((numeroMaxdeChutes-letrasChutadas.length)==0)
    {
        alert("Tente adivinhar a palavra.");
        return;
    }
    letraChutada = entradaLetra.value;
    // console.log(letraChutada);
    // if(letraChutada==null)//quando o prompt é cancelado, ele retorna null//não uso mais o prompt
    // {
    //     letraChutada = -1;
    //     return;
    // }
    //caso o jogador não escreva nada
    if(letraChutada=="")
    {
        alert("Você não escreveu nada. /(.-.)\\");
        letraChutada = -1;
        return;
    }
    if(letraChutada.length>1)
    {
        alert("Entre apenas uma letra.");
        entradaLetra.value = "";
        letraChutada = -1;
        return;
    }
    if(letrasChutadas.includes(letraChutada))
    {
        alert("Essa letra já foi chutada!");
        entradaLetra.value = "";
        letraChutada = -1;
        return;
    }
    
    letrasChutadas.push(letraChutada);
    mostraPalavra();
}
var palavraAnterior = "";
function chutarPalavra()
{
    let chutePalavra = entradaPalavra.value;
    if(chutePalavra==palavraAnterior)
    {
        alert("Essa palavra já foi entrada uma vez.");
        return;
    }
    palavraAnterior = chutePalavra;
    chutePalavra = chutePalavra.substring(0, 1).toUpperCase()+chutePalavra.substring(1);
    // console.log(chutePalavra);
    if(chutePalavra.length>palavraSelecionada.length||chutePalavra.length<palavraSelecionada.length)
    {
        alert("Palavra maior ou menor que a palavra em questão.");
        return;
    }
    // if(chutePalavra==null)//quando o prompt é cancelado, ele retorna null//não uso prompt
    // {   
    //     alert("Você não escreveu nada. /(.-.)\\");
    //     return;
    // }
    if(chutePalavra!=palavraSelecionada)
    {
        erou(!true);
        vidas>0?alert("Não... eu não sinto a força dessa palavra."):null;
        return;
    }
    palavraAmostra = chutePalavra;
    _aPalavra.textContent = palavraAmostra;
    
    
    
    
}
function resetDarthVader()
{
    for(let i = 0; i<vidasMax; i++)
    {
        darth_vader.item(i).style.visibility = "visible";
    }
}
function resetAvisos()
{
    aviso_endgame.item(WIN).style.visibility = "hidden";   
    aviso_endgame.item(LOSE).style.visibility = "hidden";   
}
function atualizarJogador()
{
    //console.log(status_do_jogador)
    if(palavraAmostra==palavraSelecionada)
    {
        aviso_endgame.item(WIN).style.visibility = "visible";   
        pontuacao++;
    }
    if(vidas==0)
    {
        aviso_endgame.item(LOSE).style.visibility = "visible";   
    }
    let hp = status_do_jogador.item(0);
    let _pontuacao = status_do_jogador.item(1);
    let chutesRestantes = status_do_jogador.item(2);
    // //console.log(hp);
    hp.textContent = "Vidas restantes: "+vidas;
    _pontuacao.textContent = "Pontuação: "+pontuacao;
    chutesRestantes.textContent = "Chutes restantes: "+(numeroMaxdeChutes-letrasChutadas.length);
    mostraPalavra();
}
sorteiaDicaePalavra();
mostraPalavra();
atualizarJogador();

//console.log(palavraSelecionada);
//alert(_aDica.textContent);