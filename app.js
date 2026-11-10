/* ============================================================
   MAPA DO AMOR — configuração e motor de cálculo
   ============================================================ */
window.CONFIG = {
  // 1) Link do checkout Kiwify do produto de R$ 9,90 (ex.: https://pay.kiwify.com.br/XXXXXXX)
  CHECKOUT_URL: '',
  // 2) Google Form para salvar os leads (deixe vazio para não salvar)
  //    action = https://docs.google.com/forms/d/e/<ID>/formResponse
  LEAD_FORM: {
    action: '',
    fields: { etapa: '', nome: '', nascimento: '', email: '', telefone: '', padrao: '' } // entry.xxxxx
  },
  PRECO: '9,90',
  PRECO_CHEIO: '49,90',
  WHATSAPP: '5531995618248',
  // Upsell "Como Fazer Ele Voltar em 10 Passos" (página de resultado).
  // Sem link, o botão abre o WhatsApp com uma mensagem pronta.
  CHECKOUT_UPSELL: '',
  UPSELL_PRECO: '19,90'
};

/* ---------- utilidades ---------- */
const MA = {};
MA.limpa = s => (s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toUpperCase().replace(/[^A-Z ]/g,'');
MA.reduz = n => { while(n>9) n = String(n).split('').reduce((a,b)=>a+ +b,0); return n||9; };
MA.valorLetra = c => ((c.charCodeAt(0)-65)%9)+1; // tabela pitagórica
MA.primeiroNome = n => { const p=(n||'').trim().split(/\s+/)[0]||''; return p.charAt(0).toUpperCase()+p.slice(1).toLowerCase(); };

MA.calcula = function(nome, nascimento){ // nascimento = 'AAAA-MM-DD'
  const letras = MA.limpa(nome).replace(/ /g,'').split('');
  const expressao = MA.reduz(letras.reduce((a,c)=>a+MA.valorLetra(c),0));
  const [a,m,d] = nascimento.split('-').map(Number);
  const destino = MA.reduz((String(a)+String(m)+String(d)).split('').reduce((x,y)=>x+ +y,0));
  const amor = MA.reduz(expressao + destino);
  // ano pessoal e janelas favoráveis (meses pessoais 2 e 6 = vibração do amor)
  const hoje = new Date();
  const janelas = [];
  for(let i=0;i<12;i++){
    const dt = new Date(hoje.getFullYear(), hoje.getMonth()+i, 1);
    const anoP = MA.reduz(d + m + String(dt.getFullYear()).split('').reduce((x,y)=>x+ +y,0));
    const mesP = MA.reduz(anoP + dt.getMonth()+1);
    if(mesP===2||mesP===6) janelas.push({dt, mesP});
  }
  const anoPessoal = MA.reduz(d + m + String(hoje.getFullYear()).split('').reduce((x,y)=>x+ +y,0));
  const letrasAfinidade = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(c=>MA.valorLetra(c)===amor);
  return { expressao, destino, amor, anoPessoal, janelas, letrasAfinidade, perfil: MA.PERFIS[amor] };
};

MA.mesNome = dt => dt.toLocaleDateString('pt-BR',{month:'long',year:'numeric'});

/* ---------- 9 perfis do par compatível ---------- */
MA.PERFIS = {
 1:{titulo:'O Protetor Determinado', cor:['#e9c98b','#b8743a'],
   essencia:'Um homem de atitude, que sabe o que quer e não brinca com os sentimentos de quem escolhe. Ele não fica em cima do muro: quando decide, decide você.',
   traços:['Postura firme, olhar direto, presença que se nota ao entrar num lugar','Independente, trabalhador, tem metas claras','Fala pouco sobre sentimentos, mas demonstra em atitudes','Gosta de resolver os problemas de quem ama'],
   ama:'Ele ama protegendo. Vai querer te ver segura, vai lembrar do que você disse que precisava, vai aparecer quando você menos espera — mas precisa sentir que você admira quem ele é.',
   reconhecer:'Ele vai te chamar atenção por uma conversa sobre planos e futuro, não por elogios vazios. Normalmente surge em ambientes de trabalho, cursos ou por indicação de alguém próximo.',
   cuidado:'Não confunda o Protetor com o controlador. O verdadeiro te dá segurança e liberdade; o falso te dá ciúme e cobrança.'},
 2:{titulo:'O Parceiro Sensível', cor:['#f2a7b8','#9b4f7a'],
   essencia:'Um homem gentil, que escuta de verdade e enxerga você por inteiro. Com ele, você não precisa implorar por atenção — ela simplesmente vem.',
   traços:['Sorriso calmo, voz tranquila, jeito acolhedor','Detalhista, lembra datas e pequenas coisas','Leal, valoriza família e amizades antigas','Evita brigas e busca conversa'],
   ama:'Ele ama cuidando dos detalhes: a mensagem de bom dia, o “chegou bem?”, o café do jeito que você gosta. É o tipo de amor que cura o que os outros quebraram.',
   reconhecer:'Costuma surgir de forma discreta — alguém que já estava por perto e você nunca reparou. A conexão nasce de conversas longas e sem pressa.',
   cuidado:'Ele não disputa sua atenção com homens barulhentos. Se você só olhar para quem te causa ansiedade, vai deixá-lo passar.'},
 3:{titulo:'O Encantador Leve', cor:['#ffd38a','#e87a96'],
   essencia:'Um homem alegre, comunicativo, que traz leveza para os seus dias. Com ele, o amor volta a ter graça.',
   traços:['Sorriso fácil e senso de humor marcante','Criativo, gosta de música, viagens e novidades','Sociável, tem muitos amigos','Expressa o que sente com palavras'],
   ama:'Ele ama te fazendo rir e te tirando da rotina. Surpresas, programas diferentes, mensagens engraçadas. Ao lado dele você se sente viva de novo.',
   reconhecer:'Aparece em eventos sociais, festas de amigos ou em situações inesperadas. A química é rápida — a conversa flui como se vocês já se conhecessem.',
   cuidado:'O Encantador verdadeiro mantém a palavra. Se ele só encanta e some, não é ele — é a repetição do seu padrão.'},
 4:{titulo:'O Homem Porto-Seguro', cor:['#a8d5ba','#3f7a62'],
   essencia:'Estável, confiável, constante. O tipo de homem que faz o que diz e diz o que faz. Com ele, a ansiedade dá lugar à paz.',
   traços:['Aparência cuidada, estilo discreto','Organizado, responsável com dinheiro e compromisso','Paciente, prefere construir devagar','Dá valor à casa, à rotina e à família'],
   ama:'Ele ama construindo. Não promete o mundo no primeiro encontro, mas está lá no décimo, no centésimo. É amor de verdade, sem montanha-russa.',
   reconhecer:'A aproximação é gradual. Ele vai te mostrar quem é com o tempo — e você vai perceber que nunca se sentiu tão tranquila com alguém.',
   cuidado:'Depois de tantas decepções, a calma pode parecer “falta de química”. Não é. É saúde emocional.'},
 5:{titulo:'O Aventureiro Apaixonado', cor:['#f7b267','#c0392b'],
   essencia:'Intenso, curioso, cheio de vida. Um homem que te desperta e te convida a viver coisas que você nunca viveu.',
   traços:['Energia magnética, olhar intenso','Gosta de liberdade, viagens e experiências','Inteligente, aprende rápido, conversa sobre tudo','Espontâneo e apaixonado'],
   ama:'Ele ama com paixão e presença. Quando está com você, está inteiro. O segredo com ele é parceria: aventura junto, não presa.',
   reconhecer:'Costuma surgir em momentos de mudança na sua vida — viagem, cidade nova, novo emprego, novo hobby.',
   cuidado:'Você merece o aventureiro que te inclui nos planos, não o que te deixa esperando entre uma aventura e outra.'},
 6:{titulo:'O Companheiro de Alma', cor:['#f2a7b8','#e9c98b'],
   essencia:'O número 6 é a vibração máxima do amor na numerologia. É o homem que quer família, lar e alguém para cuidar — e ser cuidado.',
   traços:['Carinhoso, afetuoso, gosta de contato','Responsável, adora crianças e animais','Romântico à moda antiga','Justo, defende quem ama'],
   ama:'Ele ama com devoção. Vai te apresentar para a família cedo, vai querer planos a dois, vai te fazer sentir escolhida todos os dias.',
   reconhecer:'Muitas vezes chega por meio de família, amigos em comum ou ambientes de fé e comunidade. A sensação é de “reencontro”.',
   cuidado:'Ele se doa muito — e espera reciprocidade. Não é sobre você se anular de novo: é sobre os dois cuidarem.'},
 7:{titulo:'O Sábio Profundo', cor:['#b8a9e8','#4b3a8f'],
   essencia:'Reservado, inteligente, misterioso. Um homem que não se abre para qualquer pessoa — mas quando se abre, é para sempre.',
   traços:['Olhar observador, jeito mais quieto','Gosta de ler, estudar, refletir','Espiritualizado ou muito racional','Fiel e seletivo'],
   ama:'Ele ama com profundidade. Conversas até de madrugada, cumplicidade intelectual, um amor que vai além da aparência.',
   reconhecer:'Aparece em lugares de conhecimento ou silêncio: cursos, livrarias, retiros, ambientes online de interesse comum.',
   cuidado:'Ele precisa de espaço para pensar. Distância não é desinteresse — mas silêncio sem explicação constante é sinal de alerta.'},
 8:{titulo:'O Realizador Poderoso', cor:['#e9c98b','#5a2140'],
   essencia:'Ambicioso, confiante, bem-sucedido ou a caminho disso. Um homem que admira mulheres fortes e quer uma parceira à altura.',
   traços:['Elegante, postura de liderança','Focado em carreira e conquistas','Generoso com quem ama','Prático e decidido'],
   ama:'Ele ama prosperando junto. Vai querer dividir conquistas, te levar a lugares novos e construir patrimônio e história a dois.',
   reconhecer:'Surge em ambientes profissionais, de negócios ou de crescimento pessoal. Ele nota a sua força antes da sua aparência.',
   cuidado:'Poder sem respeito é ego. O verdadeiro 8 te trata como sócia da vida, não como troféu.'},
 9:{titulo:'O Romântico Generoso', cor:['#f2a7b8','#7a3b69'],
   essencia:'Compassivo, maduro, de coração enorme. Um homem que já viveu dores também e por isso sabe valorizar um amor verdadeiro.',
   traços:['Olhar gentil, jeito acolhedor','Humano, ajuda os outros sem esperar retorno','Artístico ou muito sensível','Maduro emocionalmente'],
   ama:'Ele ama com entrega e perdão. Entende suas cicatrizes porque também tem as dele. É o amor que fecha ciclos.',
   reconhecer:'A conexão costuma vir depois de um encerramento importante na sua vida — como se o universo abrisse espaço para ele chegar.',
   cuidado:'Ele não vem para ser salvo, nem para te salvar. Vem para caminhar junto.'}
};

/* ---------- padrões de decepção (vindo do quiz) ---------- */
MA.PADROES = {
  indisponivel:{nome:'A Armadilha do Homem Indisponível', txt:'Você tende a se conectar com homens que estão emocionalmente fechados — e passa a relação tentando “abrir a porta” deles. Isso nasce da crença de que amor precisa ser conquistado com esforço. Não precisa.'},
  some:{nome:'O Ciclo do Encanto e Sumiço', txt:'Você é atraída por intensidade no começo: muita atenção, muitas promessas… e depois o silêncio. Seu coração confunde ansiedade com paixão. O amor certo é constante, não uma montanha-russa.'},
  controle:{nome:'O Padrão do Controle Disfarçado de Cuidado', txt:'Você já confundiu ciúme e cobrança com demonstração de amor. Depois de tanto se sentir pouco amada, qualquer controle parecia interesse. Amor de verdade te dá segurança e liberdade ao mesmo tempo.'},
  acomodado:{nome:'O Padrão da Mulher que Carrega a Relação', txt:'Você acaba ao lado de homens acomodados e assume o papel de quem resolve, cuida e puxa tudo. Com o tempo, você se esgota e se sente sozinha mesmo acompanhada.'}
};
MA.ENTREGA = {
  rapido:'Você se entrega rápido porque tem muito amor para dar. O ajuste é deixar que ele mostre consistência antes de você mostrar tudo.',
  testa:'Você testa antes de confiar — é a sua proteção depois das feridas. O ajuste é observar atitudes, não criar provas.',
  anula:'Você costuma se anular para manter a relação. O ajuste é lembrar: quem te ama quer te ver inteira, não menor.',
  foge:'Você foge quando sente que vai se apegar. O ajuste é perceber que o medo não é um sinal de perigo — às vezes é só o novo chegando.'
};

/* ---------- retrato simbólico (SVG gerado) ---------- */
MA.retrato = function(n){
  const [c1,c2] = MA.PERFIS[n].cor;
  let estrelas=''; for(let i=0;i<26;i++){const x=(i*73+n*31)%320,y=(i*41+n*17)%400,r=((i*7)%3)*0.6+0.4; estrelas+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${0.3+((i*13)%7)/10}"/>`;}
  return `<svg class="portrait" viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Retrato simbólico do perfil ${MA.PERFIS[n].titulo}">
  <defs><radialGradient id="g${n}" cx="50%" cy="38%" r="65%"><stop offset="0" stop-color="${c1}" stop-opacity=".9"/><stop offset=".55" stop-color="${c2}" stop-opacity=".55"/><stop offset="1" stop-color="#1a0f1f"/></radialGradient>
  <linearGradient id="s${n}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a0f1f" stop-opacity=".95"/><stop offset="1" stop-color="#2a1430"/></linearGradient></defs>
  <rect width="320" height="400" fill="url(#g${n})"/>${estrelas}
  <path fill="url(#s${n})" d="M160 92c-30 0-52 24-52 58 0 22 8 40 20 52 4 4 6 9 6 15v10c0 6-4 11-10 13-38 12-78 30-90 62-4 12-6 26-6 40v58h264v-58c0-14-2-28-6-40-12-32-52-50-90-62-6-2-10-7-10-13v-10c0-6 2-11 6-15 12-12 20-30 20-52 0-34-22-58-52-58z"/>
  <path d="M110 118c10-26 34-40 56-38 26 2 44 20 46 46-14-10-34-14-52-12-18 2-34 0-50 4z" fill="#140a18" opacity=".9"/>
  <text x="160" y="380" text-anchor="middle" font-family="Playfair Display,serif" font-size="20" fill="${c1}">${n}</text>
  </svg>`;
};

/* ---------- foto ilustrativa conforme a idade dela ---------- */
MA.faixa = function(nasc){
  const [a,m,d]=nasc.split('-').map(Number), h=new Date();
  let idade=h.getFullYear()-a; if(h.getMonth()+1<m||(h.getMonth()+1===m&&h.getDate()<d)) idade--;
  return idade<30?'ate-29-anos':idade<40?'30-a-39-anos':idade<50?'40-a-49-anos':'50-anos-ou-mais';
};
MA.foto = function(nasc, amor){
  const lista=(window.IMAGENS||{})[MA.faixa(nasc)]||[];
  return lista.length ? lista[(amor-1)%lista.length] : null;
};
// retorna HTML da foto (ou o retrato SVG se ainda não houver fotos)
MA.imagemPerfil = function(nasc, amor){
  const src=MA.foto(nasc,amor);
  return src ? `<img class="portrait" src="${src}" alt="Retrato ilustrativo do perfil ${MA.PERFIS[amor].titulo}" style="aspect-ratio:4/5;object-fit:cover">` : MA.retrato(amor);
};

/* ---------- salvar lead (Google Form, padrão iframe) ---------- */
MA.salvaLead = function(dados){
  const f = CONFIG.LEAD_FORM; if(!f.action) return;
  let ifr = document.getElementById('lead-ifr');
  if(!ifr){ ifr=document.createElement('iframe'); ifr.name=ifr.id='lead-ifr'; ifr.style.display='none'; document.body.appendChild(ifr); }
  const form=document.createElement('form'); form.action=f.action; form.method='POST'; form.target='lead-ifr'; form.style.display='none';
  Object.keys(f.fields).forEach(k=>{ if(f.fields[k] && dados[k]!=null){ const i=document.createElement('input'); i.name=f.fields[k]; i.value=dados[k]; form.appendChild(i);} });
  document.body.appendChild(form); form.submit(); setTimeout(()=>form.remove(),2000);
};

MA.guarda = (k,v)=>{ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} };
MA.le = k=>{ try{ return JSON.parse(localStorage.getItem(k)); }catch(e){ return null; } };
