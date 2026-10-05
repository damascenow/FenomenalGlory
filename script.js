const COUNTRY_DATA = [{"name": "Brasil", "flag": "BR.svg"}, {"name": "Argentina", "flag": "AR.svg"}, {"name": "Uruguai", "flag": "UY.svg"}, {"name": "Colômbia", "flag": "CO.svg"}, {"name": "Chile", "flag": "CL.svg"}, {"name": "Equador", "flag": "EC.svg"}, {"name": "Peru", "flag": "PE.svg"}, {"name": "Bolívia", "flag": "BO.svg"}, {"name": "Paraguai", "flag": "PY.svg"}, {"name": "Venezuela", "flag": "VE.svg"}, {"name": "México", "flag": "MX.svg"}, {"name": "Estados Unidos", "flag": "US.svg"}, {"name": "Canadá", "flag": "CA.svg"}, {"name": "Espanha", "flag": "ES.svg"}, {"name": "França", "flag": "FR.svg"}, {"name": "Alemanha", "flag": "DE.svg"}, {"name": "Itália", "flag": "IT.svg"}, {"name": "Portugal", "flag": "PT.svg"}, {"name": "Holanda", "flag": "NL.svg"}, {"name": "Bélgica", "flag": "BE.svg"}, {"name": "Croácia", "flag": "HR.svg"}, {"name": "Sérvia", "flag": "RS.svg"}, {"name": "Polônia", "flag": "PL.svg"}, {"name": "Dinamarca", "flag": "DK.svg"}, {"name": "Suécia", "flag": "SE.svg"}, {"name": "Noruega", "flag": "NO.svg"}, {"name": "Suíça", "flag": "CH.svg"}, {"name": "Áustria", "flag": "AT.svg"}, {"name": "Turquia", "flag": "TR.svg"}, {"name": "Grécia", "flag": "GR.svg"}, {"name": "Escócia", "flag": "GB-SCT.svg"}, {"name": "País de Gales", "flag": "GB-WLS.svg"}, {"name": "Inglaterra", "flag": "GB-ENG.svg"}, {"name": "Irlanda", "flag": "IE.svg"}, {"name": "Ucrânia", "flag": "UA.svg"}, {"name": "Rússia", "flag": "RU.svg"}, {"name": "Japão", "flag": "JP.svg"}, {"name": "Coreia do Sul", "flag": "KR.svg"}, {"name": "China", "flag": "CN.svg"}, {"name": "Austrália", "flag": "AU.svg"}, {"name": "Marrocos", "flag": "MA.svg"}, {"name": "Argélia", "flag": "DZ.svg"}, {"name": "Egito", "flag": "EG.svg"}, {"name": "Nigéria", "flag": "NG.svg"}, {"name": "Gana", "flag": "GH.svg"}, {"name": "Senegal", "flag": "SN.svg"}, {"name": "Costa do Marfim", "flag": "CI.svg"}, {"name": "Camarões", "flag": "CM.svg"}, {"name": "África do Sul", "flag": "ZA.svg"}, {"name": "Cabo Verde", "flag": "CV.svg"}, {"name": "Haiti", "flag": "HT.svg"}, {"name": "Eslovênia", "flag": "SI.svg"}];

const state = {
  name:"", number:"", foot:"Esquerdo", country:null, position:null, characteristic:null
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function screen(id){
  $$(".screen").forEach(x=>x.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}

function modal(text,title="Fenomenal Glory"){
  $("#modalTitle").textContent=title;
  $("#modalText").textContent=text;
  $("#modal").classList.add("open");
  $("#modal").setAttribute("aria-hidden","false");
}
function closeModal(){
  $("#modal").classList.remove("open");
  $("#modal").setAttribute("aria-hidden","true");
}

function renderCountries(filter=""){
  const box=$("#countries");
  box.innerHTML="";
  COUNTRY_DATA.filter(c=>c.name.toLocaleLowerCase("pt-BR").includes(filter.toLocaleLowerCase("pt-BR")))
  .forEach(c=>{
    const b=document.createElement("button");
    b.className="country"+(state.country?.name===c.name?" selected":"");
    const img=document.createElement("img");
    img.src="flags/"+c.flag; img.alt="Bandeira de "+c.name;
    const span=document.createElement("span"); span.textContent=c.name;
    b.append(img,span);
    b.addEventListener("click",()=>{
      state.country=c;
      $("#selectedCountry").textContent="Nacionalidade selecionada: "+c.name;
      $("#sumCountry").textContent=c.name;
      renderCountries($("#countrySearch").value);
    });
    box.appendChild(b);
  });
}

$("#brandHome").addEventListener("click",()=>screen("#home"));
$$(".menu-option").forEach(b=>b.addEventListener("click",()=>{
  if(b.dataset.action==="career") screen("#career");
  else modal("Essa parte ainda está em desenvolvimento. Em breve você poderá usar essa função.","Implementado em breve");
}));
$("#backHome").addEventListener("click",()=>screen("#home"));

$("#countrySearch").addEventListener("input",e=>renderCountries(e.target.value));

$$("[data-foot]").forEach(b=>b.addEventListener("click",()=>{
  $$("[data-foot]").forEach(x=>x.classList.remove("active"));
  b.classList.add("active"); state.foot=b.dataset.foot; $("#sumFoot").textContent=state.foot;
}));

$$(".pos").forEach(b=>b.addEventListener("click",()=>{
  $$(".pos").forEach(x=>x.classList.remove("selected"));
  b.classList.add("selected"); state.position=b.dataset.position;
  const names={ATA:"Atacante",PE:"Ponta Esquerda",PD:"Ponta Direita",MEI:"Meia Ofensivo",MC:"Meia Central",VOL:"Volante",LE:"Lateral Esquerdo",LD:"Lateral Direito",ZAG:"Zagueiro",GOL:"Goleiro"};
  $("#positionLabel").textContent="Posição selecionada: "+names[state.position];
  $("#sumPosition").textContent=state.position;
}));

$$(".characteristic").forEach(b=>b.addEventListener("click",()=>{
  $$(".characteristic").forEach(x=>x.classList.remove("selected"));
  b.classList.add("selected"); state.characteristic=b.dataset.characteristic;
  $("#sumCharacteristic").textContent=state.characteristic;
}));

$("#playerName").addEventListener("input",e=>{state.name=e.target.value.trim();$("#sumName").textContent=state.name||"—"});
$("#playerNumber").addEventListener("input",e=>{state.number=e.target.value;$("#sumNumber").textContent=state.number||"—"});

$("#finishPlayer").addEventListener("click",()=>{
  state.name=$("#playerName").value.trim(); state.number=$("#playerNumber").value.trim();
  if(!state.name)return modal("Insira o nome do jogador.");
  if(!state.number)return modal("Insira o número do jogador.");
  if(!state.country)return modal("Escolha a nacionalidade do jogador.");
  if(!state.position)return modal("Escolha uma posição no campo.");
  if(!state.characteristic)return modal("Escolha uma característica.");
  modal(`${state.name} foi criado com sucesso! ${state.country.name} • ${state.position} • ${state.characteristic} • Pé ${state.foot}.`,"Jogador criado");
});

$("#modalClose").addEventListener("click",closeModal);
$("#modalOk").addEventListener("click",closeModal);
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
renderCountries();
