---
title: "💻 Arquitetura de Computadores"
cssclasses:
  - dashboard-layout
---

<style>
/* ── Oculta elementos padrão do Quartz nesta página ── */
.sidebar, .page-header, .article-title, .content-meta, footer,
.lesson-nav { display: none !important; }

/* ── Reset total de largura ── */
html, body, #quartz-root, #quartz-body, .page, .center, .center-content, article {
  display: block !important;
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden;
}

/* ── Container principal ── */
.dashboard-container {
  font-family: 'Outfit', sans-serif;
  background-color: #0f172a;
  color: #f1f5f9;
  padding: 2rem 5%;
  min-height: 100vh;
  box-sizing: border-box;
  width: 100%;
}
:root[saved-theme="light"] .dashboard-container {
  background-color: #f8fafc;
  color: #1e293b;
}

/* ── Hero banner ── */
.hero {
  position: relative;
  height: 350px;
  display: flex;
  align-items: center;
  padding: 2rem 3rem;
  background-image:
    linear-gradient(to right, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.6) 40%, transparent 100%),
    url('assets/hero.png');
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  margin-bottom: 3rem;
  color: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  overflow: hidden;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  margin-bottom: 12px;
}
.hero h1 { font-size: 38px; margin: 0 0 10px; line-height: 1.1; color: white !important; -webkit-text-fill-color: white !important; }
.hero p  { font-size: 15px; color: #cbd5e1; max-width: 500px; margin-bottom: 20px; }
.btn {
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  background: white;
  color: #0f172a;
}
.btn:hover { background: #f1f5f9; transform: scale(1.05); }

/* ── Linhas de cards (módulos) ── */
.row-wrapper { margin-bottom: 2.5rem; }
.row-title   { font-size: 20px; font-weight: 700; margin-bottom: 15px; margin-left: 5px; opacity: 0.9; }
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 10px 5px;
}

/* ── Cards de aulas ── */
.card {
  flex: 0 0 calc(25% - 12px);
  min-width: 200px;
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255,255,255,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
:root[saved-theme="light"] .card { background: #f1f5f9; border-color: #e2e8f0; }
.card:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 15px 30px rgba(0,0,0,0.15); border-color: #10b981; }

.card-thumb {
  height: 120px;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  position: relative;
  overflow: hidden;
}
:root[saved-theme="light"] .card-thumb { background: #e2e8f0; }
.card-thumb::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #10b98140 0%, transparent 100%);
}
.card-progress-bar { position: absolute; bottom: 0; left: 0; height: 4px; background: rgba(0,0,0,0.2); width: 100%; }
.card-progress      { height: 100%; background: #10b981; }

.card-content { padding: 15px; flex: 1; display: flex; flex-direction: column; }
.card-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #f1f5f9;
}
:root[saved-theme="light"] .card-title { color: #1e293b; }
.card-meta { font-size: 11px; color: #64748b; margin-top: auto; display: flex; justify-content: space-between; }

/* ── Responsivo ── */
@media (max-width: 768px) {
  .card { flex: 0 0 calc(50% - 8px); }
  .hero { padding: 1.5rem; height: 300px; }
  .hero h1 { font-size: 28px; }
}
@media (max-width: 480px) { .card { flex: 0 0 100%; } }
</style>

<div class="dashboard-container">

<div class="hero">
  <div style="position: relative; z-index: 10;">
    <span class="tag">▶ Continue Estudando</span>
    <h1>💻 Arquitetura de Computadores</h1>
    <p>Fundamentos, hardware, processadores e memória.</p>
    <a href="./Aula-13---Arquitetura-de-Virtualizacao-e-Hipervisores" class="btn" data-spa>Retomar: 💻 🟢 Aula 12: Arquitetura de Virtualização e Hipervisores</a>
  </div>
</div>

<div class="row-wrapper">
  <div class="row-title">Conteúdo da Disciplina</div>
  <div class="row">
    <a href="./Aula-01---Arquitetura-e-Organizacao" class="card" data-spa>
      <div class="card-thumb" style="background-image: url('assets/capa_aula01.png'); background-size: cover; background-position: center;"><div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💻 Aula 01 – Arquitetura e Organização de Computadores</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-02---Fundamentos-da-Organizacao" class="card" data-spa>
      <div class="card-thumb" style="background-image: url('assets/capa_aula02.png'); background-size: cover; background-position: center;"><div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💻 Aula 02 – Fundamentos da Organização de Computadores</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-03---Sistemas-de-Computacao" class="card" data-spa>
      <div class="card-thumb" style="background-image: url('assets/capa_aula03.png'); background-size: cover; background-position: center;"><div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💻 Aula 03 – Sistemas de Computação</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-04---Arquiteturas-CISC-vs-RISC" class="card" data-spa>
      <div class="card-thumb" style="background-image: url('assets/capa_aula04.png'); background-size: cover; background-position: center;"><div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💻 Aula 04 – Arquiteturas CISC vs. RISC</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-05---Unidades-de-Processamento" class="card" data-spa>
      <div class="card-thumb" style="background-image: url('assets/capa_aula05.png'); background-size: cover; background-position: center;"><div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💻 Aula 05 – Unidades de Processamento e Ciclo de Instrução</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-06---Hierarquia-de-Memoria-e-Memoria-Virtual" class="card" data-spa>
      <div class="card-thumb" style="background-image: url('assets/capa_aula06.png'); background-size: cover; background-position: center;"><div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💻 Aula 06 – Hierarquia de Memória e Memória Virtual</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-07---Conjunto-de-Instrucoes-e-Ciclo-da-Instrucao" class="card" data-spa>
      <div class="card-thumb" style="background-image: url('assets/capa_aula07.png'); background-size: cover; background-position: center;"><div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💻 Aula 07 – Conjunto de Instruções e Ciclo da Instrução</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-08---Processamento-Paralelo-e-Multicore" class="card" data-spa>
      <div class="card-thumb" style="background-image: url('assets/capa_aula08.png'); background-size: cover; background-position: center;"><div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💻 Aula 08 – Processamento Paralelo, Multicore e Distribuído</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-09---Mecanismos-de-Entrada-e-Saida" class="card" data-spa>
      <div class="card-thumb" style="background-image: url('assets/capa_aula09.png'); background-size: cover; background-position: center;"><div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💻 Aula 09 – Mecanismos de Entrada e Saída (E/S)</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-10---Medidas-de-Desempenho" class="card" data-spa>
      <div class="card-thumb" style="background-image: url('assets/capa_aula10.png'); background-size: cover; background-position: center;"><div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💻 Aula 10 – Medidas de Desempenho: Latência, Vazão e Lei de Amdahl</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-11---Logica-Digital" class="card" data-spa>
      <div class="card-thumb" style="background-image: url('assets/capa_aula11.png'); background-size: cover; background-position: center;"><div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💻 Aula 11 – Conceitos de Lógica Digital, Portas e Circuitos</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-12---Nocoes-de-Linguagem-de-Maquina" class="card" data-spa>
      <div class="card-thumb" style="background-image: url('assets/capa_aula12.png'); background-size: cover; background-position: center;"><div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💻 Aula 12 – Noções de Linguagem de Máquina e Opcodes</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>
    <a href="./Aula-13---Arquitetura-de-Virtualizacao-e-Hipervisores" class="card" data-spa>
      <div class="card-thumb" style="background-image: url('assets/capa_aula13.png'); background-size: cover; background-position: center;"><div class="card-progress-bar"><div class="card-progress" style="width: 100%"></div></div></div>
      <div class="card-content">
        <div class="card-title">💻 Aula 13 – Arquitetura de Virtualização e Hipervisores</div>
        <div class="card-meta"><span>Acessar Aula</span><span></span></div>
      </div>
    </a>


  </div>
</div>

</div>


