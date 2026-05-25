---
context: uniube
type: aula
status: publicado
created: 2026-05-25
semester: "2026-1"
ai_tier: hot
disciplina: Arquitetura de Computadores
codigo: "ARQ-01"
aula: 10
titulo: "Medidas de Desempenho: Latência, Vazão e Lei de Amdahl"
tipo: teorica
semana: 10
data: 2026-04-20
tags:
  - arquitetura
  - desempenho
  - latencia
  - vazao
  - lei-amdahl
publicar: true
---

# 🟢 Aula 10: Medidas de Desempenho: Latência, Vazão e Lei de Amdahl

**Disciplina:** Arquitetura de Computadores (Cód. ARQ-01)
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube
**Semana:** 10 | 20/04/2026
**Professor:** Romualdo Mathias Filho
**Tipo:** 📘 Teórica
**Tópicos:** O Dilema da Pizzaria (Latência vs. Vazão), A Receita de Escrever um Livro (Equação da CPU), e O Bolo no Forno (A Lei de Amdahl).

---

> [!INFO] 🎯 Visão Geral da Aula & Recursos
> **Seja muito bem-vindo! Hoje faremos uma viagem tranquila e cheia de analogias simples para desmistificar o que torna um computador rápido de verdade. Esqueça termos técnicos áridos! Vamos usar exemplos divertidos do nosso cotidiano para entender como medimos o tempo das máquinas e por que colocar mais processadores nem sempre resolve todos os nossos problemas.**
> 
> * **O que você vai dominar:**
>   - Diferenciar velocidade individual de capacidade coletiva de processamento com analogias práticas.
>   - Compreender as três engrenagens que definem o tempo de execução de um programa no computador.
>   - Entender de forma leve a matemática por trás da Lei de Amdahl e por que existem gargalos impossíveis de acelerar.
> * **📂 Recursos Adicionais para Download:**
>   - [Amdahl's Law Calculator (Simulador Interativo Omni)](https://www.omnicalculator.com/other/amdahls-law) — Uma ferramenta interativa fantástica para você arrastar barras e simular os limites de ganho de velocidade de forma imediata e visual.

---

## 🎯 Objetivo da Aula

Ao final desta aula, você será capaz de:
- **Explicar** a diferença entre a velocidade de uma tarefa única e a capacidade de um sistema usando o exemplo de uma pizzaria.
- **Identificar** as três variáveis que controlam o tempo que o processador gasta para rodar um programa.
- **Discutir** por que métricas comerciais simples nem sempre dizem a verdade sobre a velocidade real de um chip.
- **Usar** a lógica da Lei de Amdahl para prever o limite de ganho de tempo ao otimizar apenas uma parte de um trabalho cotidiano.

---

## 🔄 Revisão Rápida (5 min)

Para começarmos nossa jornada com o pé direito e a mente tranquila, vamos relembrar rapidamente como o que já estudamos se conecta perfeitamente com a nossa aula de hoje:

| **Conceito Simples (Aulas Passadas)** | **Como se Conecta com Hoje?** |
| :--- | :--- |
| **[[Aula 09 - Mecanismos de Entrada e Saida\|Aula 09 (Entrada/Saída)]]** | Vimos como periféricos transferem dados (com ou sem DMA). Hoje entenderemos que o tempo de espera do processador por essas transferências (I/O) é um componente crítico da latência total do sistema. |
| **[[Aula 08 - Processamento Paralelo e Multicore\|Aula 08 (Processamento Paralelo)]]** | Aprendemos sobre múltiplos núcleos cooperativos. Hoje, com a Lei de Amdahl, calcularemos exatamente o limite de ganho de desempenho obtido ao paralelizar um programa nessas CPUs multicore. |
| **[[Aula 07 - Conjunto de Instrucoes e Ciclo da Instrucao\|Aula 07 (Ciclo da Instrução)]]** | Entendemos o ciclo básico de busca, decodificação e execução. Esse ciclo representa os passos físicos de silício; hoje veremos que a média de ciclos de clock gastos por instrução (CPI) é a chave da Equação da CPU. |

---

## 📌 1. A Equação do Desempenho: O Dilema da Pizzaria [Teoria ⏳ 15 min]

Para entender a velocidade de um computador de maneira leve, o melhor caminho é sair do laboratório de informática e visitar uma **pizzaria**. Imagine que você acabou de realizar o sonho de abrir a *Pizzaria do Romualdo*. O forno está aquecido, o queijo derretendo e os pedidos começam a chegar. 

Você logo percebe que "desempenho" e "rapidez" podem significar duas coisas completamente diferentes, dependendo de quem está perguntando!

### 1.1 — Latência (O Tempo de Entrega)
A **Latência** é o tempo que leva para um único trabalho começar e terminar. É a velocidade sob a perspectiva de **um cliente individual** que está com fome.
*   **Foco:** Rapidez de ponta a ponta.
*   **O exemplo da pizza:** O tempo de espera desde o momento em que você clica em "Confirmar Pedido" no aplicativo do *iFood* até o motoboy tocar a campainha do seu portão com a pizza quentinha. Se levou **30 minutos**, essa é a latência da sua entrega.
*   **No computador:** O tempo que leva para a tela do aplicativo do banco abrir após você digitar a sua senha ($100\ ms$).

### 1.2 — Vazão ou Throughput (A Capacidade da Cozinha)
A **Vazão** é a quantidade total de trabalho concluída em um determinado período de tempo. É a produtividade sob a perspectiva **da pizzaria inteira**.
*   **Foco:** Volume e capacidade de atendimento coletivo.
*   **O exemplo da pizza:** Quantas pizzas a cozinha da sua pizzaria consegue assar e despachar por hora durante o pico de um sábado à noite. Se a cozinha produz **120 pizzas por hora**, essa é a sua vazão.
*   **No computador:** Quantos pagamentos Pix os servidores centrais conseguem processar por segundo durante a Black Friday ($15.000\ TPS$).

```mermaid
graph LR
    subgraph Latência ["🏍️ Foco na Latência — 1 Cliente Feliz"]
        P1["🍕 Pizzaria"] -->|"Moto veloz em 15 min"| C1["😊 Cliente A"]
    end

    subgraph Vazão ["🚚 Foco na Vazão — 100 Clientes Atendidos"]
        P2["🍕 Pizzaria"] -->|"Frota de 10 motos"| B1["🏘️ Bairro Inteiro"]
    end
```

> [!WARNING] ⚠️ Gotcha de Infraestrutura
> **Contratar mais motoboys não acelera a sua própria pizza:** Um erro clássico de desenvolvedores e gerentes de TI é achar que colocar "mais processadores" (escala horizontal) torna um programa sequencial individual mais rápido. Adicionar 5 processadores extras é como contratar 5 novos motoboys para a pizzaria: você conseguirá atender mais clientes no bairro ao mesmo tempo (aumenta a **vazão**), mas a sua pizza individual não sairá do forno mais rápido, pois o tempo de preparo físico da massa e o limite de velocidade da moto continuam exatamente os mesmos (a **latência** permanece idêntica).

---

## 📌 2. Métricas de Performance e a Receita de Escrever um Livro [Teoria & Prática ⏳ 20 min]

No mercado de tecnologia, as fabricantes costumam usar siglas como **MIPS** (Milhões de Instruções por Segundo) para tentar mostrar que seus processadores são os mais rápidos do planeta. Porém, medir a velocidade de uma CPU apenas por "quantidade de instruções" é uma armadilha clássica.

### 2.1 — O Dilema do MIPS: Por que números grandes enganam?
Imagine que duas pessoas, a **Ana** e o **Bruno**, receberam a tarefa de escrever a mesma redação:
*   A **Ana** escreve de forma muito detalhada, usando palavras simples, curtas e repetitivas. Ela escreve **100 palavras por minuto**.
*   O **Bruno** é muito conciso, escreve usando vocabulário rico, direto e termos densos. Ele escreve apenas **30 palavras por minuto**.

Se avaliarmos apenas a "taxa de escrita" (equivalente ao MIPS), a Ana parece ser mais de 3 vezes melhor. No entanto, se para passar a mesma ideia a Ana precisa escrever 300 palavras e o Bruno resolve a redação com apenas 90 palavras, **ambos terminarão exatamente no mesmo minuto!** 

O MIPS é enganoso porque processadores diferentes (como os chips da Intel do seu computador e os chips ARM do seu celular) precisam de quantidades diferentes de instruções para realizar a mesma tarefa real do dia a dia.

### 2.2 — As Três Engrenagens do Tempo de CPU
Para calcular de forma científica e suave o tempo de um computador, nós decompomos o tempo em uma receita simples de três ingredientes chamada de **Equação Clássica da CPU**:

$$\text{Tempo de CPU} = IC \times CPI \times T_{clock} = \frac{IC \times CPI}{\text{Frequência}}$$

Não se assuste com as siglas matemáticas! Elas são apenas uma forma elegante de registrar três segredos muito simples:
*   $IC$ = Quantidade total de **Instruções** executadas pelo programa (o tamanho do trabalho).
*   $CPI$ = **Ciclos por Instrução** (a média de batimentos do clock gastos por instrução).
*   $T_{clock}$ = Período do Clock (a duração de um único ciclo, o inverso da **Frequência** de GHz).

Para entender isso sem nenhuma complicação, pense na analogia de **escrever um livro à mão**:

```mermaid
graph LR
    IC["📖 Palavras do Livro<br/>(IC — Instruções)"] --> TEMPO["⏱️ Tempo Total<br/>de Escrita"]
    CPI["✍️ Batidas de Caneta<br/>por Palavra<br/>(CPI — Ciclos por Instrução)"] --> TEMPO
    CLK["💓 Velocidade da Mão<br/>(T_clock — Período do Clock)"] --> TEMPO
```

Para diminuir o tempo de escrita del livro (tornar o computador mais rápido), você tem apenas três caminhos possíveis:
1.  **Reduzir as palavras (Otimizar o Código):** Usar um vocabulário que diga a mesma coisa com menos texto (trabalho do programador e do compilador).
2.  **Diminuir as batidas por palavra (Melhorar a Micro-arquitetura):** Desenhar letras mais simples que exijam menos traços físicos da caneta no papel (trabalho dos engenheiros de hardware).
3.  **Mover a mão mais rápido (Aumentar a Frequência):** Acelerar o ritmo físico da caneta (trabalho físico do silício e do clock).

> [!NOTE] 💼 Pergunta de Entrevista
> **Por que a frequência de clock sozinha não define o desempenho de um processador?**
> *   **Resposta ideal:** Porque o tempo de execução de um programa depende de uma combinação de três fatores: o número de instruções ($IC$), a média de ciclos por instrução ($CPI$) e a frequência do clock. Um processador com menor frequência pode ser mais rápido se executar menos instruções ou tiver um $CPI$ muito menor devido a otimizações de arquitetura (como pipelines eficientes ou caches maiores).

### 🧠 Checkpoint: Teste seu Conhecimento!

<details>
<summary><b>🔍 Exercício Rápido: Se um programador conseguiu encurtar o código de um aplicativo de 100 instruções para apenas 50 instruções, mas as novas instruções são tão complexas que agora o processador gasta 4 ciclos por instrução em vez dos 2 ciclos originais, o aplicativo ficou mais rápido?</b></summary>
<blockquote>

**Resposta Correta:** O tempo final ficou **exatamente o mesmo**!
*   **Antes:** $100\text{ instruções} \times 2\text{ ciclos} = 200\text{ ciclos de tempo}$
*   **Depois:** $50\text{ instruções} \times 4\text{ ciclos} = 200\text{ ciclos de tempo}$
*   **Conclusão didática:** Esse equilíbrio mostra por que não adianta otimizar apenas um lado da receita. O desempenho real é uma dança harmônica entre a quantidade de tarefas e o esforço exigido de cada uma delas.

</blockquote>
</details>

---

## 📌 3. Limites de Aceleração e a Analogia do Bolo no Forno [Prática Guiada ⏳ 15 min]

Muitas vezes, tentamos melhorar o nosso dia a dia ou o nosso computador otimizando apenas uma etapa do trabalho. Por exemplo, compramos um aspirador de pó super veloz para limpar a casa. Mas até onde essa melhoria local acelera o seu dia inteiro? A resposta para isso é dada por uma regra lógica muito elegante chamada **Lei de Amdahl**.

A Lei de Amdahl diz que o ganho real de velocidade em qualquer tarefa é limitado pela parte do trabalho que **não pode ser acelerada**.

### 3.1 — A Lógica do Bolo no Forno

Fazer um bolo é uma das atividades mais tranquilas e terapêuticas que existem. E, acredite ou não, a física de assar um bolo nos ensina uma lei fundamental dos supercomputadores! 

Imagine que você decidiu fazer um bolo de chocolate com seus amigos. O processo total leva **50 minutos**, divididos em duas etapas bem claras:
1.  **Preparar a massa (Bater os ingredientes):** Leva **10 minutos**. (Esta etapa pode ser dividida: se você chamar 5 amigos, todos podem ajudar a bater a massa mais rápido).
2.  **Assar o bolo no forno:** Leva **40 minutos**. (Esta etapa é puramente sequencial: o bolo precisa daquele tempo físico de calor para assar. Não adianta colocar 10 pessoas sentadas na frente do forno buzinando, o bolo continuará levando 40 minutos para assar).

```mermaid
graph LR
    subgraph ANTES ["⏱️ Tempo Inicial: 50 Minutos"]
        A1["🥣 Bater Massa<br/>10 min<br/>(Paralelizável)"] --> A2["🔥 Assar no Forno<br/>40 min<br/>(Sequencial)"]
    end

    subgraph DEPOIS ["🚀 Com Otimização Infinita na Preparação"]
        B1["🥣 Bater: 0s<br/>(5 amigos ajudando)"] --> B2["🔥 Assar no Forno<br/>40 min<br/>(Limite Máximo)"]
    end
```

Mesmo que você consiga reunir os melhores chefs do mundo para bater a massa em **zero segundos** ($S \to \infty$), o tempo total para comer o bolo nunca será menor do que **40 minutos**. 

O seu ganho de velocidade máximo absoluto para fazer o bolo está "preso" pela porção sequencial do forno. Esse é o coração da Lei de Amdahl!

### 3.2 — Roteiro de Prática Guiada: Analisando Gargalos

Vamos fazer um exercício mental simples de tomada de decisão, simulando o dia a dia de um engenheiro de performance no **iFood**:

#### O Desafio:
Você foi contratado para acelerar o tempo de carregamento da tela inicial do aplicativo do iFood no celular dos usuários. Hoje, a tela leva **10 segundos** para abrir completamente, divididos em:
*   **Etapa A (Baixar imagens do restaurante pela Internet):** Gasta **8 segundos** (80% do tempo).
*   **Etapa B (Desenhar os botões locais na tela do celular):** Gasta **2 segundos** (20% do tempo).

#### Onde investir o seu tempo e orçamento de engenharia?
1.  **Opção A (Otimizar a renderização local):** Você passa semanas escrevendo um código complexo de desenho de tela extremamente rápido, fazendo a Etapa B rodar de forma instantânea (tempo cai de $2\text{s}$ para $0\text{s}$).
    *   **Resultado A:** A tela inicial agora abre em **8 segundos** (uma melhoria global de apenas **1.25x**).
2.  **Opção B (Otimizar o tamanho das imagens):** Você implementa um sistema simples que diminui o tamanho das fotos dos pratos, fazendo a Etapa A baixar 4 vezes mais rápido (tempo cai de $8\text{s}$ para $2\text{s}$).
    *   **Resultado B:** A tela inicial agora abre em **4 segundos** (uma melhoria global espetacular de **2.5x**!).

> [!TIP] 💡 Dica de Produção (Pro-Tip)
> **FinOps e Escolhas Inteligentes de Vida:** A Lei de Amdahl é um guia valioso para a tomada de decisões e economia de custos ([[FinOps]]). Antes de gastar dinheiro comprando um computador novo caro de última geração para o seu homelab ou para a sua empresa achando que tudo ficará mais rápido, analise onde está a verdadeira espera. Se você passa a maior parte do tempo esperando a internet lenta baixar seus arquivos, ter um processador 10x mais rápido gerará quase zero de ganho no seu dia a dia. Investir o dinheiro em uma conexão de internet melhor trará um ganho global incrivelmente superior!

---

## 📋 Resumo Estrutural

| **Conceito / Métrica** | **Definição Suave em Uma Frase** |
| :--- | :--- |
| **Latência** | O tempo de espera individual que uma única tarefa leva do começo ao fim (velocidade de entrega). |
| **Vazão (Throughput)** | A quantidade total de trabalho que o sistema inteiro consegue entregar por unidade de tempo (capacidade da cozinha). |
| **Equação da CPU** | A receita que calcula o tempo do processador combinando quantidade de tarefas ($IC$), o esforço médio ($CPI$) e o ritmo de clock. |
| **CPI** | O esforço médio de ciclos de clock que a máquina gasta para resolver cada instrução del programa. |
| **Lei de Amdahl** | A regra lógica que prova que a velocidade de qualquer trabalho em equipe é limitada pela etapa sequencial mais lenta. |
| **Porção Sequencial** | A etapa teimosa que não pode ser dividida ou paralelizada (o bolo assando no forno). |

---

## 📄 Artigo de Aprofundamento

- [Amdahl's Law — GeeksforGeeks](https://www.geeksforgeeks.org/amdahls-law-in-computer-architecture/)
> *Resumo prático: Artigo visual de fácil compreensão, repleto de analogias e gráficos interativos coloridos para entender como o número de núcleos de um processador influencia a velocidade real de uso das suas aplicações cotidianas.*

---

## 📚 Referências Bibliográficas

- **PATTERSON, David A.; HENNESSY, John L.** *Organização e Projeto de Computadores: A Interface Hardware/Software*. 5. ed. Rio de Janeiro: Elsevier, 2014. **(Capítulo 1: Desempenho e Analogias Práticas — pp. 25–40)**. Excelente e famosa introdução ao desempenho de computadores através de analogias de carros e aviões.
- **STALLINGS, William.** *Arquitetura e Organização de Computadores*. 11. ed. São Paulo: Pearson, 2024. **(Capítulo 2: Evolução do Desempenho e Lei de Amdahl — pp. 30–50)**. Análise didática das métricas de performance e limitantes de velocidade.
- **TANENBAUM, Andrew S.** *Organização Estruturada de Computadores*. 6. ed. Rio de Janeiro: LTC, 2013. **(Capítulo 1: Visão Geral e Métricas de Desempenho — pp. 10–25)**. Introdução conceitual e histórica muito suave de engenharia de computadores.

---
*Última atualização: 2026-04-20 | Status: publicado*

%%
## ❓ Banco de Questões

> 🔒 *Esta seção é visível apenas no Obsidian do professor. Não publicada para os alunos no Quartz.*

### Questão 1 (Múltipla Escolha — Nível: Intermediário)

**Enunciado:** A equipe de SRE da startup de entregas parceira do **iFood** está configurando o escalonamento horizontal automático ([[Auto_Scaling|Auto Scaling]]) do gateway de pagamentos no cluster [[Kubernetes]] na nuvem da AWS. O tempo de resposta individual (latência) de cada chamada de checkout no processamento Pix é de $80\ ms$ sequenciais sob carga leve. Durante os picos do almoço, o volume geral de pedidos simultâneos sobe de 100 para 2.000 requisições por segundo ($RPS$). A equipe ativa 15 réplicas adicionais de contêineres na nuvem. Considerando as leis físicas de desempenho do processador, qual o impacto real esperado de latência e vazão no gateway sob alta carga após o escalonamento horizontal bem-sucedido?

- [ ] A) A latência de cada checkout Pix individual cairá proporcionalmente em 15 vezes (de $80\ ms$ para $5.3\ ms$), enquanto a vazão coletiva permanecerá estática.
- [ ] B) O Auto Scaling alterará o mnemônico e o $CPI$ de hardware no silício físico da CPU, eliminando a dependência do clock dos servidores AWS.
- [x] C) A vazão geral de processamento do sistema aumentará de forma maciça para suportar os 2.000 $RPS$ concorrentes sem engasgos, porém a latência mínima individual de cada checkout Pix de thread única continuará limitada aos mesmos $80\ ms$ originais. ✅
- [ ] D) A Lei de Amdahl garante que a fração sequencial de autorização do checkout Pix é nula, acelerando tanto a latência quanto a vazão global para velocidade infinita.

**Justificativa:** O escalonamento horizontal (Auto Scaling de múltiplas instâncias) é uma solução de aumento de capacidade e produtividade (**vazão/throughput**). Ele divide o tráfego concorrente por mais processadores paralelos, permitindo atender mais pedidos por segundo. No entanto, ela não acelera a execução interna de uma única transação sequencial (uma thread síncrona). A latência individual do processo físico de checkout Pix permanece limitada ao tempo físico mínimo de processamento de sua thread sequencial no servidor ($80\ ms$). As outras opções confundem os efeitos de escalonamento vertical e horizontal, ou assumem ganhos impossíveis e desrespeito às barreiras físicas e lógicas da computação.

---

### Questão 2 (Múltipla Escolha — Nível: Avançado)

**Enunciado:** O arquiteto de hardware sênior da fintech **Nubank** está comparando dois processadores para os servidores de análise forense e prevenção a fraudes de cartão de crédito. O **Processador A** possui a arquitetura CISC antiga x86 e roda com clock elevado de $4.0\ GHz$. O **Processador B** possui a arquitetura moderna RISC ARM e roda a um clock menor de $3.0\ GHz$. Ao rodar a suite de testes de fraude, observou-se que a suite executa $10\text{ bilhões}$ de instruções no Processador A com um $CPI$ médio de $2.0$. No Processador B, a mesma suite exige apenas $6\text{ bilhões}$ de instruções de máquina com um $CPI$ médio de $1.5$ devido às otimizações de pipeline. Utilizando a Equação Clássica da CPU, qual processador apresentou o melhor desempenho final e qual foi a razão de performance entre eles?

- [ ] A) O Processador A é superior ao B, pois seu clock físico de $4.0\ GHz$ compensa de forma integral a contagem extra de instruções e o $CPI$ inflado.
- [x] B) O Processador B é superior ao A, rodando o teste em $3.0\text{ segundos}$ de tempo de CPU contra $5.0\text{ segundos}$ do Processador A, resultando em uma velocidade 1.67 vezes superior ($Speedup = 1.67$). ✅
- [ ] C) Ambos possuem o mesmo desempenho exato, pois a razão entre a taxa de clock e a contagem de instruções de máquina binárias de cada família de CPU se iguala em $3.5\text{ segundos}$.
- [ ] D) O Processador A é superior ao B, pois sua taxa de MIPS é inferior, eliminando stall cycles induzidos pelo atraso de propagação do fan-out.

**Justificativa:** O cálculo do tempo de execução da CPU é realizado multiplicando-se as variáveis da Equação Clássica:
*   $\text{Tempo\_CPU} = \frac{IC \times CPI}{Frequência}$
*   **Tempo CPU Processador A:** $\frac{10 \times 10^9 \times 2.0}{4.0 \times 10^9\text{ Hz}} = \frac{20 \times 10^9}{4.0 \times 10^9} = 5.0\text{ segundos}$
*   **Tempo CPU Processador B:** $\frac{6 \times 10^9 \times 1.5}{3.0 \times 10^9\text{ Hz}} = \frac{9 \times 10^9}{3.0 \times 10^9} = 3.0\text{ segundos}$
*   **Velocidade Relativa:** $\frac{\text{Desempenho B}}{\text{Desempenho A}} = \frac{\text{Tempo A}}{\text{Tempo B}} = \frac{5.0}{3.0} = 1.67\text{ vezes}$
Portanto, o Processador B (RISC) é 1.67x mais rápido que o Processador A (CISC) no teste, mesmo rodando a um clock de frequência física menor, pois seu compilador e micro-arquitetura otimizaram consideravelmente o número de instruções executadas ($IC$) e a latência de pipeline ($CPI$).

---

### Questão 3 (Dissertativa — Nível: Avançado)

**Enunciado:** O arquiteto de nuvem de produção do banco de dados do **Mercado Livre** está projetando uma otimização no microsserviço de cálculo do carrinho de compras durante a Black Friday. O serviço é severamente limitado pela latência de consultas e buscas a tabelas de cupons de desconto locais. As métricas forenses coletadas no Grafana apontam que o processamento do microsserviço consome $200\ ms$ de CPU, divididos estritamente em: (1) busca sequencial à chave de cupom na tabela do banco de dados relacional ($80\ ms$ ou 40% do tempo) e (2) validações e cálculos matemáticos paralelos de impostos e fretes no carrinho ($120\ ms$ ou 60% do tempo). Explique, sob a perspectiva da arquitetura de computadores e da Lei de Amdahl: (a) qual a aceleração global máxima aproximada do microsserviço caso a equipe invista na compra de múltiplos contêineres adicionais permitindo paralelizar infinitamente ($S \to \infty$) os cálculos matemáticos do carrinho e (b) qual seria a melhor decisão de engenharia e otimização para a equipe obter o melhor retorno de performance com foco em FinOps.

**Resposta esperada:**
*   **(a) Aceleração Global Máxima por Paralelismo Infinito:** A porção que pode ser paralelizada é a de cálculos matemáticos ($F = 0.60$ ou 60%). A porção sequencial imutável é a de busca de chaves no banco de dados ($1 - F = 0.40$ ou 40%). Caso essa fração matemática seja paralelizada infinitamente ($S \to \infty$), o tempo de execução consumido por ela na ULA tende a zero. O limite absoluto de aceleração global é dado pela porção sequencial na Lei de Amdahl:
    $$S_{max} = \frac{1}{1 - F} = \frac{1}{1 - 0.60} = \frac{1}{0.40} = 2.50\text{ vezes}$$
    Portanto, a latência do microsserviço nunca poderá cair abaixo de $80\ ms$ (latência do banco de dados sequencial), e a aceleração máxima do sistema está limitada a $2.50\text{x}$, mesmo sob paralelização de hardware infinita.
*   **(b) Melhor Decisão de Engenharia / FinOps:** Sob a ótica de otimização de performance e FinOps, a decisão de engenharia mais eficiente e inteligente não é comprar núcleos adicionais de CPU cara na nuvem (que gerariam retornos decrescentes severos devido ao limite da porção sequencial), mas sim **refinar e acelerar a fração sequencial de busca de banco de dados**. Ao implementar um cache em memória ultra-rápido (como Redis) para os cupons mais procurados, a equipe do Mercado Livre pode reduzir a latência de busca de $80\ ms$ para apenas $8\ ms$ (aceleração local de $10\text{x}$). Isso redefiniria a fração sequencial no tempo total para apenas $4\%$, deslocando o limite de Amdahl global para ganhos reais de escala massivos com muito menor custo com faturamento de nuvem.
---
%%
