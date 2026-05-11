---
disciplina: Arquitetura de Computadores
codigo: "14188"
aula: 8
titulo: "Processamento Paralelo, Multicore e Distribuído"
tipo: teorica
semana: 8
data: 2026-05-25
status: publicado
tags:
  - arquitetura
  - multicore
  - paralelo
  - distribuido
publicar: true
---

# 🟢 Aula 08: Processamento Paralelo, Multicore e Distribuído

**Disciplina:** Arquitetura de Computadores
**Curso:** Inteligência Artificial e Ciência de Dados — Uniube
**Semana:** 8
**Professor:** Romualdo Mathias Filho
**Tipo:** 📘 Teórica
**Tópicos:** Processamento Paralelo, Processamento Multicore, Diferenças para Pipeline, Processamento Distribuído.

---

## 🎯 Objetivo da Aula

Ao final desta aula, os alunos serão capazes de:
- **Compreender** o conceito de Processamento Paralelo e como ele difere da execução sequencial pura.
- **Distinguir** claramente entre Processamento Paralelo, Arquitetura Multicore e Processamento Distribuído.
- **Identificar** os benefícios (desempenho, eficiência energética) e os desafios (sincronização, escalabilidade) do uso de múltiplos núcleos.
- **Entender** o limite de ganho de desempenho em tarefas paralelizadas (Lei de Amdahl).

---

## 🔄 Revisão Rápida (5 min)

| **Conceito (Aula Anterior)** | **Conexão com hoje** |
| --- | --- |
| **Pipeline** | O Pipeline divide *uma* instrução em fases e as sobrepõe (paralelismo em nível de instrução). Hoje, veremos o paralelismo no nível de *múltiplos núcleos* rodando *múltiplas threads*. |
| **Gargalo de Hardware** | Apenas aumentar o *clock* da CPU esquentava demais o chip. A solução do mercado foi adicionar mais núcleos (Multicore) em vez de acelerar um núcleo só. |
| **Ciclo da Instrução** | Em um sistema Multicore, há vários ciclos de instrução acontecendo ao mesmo tempo em núcleos físicos diferentes. |

---

## 📌 1. O que é Processamento Paralelo?

Historicamente, os processadores eram "Single-Core": executavam uma única instrução de cada vez, dependendo exclusivamente da velocidade do relógio (clock) para parecerem mais rápidos. O **Processamento Paralelo** surge como a quebra desse paradigma.

Consiste na prática de dividir um problema computacional em partes menores, onde cada parte é resolvida simultaneamente por diferentes recursos de processamento.

> 💡 **Analogia:** Imagine pintar uma casa. Se você faz sozinho (Single-Core), demorará 10 horas. Se você chama 4 amigos e dividem os cômodos, o trabalho pode ser feito em pouco mais de 2 horas. Isso é paralelismo.

### O Limite do Paralelismo (Lei de Amdahl)

É importante notar que **nem tudo pode ser paralelizado**. Segundo Patterson e Hennessy (2014, p. 505), *"o ganho de desempenho obtido com a paralelização de um aplicativo é estritamente limitado pela fração do código que deve ser executada de forma serial (sequencial)."*

Se você tem 9 mulheres grávidas, elas não geram um bebê em 1 mês. Tarefas sequenciais impõem um teto rígido ao ganho do paralelismo.

---

## 📌 2. Processamento Multicore

Processamento Multicore é a **implementação física (hardware)** do processamento paralelo em um único chip de silício. Um processador Multicore contém dois ou mais núcleos (cores) independentes dentro do mesmo encapsulamento físico.

- **Como funciona:** Cada núcleo possui sua própria Unidade de Controle (UC), Unidade Lógica e Aritmética (ULA) e, geralmente, suas próprias Caches L1 e L2.
- **Compartilhamento:** Apesar de independentes, eles compartilham o mesmo acesso à memória RAM e, frequentemente, a memória Cache L3.

> 💬 *"O advento dos processadores multicore marcou a transição da era de focar em um único núcleo rápido para uma era baseada no throughput (vazão) coletivo."* (STALLINGS, 2024, p. 612).

### Benefícios
1. **Desempenho Bruto:** Múltiplas tarefas completadas na mesma fração de tempo.
2. **Eficiência Energética:** Dois núcleos rodando a 2.0 GHz consomem muito menos energia (e geram menos calor) do que um único núcleo rodando a 4.0 GHz para realizar o mesmo trabalho.
3. **Multitarefa Real:** O SO não precisa mais "fingir" multitarefa trocando de processo rapidamente; os processos rodam fisicamente ao mesmo tempo.

### Desafios
1. **Sincronização:** Se dois núcleos tentarem gravar no mesmo endereço de memória ao mesmo tempo, ocorrerá corrupção de dados (Condição de Corrida).
2. **Complexidade de Programação:** Desenvolvedores precisam escrever códigos otimizados para múltiplas *threads*.

---

## 📌 3. Paralelismo vs Pipeline vs Distribuído

A computação encontrou várias maneiras de fazer as coisas ao mesmo tempo. É crucial não confundi-las:

| Arquitetura | Como Funciona | Escopo |
| --- | --- | --- |
| **Pipeline** | Divide **uma tarefa** em várias fases (busca, decodifica, executa) e trabalha nas fases simultaneamente. É uma linha de montagem. | Ocorre **dentro de um único núcleo**. (Nível de Instrução). |
| **Processamento Paralelo (Multicore)** | Executa **múltiplas tarefas ou threads** simultaneamente, onde cada tarefa usa um núcleo físico diferente da mesma máquina. | Ocorre **dentro do mesmo computador**, compartilhando a RAM. |
| **Processamento Distribuído** | Divide uma tarefa colossal entre **múltiplos computadores físicos** interconectados via rede. | Ocorre em **clusters ou data centers**. Ex: Render farm da Pixar, Mineração de Bitcoin, Servidores Web Globais. |

---

## 📋 Resumo Estrutural

| **Conceito** | **Definição em Uma Frase** |
| --- | --- |
| **Processamento Paralelo** | Paradigma de dividir tarefas para execução simultânea, buscando resolver problemas mais rápido. |
| **Processamento Multicore** | Chip de CPU único que contém múltiplos núcleos de processamento físicos independentes. |
| **Pipeline** | Paralelismo em nível de instrução dentro de um único núcleo (linha de montagem). |
| **Processamento Distribuído** | Paralelismo em nível de infraestrutura, dividindo tarefas entre diferentes computadores via rede. |
| **Lei de Amdahl** | Princípio que afirma que o ganho de velocidade do paralelismo é limitado pela parte do programa que não pode ser paralelizada. |
| **Sincronização** | O desafio de coordenar múltiplos núcleos para que não acessem e corrompam o mesmo dado na memória ao mesmo tempo. |

---

## ❓ Banco de Questões

> 🔒 *Seção exclusiva do professor — não publicada para os alunos.*

### Questão 1 (Múltipla Escolha — Nível: Básico)

**Enunciado:** O mercado de tecnologia parou de tentar aumentar a velocidade do *clock* dos processadores (que estacionou na casa dos 3.0 a 5.0 GHz) há anos e passou a investir na adição de múltiplos núcleos por processador (Multicore). Qual o motivo arquitetural principal dessa mudança?

- [ ] A) É matematicamente impossível aumentar o clock acima de 5.0 GHz.
- [ ] B) O Sistema Operacional Windows não consegue ler clocks muito altos.
- [x] C) O aumento da frequência do clock gera um consumo de energia excessivo e problemas físicos de dissipação de calor (barreira térmica). ✅
- [ ] D) Múltiplos núcleos permitem que o processador funcione sem memória RAM.

**Justificativa:** Conforme o clock aumentava, a quantidade de calor dissipado pelo chip crescia de forma não-linear, exigindo coolers inviáveis para consumo. Adicionar múltiplos núcleos rodando em frequências menores entrega mais vazão (throughput) de dados consumindo menos energia e dissipando menos calor.

---

### Questão 2 (Múltipla Escolha — Nível: Intermediário)

**Enunciado:** Analise as três abordagens de concorrência/paralelismo:
I. Dividir as fases do ciclo de uma instrução (busca, decodificação) para que o hardware trabalhe como uma linha de montagem de carros.
II. Usar um processador Core i7 onde o Núcleo 1 renderiza um vídeo enquanto o Núcleo 2 gerencia o navegador de internet, ambos usando a mesma memória RAM.
III. Dividir um banco de dados global entre 50 servidores espalhados pelo mundo conectados via fibra óptica para responder requisições rápidas.
Respectivamente, os itens I, II e III referem-se a:

- [x] A) I - Pipeline; II - Processamento Multicore; III - Processamento Distribuído. ✅
- [ ] B) I - Processamento Multicore; II - Pipeline; III - Processamento Paralelo.
- [ ] C) I - Processamento Paralelo; II - Processamento Distribuído; III - Pipeline.
- [ ] D) I - Processamento Distribuído; II - Pipeline; III - Processamento Multicore.

**Justificativa:** Pipeline ocorre dentro do núcleo fracionando as fases da instrução. Multicore ocorre no mesmo chip dividindo as threads em núcleos que compartilham RAM. Processamento distribuído ocorre em computadores distintos dividindo o trabalho em rede.

---

### Questão 3 (Dissertativa — Nível: Avançado)

**Enunciado:** De acordo com a Lei de Amdahl, dobrar o número de núcleos de um processador (ex: de 4 para 8 núcleos) irá dobrar o desempenho de qualquer programa de computador? Justifique utilizando o conceito de limites do paralelismo.

**Resposta esperada:** Não. A Lei de Amdahl demonstra que o ganho de desempenho obtido adicionando-se núcleos de processamento é limitado pela fração do código que é puramente sequencial. Se um software possui tarefas que exigem passos encadeados e insubstituíveis onde o Passo B depende do término do Passo A, esses trechos não podem ser paralelizados. Portanto, mesmo com infinitos núcleos, o software nunca rodará mais rápido do que o tempo necessário para executar sua parte sequencial. (Patterson e Hennessy, 2014, p. 505).

---

## 📄 Artigo de Aprofundamento

- [What is Multicore Processor? (GeeksforGeeks)](https://www.geeksforgeeks.org/multicore-processors/)
> *Resumo prático: Documentação que apresenta diagramas visuais muito claros mostrando como a arquitetura interna do chip se comporta, principalmente como os núcleos lidam com o compartilhamento da Cache L2/L3 e as disputas de barramento.*

---

## 📚 Referências Bibliográficas e Citações

- **STALLINGS, William**, *Arquitetura e Organização de Computadores: projetando com foco em desempenho*. 11ª ed. Pearson, 2024. **(Capítulo 18: Processamento Paralelo e Computadores Multicore — p. 608–645)**.
- **PATTERSON, David A.; HENNESSY, John L.**, *Organização e Projeto de Computadores: A Interface Hardware/Software*. 5ª ed. Elsevier, 2014. **(Capítulo 6: Processadores Paralelos de Dados em Nível de Thread — p. 500–550)**.

---
*Última atualização: 2026-05-11 | Status: rascunho*
