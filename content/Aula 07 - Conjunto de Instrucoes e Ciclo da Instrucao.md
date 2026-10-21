---
title: "🖥️ Aula 07 - Conjunto de Instruções, Ciclo da Instrução e Pipeline"
publicar: true
tags: [arquitetura, {{PERIODO}}, aula07, isa, ciclo-instrucao, pipeline]
---

<div class="au-leitura" data-aula="a07">

# 🖥️ Aula 07 — Conjunto de Instruções, Ciclo da Instrução e Pipeline

**Disciplina:** {{CODIGO}} — Arquitetura e Organização de Computadores · Sistemas de Informação (curso 160) — Uniube<br>
**Professor:** Romualdo Mathias Filho · **romualdo.filho@uniube.br**<br>
**Data:** Terça, {{PERIODO}} · 📘 Teórica (75 min)<br>
**Tópicos:** Conjunto de Instruções (ISA), Ciclo da Instrução (Fetch/Decode/Execute/Memory/Write-back), Tipos R/I/J, Pipeline<br>
**Página de referência:** [Plano de Ensino e Contrato](./Plano-de-Ensino-e-Contrato)

---

### Como os 75 minutos se dividem hoje

| Momento | Minutos |
|---|---|
| Entrada e caminho até aqui | 0–8 |
| Fundamentação: a CPU que espera a memória | 8–18 |
| O ciclo da instrução, fase a fase | 18–33 |
| ISA e tipos R, I e J | 33–45 |
| Pipeline: a linha de montagem | 45–57 |
| Hazards de dados e a bolha | 57–65 |
| Resumo, reflexão e próxima aula | 65–72 |
| Folga | 72–75 |

---

<div class="au-caminho">
<b>Nosso caminho até aqui</b>

Tente responder de cabeça. Depois abra e confira.

<details>
<summary>O PC (Program Counter) guarda um dado ou um endereço?</summary>

**Um endereço: o da próxima instrução a buscar.**

</details>

<details>
<summary>Depois que a instrução é lida da memória, em qual registrador ela fica guardada?</summary>

**No IR (Instruction Register).**

</details>

<details>
<summary>Por que a CPU precisa ir à memória logo no começo de cada instrução?</summary>

**Porque a própria instrução está guardada na memória, e é de lá que a busca (fetch) a traz.**

</details>
</div>

> [!INFO] 🎯 O que você leva desta aula
> - Dizer **por que o pipeline existe**: a CPU fica ociosa esperando a memória, e o ciclo sequencial desperdiça hardware.
> - Descrever as **cinco fases** do ciclo da instrução — Busca (fetch), Decodificação (decode), Execução (execute), Acesso à Memória e Escrita (write-back) — e quem trabalha em cada uma.
> - Classificar uma instrução em **tipo R, I ou J** pela sua estrutura e pelo que ela faz.
> - Explicar o **pipeline** como uma linha de montagem e por que ele aumenta a vazão sem acelerar uma instrução isolada.
> - Reconhecer um **hazard de dados** e entender por que ele força uma **bolha** (stall) no pipeline.
>
> **📂 Recursos**
> - [Plano de Ensino e Contrato](./Plano-de-Ensino-e-Contrato) — calendário, notas, prazos e regras
> - Papel e caneta — você vai traçar o avanço de instruções no pipeline, ciclo a ciclo

<aside class="au-antes">
<b class="au-nota-t">Antes de começar</b>

**ISA** — *Instruction Set Architecture*, o conjunto de instruções que um processador entende. É o contrato entre o hardware e quem escreve código de máquina: define quais operações existem, quantos registradores há e como cada instrução é codificada em bits.

**Opcode** — o campo da instrução que diz **qual operação** executar (somar, subtrair, carregar da memória, saltar). A unidade de controle lê o opcode na decodificação.

**Operando** — o dado sobre o qual a operação age. Pode ser um registrador, um valor constante na própria instrução, ou um endereço de memória.

**Registrador** — memória minúscula e rapidíssima dentro da CPU. O *Program Counter* (PC) guarda o endereço da próxima instrução; o *Instruction Register* (IR) guarda a instrução que está sendo executada agora.

**ULA** — Unidade Lógica e Aritmética, o circuito que faz as contas (soma, subtração) e as operações lógicas (and, or).

**Throughput (vazão)** — quantas instruções a CPU **termina** por unidade de tempo. É diferente da latência de uma instrução isolada: o pipeline melhora a vazão sem reduzir a latência de cada uma.

**Latência** — o tempo que **uma** instrução leva, do começo ao fim, para passar por todas as fases.

**Hazard** — um conflito que impede a próxima instrução de avançar no pipeline no ciclo esperado. O *hazard de dados* é o que veremos hoje: uma instrução precisa de um resultado que a anterior ainda não terminou de calcular.

**Stall / bolha** — a pausa que o pipeline insere quando um hazard impede o avanço. A "bolha" é um ciclo vazio empurrado para frente, no qual nenhum trabalho útil acontece naquele estágio.

</aside>

---

## 1. A CPU passa a vida esperando a memória, e o ciclo sequencial desperdiça o hardware [Fundamentação ⏳ 10 min]

Na Aula 06 você viu o tamanho da espera: um acerto na L1 custa poucos ciclos, mas um acesso à RAM custa ~100. Agora olhe para o que a CPU faz com esse tempo.

<details class="au-aposta">
<summary>Antes de abrir: uma instrução passa por 5 fases, uma de cada vez, e só então a próxima começa. Se cada fase usa um bloco diferente do hardware (a memória de busca, a unidade de controle, a ULA), quanto desse hardware trabalha em cada instante?</summary>

**Um quinto, mais ou menos.** Enquanto a ULA executa, a unidade de busca está parada; enquanto a busca lê a memória, a ULA está parada. No modelo sequencial, quatro dos cinco blocos ficam ociosos em qualquer instante. É esse desperdício que o pipeline ataca — e é por isso que ele vem de "problema real", não de "técnica esperta".

</details>

O processador trabalha num ritmo ditado pelo **clock**. A cada pulso, ele avança um passo na execução dos programas que estão na memória. O passo fundamental, repetido milhões de vezes por segundo, é o **ciclo da instrução**.

No modelo mais simples, o ciclo é **sequencial**: a instrução A percorre as cinco fases inteiras, e só quando termina é que a instrução B começa a sua busca. O problema é que cada fase usa um pedaço diferente do hardware. Quando a ULA está executando A, a unidade de busca está de braços cruzados. Quando a busca lê B, a ULA não tem o que fazer.

> [!NOTE] 💬 O gargalo é a espera, não a conta
> A conta em si — somar dois números na ULA — é rápida. O que domina o tempo é a **ida à memória** no começo de toda instrução (a busca) e no meio de algumas (o acesso a dados). A Aula 06 mediu essa espera; esta aula mostra as duas saídas que a arquitetura encontrou: primeiro **organizar** o ciclo em fases nítidas, depois **sobrepor** fases de instruções diferentes (o pipeline).

A pergunta que organiza o resto da aula: **se cada fase usa um bloco de hardware diferente, por que não pôr cinco instruções trabalhando ao mesmo tempo, cada uma numa fase?** Guarde-a. Primeiro precisamos nomear as cinco fases com precisão.

---

## 2. O ciclo da instrução tem cinco fases, e cada uma tem um dono no hardware [Teoria ⏳ 15 min]

A cada instrução, o processador percorre, em ordem, cinco fases. Os nomes em inglês (fetch, decode, execute, write-back) são os usados na literatura e nos diagramas; é por eles que você vai reconhecer os estágios do pipeline mais adiante.

![[assets/aula07_ciclo.svg]]
> *Figura 1: as cinco fases do ciclo da instrução.*

| # | Fase | O que acontece | Quem faz | Registradores em jogo |
|---|---|---|---|---|
| 1 | **Busca** (*fetch*) | A CPU lê da memória (ou da cache) a instrução apontada pelo PC e a guarda no IR. O PC é incrementado para apontar a próxima. | Unidade de busca + memória | PC → IR |
| 2 | **Decodificação** (*decode*) | A unidade de controle lê o **opcode** no IR, descobre qual operação é e identifica os operandos (quais registradores, qual constante). | Unidade de controle | IR |
| 3 | **Execução** (*execute*) | A operação lógica ou aritmética é realizada. | ULA | registradores de origem → ULA |
| 4 | **Acesso à Memória** | Só para instruções que leem ou gravam dados (*load* / *store*): a CPU vai à memória buscar ou gravar o operando. | Unidade de memória | MAR / MBR |
| 5 | **Escrita** (*write-back*) | O resultado final é gravado no registrador de destino. | Banco de registradores | ULA/MBR → registrador destino |

> [!TIP] 💡 Dica de produção — a cozinha como ciclo
> Pense num cozinheiro (a CPU) seguindo uma receita (o programa na memória):
> - **Busca** → lê a próxima linha da receita.
> - **Decodificação** → entende que a linha significa "pique a cebola".
> - **Execução** → pega a faca e pica.
> - **Acesso à Memória** → se a receita pedir, vai à despensa (a memória) buscar mais um ingrediente.
> - **Escrita** → põe a cebola picada na panela (grava o resultado).
> Cada etapa usa uma "estação" diferente da cozinha — e é exatamente isso que, no tópico 4, vai permitir cinco pratos andando ao mesmo tempo.

> [!WARNING] ⚠️ Cuidado — nem toda instrução usa a fase 4
> A fase de **Acesso à Memória** só entra para instruções que tocam dados na memória (as de carga e gravação). Uma soma entre registradores (`add`) pula essa fase: ela decodifica, executa na ULA e escreve o resultado de volta, sem ir à memória para buscar operando. Não confunda a **busca da instrução** (fase 1, sempre acontece) com o **acesso ao dado** (fase 4, só às vezes).

<details class="au-aposta">
<summary>Sua vez: na instrução <code>add R3, R1, R2</code> (R3 ← R1 + R2), quais das cinco fases realmente fazem trabalho?</summary>

**Busca, Decodificação, Execução e Escrita — quatro.** A fase 4 (Acesso à Memória) não faz nada: os dois operandos (R1 e R2) já estão em registradores, e o destino (R3) também é registrador. Não há dado a buscar nem a gravar na memória. É por isso que instruções do tipo R, que veremos a seguir, são as mais rápidas.

</details>

---

## 3. A ISA define o vocabulário da CPU, e ele se divide em três tipos: R, I e J [Teoria ⏳ 12 min]

Cada família de processador entende um conjunto fixo de instruções — a sua **ISA** (*Instruction Set Architecture*). A ISA é o contrato entre o hardware e o código de máquina: diz quais operações existem e como cada uma é codificada em bits.

Em arquiteturas RISC (como o MIPS e o ARM), as instruções têm todas o mesmo tamanho e se organizam em **três formatos**, conforme o que carregam nos seus campos.

![[assets/aula07_tipos.svg]]
> *Figura 3: formato das instruções tipo R, I e J.*

| Tipo | O que carrega | Estrutura típica | Para que serve | Exemplos |
|---|---|---|---|---|
| **R** (Registrador) | Só registradores | opcode + 3 registradores (2 origens, 1 destino) | Operações entre dados que **já estão** em registradores. São as mais rápidas (pulam o acesso à memória). | `add`, `sub`, `and`, `or` |
| **I** (Imediato) | Um registrador + uma constante | opcode + registrador + valor imediato | Operações com uma **constante** embutida na instrução, e também as cargas/gravações de memória (*load* / *store*). | `addi` (soma imediata), `lw` (load), `sw` (store) |
| **J** (Jump) | Um endereço de desvio | opcode + endereço-alvo | **Alterar o fluxo** do programa: saltar para outro ponto do código, chamar uma função. | `j` (salto incondicional), `jal` (chamada) |

> [!TIP] 💡 Dica — leia o tipo pelo que a instrução precisa
> Não decore a lista. Pergunte: *de onde vêm os dados?* Se vêm todos de registradores → **R**. Se um deles é uma constante escrita na própria instrução, ou é um endereço de memória a carregar → **I**. Se a instrução não calcula nada, só muda para onde o programa vai → **J**.

<details class="au-aposta">
<summary>Antes de abrir: <code>addi R1, R1, 4</code> soma a constante 4 ao registrador R1. É tipo R, I ou J?</summary>

**Tipo I.** Tem um operando que é uma **constante imediata** (o 4), escrita dentro da própria instrução. O "i" de `addi` é justamente de *immediate*. Uma `add R1, R2, R3`, que soma dois registradores, seria tipo R.

</details>

---

## 4. Pipeline: pôr cinco instruções em fases diferentes ao mesmo tempo [Teoria ⏳ 12 min]

Agora a pergunta do tópico 1 tem resposta. Se cada fase usa um bloco de hardware diferente, não há razão para deixá-los ociosos: enquanto a instrução A está na Execução, a B pode estar na Decodificação e a C na Busca. É o **pipeline**.

![[assets/aula07_pipeline.svg]]
> *Figura 2: pipeline como uma linha de montagem — 5 instruções em estágios diferentes ao mesmo tempo.*

O diagrama abaixo mostra o avanço ciclo a ciclo. Leia cada linha como uma instrução e cada coluna como um pulso de clock. Note a **diagonal**: a cada ciclo, uma instrução nova entra na Busca e uma termina na Escrita.

| Ciclo → | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| **Instr. 1** | Busca | Decod. | Exec. | Mem. | Escrita | | |
| **Instr. 2** | | Busca | Decod. | Exec. | Mem. | Escrita | |
| **Instr. 3** | | | Busca | Decod. | Exec. | Mem. | Escrita |

A partir do ciclo 5, o pipeline fica **cheio**: uma instrução termina a cada ciclo. Sem pipeline, cada instrução gastaria 5 ciclos sozinha, e 3 instruções levariam 15 ciclos. Com o pipeline, as mesmas 3 terminam no ciclo 7.

> [!NOTE] 💬 O pipeline não acelera uma instrução: acelera o fluxo
> Uma instrução isolada ainda leva as suas 5 fases (a **latência** não muda). O que o pipeline aumenta é a **vazão** (*throughput*): quantas instruções terminam por unidade de tempo. No ideal, com 5 estágios cheios, a CPU encerra uma instrução por ciclo, aproximando-se de um ganho de 5× num trecho longo de código. É a diferença entre quanto tempo um carro leva na linha de montagem e quantos carros saem dela por hora.

**A vantagem, em uma frase:** o pipeline mantém quase todos os blocos de hardware trabalhando ao mesmo tempo, em vez de um de cada vez. Mas essa sobreposição tem um custo, e é ele o tópico 5.

---

## 5. Quando uma instrução depende da anterior, o pipeline engasga: o hazard de dados [Teoria ⏳ 8 min]

A linha de montagem só flui se cada instrução for independente das que estão à frente dela. Nem sempre é o caso.

<details class="au-aposta">
<summary>Antes de abrir: a instrução 1 é <code>add R3, R1, R2</code> (calcula R3) e a instrução 2, logo atrás, é <code>sub R5, R3, R4</code> (usa R3). Olhando a tabela do tópico 4, quando a instrução 2 precisa de R3, e quando a instrução 1 termina de gravá-lo?</summary>

**A instrução 2 precisa de R3 na Execução (ciclo 4), mas a instrução 1 só o grava na Escrita (ciclo 5).** O dado que a 2 vai ler em R3 ainda é o valor **antigo** — a 1 não terminou de escrever o novo. Esse é o **hazard de dados**: uma instrução depende de um resultado que ainda não existe na hora em que ela precisa.

</details>

Um **hazard de dados** acontece quando uma instrução precisa de um valor que uma instrução anterior, ainda no pipeline, não terminou de produzir. Se nada for feito, a instrução de trás lê o valor errado.

A saída mais simples é **pausar** o pipeline: inserir uma ou mais **bolhas** (*stalls*), ciclos vazios que seguram a instrução dependente até o dado ficar pronto. A bolha resolve a correção, mas custa desempenho — naqueles ciclos, o estágio não faz trabalho útil.

> [!WARNING] ⚠️ Cuidado — hazard não é erro de programação
> O hazard não vem de um código mal escrito; vem da **sobreposição** que o próprio pipeline criou. No modelo sequencial ele não existiria, porque a instrução 1 já teria terminado antes de a 2 começar. O hazard é o preço da vazão. Processadores reais atenuam esse custo com técnicas de *forwarding* (adiantar o resultado de um estágio direto para outro, sem esperar a escrita) `[CONFIRMAR: forwarding está no escopo desta aula ou fica para a próxima?]`, mas a ideia que você leva hoje é a causa: dependência de dado entre instruções próximas.

> [!NOTE] 💬 Outros hazards existem
> Além do hazard de **dados**, o pipeline enfrenta hazards de **controle** (quando um desvio condicional — um `if` — torna incerto qual será a próxima instrução) e hazards **estruturais** (quando duas instruções disputam o mesmo recurso de hardware no mesmo ciclo). Hoje o foco é o de dados; os demais ficam nomeados para referência. `[CONFIRMAR: profundidade de hazard de controle esperada nesta turma]`

---

## Fechamento — a linha de montagem

Henry Ford não deixou de montar carros um de cada vez por capricho. Ele notou que, enquanto um operário apertava um parafuso, os outros esperavam. A linha de montagem pôs cada operário numa estação fixa: o carro anda, e cada estação faz sempre a mesma coisa, no carro que chega na sua vez. Nenhum carro sai mais rápido — ele ainda passa por todas as estações —, mas **saem muito mais carros por hora**.

O pipeline é essa ideia dentro do processador. As cinco fases são as estações; as instruções são os carros. E o **hazard de dados** é o carro que não pode avançar porque depende de uma peça que o carro da frente ainda está instalando: a linha inteira para e espera. Guardar essa imagem é guardar a aula de hoje — e, na próxima, veremos o que acontece com essa linha quando um cache miss segura a primeira estação.

---

<div class="au-resumo">
<b>O que você viu acontecer hoje</b>

Tente responder o *porquê* antes de abrir. É o esforço de lembrar que fixa, não a releitura.

| O que você viu acontecer | |
| :--- | :--- |
| No modelo sequencial, quatro dos cinco blocos de hardware ficavam parados a cada instante | <details><summary>por quê?</summary>Cada fase usa um bloco diferente (busca, controle, ULA, memória, escrita). Rodando uma instrução de cada vez, só o bloco da fase atual trabalha; os outros esperam. É esse desperdício que o pipeline ataca.</details> |
| O ciclo da instrução tinha cinco fases, e a de Acesso à Memória às vezes não fazia nada | <details><summary>por quê?</summary>Busca, Decodificação, Execução e Escrita acontecem sempre; o Acesso à Memória só entra em instruções de load/store. Uma soma entre registradores pula essa fase.</details> |
| A instrução <code>addi R1, R1, 4</code> foi classificada como tipo I | <details><summary>por quê?</summary>Ela carrega uma constante imediata (o 4) dentro da própria instrução. Tipo R só tem registradores; tipo J só carrega um endereço de desvio.</details> |
| No diagrama do pipeline, três instruções terminaram em 7 ciclos em vez de 15 | <details><summary>por quê?</summary>As fases se sobrepõem: a cada ciclo entra uma instrução nova na Busca e sai uma pela Escrita. A latência de cada uma continua 5 ciclos; o que cresceu foi a vazão.</details> |
| A <code>sub R5, R3, R4</code> precisou esperar uma bolha antes de avançar | <details><summary>por quê?</summary>Hazard de dados: ela precisa de R3 na Execução, mas a instrução anterior só grava R3 na Escrita, um ciclo depois. O pipeline insere uma bolha para não ler o valor antigo.</details> |

</div>

<div class="au-podcast" style="background:var(--au-sfc,var(--secondary,#f0f3f8));color:var(--au-tx,var(--dark,#1d2057));border:1px solid color-mix(in srgb,var(--au-par-verde,#2e7d52) 30%,transparent);border-radius:14px;padding:1.25rem 1.5rem;margin:1.5rem auto;max-width:720px">
<b>🎧 Podcast da aula — "Como o pipeline acelera os processadores"</b>
<p class="au-podcast-origem"><b>Gerado por IA</b> (NotebookLM) a partir do material da disciplina — se divergir da aula, a aula vence.</p>
<audio controls preload="none" style="width:100%;margin-top:.5rem">
<source src="assets/aula07-pipeline-podcast.m4a" type="audio/mp4">
Seu navegador não reproduz áudio embutido — <a href="assets/aula07-pipeline-podcast.m4a">baixe o episódio aqui</a>.
</audio>
</div>

<hr class="au-fim-aula">

<div class="au-reflexao">
<b>Para pensar até a próxima aula</b>

<p>O pipeline aposta que a próxima instrução já está pronta para entrar na Busca. Mas a Aula 06 mostrou que buscar da RAM pode custar ~100 ciclos quando a cache falha.</p>

<p>O que acontece com a linha de montagem inteira quando a primeira estação — a Busca — fica travada esperando um cache miss? Quantas bolhas isso empurra pelo pipeline?</p>
</div>

<div class="au-refs">
<b>Referências desta aula</b>

- STALLINGS, W. **Arquitetura e Organização de Computadores: projetando com foco em desempenho.** 11. ed. São Paulo: Pearson, 2024 `[CONFIRMAR: edição e ano conforme o legado]`. <span class="au-pag">cap. 13 (conjuntos de instruções: características e funções), cap. 14 (modos de endereçamento e formatos), cap. 16 (operação da unidade de controle — o ciclo da instrução) e cap. 15 (pipeline do processador), páginas [CONFIRMAR]</span> — a ISA e os tipos de instrução dos tópicos 2 e 3; o ciclo da instrução do tópico 2; o pipeline e os hazards dos tópicos 4 e 5.
- PATTERSON, D. A.; HENNESSY, J. L. **Organização e Projeto de Computadores: A Interface Hardware/Software.** 5. ed. Rio de Janeiro: Elsevier, 2014. <span class="au-pag">cap. 4 (O Processador — datapath, controle e pipeline), páginas 235–294 [CONFIRMAR]</span> — as cinco fases, o diagrama de pipeline, os hazards de dados e o forwarding.
- TANENBAUM, A. S.; AUSTIN, T. **Organização Estruturada de Computadores.** 6. ed. São Paulo: Pearson, 2013. <span class="au-pag">cap. [CONFIRMAR]</span> — nível da microarquitetura e paralelismo em nível de instrução.

</div>

### Para ir além

- [Computer Organization and Architecture — Pipelining (GeeksforGeeks, em inglês)](https://www.geeksforgeeks.org/computer-organization-and-architecture-pipelining-set-1-execution-stages-and-throughput/) — leitura técnica com diagramas focados no cálculo de ganho de throughput; ajuda a enxergar matematicamente como um pipeline de 5 estágios se aproxima de acelerar o processador em até 5× no cenário ideal.
- No simulador MARS ou SPIM (MIPS): escreva três instruções em que a terceira dependa da primeira e observe, passo a passo, o momento em que cada registrador é escrito. É o hazard de dados do tópico 5 acontecendo na sua frente. `[CONFIRMAR: simulador adotado na disciplina]`

<div class="au-proxima">
<b>Na próxima aula</b>

<p>Hoje a instrução entrou em foco: o que ela diz, como é codificada e como o pipeline faz várias avançarem ao mesmo tempo. Na próxima, o paralelismo sobe de nível — <b>vários núcleos e o processamento multicore</b> — e você vai ver a diferença entre acelerar uma linha de montagem e montar várias linhas em paralelo.</p>

</div>

</div>

%%
### Banco de Questões — Aula 07

**Q1. (Ciclo da instrução)** Em qual fase do ciclo da instrução a Unidade de Controle lê o *opcode* e identifica os operandos envolvidos?

a) Busca (fetch)
b) Decodificação (decode)
c) Execução (execute)
d) Escrita (write-back)
e) Acesso à Memória

**Gabarito: b.** A decodificação é a fase em que a unidade de controle interpreta o opcode guardado no IR e descobre quais registradores ou constantes a instrução usa.

---

**Q2. (Fundamentação — por que o pipeline existe)** Qual é a principal justificativa para a introdução do pipeline no processador?

a) Reduzir o número de instruções de um programa.
b) Diminuir a latência de uma única instrução isolada.
c) Evitar que blocos de hardware fiquem ociosos enquanto uma instrução ocupa apenas uma fase por vez.
d) Eliminar a necessidade de memória cache.
e) Aumentar a frequência do clock.

**Gabarito: c.** No modelo sequencial, cada fase usa um bloco de hardware diferente e os demais ficam parados; o pipeline sobrepõe fases de instruções diferentes para manter os blocos ocupados e elevar a vazão.

---

**Q3. (Tipos de instrução)** A instrução `addi R2, R2, 8`, que soma a constante 8 ao registrador R2, é classificada como:

a) Tipo R, porque usa registradores.
b) Tipo I, porque contém um valor imediato (constante) na própria instrução.
c) Tipo J, porque altera o fluxo do programa.
d) Tipo R, porque a soma é feita na ULA.
e) Tipo J, porque usa o registrador R2 duas vezes.

**Gabarito: b.** O operando 8 é um valor imediato embutido na instrução, característica do formato tipo I (o "i" de `addi` é de *immediate*).

---

**Q4. (Vazão × latência no pipeline)** Sobre o efeito do pipeline no desempenho, é correto afirmar que ele:

a) Reduz a latência de cada instrução individual.
b) Aumenta a vazão (throughput), sem reduzir a latência de uma instrução isolada.
c) Garante que nenhum conflito entre instruções ocorra.
d) Faz cada instrução passar por menos fases.
e) Só funciona em arquiteturas CISC.

**Gabarito: b.** Uma instrução ainda percorre todas as suas fases (latência inalterada); o pipeline faz mais instruções terminarem por unidade de tempo ao sobrepor as fases.

---

**Q5. (Hazard de dados)** Considere, em sequência no pipeline, `add R3, R1, R2` seguida de `sub R5, R3, R4`. Por que ocorre um hazard de dados?

a) Porque as duas instruções usam a ULA no mesmo ciclo.
b) Porque a segunda instrução precisa de R3 na Execução, antes de a primeira gravá-lo na fase de Escrita.
c) Porque `sub` é uma instrução do tipo J.
d) Porque o Program Counter aponta para o endereço errado.
e) Porque R4 não foi inicializado.

**Gabarito: b.** A segunda instrução lê R3 na Execução, mas a primeira só escreve R3 um ciclo depois (na Escrita); sem intervenção, a segunda leria o valor antigo — daí a necessidade de uma bolha (ou de forwarding).

---

**Q6. (Fase de Acesso à Memória)** Qual das instruções abaixo **não** utiliza a fase de Acesso à Memória do ciclo da instrução?

a) `lw R1, 0(R2)` (load word)
b) `sw R1, 0(R2)` (store word)
c) `add R3, R1, R2` (soma entre registradores)
d) Uma instrução que lê um dado da RAM.
e) Uma instrução que grava um resultado na RAM.

**Gabarito: c.** A soma entre registradores tem ambos os operandos e o destino em registradores; não há dado a ler ou gravar na memória, então a fase de Acesso à Memória não faz trabalho. As demais são load/store, que dependem dessa fase.
%%
