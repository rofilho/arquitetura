# 🖥️ Aula 02: Fundamentos da Organização de Computadores

## 🎯 Objetivo da Aula

Ao final, o aluno deve:

- Identificar CPU, Memória e E/S
- Explicar o fluxo básico Entrada → Processamento → Saída
- Reconhecer esses blocos em qualquer dispositivo computacional

Base conceitual alinhada com:

- Andrew S. Tanenbaum
- William Stallings

---

# 1️⃣ Visão Macro: O Sistema Computacional

## 🔄 Ciclo Fundamental

Entrada → Processamento → Saída

📌 Mensagem-chave: todo dispositivo computacional executa esse ciclo.

---

## Diagrama simples em blocos:

[ Entrada ] → [ Processamento ] → [ Saída ]

- Ancoragem visual imediata
- Redução da carga cognitiva textual

---

# 2️⃣ Os Três Pilares do Hardware

## 🧠 2.1 Processador, CPU

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

## 💾 2.2 Memória Principal, RAM

Função:

Armazenar temporariamente programas e dados em uso.

Características:

- Volátil
- Muito rápida
- Capacidade limitada

Analogia:

Bancada da cozinha.

---

## Pente de Memória RAM

![[assets/image 4.png]]

Objetivo:

- Mostrar formato físico real
- Diferenciar de HD ou SSD

![[assets/image 5.png]]

![[assets/image 6.png]]

---

## 🔌 2.3 Entrada e Saída, E/S

### Entrada

Teclado, mouse, microfone.

### Saída

Monitor, projetor, caixas de som.

### Armazenamento Secundário

HD ou SSD.

Função:

Guardar dados permanentemente.

---

## 3️⃣ Interconexão, Barramentos

- Pente de RAM
- SSD NVMe

---

Definição:

Conjunto de trilhas elétricas que conectam os componentes.

Metáfora:

Rodovia de dados.

---

## Diagrama Simplificado do Modelo de Von Neumann

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

# 4️⃣ Resumo Estrutural

| Componente | Função | Exemplo Real |
| --- | --- | --- |
| CPU | Executar cálculos | Intel Core, Ryzen |
| RAM | Armazenamento temporário | DDR4 16GB |
| Entrada | Inserir dados | Teclado |
| Saída | Exibir resultados | Monitor |
| Armazenamento | Guardar permanentemente | SSD NVMe |

---

# 5️⃣ Metodologia Ativa, Anatomia Física

## Processador

- Memória RAM
- Conectores de E/S

![[assets/image 8.png]]

### 📖 William Stallings

- **Obra:** *Arquitetura e organização de computadores: projetando com foco em desempenho* (11ª Edição, 2024).
- **Capítulo 1 (Introdução):** A seção de "Estrutura e Função" define exatamente a visão de alto nível apresentada no diagrama, separando o computador em CPU, Memória Principal e Entrada/Saída.
- **Capítulo 2 (Evolução e Desempenho do Computador):** Apresenta o projeto arquitetônico da Máquina de Von Neumann, consolidando o conceito de programa armazenado e o fluxo de busca e execução.