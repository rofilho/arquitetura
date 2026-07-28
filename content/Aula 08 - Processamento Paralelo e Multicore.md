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
## 📄 Artigo de Aprofundamento

- [What is Multicore Processor? (GeeksforGeeks)](https://www.geeksforgeeks.org/multicore-processors/)
> *Resumo prático: Documentação que apresenta diagramas visuais muito claros mostrando como a arquitetura interna do chip se comporta, principalmente como os núcleos lidam com o compartilhamento da Cache L2/L3 e as disputas de barramento.*

---

## 📚 Referências Bibliográficas e Citações

- **STALLINGS, William**, *Arquitetura e Organização de Computadores: projetando com foco em desempenho*. 11ª ed. Pearson, 2024. **(Capítulo 18: Processamento Paralelo e Computadores Multicore — p. 608–645)**.
- **PATTERSON, David A.; HENNESSY, John L.**, *Organização e Projeto de Computadores: A Interface Hardware/Software*. 5ª ed. Elsevier, 2014. **(Capítulo 6: Processadores Paralelos de Dados em Nível de Thread — p. 500–550)**.

---
*Última atualização: 2026-05-18 | Status: publicado*
