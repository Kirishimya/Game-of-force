//poderia transformar jogador em um objeto
var botaodeChutePalavra = document.getElementsByClassName("chute-palavra").item(0);
var botaodeChute = document.getElementsByClassName("chute").item(0);
var _aDica       = document.getElementsByClassName("dica").item(0);/*Depois de muita pesquisa achei o problema*/
var _aPalavra    = document.getElementsByClassName("palavra").item(0);/* document.getElementsByClassName 
                                                                        retornava uma lista de elementos*/
var darth_vader = document.getElementsByClassName("parte-do-boneco");
var status_do_jogador = document.getElementsByClassName("status-do-jogador");
botaodeChute.addEventListener('click', ()=>{
    chutarLetra();
    atualizarJogador();
});
botaodeChutePalavra.addEventListener('click', ()=>{
    chutarPalavra();
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
    dica = dicas[Math.round(Math.random()*dicas.length)%dicas.length];
    //alert(dica);
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
                    console.log(palavraAmostra);
                }
            }
            //se errou, então DÃ DÃ DÃ~ TÃ~ TÃ DÃ~
            if(!acertou)
            {
                darth_vader.item(vidasMax-vidas).style.visibility = "hidden";
                vidas--;
                //console.log(darth_vader);
            }
            
            letraChutada = -1;
        }
    }
    else
    {
        alert("Numero de máximo de chutes alcançado. Tente chutar a palavra.")
    }
    
    _aPalavra.textContent = palavraAmostra;
}
function chutarLetra()
{
    do
    {
        letraChutada = prompt("Entre uma letra.");
        console.log(letraChutada);
        if(letraChutada==null)//quando o prompt é cancelado, ele retorna null
        {
            letraChutada = -1;
            break;
        }
        if(letraChutada.length>1)
        {
            alert("Entre apenas uma letra.");
            letraChutada = -1;
        }
        if(letrasChutadas.includes(letraChutada))
        {
            alert("Essa letra já foi chutada!");
            letraChutada = -1;
        }
    }while(letraChutada.length>1||letraChutada==-1);
    letrasChutadas.push(letraChutada);
    mostraPalavra();
}
function chutarPalavra()
{
    let chutePalavra = prompt("Entre uma letra.");
    chutePalavra = chutePalavra.substring(0, 1).toUpperCase()+chutePalavra.substring(1);
    console.log(chutePalavra);
    if(chutePalavra==null)//quando o prompt é cancelado, ele retorna null
    {   
        alert("Você não escreveu nada. /(.-.)\\");
        return;
    }
    if(chutePalavra!=palavraSelecionada)
    {
        vidas--;
        alert("Não... eu não sinto a força dessa palavra.");
        return;
    }
    palavraAmostra = chutePalavra;
    _aPalavra.textContent = palavraAmostra;
    
    setTimeout(alert("Sim! A força está com você!"), 1000);
    
    
}
function atualizarJogador()
{
    //console.log(status_do_jogador)
    if(palavraAmostra==palavraSelecionada)
    {
        
        setTimeout(()=>alert("A força estava com você e você venceu esta rodada!"), 1000);
        letrasChutadas = [];
        letraChutada = -1;
        pontuacao++;
        vidas = vidasMax;
        sorteiaDicaePalavra();
    }
    if(vidas==0)
    {
        setTimeout(alert("Você perdeu esta rodada! Tente outra vez e que a força esteja com você!"), 1000);
        letrasChutadas = [];
        letraChutada = -1;
        vidas = vidasMax;
        sorteiaDicaePalavra();
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

console.log(palavraSelecionada);
//alert(_aDica.textContent);