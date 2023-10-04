const movies = [
    {
        "filmes": [
            {
              "titulo": "Indiana Jones e a Relíquia do destino",
              "salas": [
                {
                  "nome": "Sala 1",
                  "tipo": "Dublado",
                  "horarios": ["10:00", "13:00", "16:00"]
                },
                {
                  "nome": "Sala 2",
                  "tipo": "Legendado",
                  "horarios": ["11:30", "14:30", "17:30"]
                }
              ],
              "imagem": "./images/poster-1.jpg",
              "legenda": "12"
            },
            {
              "titulo": "Missão Impossível - Acertos de contas parte 1",
              "salas": [
                {
                  "nome": "Sala 3",
                  "tipo": "Dublado",
                  "horarios": ["12:30", "15:20", "19:00"]
                },
                {
                  "nome": "Sala 4",
                  "tipo": "Legendado",
                  "horarios": ["13:30", "16:30", "20:30", "22:40"]
                }
              ],
              "imagem": "./images/poster-2.jpg",
              "legenda": "14"
            },
            {
                "titulo": "Sobrenatural - A porta vermelha",
                "salas": [
                  {
                    "nome": "Sala 5",
                    "tipo": "Legendado",
                    "horarios": ["12:00", "16:45", "19:45"]
                  },
                  {
                    "nome": "Sala 6",
                    "tipo": "Dublado",
                    "horarios": ["14:30", "16:30", "19:30"]
                  }
                ],
                "imagem": "./images/poster-3.gif",
                "legenda": "16"
            },
            {
            "titulo": "Transformer - O Despertardas Feras",
            "salas": [
                {
                "nome": "Sala 7",
                "tipo": "Legendado",
                "horarios": ["12:15", "15:25", "20:00"]
                },
                {
                "nome": "Sala 8",
                "tipo": "Dublado",
                "horarios": ["13:30", "16:55", "20:30"]
                }
            ],
            "imagem": "./images/poster-4.jpg",
            "legenda": "14"
            },
            {
                "titulo": "Velozes e Furiosos 10",
                "salas": [
                  {
                    "nome": "Sala 9",
                    "tipo": "Dublado",
                    "horarios": ["12:00", "15:00", "18:00", "22:10"]
                  },
                  {
                    "nome": "Sala 10",
                    "tipo": "Dublado",
                    "horarios": ["13:30", "16:30", "17:30", "21:25"]
                  },
                  {
                    "nome": "Sala 12",
                    "tipo": "Legendado",
                    "horarios": ["21:25"]
                  }
                ],
                "imagem": "./images/poster-5.jpg",
                "legenda": "14"
            }
        ]
    }
];

const gridProgramacao = document.querySelector('#grid-programacao');
const contentProgramacao = document.querySelector('#content-programacao');
const avancar = document.querySelector('#avancar');
const dateSelected = document.querySelector('.dateSelected');
const escolha = document.querySelector('.container.escolha');
let gradeEscolhida = [];

movies.forEach(function(items){

    items.filmes.forEach(function(filme){

        let gridMovie = document.querySelector('.gridMovie').cloneNode('true');
        
        let title = gridMovie.querySelector('h2');
        title.textContent = filme.titulo;
        
        let legend = gridMovie.querySelector('.legenda');
        legend.textContent = filme.legenda;    
        
        let poster = gridMovie.querySelector('.poster');
        poster.img = filme.imagem;
        poster.setAttribute('data-poster', poster.img);        

        gridMovie.classList.remove('hide'); 
       
        let gridSalas = gridMovie.querySelector('.gridSalas'); 
        gridSalas.innerHTML = '';

        filme.salas.forEach(function(sala){
            //console.log(sala)
            let period = document.createElement('div');
            period.classList = 'period';

            let titleSala = document.createElement('h2');
            titleSala.textContent = sala.nome;
            period.appendChild(titleSala);

            let tipo = document.createElement('span');
            period.appendChild(tipo);
            tipo.textContent = sala.tipo;

            if(tipo.textContent === 'Legendado'){
                tipo.classList.add('legendado');
            }

            gridSalas.appendChild(period);
        
            sala.horarios.forEach(function(hora){

                let button = document.createElement('button');
                button.classList = 'hours';
                button.textContent = hora;
                
                period.appendChild(button);

            });
        });
 
        contentProgramacao.appendChild(gridMovie);
       
    });

});

const buttonHours = document.querySelectorAll('.period button');

contentProgramacao.addEventListener('click', function(e){
    let btn = e.target;

    buttonHours.forEach(function(items){
        items.classList.remove('active');   
    });
    
    btn.classList.add('active');
});

avancar.addEventListener('click', () => {
    
    const hours = document.querySelectorAll('.hours');
    let data = dateSelected.value;
    let dataPT = data.split('-').reverse().join('/');
    
    if( data === '' ){
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            html: `Selecione uma data!`
        }); 
        return false;
    } 
    
    let arr = [];
    let grade = false;

    hours.forEach(function(hora){
       
        if(hora.classList.contains('active')){
            let elTitle = hora.parentElement.parentElement.previousElementSibling;
            let textFilme = elTitle.querySelector('h2');
            let filme = textFilme.textContent;
            let horario = hora.textContent;
            let elSala = hora.previousElementSibling.parentElement;
            let textSala = elSala.querySelector('h2');
            let sala = textSala.textContent;  
            let elPoster = hora.parentElement.parentElement.parentElement;
            let imgPoster = elPoster.querySelector('[data-poster]');
            let poster = imgPoster.img;
            let elLegend = hora.parentElement;
            let textLegend = elLegend.querySelector('span');
            let legenda = textLegend.textContent;
            grade = true;
            arr.push(filme, poster, sala, horario, dataPT, legenda);
            
        }
        
    });

    if( grade ){
        gradeEscolhida.push(arr);        
    }else{
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            html: `Selecione um horário!`
        });
       
        return false;
    }
    
    getLocalStorage();
    sessionStorage.setItem('list', JSON.stringify(gradeEscolhida));    
    checkSession();
    gridProgramacao.classList.add('hide');
    document.querySelector('.escolha').classList.remove('hide');

});

function checkSession(){
    if(sessionStorage.getItem('list') !== null){
        const filmeEscolhido = document.querySelector('.filmeEscolhido');
        let result = JSON.parse(sessionStorage.getItem('list'));
        
        result.forEach( items => {
            console.log(items);
            let html = `
                <div class="imagem">
                    <img src="${items[1]}" />
                </div>
                <div class="description">
                    <h2>${items[0]}</h2>
                    <span class="salaReservada"><i class="fa fa-film"></i> Cinema Ticket - ${items[2]}</span>
                    <span class="dataEhora"><i class="fa fa-calendar-week"></i> <span id="dataFilme"> ${items[4]}</span> às <span id="horaFilme">${items[3]}</span></span>
                    <span class="tipo">${items[5]}</span>
                </div>
            `;
            
            filmeEscolhido.innerHTML = html;
        });
    }
}

function getLocalStorage(){
    return sessionStorage.getItem('list') ? JSON.parse(sessionStorage.getItem('list')) : [];
}

/******************************* ETAPA 2 ********************************************/

const buttons = document.querySelectorAll('input');
const finalizar = document.querySelector('#finalizar');
const voltar = document.querySelector('#voltar');
const templateCompra = document.querySelector('.templateCompra');
const containerTicket = document.querySelector('#containerTicket');
const containerSpan = document.querySelector('.containerSpan');
const formaPagamento = document.querySelector('.formaPagamento');
const type = document.querySelector('#type h4');


let items = [];
let qtdaTotal = 0;
let place;
let allSpan;

   
buttons.forEach(function(button){;

    let element = document.createElement('span');
    const ingressoEscolhido = document.querySelector('.ingressoEscolhido');
    let elementEscolhido = document.createElement('span');

    button.addEventListener('click', function(e){

        if( !escolha.classList.contains('hide') ){
            let btn = e.currentTarget;
            btn.classList.toggle('selected');
    
            let id = btn.getAttribute('id');
            element.setAttribute('data-id', id);
            elementEscolhido.setAttribute('data-id', id);
            
            allSpan = document.querySelectorAll('#seat span');
            let total = document.querySelector('.qtdaTotal');
    
            const qtdaEscolhido = document.querySelector('.qtdaEscolhido');
    
            if(btn.classList.contains('selected')){
    
                if( allSpan.length > 0 ) {
                    element.textContent = ' / ' + id
                }else{
                    element.textContent = id;
                } 
    
                elementEscolhido.textContent = id;
                type.parentNode.classList.add('active');
                containerSpan.classList.add('show');
                
                total.setAttribute('data-total', (allSpan.length + 1));
                total.textContent = (allSpan.length + 1) + 'x';
                qtdaEscolhido.textContent = (allSpan.length + 1);
    
            }else{
    
                let lugar = btn.getAttribute('id');
                let lugarSelected = element.getAttribute('data-id');
                
                total.setAttribute('data-total', (allSpan.length - 1));
                total.textContent = (allSpan.length - 1) + 'x';
    
                if( allSpan.length <= 1 ){
                    type.parentNode.classList.remove('active');
                    containerSpan.classList.remove('show');
                    document.querySelector('.gridEscolha').classList.add('ativo');
                }
    
                if( lugar === lugarSelected ){
                    
                    element.childNodes[0].parentElement.remove();
                    elementEscolhido.childNodes[0].parentElement.remove();
                    
                    document.querySelectorAll('#seat span').forEach((items, index) => {
                        if( index == 0 ){
                            let numPos = items;
                            let numPosicao = numPos.innerHTML.replace('/', '').trim();
                            numPos.textContent = numPosicao;
                        } 
                    });
                    return false;
                }
    
            } 
            
            containerSpan.appendChild(element);
            //seat.appendChild(containerSpan);
            ingressoEscolhido.appendChild(elementEscolhido);
            createOption();

        }

    });
 
});


type.addEventListener('click', function(e) {
    const type = e.currentTarget;
    const gridEscolha = document.querySelector('.gridEscolha');

    if(type.parentNode.classList.contains('active')){
        gridEscolha.classList.remove('ativo');           
    }

    createOption();
});

function createOption(){
    let quantidade = document.querySelector('[data-total]');
    let resultQtda = quantidade.getAttribute('data-total');    
    let selects = document.querySelectorAll('select');
   
    for (var i = 0; i < selects.length; i++) {
        selects[i].innerHTML = '';
    }

    for(let x = 0; x <= resultQtda; x++){
        for(let k = 0; k < selects.length; k++){
            let option = document.createElement('option');
        
            option.value = x;
            option.textContent = x;
            selects[k].appendChild(option);
           
            if( option.value === "0" ){
                option.value = "";
                option.textContent = 'Qtd';
                option.setAttribute('selected', 'selected');
            }

        }
       
    }  
}

//formata moeda
function formatReal( int ){
    var tmp = int+'';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if( tmp.length > 6 )
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    return tmp;
};

function calcularQtda(){
    const escolhaTipos = document.querySelectorAll('.escolhaTipos[data-valor]');
    const selects = document.querySelectorAll('.quantidade select');
    const qtdaTotal = document.querySelector('.gridEscolha .qtdaTotal');
    const quantidadeTotal = parseInt(qtdaTotal.getAttribute('data-total'));

    const priceTotal = document.querySelector('.escolhaTipos .valor .priceTotal');
    const dataTaxa = priceTotal.querySelector('.valueTaxa');
    let valueTaxa = parseInt(dataTaxa.getAttribute('data-taxa'));

    let dadosCompra = document.querySelector('.dadosCompra');

    algumSelecionado = false;
 
    let soma = 0;
    let total = 0;
    let totalTaxa = 0;

    escolhaTipos.forEach(div => {
       
        const preco = parseInt(div.getAttribute('data-valor'));
        const quantidade = parseInt(div.querySelector('select').value);

        if( !isNaN(quantidade) ){
            total += preco * quantidade;
            totalTaxa += valueTaxa * quantidade;
            return false;
        }

    });

    selects.forEach(function(select, i){
        let quantidadeSelecionada = parseInt(selects[i].value);
        soma += isNaN(quantidadeSelecionada) ? 0 : quantidadeSelecionada;
        
        if( !isNaN(quantidadeSelecionada) && quantidadeSelecionada > 0 ){
            algumSelecionado = true;
        }

    });

    if( algumSelecionado ){
        dadosCompra.classList.remove('hide');
    }else{
        dadosCompra.classList.add('hide');
    }    
    
    if( soma > quantidadeTotal ){
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            html: `Você não pode escolher acima de <strong>${quantidadeTotal}</strong>`
        });      
        event.target.value = "";
        calcularQtda(); 
        return false;
    }

    const ingressoEscolhido = document.querySelectorAll('.ingressoEscolhido span');
    const taxa = document.querySelector('.taxa');

    ingressoEscolhido.forEach(function(element, qtd){
        if( soma > qtd ){
            element.style.backgroundColor = '#ff3356';
            element.style.color = '#FFF';
            element.classList.add('selecionado');
            taxa.classList.remove('hide');
        }else{
            element.style.backgroundColor = '';
            element.style.color = '';
        }
    }); 
    
    calcPriceTicket();
   
    //document.getElementById("resultado").innerText = total;

    const ingressosAdquiridos = document.querySelector('.ingressosAdquiridos');
    const results = ingressosAdquiridos.querySelector('.priceTotal');
    const taxaAdiquiridos = document.querySelector('.taxaAdiquiridos');
    
    const taxaTotal = taxaAdiquiridos.querySelector('#total');
    results.textContent = total === 0 ? `R$ 0,00` : `R$ ${formatReal(total)}`
    
    const resumoTaxa = document.querySelector('.resumoTaxa');
    resumoTaxa.textContent = totalTaxa === 0 ? `R$ 0,00` : `R$ ${formatReal(totalTaxa)}`;
    
    taxaTotal.textContent = total === 0 ? `R$ 0,00` : `R$ ${formatReal(total)}`
}

function calcPriceTicket(){
    let priceFinal = 0;

    let tipo = event.target.parentElement.parentElement;
    let price = tipo.querySelector('.price');
    let priceTotal = tipo.querySelector('.priceTotal');
    priceTotal.classList.remove('hide');

    let valueFinal = parseInt(tipo.getAttribute('data-valor'));
    let valueSelected = parseInt(tipo.querySelector('select').value);

    if( !isNaN(valueSelected) < 1 ){
        price.textContent = `R$ ${formatReal(valueFinal)}`;
        priceTotal.classList.add('hide');
        return false;
    }else{
        priceFinal = valueSelected * valueFinal;
        price.textContent = `R$ ${formatReal(priceFinal)}`;
    }   
    
    //document.getElementById('resultado').innerHTML = 'Soma: ' + priceFinal;
}

finalizar.addEventListener('click', function(e){  

    let placeSelected = false;
    let placeCheck = false;
    let newArr = []
    
    buttons.forEach(button => {
       
         //Valida se o lugar não for preenchido.
        if(button.classList.contains('selected')){

            let elId = button.getAttribute('id');

            button.classList.add('check-ok');
            placeSelected = true;
            
            newArr.push(elId);

            let ingressoEscolhido = document.querySelectorAll('.ingressoEscolhido span'); 
            let arr = [...ingressoEscolhido];
            let arrTotal = arr.length;

            if(document.querySelectorAll){
                let classElement = document.querySelectorAll('.selecionado');
                
                if( arrTotal === classElement.length ){
                    button.classList.remove('selected');                    
                }else{
                    placeCheck = true;
                    button.classList.remove('check-ok');
                } 
               
            }             
        }

    });

    if( placeCheck ){
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            html: `Selecione o tipo de ingresso!`
        }); 
        return false;
    }

    items.push(newArr);    
    
    if( placeSelected ){
        getTicket();
        createTicket();
    }else{
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            html: `Escolha um assento!`
        });        
    }

    clearDados();    

});

function getTicket(){

    for(let i = 0; i < items.length; i++){
        qtdaTotal = items[i];
        let res = qtdaTotal.join();
        place = res.replaceAll(',', ' / ').replaceAll('-', '').toUpperCase();        
    }
    
}

function createTicket(){

    const element = document.createElement('section');
    const ticketImpresso = containerTicket.querySelector('.ticketImpresso');
    ticketImpresso.classList.remove('hide');
    const elementFilme = document.querySelector('.description h2');
    let filme = elementFilme.textContent;
    const elementDataFilme = document.querySelector('#dataFilme');
    let dataFilme = elementDataFilme.textContent;
    const elementHoraFilme = document.querySelector('#horaFilme');
    let horaFilme = elementHoraFilme.textContent;
    const elementValorTotal = document.querySelector('#total');
    let valorTotal = elementValorTotal.textContent;

    const id = new Date().getTime().toString(); 
    
    let date = new Date();
    let dateActual = date.toLocaleDateString();
    let hours = date.toLocaleTimeString('pt-BR');
    let quantidadeTotal = qtdaTotal.length;

    element.classList.add('rows');
    element.innerHTML = `
        <div class="ticket">
            <div class="row codigoBarras">
                <span class="codigo">NO. ${id}</span>
                <img src="./images/codigoDeBarras.jpg" alt="">
            </div>
            <div class="row description">
                <h2 class="title">Cinema Ticket</h2>
                <div class="information">
                    <span><strong>Sala:</strong> <span id="livingRoom">06</span> / <strong>Assento:</strong> <span id="seat">${place}</span></span>
                    <span><strong>Data do Filme:</strong> <span id="dateHoraFilme">${dataFilme} às ${horaFilme}</span></span>
                    <span><strong>Preço:</strong> <span id="priceTotal">${valorTotal}</span></span>
                    <span><strong>Quantidade:</strong> <span id="qtdaTotal">${quantidadeTotal}</span></span>
                    <span><strong>Data da compra:</strong> <span id="date">${dateActual} às ${hours}</span></span>
                </div>
                <h1 class="movie">${filme}</h1>
                <span class="number">NO: <strong>${id}</strong></span>
            </div>           
        </div> 
    `;
  
    ticketImpresso.appendChild(element);
    
}

function clearDados(){
    const containerSpan = document.querySelector('.containerSpan');
    containerSpan.innerHTML = '';
    containerSpan.classList.remove('show');

    const type = document.querySelector('#type');
    type.classList.remove('active');
    const gridEscolha = type.querySelector('.gridEscolha');
    gridEscolha.classList.add('ativo');

    const ingressoEscolhido = document.querySelector('.ingressoEscolhido');
    ingressoEscolhido.innerHTML = '';

    const qtdaTotal = document.querySelector('.qtdaTotal');
    qtdaTotal.setAttribute('data-total', '');
    qtdaTotal.innerHTML = '';

    const dadosCompra = document.querySelector('.dadosCompra');
    dadosCompra.classList.add('hide');
    const qtdaEscolhido = dadosCompra.querySelector('.qtdaEscolhido');
    qtdaEscolhido.textContent = '';

    const resumoDaCompra = document.querySelector('.resumoDaCompra');
    const priceTotal = resumoDaCompra.querySelector('.priceTotal');
    priceTotal.textContent = 'R$ 0,00';
    const resumoTaxa = resumoDaCompra.querySelector('.resumoTaxa');
    resumoTaxa.textContent = 'R$ 0,00';
    const total = resumoDaCompra.querySelector('#total');
    total.textContent = 'R$ 0,00';
    
}

const visualizar = document.querySelector('#visualizar');
const ticketImpresso = document.querySelector('.ticketImpresso');
const close = document.querySelector('#close');

visualizar.addEventListener('click', () => {

    let ticket = ticketImpresso.childNodes.length;   

    if( !ticket ){
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            html: `Não temos ingressos selecionados!`
        });        
    }else{
        containerTicket.classList.remove('hide');
    }

});

voltar.addEventListener('click', () => {
    

    escolha.classList.add('hide');
    gridProgramacao.classList.remove('hide');
    sessionStorage.removeItem('list');

});

close.addEventListener('click', () => {
    containerTicket.classList.add('hide');
});