---
title: "🖥️ Aula - 02: Fundamentos da Organização de Computadores"
---

<div class="au-leitura" data-aula="a02">

# 🖥️ Aula 02 — Fundamentos da Organização de Computadores

**Disciplina:** 90388 — Arquitetura e Organização de Computadores · Sistemas de Informação (curso 160) — Uniube<br>
**Professor:** Romualdo Mathias Filho · **romualdo.filho@uniube.br**<br>
**Semana:** 02 · 2026-1 · [CONFIRMAR data] · 📘 Teórica (75 min)<br>
**Tópicos:** CPU, Memória e E/S, Fluxo Entrada → Processamento → Saída, Armazenamento, Barramento, Visão Sistêmica<br>
**Página de referência:** [Plano de Ensino e Contrato](./Plano-de-Ensino-e-Contrato)

---

## 🎯 Objetivo da Aula

Ao final, o aluno deve:

- Identificar CPU, Memória e E/S
- Explicar o fluxo básico Entrada → Processamento → Saída
- Reconhecer esses blocos em qualquer dispositivo computacional

Base conceitual alinhada com:

- Andrew S. Tanenbaum
- William Stallings

---

## 🔄 Fluxo Fundamental

Entrada → Processamento → Saída

📌 Mensagem-chave: todo dispositivo computacional executa esse ciclo.

---

## 📌 Ancoragem Visual

[ Entrada ] → [ Processamento ] → [ Saída ]

- Ancoragem visual imediata
- Redução da carga cognitiva textual

---

## 📌 CPU

Função:

Executar cálculos e coordenar o sistema.

Características:

- Trabalha em alta velocidade
- Não armazena grandes volumes de dados
- Executa instruções passo a passo

Analogia:

Cozinheiro executando uma receita.

---

![[assets/image 1.png]]

![[assets/image 2.png]]

![[assets/image 3.png]]

---

## 📌 Memória RAM

Função:

Armazenar temporariamente programas e dados em uso.

Características:

- Volátil
- Muito rápida
- Capacidade limitada

Analogia:

Bancada da cozinha.

---

## 📌 Formato Físico da Memória

![[assets/image 4.png]]

Objetivo:

- Mostrar formato físico real
- Diferenciar de HD ou SSD

![[assets/image 5.png]]

![[assets/image 6.png]]

---

## 📌 Entrada, Saída e Armazenamento

### Entrada

Teclado, mouse, microfone.

### Saída

Monitor, projetor, caixas de som.

### Armazenamento

HD ou SSD.

Função:

Guardar dados permanentemente.

---

## 📌 Exemplos Reais

- Pente de RAM
- SSD NVMe

---

## 📌 Barramento

Definição:

Conjunto de trilhas elétricas que conectam os componentes.

Metáfora:

Rodovia de dados.

---

## 📌 Diagrama de Interconexão

![[assets/image 7.png]]

Diagrama ideal:

```
    +---------+
    |   CPU   |
    +---------+
         |
    +---------+
    | Memória |
    +---------+
         |
    +---------+
    |   E/S   |
    +---------+
```

Objetivo:

- Mostrar interconexão
- Consolidar visão sistêmica

Evite:

- Barramentos separados
- Sinais de controle
- Termos como "Instruction Register"

Ainda não é o momento.

---

## 📋 Resumo Estrutural

| Componente | Função | Exemplo Real |
| --- | --- | --- |
| CPU | Executar cálculos | Intel Core, Ryzen |
| RAM | Armazenamento temporário | DDR4 16GB |
| Entrada | Inserir dados | Teclado |
| Saída | Exibir resultados | Monitor |
| Armazenamento | Guardar permanentemente | SSD NVMe |

---

## 📌 Identificação na Placa-Mãe

- Memória RAM
- Conectores de E/S

![[assets/image 8.png]]

### Referência de Base

- **Obra:** *Arquitetura e organização de computadores: projetando com foco em desempenho* (11ª Edição, 2024).
- **Capítulo 1 (Introdução):** A seção de "Estrutura e Função" define exatamente a visão de alto nível apresentada no diagrama, separando o computador em CPU, Memória Principal e Entrada/Saída.
- **Capítulo 2 (Evolução e Desempenho do Computador):** Apresenta o projeto arquitetônico da Máquina de Von Neumann, consolidando o conceito de programa armazenado e o fluxo de busca e execução.

---

<hr class="au-fim-aula">

<div class="au-refs">
<b>Referências desta aula</b>

- **STALLINGS, William**, *Arquitetura e Organização de Computadores: projetando com foco em desempenho*. 11ª ed. Pearson, 2024. **(Capítulo 1: Introdução — Estrutura e Função; Capítulo 2: Evolução e Desempenho do Computador)**.
- **TANENBAUM, Andrew S.**, *Organização Estruturada de Computadores*. Pearson. **(Fundamentos: CPU, Memória e Entrada/Saída)**.

</div>

</div>
