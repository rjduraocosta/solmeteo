# Changelog — SolMeteo

A versão da aplicação aparece no rodapé da app e do manual (**SolMeteo © 2026 · Versão X.Y.Z**) e é incrementada a cada iteração. A entrada no topo corresponde sempre à versão corrente.

Versão corrente: **2.5.3**

Formato baseado em [Versões Semânticas](https://semver.org/):

- **MAJOR** — alterações estruturais ou comportamento principal da app;
- **MINOR** — novas funcionalidades ou melhoramentos;
- **PATCH** — correções de erros.

---

## [2.5.3] — 2026-09-24

### Alterado
- **Manual: instruções de instalação PWA por dispositivo (PT/EN)**: explicado que o SolMeteo instala em Android, computador e iPhone, mas com passos diferentes — **Android/desktop (Chrome/Edge)**: menu do navegador → "Instalar aplicação"; **iPhone/iPad (Safari)**: sem menu automático, usar Partilhar → "Adicionar ao ecrã principal". Nota de funcionamento off-line mantida. Novas chaves i18n `m.s7g.a`, `m.s7g.i`, `m.s7g.o` nos dois idiomas.

---

## [2.5.2] — 2026-09-24

### Corrigido
- **Logótipo no canto superior esquerdo ainda com "Sky Cast"**: o nome estava marcado no HTML como `Sky<span>Cast</span>` (estilo bicolor), pelo que a substituição automática "SkyCast" não o apanhou. Marcado como `Sol<span>Meteo</span>`, mantendo o estilo. O nome do ficheiro CSV exportado (`skycast_…`) e o slug de cidade por omissão também passaram a `solmeteo`. (As chaves de armazenamento interno `skycast:*` mantêm-se para preservar as preferências do utilizador.)

---

## [2.5.1] — 2026-09-24

### Corrigido
- **Cache PWA antiga ("skycast-v1") a servir versões antigas**: o service worker mantinha o mesmo `CACHE_NAME` desde o início e servia os ficheiros estáticos em modo **cache primeiro** — os navegadores continuavam a mostrar o conteúdo antigo (nome antigo, versões anteriores) mesmo depois da publicação. Cache renomeada para **`solmeteo-v2`**: no `activate`, as caches antigas são apagadas e o app shell é re-buscado — a app passa a atualizar.

---

## [2.5.0] — 2026-09-24

### Alterado
- **Nome da app: SkyCast → SolMeteo**: evita conflito com apps homónimas já existentes nas lojas. Atualizado em todos os pontos de contacto — títulos (`<title>`), cabeçalho `app.title` (PT/EN), manifesto PWA (`name`/`short_name`), rodapés da app e do manual, textos e chaves i18n do manual (PT/EN) e documentação interna (`CHANGELOG.md`, `progress.md`). O repositório de publicação foi renomeado em conformidade: `https://github.com/rjduraocosta/solmeteo`, publicado no GitHub Pages em `https://rjduraocosta.github.io/solmeteo/`.

---

## [2.4.10] — 2026-09-24

### Corrigido
- **Rótulo de fim de dia removido (guia mantida)**: no extremo direito de cada gráfico mantém-se a **linha-guia vertical** que fecha o dia, mas deixa de haver etiqueta (`00h`/`24h`) por baixo — evita rótulo em branco/repetido no limite; o ritmo das etiquetas continua 0,2,…,22 com a 13.ª guia como fronteira final.

---

## [2.4.9] — 2026-09-24

### Melhorado
- **Dia completo nos gráficos horários — marca de fim de dia (00h)**: além da grid de horas pares (0,2,…,22), cada gráfico (solar, temperatura, precipitação, PV) ganha uma **13.ª guia vertical no bordo direito com a etiqueta 00h do dia seguinte** (calculada da hora final do dia +1h; com dados reais começa às 00:00, resulta "00h"), fechando o último segmento e uniformizando o espaçamento (12 intervalos iguais de 2h). O domínio uniforme de 24 faixas mantém-se.

---

## [2.4.8] — 2026-09-24

### Corrigido
- **Guia/etiqueta 23h removida (grid de 2 em 2 horas)**: a marca 23h adicionada em 2.4.5–2.4.7 não fazia sentido com o ritmo das barras/colunas; a grid é de **horas pares (0,2,…,22)** — 12 guias e 12 rótulos equidistantes e alinhados, sem marca extra no fim. O domínio uniforme de 24 faixas (hora h → faixa h/24) mantém-se, apenas já não há o 13.º tick.

---

## [2.4.7] — 2026-09-24

### Corrigido
- **Guias e etiquetas com espaçamento uniforme e 23h visível**: com posições reais da hora (1/23 do dia), a guia 23h ficava sempre a meio ritmo da anterior (22h→23h a metade do espaço das restantes) e a etiqueta sobrepunha-se ou era removida. Os 4 gráficos passam a usar um **domínio uniforme de 24 faixas** (hora h → faixa h/24): as guias verticais são 13 e **equidistantes** (0,2,4,…,22,23), cada etiqueta fica alinhada à sua guia, a etiqueta **23h aparece** como fronteira final do dia e as barras de precipitação/PV mantêm-se centradas nas respetivas horas. `axisLabels(times, w, pad)` simplificado (sem modo `bar`), dados de linha passam a mapear h/24, guias passam a ser geradas a partir do índice de faixa.

---

## [2.4.6] — 2026-09-24

### Corrigido
- **Rótulos 22h/23h com distâncias desiguais e sobrepostos**: a etiqueta "23h" (adicionada em 2.4.5 na posição real, a 1/23 da margem) deixava a distância 22h→23h a meio do ritmo das outras e, em ecrãs médios/pequenos, os dois rótulos ficavam meio sobrepostos. Resolução: a **linha-guia 23h mantém-se** como fronteira final do dia (todos os gráficos), mas os **rótulos voltam ao ritmo par 0,2,…,22** — distâncias iguais e sem sobreposição, em todos os gráficos.

---

## [2.4.5] — 2026-09-24

### Corrigido
- **Faltava a guia/etiqueta das 23h nos gráficos horários**: as linhas-guia verticais (e os rótulos de hora) iam só até às 22h (horas pares). Todos os gráficos — solar, temperatura, precipitação e produção PV — passam a incluir também a hora **23h**, como fronteira final do dia, com o rótulo alinhado à respetiva guia.

---

## [2.4.4] — 2026-09-24

### Corrigido
- **Horas desalinhadas com as linhas-guia verticais dos gráficos**: os rótulos de hora eram distribuídos com `flex; justify-content: space-between` ao longo de toda a largura, mas as linhas-guia verticais do SVG começam/terminam recuadas pelo `pad` do gráfico — por isso nunca coincidiam (pior em gráficos com `pad` maior, como o de temperatura). Cada rótulo é agora posicionado de forma absoluta na posição relativa exata (`left: gx/W %`) da respetiva linha-guia, com a fórmula correta para gráficos de linha (solar/temperatura) e de barras (precipitação/`pv` mini). Aplicado aos 4 eixos → as horas alinham-se perfeitamente com as guias.

---

## [2.4.3] — 2026-09-24

### Corrigido
- **Halo do ponto de temperatura ainda cortado nos extremos**: na iteração anterior o texto já era mantido dentro do gráfico, mas o **círculo de brilho** (r=9) à volta do ponto máximo/mínimo podia continuar meio tapado quando caía na 1.ª/24.ª hora (o ponto ficava a 6px do bordo, e o raio da sombra ultrapassava o `viewBox`). O `padX` do gráfico de temperatura passou de 6 → 16 px: o traçado encolhe ligeiramente ("reduz a escala do gráfico") e os pontos + halo ficam totalmente dentro do SVG nas margens esquerda/direita.

---

## [2.4.2] — 2026-09-24

### Corrigido
- **Etiqueta de temperatura cortada nos extremos do gráfico**: as etiquetas dos pontos máximo/mínimo do gráfico de temperatura horária eram centradas (\`text-anchor="middle"\`) sobre o ponto — quando o máximo/mínimo acontecia nas primeiras/últimas horas, o texto (incluindo o \`°\`) ultrapassava o \`viewBox\` e ficava meio tapado. Agora a âncora adapta-se perto das margens (\`start\`/\`end\`) e o texto é encostado para dentro do SVG.

---

## [2.4.1] — 2026-09-24

### Corrigido
- **Etiqueta dos totais diários na previsão semanal com a unidade**: os valores por cima de cada barra mostram agora a unidade (ex. `2.0 kWh`, em vez de só `2.0`), à semelhança da temperatura que mostra sempre os graus (`17°`). O manual já referia "(kWh)" (sem alterações de chaves).

---

## [2.4.0] — 2026-09-24

### Melhorado
- **Previsão semanal de produção: total do dia por cima de cada barra** — cada uma das 7 barras da previsão semanal mostra agora o seu total de produção em kWh (ex.: `2.4`) por cima do gráfico, além do total da semana no cabeçalho. A barra cresce a partir de baixo dessa etiqueta, mantendo a seleção do dia (clique/Enter/Espaço). Manual atualizado em PT/EN (`m.s7f.p`).

---

## [2.3.1] — 2026-09-24

### Corrigido
- **Botões do painel solar fora do cartão**: o cabeçalho do painel "Produção solar estimada" era uma linha flex sem quebra; como os botões ("Configurar sistema"/"Exportar CSV") têm `flex: none`, em janelas mais estreitas eram empurrados para fora do bordo do cartão. O `.panel__head` passou a permitir quebra de linha (`flex-wrap: wrap`) com o sumário a encolher primeiro, e as ações alinham-se à direita dentro do cartão.

---

## [2.3.0] — 2026-09-24

### Adicionado
- **Geocodificação reversa correta** na geolocalização: o botão pin usa agora o endpoint `/v1/reverse` da Open-Meteo (antes usava o endpoint de pesquisa de texto, que ignora lat/lon) — obtém-se sempre o nome real da localidade.
- **Cache de previsões (TTL 20 min)**: a previsão de uma cidade fica em `localStorage` durante 20 minutos; alternar cidades ou recarregar a página repete apenas o necessário (a qualidade do ar continua a ser sempre consultada em tempo real).
- **Alternância de unidades °C / °F** (seletor na barra superior): toda a previsão é convertida e re-renderizada de imediato — hero, sensação térmica, máx/mín, hora a hora, previsão a 7 dias e gráfico de temperatura. Persistida em `localStorage`.
- **Tema claro / escuro**: botão lua/sol na barra superior alterna entre o tema escuro (por omissão) e o tema claro; persistido e com a `<meta theme-color>` atualizada.
- **Cidades recentes**: as últimas 6 cidades visitadas aparecem em *chips* clicáveis por baixo da barra de pesquisa, com a cidade atual destacada.
- **Navegação rápida entre dias**: setas ‹ anterior / seguinte › no cabeçalho da “Previsão horária” (desativadas nos extremos, rótulo com a data do dia selecionado).
- **Qualidade do ar (EAQI)**: indicador no painel de hoje com o índice europeu (Bom → Muito mau), via `air-quality-api.open-meteo.com`; fica oculto quando indisponível.
- **Previsão semanal de produção solar**: barras com a produção estimada dos 7 dias e total da semana (kWh · €) no painel solar — clicar (ou Enter/Espaço) numa barra seleciona esse dia.
- **Exportar dados do dia em CSV**: botão “Exportar CSV” no painel solar descarrega hora a hora — temperatura, probabilidade/precipitação, radiação (GHI/DNI/difusa) e kWh por orientação + total.
- **PWA instalável**: novo `sw.js` com cache da app shell (rede primeiro para o HTML, cache primeiro para os estáticos), registado na app — o SolMeteo passa a abrir offline após a primeira visita.

### Corrigido
- **Sincronização de versão**: a entrada 2.2.2 ficara por fechar e as versões desencontradas entre `script.js` (2.3.0), manual, changelog e `progress.md` — tudo consolidado em **2.3.0** (a ênfase a verde/bold no resumo da economia mantém-se).

---

## [2.2.2] — 2026-09-24

### Melhorado
- **Resumo da economia restaurado (PT/EN)**: na linha *"Produção total das X orientações…"*, os **dois valores de resultado voltaram a ter destaque** — `kWh` totais e a economia em `€` — em cor verde + bold (a ênfase tinha-se perdido quando o texto passou para `textContent`; agora a linha usa `innerHTML` com `<strong>`). Os restantes valores (tarifa, nota "indicativo", térmica) mantêm-se em tom sóbrio — ênfase **só nos 2 números que importam**.

---

## [2.2.1] — 2026-09-24

### Corrigido
- **Erro ao iniciar a app** ("Não foi possível obter os dados…"): em `renderHourly`, a variável local `const t = new Date(time)` **sombreava a função de tradução `t()`** — no dia 0, ao existir a hora atual, `t("hourly.now")` chamava um objeto `Date` e lançava um `TypeError`, engolido pelo `catch` do `loadWeather` (todos os painéis ficam ocultos). Renomeada para `d`. Comprovado com payload real da API (teste de regressão no harness com `current.time` igual a uma hora do dia 0).

### Melhorado
- Produção solar: o **resumo do cabeçalho** passou a mostrar a potência (kWp) com a **mesma resolução das caixas de texto** (2 casas decimais), **só mostrando as decimais quando existem** — ex.: `5`, `5.5` ou `5.55` kWp (antes aparecia sempre 1 casa, ex. `5.0`).

---

## [2.2.0] — 2026-09-23

### Adicionado
- Rodapé da app e do manual com o número de versão corrente.
- Ficheiro `CHANGELOG.md` com o histórico de alterações por versão.

### Melhorado
- Cabeçalho do manual reorganizado em **duas linhas fixas** (linha 1: marca com título/subtítulo; linha 2: botão "Voltar à app" + badges à direita) para que **nenhum texto fique cortado** — quando falta espaço, o texto parte para duas linhas **da mesma forma em PT e em EN**.
- Removido o `ellipsis`/`overflow: hidden` do título, subtítulo e badges do manual; os badges deixam de ser escondidos em ecrãs pequenos (passam a partir linha quando necessário).

---

## [2.1.0] — iteração anterior

- Manual: botão **"Voltar à app"** no cabeçalho que links para a página inicial.
- Cabeçalho do manual estável ao mudar de idioma (sem saltos de linha entre PT/EN).

---

## [2.0.0] — Internacionalização

- Seletor de idioma **PT/EN** na app e no manual (botão ativo a negrito), partilhado entre páginas via `localStorage`.
- Tradução de todos os textos estáticos e dinâmicos: dia atual/Hoje, compasso (O↔W), horas (hora a hora/agora), UV, gráficos (rótulos e `aria-label`), previsão 7 dias, painel solar (produção, tarifa, comparativos), mensagens de erro/carregamento e resultados vazios.
- Predefinição: **Português**. Geolocalização e pesquisa de cidades usam o idioma ativo.

---

## [1.5.0] — Manual de utilização

- Página `manual.html` com infografias SVG: painéis da app, tipos de previsão, indicadores meteorológicos e explicação da economia solar.
- Botão **Manual** na barra superior e link no rodapé.

---

## [1.4.0] — Seleção de dia

- Os 7 dias da previsão passam a ser **clicáveis**: os painéis e gráficos atualizam para o dia escolhido.

---

## [1.3.0] — Multi-orientações + efeito térmico

- Configuração de **até 4 orientações de painéis** (S; SE/SO; E/O; NE/NO) com cores distintas.
- Seletor de efeito térmico nos painéis (**fixo** ou **temperatura real**) e no resumo solar ("térmica fixa/real").
- Tarifa com **3 casas decimais** e potência (kWp) com **2 casas decimais**.
- Correções: chaves PV não guardavam todos os grupos; alternar painel durante a edição; referência a painel em falta.

---

## [1.2.0] — Produção solar estimada

- Painel de produção fotovoltaica: configuração (potência kWp, inclinação, orientação, rendimento do sistema, tarifa por kWh).
- Estimativa diária de **kWh gerados** e **economia em euros**, com distribuição hora a hora.

---

## [1.1.0] — Gráficos

- Gráficos de **radiação solar, precipitação e temperatura** com eixos e destaque do horário selecionado.

---

## [1.0.0] — Versão inicial

- Estrutura da app (barra superior, pesquisa de cidades, geolocalização, painéis).
- Previsão do dia: temperatura, sensação térmica, vento, humidade, precipitação, UV, nascer/pôr do sol.
- Previsão das próximas 24 horas e dos próximos 7 dias.
- Dados meteorológicos via Open-Meteo.