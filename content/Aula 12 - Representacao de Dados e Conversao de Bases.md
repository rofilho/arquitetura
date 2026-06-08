---
context: uniube
type: aula
status: publicado
created: 2026-06-08
semester: "2026-1"
ai_tier: hot
disciplina: Arquitetura de Computadores
codigo: "ARQ-01"
aula: 12
titulo: "Representação de Dados e Conversão de Bases"
tipo: teorica
semana: 12
data: 2026-05-04
tags:
  - arquitetura
  - conversao-bases
  - binario
  - hexadecimal
  - armazenamento
publicar: true
---

# 🟢 Aula 12: Representação de Dados e Conversão de Bases

**Disciplina:** Arquitetura de Computadores (Cód. ARQ-01)  
**Curso:** Inteligência Artificial e Ciência de Dados, Uniube  
**Semana:** 12 | 04/05/2026  
**Professor:** Romualdo Mathias Filho  
**Tipo:** 📘 Teórica  
**Tópicos:** Sistemas Posicionais e Bases Numéricas (Decimal, Binário e Hexadecimal), Algoritmos de Conversão (Divisões Sucessivas e Polinômio Posicional), e Conversão Direta por Nibbles e Medidas de Armazenamento de Dados.

---

> [!INFO] 🎯 Visão Geral da Aula & Recursos
> **Compreenderemos a base matemática posicional que permite traduzir pulsos elétricos analógicos de silício para representações binárias lógicas (0 e 1), como compactá-las em formato hexadecimal para depuração de memória e como realizar conversões precisas de unidades de armazenamento.**
> 
> * **O que você vai dominar:**
>   - A estrutura lógica e posicional dos sistemas decimal, binário e hexadecimal.
>   - Os algoritmos formais de conversão por divisões sucessivas e polinômios posicionais (soma de pesos).
>   - A conversão direta binário-hexadecimal por agrupamento de bits e o dimensionamento de unidades de armazenamento (Bytes, KB, MB, GB, TB).
> * **Pré-requisitos:** Fundamentos de Organização (Aula 02) e Memória Virtual (Aula 06).
> * **📂 Recursos Adicionais para Download:**
>   - [Base Converter Online (Simulador Visual)](https://www.rapidtables.com/convert/number/base-converter.html) — Simulador recomendado para validação rápida de exercícios de conversão múltipla.
>   - [IEEE 754 Floating-Point Simulator](https://www.h-schmidt.net/FloatConverter/IEEE754.html) — Ferramenta interativa de conversão de ponto flutuante em nível de bits.

---

## 🎯 Objetivo da Aula

Ao final desta aula, os alunos serão capazes de:
- **Diferenciar** sistemas posicionais de numeração e suas respectivas bases matemáticas.
- **Aplicar** os algoritmos de divisões sucessivas e polinômios posicionais para converter valores entre as bases 2, 10 e 16.
- **Executar** conversões diretas por agrupamento de nibbles (4 bits) para otimizar a leitura de dumps de memória.
- **Calcular** dimensionamento de armazenamento de dados utilizando múltiplos binários comerciais e lógicos de forma correta.

---

## 🔄 Revisão Rápida (5 min)

| **Conceito (Aulas Anteriores)** | **Conexão com a Aula de Hoje** |
| :--- | :--- |
| **[[Aula 02 - Fundamentos da Organizacao\|Aula 02 (Fundamentos da Organização)]]** | Vimos que memórias e registradores armazenam estados elétricos analógicos que são interpretados logicamente como 0 ou 1. Hoje entenderemos a matemática por trás da interpretação posicional desses dados. |
| **[[Aula 07 - Conjunto de Instrucoes e Ciclo da Instrucao\|Aula 07 (Conjunto de Instruções)]]** | Analisamos os opcodes e dados codificados em linguagem de máquina. Hoje aprenderemos por que essas instruções longas em binário são compactadas em caracteres hexadecimais nos dumps de depuração. |
| **[[Aula 11 - Arquitetura de Virtualizacao e Hipervisores\|Aula 11 (Hipervisores)]]** | Estudamos o gerenciamento de hardware por hipervisores e a alocação de RAM em gigabytes. Hoje dominaremos a exatidão das escalas de armazenamento (Bits, Bytes, KB, MB, GB, TB). |

---

## 📌 1. A Lógica do Silício: Sistemas Posicionais e Bases Numéricas [Teoria ⏳ 15 min]

Em qualquer computador moderno, o silício processa exclusivamente sinais elétricos. Um circuito integrado detecta tensões de referência: tensões baixas (próximas a $0\text{V}$) são mapeadas logicamente como o dígito binário **0**, e tensões altas (próximas ao VCC do chip, ex: $1.2\text{V}$ ou $3.3\text{V}$) são mapeadas como o dígito **1**. Essas duas unidades básicas são os **bits** (binary digits).

Para que o processador possa representar números maiores, caracteres ou instruções complexas, os bits são agrupados. A forma como esses grupos representam valores baseia-se no conceito de **Sistema Posicional**. Em um sistema posicional, o peso ou valor de cada dígito depende estritamente da sua posição relativa no número.

### 1.1 — Comparação de Bases Numéricas Clássicas

Na arquitetura de computadores, três bases posicionais são fundamentais:

| Base | Nome | Dígitos Disponíveis | Relação de Aplicação Técnica |
| :---: | :---: | :--- | :--- |
| **10** | **Decimal** | $0, 1, 2, 3, 4, 5, 6, 7, 8, 9$ | Interface humana tradicional (cálculos de negócios, exibição final). |
| **2** | **Binário** | $0, 1$ | Representação interna física da CPU (registradores, barramentos, transistores). |
| **16** | **Hexadecimal** | $0, 1, \dots, 9, A, B, C, D, E, F$ | Formato de depuração de baixo nível (dumps de memória, registradores de status, cores). |

> [!NOTE] 💼 Pergunta de Entrevista
> **Por que desenvolvedores de baixo nível e arquitetos de computadores utilizam a base Hexadecimal em depuradores (debuggers) em vez de Binário ou Decimal?**
> 
> **Resposta Esperada:** A base Hexadecimal simplifica radicalmente a leitura humana e a depuração. Como $16 = 2^4$, exatamente 4 bits (um *nibble*) podem ser compactados em um único caractere hexadecimal (ex: `1111_2` = `F_16`). Um byte completo de 8 bits é representado de forma exata por apenas dois caracteres (ex: `11111111_2` = `FF_16`), facilitando a identificação imediata de alinhamento de bytes físicos e de palavras de memória (Word de 32 bits = 8 caracteres hexa) sem o overhead de leitura de longas strings binárias ou conversões decimais complexas.

---

## 📌 2. Algoritmos de Conversão: A Matemática de Mudança de Bases [Teoria & Prática ⏳ 20 min]

Para transferir dados entre a CPU, a memória e a visualização final do usuário, precisamos executar conversões matemáticas de bases.

### 2.1 — Conversão de Decimal (Base 10) para Qualquer Base: Divisões Sucessivas

Para converter um valor inteiro da base 10 para outra base $B$ (onde $B$ pode ser 2 ou 16), aplicamos o **Algoritmo de Divisões Sucessivas**:
1. Divide-se o número decimal por $B$.
2. O resto da divisão constitui o dígito menos significativo (mais à direita).
3. Divide-se o quociente obtido por $B$ novamente, e o novo resto constituirá o próximo dígito à esquerda.
4. Repete-se o processo até que o quociente da divisão seja zero.
5. O resultado final é lido **de baixo para cima** (do último resto obtido ao primeiro).

#### Exemplo Prático 1: Converter o decimal $45$ para Binário (Base 2):
Aplicamos o método das divisões sucessivas por 2 até que o quociente seja zero. O número binário correspondente é obtido pela leitura dos restos da divisão **de baixo para cima** (do último resto ao primeiro).

![[assets/aula12_conversao_decimal_binario.png]]

*Passo a passo matemático:*
- $45 \div 2 = 22$ (Resto **1** - Dígito menos significativo, LSB)
- $22 \div 2 = 11$ (Resto **0**)
- $11 \div 2 = 5$ (Resto **1**)
- $5 \div 2 = 2$ (Resto **1**)
- $2 \div 2 = 1$ (Resto **0**)
- $1 \div 2 = 0$ (Resto **1** - Dígito mais significativo, MSB)
- Lendo de baixo para cima, temos: $45_{10} = 101101_2$

#### Exemplo Prático 2: Converter o decimal $12412$ para Hexadecimal (Base 16):
Para a base 16, dividimos o valor decimal sucessivamente por 16 até que o quociente seja zero. Os restos que resultam em valores entre 10 e 15 são mapeados para suas respectivas letras correspondentes ($A$ a $F$).

![[assets/aula12_conversao_decimal_hexadecimal.png]]

*Passo a passo matemático:*
- $12412 \div 16 = 775$ (Resto **12** ➔ Equivalente a **C** em hexadecimal)
- $775 \div 16 = 48$ (Resto **7**)
- $48 \div 16 = 3$ (Resto **0**)
- $3 \div 16 = 0$ (Resto **3** - Dígito mais significativo)
- Lendo de baixo para cima, temos: $12412_{10} = 307C_{16}$

### 2.2 — Conversão de Qualquer Base para Decimal (Base 10): Polinômio Posicional

Para converter um valor de qualquer base $B$ de volta para decimal, utiliza-se a **Expansão Polinomial**. Multiplica-se cada dígito pela base $B$ elevada à potência de sua posição (iniciando em 0, da direita para a esquerda) e somam-se os resultados.

$$\text{Valor Decimal} = d_{n-1} \cdot B^{n-1} + d_{n-2} \cdot B^{n-2} + \dots + d_1 \cdot B^1 + d_0 \cdot B^0$$

#### Exemplo Prático 1: Converter $110101_2$ para Decimal (Base 10):
Multiplicamos cada bit pelo peso correspondente de sua posição (potência de base 2), iniciando da direita (posição 0) para a esquerda (posição 5).

![[assets/aula12_conversao_binario_decimal.png]]

*Passo a passo matemático:*
- Posições (direita para esquerda): $5, 4, 3, 2, 1, 0$
- $1 \cdot 2^5 + 1 \cdot 2^4 + 0 \cdot 2^3 + 1 \cdot 2^2 + 0 \cdot 2^1 + 1 \cdot 2^0$
- $1 \cdot 32 + 1 \cdot 16 + 0 \cdot 8 + 1 \cdot 4 + 0 \cdot 2 + 1 \cdot 1$
- $32 + 16 + 0 + 4 + 0 + 1 = 53_{10}$
- Logo, $110101_2 = 53_{10}$.

#### Exemplo Prático 2: Converter $2A5_{16}$ para Decimal (Base 10):
A lógica é a mesma, mas a base de cálculo é 16. Lembre-se de substituir a letra pelo seu valor decimal equivalente (neste caso, $A = 10$).

![[assets/aula12_conversao_hexadecimal_decimal.png]]

*Passo a passo matemático:*
- Posições (direita para esquerda): $2, 1, 0$ (Lembrando que $A = 10$)
- $2 \cdot 16^2 + A(10) \cdot 16^1 + 5 \cdot 16^0$
- $2 \cdot 256 + 10 \cdot 16 + 5 \cdot 1$
- $512 + 160 + 5 = 677_{10}$
- Logo, $2A5_{16} = 677_{10}$.


### 🧠 Checkpoint: Teste seu Conhecimento!

<details>
<summary><b>🔍 Exercício Rápido: Qual é a representação em Hexadecimal e Binário do número decimal 254?</b></summary>
<blockquote>

**Resposta Correta:**
- **Hexadecimal:** $254 \div 16 = 15$ (Resto **14** ➔ **E**); $15 \div 16 = 0$ (Resto **15** ➔ **F**). Lendo de baixo para cima: **`FE_16`**.
- **Binário:** Convertendo de forma direta a partir do hexadecimal `FE`, temos: `F` = `1111` e `E` = `1110`. Logo: **`11111110_2`**.

</blockquote>
</details>

> [!WARNING] ⚠️ Gotcha de Infraestrutura: Estouro de Inteiros (Integer Overflow)
> Na arquitetura física de computadores, os registradores têm tamanhos rígidos (ex: 8 bits, 16 bits, 32 bits, 64 bits). Um registrador de 8 bits consegue representar valores binários de `00000000_2` a `11111111_2` (em decimal: $0$ a $255$).
> Se o processador tentar armazenar o valor decimal **256** em um registrador de 8 bits, ocorre o fenômeno elétrico do **Integer Overflow**. O número 256 exige 9 bits (`100000000_2`). Como o registrador físico só armazena os 8 bits menos significativos, o 9º bit (o bit extra à esquerda) é simplesmente descartado pelo processador. O valor final armazenado no registrador será `00000000_2` ($0$ em decimal). Ignorar os limites físicos de conversão de tipos de dados nos códigos de software gera falhas críticas de corrupção de memória e segurança.

---

## 📌 3. Conversão Direta e Unidades de Armazenamento [Prática Guiada ⏳ 20 min]

Para acelerar o trabalho técnico e otimizar o dimensionamento de recursos de infraestrutura, os engenheiros de computação utilizam métodos rápidos de agrupamento de bits e dominam as escalas de armazenamento físico.

### 3.1 — Conversão Direta Binário-Hexadecimal por Nibbles (4 bits)

Como $16 = 2^4$, existe um mapeamento direto e exato entre 4 bits (um *nibble*) e 1 caractere hexadecimal. Isso nos permite converter qualquer número binário para hexadecimal instantaneamente de forma visual:
1. Agrupe o número binário em blocos de 4 bits, começando **da direita para a esquerda**.
2. Se o bloco mais à esquerda não tiver 4 bits, adicione zeros à esquerda para completar.
3. Converta cada bloco de 4 bits individualmente para seu caractere hexadecimal correspondente.

#### Exemplo Prático: Converter `10111100101_2` para Hexadecimal:
- Agrupando da direita para a esquerda: `101` `1110` `0101`
- Adicionando zero à esquerda no primeiro grupo: `0101` | `1110` | `0101`
- Convertendo os grupos individualmente:
  - `0101_2` = $5_{16}$
  - `1110_2` = $14_{10}$ = $E_{16}$
  - `0101_2` = $5_{16}$
- Resultado final: **`5E5_16`**

### 3.2 — Unidades de Armazenamento de Dados

Os bits processados pelo hardware são organizados e agrupados em estruturas padronizadas para dimensionamento físico de capacidade de memória e disco:

| Unidade | Símbolo | Equivalente Matemático | Observação Técnica / Arquitetura |
| :--- | :---: | :---: | :--- |
| **Bit** | b | $0$ ou $1$ | Menor unidade lógica de dados em circuitos digitais. |
| **Byte** | B | 8 bits | Unidade básica de endereçamento de memória RAM. |
| **Kilobyte** | KB | $2^{10}$ Bytes ($1024$ B) | Tamanho típico de arquivos de configuração compactos e scripts. |
| **Megabyte** | MB | $2^{20}$ Bytes ($1024$ KB) | Unidade de medida para arquivos de mídia, PDFs e pequenos binários. |
| **Gigabyte** | GB | $2^{30}$ Bytes ($1024$ MB) | Métrica padrão para capacidade de memória RAM e partições de sistemas operacionais. |
| **Terabyte** | TB | $2^{40}$ Bytes ($1024$ GB) | Métrica para grandes discos de armazenamento (HDDs, SSDs NVMe) e volumes em nuvem. |

#### 📐 Exemplos de Conversão de Unidades de Medida (Cálculo Binário Real):
Sempre que realizamos conversões em nível de sistema operacional (binário real), dividimos por $1024$ para subir de escala (ex: $MB \rightarrow GB$) ou multiplicamos por $1024$ para descer de escala (ex: $GB \rightarrow MB$):

1. **Conversão de Megabytes para Gigabytes:**
   - *Exemplo:* Converter $500\text{ MB}$ em $\text{GB}$.
   - *Solução:* Como estamos subindo de escala, dividimos o valor por $1024$:
     $$\text{Capacidade em GB} = \frac{500\text{ MB}}{1024} \approx 0.488\text{ GB}$$

2. **Conversão de Gigabytes para Terabytes:**
   - *Exemplo:* Converter $2.5\text{ GB}$ em $\text{TB}$.
   - *Solução:* Dividimos por $1024$:
     $$\text{Capacidade em TB} = \frac{2.5\text{ GB}}{1024} \approx 0.00244\text{ TB}$$

3. **Conversão de Kilobytes para Megabytes:**
   - *Exemplo:* Converter $2048\text{ KB}$ em $\text{MB}$.
   - *Solução:* Dividimos por $1024$:
     $$\text{Capacidade em MB} = \frac{2048\text{ KB}}{1024} = 2\text{ MB}$$

4. **Desafio — Conversão de Petabytes (PB) para Gigabytes (GB):**
   - *Exemplo:* Converter $50\text{ PB}$ para $\text{GB}$.
   - *Solução:* Para descer de Petabytes para Gigabytes, precisamos passar primeiro por Terabytes e depois por Gigabytes, multiplicando sucessivamente por $1024$:
     $$\text{Passo 1 (PB } \rightarrow \text{ TB): } 50\text{ PB} \cdot 1024 = 51.200\text{ TB}$$
     $$\text{Passo 2 (TB } \rightarrow \text{ GB): } 51.200\text{ TB} \cdot 1024 = 52.428.800\text{ GB}$$
     $$\text{Fórmula Direta: } 50 \cdot 1024 \cdot 1024 = 52.428.800\text{ GB}$$

> [!TIP] 💡 Dica de Produção (Pro-Tip): FinOps e a Diferença Comercial vs. Binária
> Fabricantes de discos rígidos e sistemas operacionais interpretam as unidades de armazenamento de formas diferentes:

> - **Fabricantes de Hardware (Comercial):** Utilizam a base decimal ($10^3$). Para eles, $1\text{ KB} = 1000\text{ Bytes}$, $1\text{ MB} = 10^6\text{ Bytes}$ e $1\text{ GB} = 10^9\text{ Bytes}$.
> - **Sistemas Operacionais (Real Binário):** Utilizam a base binária ($2^{10}$). Para o sistema, $1\text{ GiB} = 1024\text{ MiB} = 1.073.741.824\text{ Bytes}$.
> 
> *Impacto Prático:* Ao comprar um disco físico ou provisionar um disco em nuvem na AWS ou GCP de **1 TB** comercial ($1.000.000.000.000\text{ Bytes}$), o sistema operacional lerá o disco como aproximadamente **931 GB** reais binários. Em arquiteturas em nuvem de escala empresarial, ignorar essa diferença de $7\%$ pode resultar em provisionamento incorreto de volumes persistentes de dados e incidentes de discos cheios (*Out of Space*), além de surpresas financeiras nos relatórios de custos de **[[30_Conceitos/FinOps|FinOps]]**.

### ✍️ Exercícios Recomendados de Fixação (Prática Individual)

Para consolidar o conhecimento, resolva os exercícios abaixo e valide as suas respostas nos blocos colapsáveis:

#### Grupo 1: Conversão de Bases Numéricas
1. Qual é o equivalente decimal do número binário `101001`?
2. Converta o número decimal `78` para binário.
3. Converta o número decimal `153` para hexadecimal.
4. Converta o número hexadecimal `3F` para binário.

<details>
<summary><b>🔍 Ver Gabarito e Resolução do Grupo 1</b></summary>
<blockquote>

1. **`101001_2` para Decimal:**
   - Polinômio: $1 \cdot 2^5 + 0 \cdot 2^4 + 1 \cdot 2^3 + 0 \cdot 2^2 + 0 \cdot 2^1 + 1 \cdot 2^0$
   - Cálculo: $32 + 0 + 8 + 0 + 0 + 1 = 41_{10}$
   - *Resposta:* **41**
2. **`78_{10}` para Binário:**
   - Divisões por 2: $78/2 = 39$ (R: **0**); $39/2 = 19$ (R: **1**); $19/2 = 9$ (R: **1**); $9/2 = 4$ (R: **1**); $4/2 = 2$ (R: **0**); $2/2 = 1$ (R: **0**); $1/2 = 0$ (R: **1**).
   - Lendo os restos de baixo para cima: `1001110_2`.
   - *Resposta:* **`1001110_2`**
3. **`153_{10}` para Hexadecimal:**
   - Divisões por 16: $153 \div 16 = 9$ (Resto **9**). Quociente 9 dividido por 16 dá 0 (Resto **9**).
   - Lendo os restos de baixo para cima: `99_16`.
   - *Resposta:* **`99_16`**
4. **`3F_{16}` para Binário:**
   - Conversão direta por nibbles: `3` = `0011` e `F` = `1111`.
   - Unificando os bits: `00111111_2`.
   - *Resposta:* **`00111111_2`** (ou `111111_2`)

</blockquote>
</details>

#### Grupo 2: Unidades de Armazenamento e Métricas
5. Converta `3 GB` para Megabytes (MB).
6. Converta `8192 Bytes` para Kilobytes (KB).
7. Se um arquivo tem `6.5 MB` de tamanho no sistema operacional, quantos Bytes reais ele possui?
8. Se um servidor tem uma latência de rede de `5 milissegundos`, quantos segundos isso representa?

<details>
<summary><b>🔍 Ver Gabarito e Resolução do Grupo 2</b></summary>
<blockquote>

5. **`3 GB` para MB:**
   - $3 \cdot 1024 = 3072\text{ MB}$.
   - *Resposta:* **$3072\text{ MB}$**
6. **`8192 B` para KB:**
   - $8192 \div 1024 = 8\text{ KB}$.
   - *Resposta:* **$8\text{ KB}$**
7. **`6.5 MB` para Bytes:**
   - $6.5 \cdot 1024\text{ KB} \cdot 1024\text{ Bytes} = 6.815.744\text{ Bytes}$.
   - *Resposta:* **$6.815.744\text{ Bytes}$**
8. **`5 milissegundos` para segundos:**
   - $5 \text{ ms} \div 1000 = 0.005\text{ s}$.
   - *Resposta:* **$0.005\text{ s}$**

</blockquote>
</details>

#### Grupo 3: Desempenho, Transferência e Engenharia
9. Um processador moderno opera com clock de `3.2 GHz`. Quantos ciclos de clock ele executa em exatamente um segundo?
10. Se um SSD de servidor de banco de dados tem uma taxa de transferência contínua de `150 MB/s`, quanto tempo real levará para transferir um volume persistente de `10 GB` de dados?
11. Um software leva `10 segundos` para executar na Máquina A e `15 segundos` para rodar na Máquina B. Qual é o ganho de desempenho (em porcentagem) ao executar esse software na Máquina A em comparação com a Máquina B?

<details>
<summary><b>🔍 Ver Gabarito e Resolução do Grupo 3</b></summary>
<blockquote>

9. **Ciclos de clock em 1 segundo (3.2 GHz):**
   - $1\text{ Hz} = 1\text{ ciclo/segundo}$. $1\text{ GHz} = 10^9\text{ Hz}$ (1 bilhão de ciclos).
   - $3.2\text{ GHz} = 3.2 \cdot 10^9\text{ Hz} = 3.200.000.000$ ciclos.
   - *Resposta:* **3,2 bilhões de ciclos por segundo**
10. **Tempo de transferência de `10 GB` a `150 MB/s`:**
    - Primeiro, convertemos a capacidade para a escala da velocidade: $10\text{ GB} \cdot 1024 = 10.240\text{ MB}$.
    - Dividimos o tamanho pela taxa: $\text{Tempo} = 10.240\text{ MB} \div 150\text{ MB/s} \approx 68.26\text{ s}$.
    - *Resposta:* **68,26 segundos** (ou $1$ minuto e $8,26$ segundos)
11. **Ganho de desempenho de A em relação a B:**
    - Desempenho é o inverso do tempo de execução: $\text{Desempenho} = \frac{1}{\text{Tempo}}$.
    - $\text{Desempenho}_A = \frac{1}{10} = 0.1$ e $\text{Desempenho}_B = \frac{1}{15} \approx 0.0667$.
    - Relação: $\frac{\text{Desempenho}_A}{\text{Desempenho}_B} = \frac{15}{10} = 1.5$.
    - Ganho: $(1.5 - 1) \cdot 100\% = 50\%$.
    - *Resposta:* **50% de ganho de desempenho** (a Máquina A é $1.5$ vezes mais rápida ou $50\%$ superior em desempenho que a Máquina B).

</blockquote>
</details>

---

## 📋 Resumo Estrutural

| **Conceito / Comando** | **Definição e Aplicação Prática em Uma Frase** |
| :--- | :--- |
| **Sistema Posicional** | Sistema numérico onde o valor real de cada dígito é determinado pelo peso de sua posição em relação à base matemática. |
| **Bit (Binary Digit)** | Estado elétrico discreto (0 ou 1) processado fisicamente nos canais de silício da CPU. |
| **Byte** | Conjunto de 8 bits agrupados que constituem a menor unidade de endereçamento físico da memória RAM. |
| **Divisões Sucessivas** | Algoritmo que divide o número decimal pela base de destino sucessivamente, obtendo o valor convertido a partir da leitura dos restos obtidos de baixo para cima. |
| **Polinômio Posicional** | Algoritmo que converte valores de bases não decimais para base 10 pela soma de seus dígitos multiplicados pelo peso correspondente da base. |
| **Nibble** | Bloco de 4 bits binários cuja correspondência direta permite conversões visuais instantâneas de e para caracteres hexadecimais. |
| **Integer Overflow** | Falha de hardware onde o valor binário excede o limite físico de bits de um registrador, resultando no descarte de bits significativos e corrupção de dados. |

---

%%
## ❓ Banco de Questões

> 🔒 *Esta seção é visível apenas no Obsidian do professor. Não publicada para os alunos no Quartz.*

### Questão 1 (Múltipla Escolha — Nível: Intermediário)

**Enunciado:** Um arquiteto de computadores da equipe de infraestrutura SRE está inspecionando um dump de memória hexadecimal em busca de um vazamento de memória em um microsserviço de autenticação. O endereço físico que aponta para o início da falha crítica é exibido em formato hexadecimal de 16 bits como **3A7F**. Para registrar esse endereço na documentação técnica interna do sistema, ele precisa converter esse valor correspondente para binário (base 2) e para decimal (base 10). Executando as conversões passo a passo, quais valores binários e decimais equivalem ao endereço hexadecimal fornecido?

- [ ] A) `0011101001111111_2` e $13.975_{10}$
- [ ] B) `0011101101111111_2` e $14.975_{10}$
- [x] C) `0011101001111111_2` e $14.975_{10}$ ✅
- [ ] D) `0011101001110000_2` e $15.015_{10}$

**Justificativa:** 
1. **Conversão de Hexadecimal para Binário:** Realizamos a conversão direta de cada caractere de 3A7F em nibbles de 4 bits:
   - `3` = `0011`
   - `A` = $10_{10}$ = `1010`
   - `7` = `0111`
   - `F` = $15_{10}$ = `1111`
   - Unificando os nibbles: `0011101001111111_2`.
2. **Conversão de Hexadecimal para Decimal:** Aplicamos o polinômio posicional multiplicando cada dígito pelo peso de sua posição na base 16:
   - $3 \cdot 16^3 + A(10) \cdot 16^2 + 7 \cdot 16^1 + F(15) \cdot 16^0$
   - $3 \cdot 4096 + 10 \cdot 256 + 7 \cdot 16 + 15 \cdot 1$
   - $12288 + 2560 + 112 + 15 = 14975_{10}$.
Portanto, a alternativa correta é a C.

---

### Questão 2 (Múltipla Escolha — Nível: Intermediário)

**Enunciado:** O banco de dados relacional de produção de um aplicativo de entregas consome diariamente arquivos de logs equivalentes a **750 MB**. Para dimensionar a capacidade física de armazenamento dos backups que serão provisionados em um disco persistente na nuvem, o administrador de sistemas precisa calcular o consumo cumulativo do banco ao final de um mês comercial de 30 dias. Utilizando as escalas de conversão binária real adotadas por sistemas operacionais (onde $1\text{ GB} = 1024\text{ MB}$ e $1\text{ TB} = 1024\text{ GB}$), quais são os valores acumulados estimados de consumo de armazenamento em Gigabytes (GB) e em Terabytes (TB), respectivamente?

- [ ] A) $22.50\text{ GB}$ e $0.0219\text{ TB}$
- [x] B) $21.97\text{ GB}$ e $0.0214\text{ TB}$ ✅
- [ ] C) $21.97\text{ GB}$ e $0.0219\text{ TB}$
- [ ] D) $22.50\text{ GB}$ e $0.0225\text{ TB}$

**Justificativa:** 
1. **Consumo mensal total em Megabytes (MB):**
   - $750\text{ MB/dia} \cdot 30\text{ dias} = 22.500\text{ MB}$.
2. **Conversão de MB para Gigabytes (GB) binários reais:**
   - $22.500\text{ MB} \div 1024 = 21.9726\text{ GB} \approx 21.97\text{ GB}$.
3. **Conversão de GB para Terabytes (TB) binários reais:**
   - $21.9726\text{ GB} \div 1024 = 0.021457\text{ TB} \approx 0.0214\text{ TB}$.
Dessa forma, a alternativa B é a correta. Nota-se que se fossem utilizadas as métricas puramente decimais comerciais dos fabricantes de disco ($22.500 \div 1000 = 22.5\text{ GB}$), haveria um descompasso de aproximadamente $0.53\text{ GB}$ no OS, o que comprova o perigo de dimensionamentos incorretos em larga escala.

---

### Questão 3 (Dissertativa — Nível: Avançado)

**Enunciado:** Um microcontrolador industrial de baixo custo possui um registrador de status interno de 8 bits sem sinal destinado a receber leituras de sensores térmicos de um container de congelados mantido pela startup SANA. Durante um teste de simulação de falha, o sensor detectou um pico de calor extremo e enviou um pacote de dados elétrico equivalente a **257** em decimal para ser armazenado no referido registrador de 8 bits. 
Com base na arquitetura interna dos computadores:
(a) Desenhe e explique a conversão passo a passo do número 257 de decimal para binário.
(b) Explique o que acontece a nível de silício (registradores) quando a CPU tenta armazenar o valor binário de 257 em um registrador limitado a 8 bits. 
(c) Qual será o valor binário final registrado no hardware e seu equivalente decimal interpretado, e quais as implicações práticas de segurança operacional desse fenômeno para a cadeia de congelados do container?

**Resposta esperada:**
*   **(a) Conversão de 257 para Binário:**
    Aplicamos o algoritmo de divisões sucessivas por 2:
    - $257 \div 2 = 128$ (Resto **1**)
    - $128 \div 2 = 64$ (Resto **0**)
    - $64 \div 2 = 32$ (Resto **0**)
    - $32 \div 2 = 16$ (Resto **0**)
    - $16 \div 2 = 8$ (Resto **0**)
    - $8 \div 2 = 4$ (Resto **0**)
    - $4 \div 2 = 2$ (Resto **0**)
    - $2 \div 2 = 1$ (Resto **0**)
    - $1 \div 2 = 0$ (Resto **1**)
    Lendo os restos obtidos de baixo para cima: **`100000001_2`** (exigindo exatamente 9 bits de representação posicional).
*   **(b) Fenômeno do Silício (Integer Overflow):**
    O registrador físico da CPU é composto por um array eletrônico de exatamente 8 flip-flops destinados a reter as cargas elétricas. Quando a ULA tenta enviar os 9 bits resultantes do barramento (`100000001_2`), o flip-flop do bit mais significativo (MSB, mais à esquerda, que possui peso posicional de $2^8 = 256$) não possui um circuito físico de armazenamento correspondente no registrador. Esse bit transborda (Overflow) e é descartado pelo processador.
*   **(c) Valor Final e Implicações de Segurança:**
    - O valor de 8 bits remanescente retido nos flip-flops físicos do registrador será **`00000001_2`** (equivalente a **1** em decimal).
    - *Implicação Prática:* O sensor de temperatura do container enviou o sinal de alerta de calor extremo ($257_{10}$), mas devido ao estouro de inteiros no registrador, o sistema operacional da SANA lerá uma temperatura falsa de apenas $1_{10}$ (perfeitamente estável e congelada). Isso impedirá o acionamento de alertas críticos ou ventiladores elétricos, provocando o descongelamento total das mercadorias de forma silenciosa e prejuízos severos.

---
%%

## 📄 Artigo de Aprofundamento

- [Binary Numbers and Conversions — University of Maryland](https://www.cs.umd.edu/class/sum2003/cmsc311/Notes/Data/binary.html)
> *Resumo prático: Artigo acadêmico detalhando os conceitos e o formalismo matemático por trás das conversões de bases (binário, octal, decimal, hexadecimal), aritmética de baixo nível e a lógica dos sistemas posicionais em computadores.*
- [RFC 8428 — Sensor Measurement Lists (SenML)](https://datatracker.ietf.org/doc/html/rfc8428)
> *Resumo prático: Documentação oficial com os padrões recomendados para transmissão de leituras de sensores que convertem dados físicos em representações digitais para evitar erros de leitura e truncamentos lógicos de hardware.*

---

## 📚 Referências Bibliográficas

- **PATTERSON, David A.; HENNESSY, John L.** *Organização e Projeto de Computadores: A Interface Hardware/Software*. 5. ed. Rio de Janeiro: Elsevier, 2014. **(Capítulo 2: Instruções: Linguagem do Computador — pp. 78–89)**. Apresenta o papel prático da numeração hexadecimal e binária na linguagem de máquina e operandos do processador.
- **STALLINGS, William.** *Arquitetura e Organização de Computadores: projetando com foco em desempenho*. 11. ed. São Paulo: Pearson, 2024. **(Capítulo 9: Sistemas de Numeração — pp. 290–305)**. Detalha de forma canônica os algoritmos de conversão decimal, hexadecimal e binária, com exercícios matemáticos.
- **TANENBAUM, Andrew S.; FEAMSTER, Nicholas; WETHERALL, David J.** *Organização Estruturada de Computadores*. 6. ed. Rio de Janeiro: LTC, 2013. **(Apêndice A: Sistemas de Numeração — pp. 505–515)**. Análise matemática aprofundada dos polinômios posicionais, bases numéricas e divisões sucessivas.

---
*Última atualização: 2026-06-08 | Status: publicado*
