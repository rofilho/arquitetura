// =========================================================================
// FONTE ÚNICA DE PERÍODO (period-as-config, Modelo A)
// -------------------------------------------------------------------------
// Troque APENAS este arquivo quando o semestre virar. Todas as páginas que
// usam o token {{PERIODO}} (ou {{ANO}}, {{SEMESTRE}}, {{CODIGO}}) no markdown
// acompanham automaticamente no próximo build. Histórico preservado.
//
// Decisão: 2026-10-20 (Romualdo). Nível 1 / Modelo A — a aula sempre mostra o
// período corrente do portal. Correção definitiva: arquitetura 2026-1 → 2026-2.
// =========================================================================

export const PERIODO = {
  /** Código da disciplina na Uniube. */
  codigo: "90388",
  /** Ano letivo corrente. */
  ano: 2026,
  /** Semestre corrente (1 ou 2). */
  semestre: 2,
} as const

/** Rótulo canônico "ANO-SEMESTRE", ex.: "2026-2". É o que {{PERIODO}} injeta. */
export const PERIODO_ROTULO = `${PERIODO.ano}-${PERIODO.semestre}`
