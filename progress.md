# SkyCast — App de Meteorologia

## Estado atual
App de meteorologia em página única (HTML + CSS + JS) com visual moderno e comercial.
Fonte de dados: **Open-Meteo** (grátis, sem chave de API).
**Versão corrente: 2.4.10** — funcionalidades completas da proposta + melhoramentos da previsão semanal e gráficos (ver "Tarefas — Realizadas vs Pendentes").

> ## ⚠️ REGRAS OBRIGATÓRIAS (não podem falhar)
> 1. **A cada iteração, atualizar o `manual.html`** (manual de utilização com infográficos) sempre que se adiciona, altera ou remove qualquer funcionalidade/comportamento. O manual é **bilingue (PT/EN)** — cada alteração tem de ser refletida nos **dois idiomas**. Tem de estar sempre sincronizado com a app.
> 2. Atualizar este `progress.md` em cada iteração (plano, realizadas/pendentes, regras).
> 3. Verificações antes de terminar: `node --check` no `script.js` e (quando a lógica de render muda) smoke-test com harness DOM simulado em Node.
> 4. **A cada iteração, incrementar a versão da app** em `script.js` (`APP_VERSION`), no rodapé de `index.html` e no rodapé de `manual.html`, e **adicionar a entrada correspondente no topo de `CHANGELOG.md`** (no. de versão + alterações/melhorias/correções).

---

## Plano de implementação

1. **Estrutura** — Projeto estático (sem build), 3 ficheiros: `index.html`, `styles.css`, `script.js`.
2. **Interface** — Visual "comercial": glassmorphism, gradientes aurora, tipografia Inter, ícones SVG, animações, responsivo (mobile/tablet/desktop).
3. **Dados meteorológicos** — Integração com a API Open-Meteo:
   - Geocoding (`geocoding-api.open-meteo.com`) para pesquisar cidades/regiões com sugestões.
   - Forecast (`api.open-meteo.com`) para condições atuais + 24h horárias + 7 dias.
4. **Funcionalidades**:
   - Pesquisa com sugestões e navegação por teclado (setas + Enter + Esc).
   - Geolocalização do navegador (botão pin).
   - Deteção aproximada da localização por IP (`ipapi.co`) com *fallback* para Lisboa.
   - Estado atual: temperatura, descrição, sensação térmica, máx/mín, humidade, vento (com direção), índice UV.
   - Nascer/pôr do sol, coordenadas.
   - Previsão horária (24h) com probabilidade de precipitação.
   - Previsão diária (7 dias) com condições relatadas em português — **dias clicáveis**.
   - Gráfico de **temperatura horária** (linha + área, máx/mín assinalados com etiquetas).
   - Gráfico de radiação solar ao longo do dia (W/m²) com pico assinalado.
   - Gráfico de precipitação diária (mm) por hora.
   - **Produção solar estimada (PV)**: painel com gráfico de produção horária (kWh), total do dia e economia estimada em €.
   - **Configuração do sistema fotovoltaico** (persistida em `localStorage`): potência instalada (kWp), inclinação (°), orientação (°), rendimento do sistema (%) e tarifa (€/kWh) — com defaults automáticos (tilt ≈ latitude, orientação S no hemisfério norte / N no sul).
   - **Modelo de estimativa**: posição solar (declinação, hora solar, elevação/azimute) + transposição POA a partir de GHI/DNI/difusa (Open-Meteo) — alvo = irradiância no plano dos painéis → kWh/hora.
   - **Seleção de dia**: ao clicar num dia, toda a informação muda para esse dia — hero (para dias futuros usa a hora das 13:00 como referência), previsão horária, temperatura, sol e precipitação.
   - Memória da última cidade pesquisada (`localStorage`).
   - *Toast* de erros e estados de carregamento.

---

## Tarefas — Realizadas vs Pendentes

### ✅ Realizadas
- [x] Estrutura do projeto (`index.html`, `styles.css`, `script.js`).
- [x] Layout e design moderno/comercial completo (hero, painéis, footer, responsivo).
- [x] Integração Open-Meteo (geocoding + forecast) verificada com pedidos reais à API.
- [x] Mapeamento WMO → descrição PT + ícones SVG (limpo, nublado, chuva, neve, trovoada, etc.).
- [x] Pesquisa com sugestões, teclado e seleção.
- [x] Geolocalização + deteção por IP + escolha por omissão.
- [x] Previsão horária e diária.
- [x] Painel de gráficos: radiação solar (área + pico) e precipitação (barras) ao longo do dia — SVG nativo, sem dependências.
- [x] **Gráfico de temperatura horária** (área + linha azul, marcadores de máx/mín com etiquetas acima dos pontos).
- [x] **Eixos dos gráficos com mais informação**: etiquetas horárias de 2 em 2 horas (12 marcações) + linhas-guia verticais subtis nos 3 gráficos (temperatura, radiação solar, precipitação).
- [x] **Painel de produção solar estimada** — gráfico de barras de produção horária (kWh), total do dia e economia estimada (€). Cálculo via posição solar + transposição POA a partir de `direct_normal_irradiance`/`shortwave_radiation`/`diffuse_radiation` (validado: elevação do sol ~49,8° ao meio-dia em Lisboa e 0 kWh à noite).
- [x] **Configuração do sistema PV** (formulário no painel): kWp, inclinação, orientação, rendimento, tarifa — com defaults inteligentes por latitude, persistida em `localStorage` e com validação.
- [x] **Ajuda em cada campo PV**: tooltip com hover/foco por teclado explicando como preencher cada parâmetro (potência, inclinação, orientação, rendimento, tarifa). Nota: para a produção solar só as coordenadas lat/lon da cidade influenciam; a morada de rua não é usada.
- [x] **Seletor "Efeito térmico"** na configuração PV: (a) incluído no rendimento (fixo, default) ou (b) **temperatura real hora a hora** — modelo NOCT 45°C com derating −0,4%/°C a partir da `temperature_2m` da API. A escolha é persistida e refletida no resumo e na nota da estimativa.
- [x] **Alinhamento do formulário PV**: rótulos encurtados ("Potência (kWp)", "Rendimento (%)") + `ellipsis`/`nowrap` nas etiquetas para nenhum campo partir à linha e desalinhar as colunas.
- [x] **Bug "Configurar sistema só à 2.ª tentativa"**: `.pv-config` tinha `display: grid`, que anulava o atributo `hidden` (regra de autor vence a do user-agent) — o formulário estava sempre visível e o primeiro clique não tinha efeito. Fixe: regra global `[hidden]{display:none!important}`.
- [x] **Múltiplas orientações PV**: até 4 grupos, cada um com Potência (kWp) + Inclinação (°) + Orientação (°); linhas com 0 kWp são ignoradas. Gráfico mini por orientação (cores + ponto cardinal) + gráfico da soma total. Migração automática de configurações antigas (1 orientação) para o novo formato `groups[]`. Validado em Node: S (5 kWp, 35°) + E (3 kWp, 20°) → 2 mini-gráficos, soma 46,1 kWh.
- [x] **Tarifa com ≥3 casas decimais**: input `step="0.001"` e exibição `.toFixed(3)` (ex.: `0.150` €/kWh) no resumo e na nota final.
- [x] **Potência com ≥2 casas decimais**: inputs kWp (grupos 1–4) com `step="0.01"` (ex.: `3.05` kWp). Refletido no manual.
- [x] **Manual de utilização com infográficos** (`manual.html`, off-line): recoloca o que existe — pesquisa/geolocalização, painéis, gráficos, produção solar, formulário PV (tabela de campos com exemplo de 2 orientações), rosa dos ventos, inclinação, derating térmico e FAQ (morada não influencia; economia indicativa; dados locais). <br/>**Regra: atualizar o manual a cada funcionalidade nova.**
- [x] **Link do manual em fácil acesso**: botão "Manual" (ícone de livro) na barra superior, junto à localização — visível sempre; em ecrãs ≤560px mostra só o ícone. O link no rodapé mantém-se.
- [x] **Bug "Configurar sistema abre com o 1.º grupo a zeros"**: o toggle só preenchia o formulário quando o campo estava a fechar (`if (!open)`) — no primeiro clique (`hidden` inicial = true) nunca preenchia. Fixe: preencher sempre que é aberto. Extra: `loadPvSettings` auto-repara configurações gravadas sem nenhuma orientação ativa (restaura os defaults por latitude no grupo 1). Validado em Node.
- [x] Pedidos adicionais à API: DNI (`direct_normal_irradiance`) e radiação difusa (`diffuse_radiation`) horárias.
- [x] **Seleção de dia na previsão de 7 dias** — clicar num dia atualiza hero, horária, temperatura, sol e precipitação (com estado global `weatherData`/`selectedDay` e acesso a teclado/ARIA).
- [x] Pedidos adicionais à API: humidade, vento e UV horários (para preencher o hero de dias futuros).
- [x] **Bug "erro ao obter os dados" corrigido**: `renderCharts` usava `els.solarSpan` que não estava registado no objeto `els` → `TypeError` engolido pelo `catch` do `loadWeather` (toast de erro). Foi adicionada a referência.
- [x] Verificação de fluxo com harness DOM simulado (Node): load + `renderDay` de vários dias sem exceções.
- [x] Gestão correta de fusos horários (strings de tempo locais da região).
- [x] Sintaxe JS validada (`node --check`), todos os IDs do DOM conferidos.
- [x] Bug do dropdown de sugestões oculto atrás do conteúdo — corrigido com `z-index` no `.topbar`.
- [x] **App bilingue PT/EN (i18n)**: dicionários inline `I18N` (`pt` predefinido + `en`) no `script.js`; motor `t()` com placeholders `{n}`, `applyStaticTranslations()` (aplica `data-i18n` / `data-i18n-html` / `data-i18n-ph` / `data-i18n-title` / `data-i18n-aria` e o estado ativo do seletor) e `setLang()` com persistência em `localStorage["skycast:lang"]` e re-render dos painéis. Traduzidas: strings estáticas do `index.html` (hero, painéis, formulário PV, toasts, loader, badges), WMO (mapa `WMO_LABELS` PT/EN), dias/meses, pontos cardeais (PT `O` ↔ EN `W`), `uvLevel`, `hero.feels`/`hero.forecast`, `dayLabel`/`Hoje`, `temp.range`, gráficos (aria-labels), economia PV (`pv.cmp` com `{0..4}`) e geocoding com `language=pt|en`. Seletor PT/EN na topbar: **idioma ativo a bold** (600 → 800 + gradiente), PT por omissão.
- [x] **Manual bilingue PT/EN** (`manual.html`): reescrito com o mesmo mecanismo (dicionário inline, `data-i18n`/`data-i18n-html`/`data-i18n-aria`, seletor PT/EN no header, `localStorage["skycast:lang"]` partilhado com a app — aplicação e manual seguem o mesmo idioma). Traduzidos: títulos, captions/legendas das infografias SVG (incluindo `Sol`, `Painel (irradiância POA)`, rosa dos ventos `O`/`W`, curva de derating), tabela de campos, exemplo de 2 orientações, FAQ e footer. PT inicia ativo (bold).
- [x] Harness atualizado (stubs `querySelectorAll`/`documentElement`/`title`) com testes i18n: switch PT→EN→PT, persistência, `dayLabel`/`hourly.now`/compasso/WMO em EN e re-render do dia selecionado sem exceções.
- [x] **Manual: link para a página inicial** — botão "Voltar à app" (seta ←) no cabeçalho do `manual.html` (ícone+label; em ≤520px só o ícone; `title`/`aria-label` traduzidos).
- [x] **Cabeçalho do manual estável ao mudar de idioma** — passou de `flex-wrap` para **grid `auto 1fr auto`** com `nowrap` + ellipsis no título/subtítulo e nos badges: muda de idioma e o cabeçalho mantém sempre uma única linha, sem saltos. Validação estática: 110 chaves `data-i18n*` presentes em PT e EN (script de verificação em `skytest/manual_keys_check.js`).
- [x] **Versão da app no rodapé** — a cada iteração a versão (`APP_VERSION` em `script.js`) aparece no rodapé da app (`#appVersion`) e do manual (`#manualVersion`), com rótulo traduzido ("Versão"/"Version"). Versão corrente: **2.2.0**.
- [x] **Novo ficheiro `CHANGELOG.md`** — histórico completo por versão (alterações/melhorias/correções), semântica SemVer; entrada no topo = versão corrente. Regra nº 4 adicionada às obrigatórias.
- [x] **Cabeçalho do manual sem textos cortados** — reorganizado em **duas linhas fixas**: linha 1 = marca completa (título/subtítulo, com quebra natural quando necessário); linha 2 = botão "Voltar à app" (esquerda) + badges (direita, alinhando à direita e partindo linha). Removidos `ellipsis`/`overflow:hidden` e a ocultação de badges em ≤760px — todo o texto fica sempre visível, com **quebra de linha idêntica em PT e EN**. Verificação: `node --check` ok + 110 chaves `data-i18n*` presentes em PT e EN.
- [x] **v2.2.1 — Bug crítico ao iniciar corrigido**: em `renderHourly`, a variável local `const t = new Date(time)` sombreava a função de tradução `t()` → no dia 0, quando a hora atual coincidia, `t("hourly.now")` chamava um `Date` → `TypeError` engolido pelo `catch` do `loadWeather` → toast "Não foi possível obter os dados…" e painéis ocultos. Renomeada para `d`. Comprovado com **payload real da API** (`skytest/real_payload_driver.js`) e regressão no harness (`current.time` agora coincide com uma hora do dia 0; teste `REGRESSION renderDay(0)`).
- [x] **v2.2.1 — kWp com a mesma resolução das caixas**: novo helper `fmtDec(v)` (2 casas máximas, **zeros finais removidos** → `5`, `5.5`, `5.55`) aplicado ao resumo do cabeçalho PV (total e cada orientação). Manual atualizado em PT/EN (`m.f.kwp.t`). Harness: testes `FMTDEC` e `previewPts=true`.
- [x] **v2.3.0 — Implementação completa da proposta de outras LLMs** (o outro LLM só deixou o HTML/CSS/i18n prontos — toda a lógica foi feita nesta iteração):
  - [x] **Geocodificação reversa**: botão de localização usa `geocoding-api.open-meteo.com/v1/reverse` (antes chamava o endpoint de pesquisa de texto, que ignora lat/lon).
  - [x] **Cache de previsões com TTL de 20 min** (`skycast:wc`), com verificação de expiração em `readWeatherCache`.
  - [x] **Unidades °C/°F** (`unitCelsius` + `tempDisplay()`), persistido em `localStorage["skycast:unit"]`, aplicado ao hero, sensação, máx/mín, hora a hora, 7 dias e gráfico de temperatura.
  - [x] **Tema claro/escuro** (`applyTheme`/`toggleTheme`, `data-theme` no `<html>` + `theme-color`), persistido em `localStorage["skycast:theme"]`.
  - [x] **Cidades recentes** (`getRecents`/`addRecent`/`renderRecents`, chips em `#recentsBar`, máximo 6, cidade atual destacada).
  - [x] **Navegação de dias** (`navDay`/`updateDayNav`, setas ‹ › em `#dayPrevBtn`/`#dayNextBtn` com extremos desativados e `#dayNavLabel` com a data).
  - [x] **Qualidade do ar (EAQI)** (`loadAqi`/`aqiBand`, `air-quality-api.open-meteo.com`, indicador em `#statAqi` oculto se falhar).
  - [x] **Previsão semanal de produção PV** (`pvTotalsByDay`/`renderPvWeekly`, 7 barras clicáveis em `#pvWeeklyBars`, total da semana em `#pvWeeklyTotal`).
  - [x] **Exportar CSV do dia** (`exportPvCsv`, dados horários + produção por orientação, `Blob` + download).
  - [x] **PWA instalável** (novo `sw.js` com cache da app shell e registo em `init`).
- [x] **Sincronização de versão e documentação** — versão unificada em **2.3.0** (estava desencontrada entre `script.js`, `manual.html`, `CHANGELOG.md` e `progress.md`); entrada 2.3.0 no changelog e manual atualizado em PT/EN (nova secção 7 “Personalização e extras”, 127 chaves `data-i18n*` em cada idioma).
- [x] **v2.3.1 — Bug de layout no painel solar**: os botões "Configurar sistema"/"Exportar CSV" (`.chip`, `flex: none`) eram empurrados para fora do bordo do cartão em janelas estreitas porque `.panel__head` era flex sem quebra. Fixe: `.panel__head` com `flex-wrap: wrap` + `min-width: 0` nos filhos, `.panel__sup` com `flex: 1 1 auto`, `.pv-actions` com `flex-wrap: wrap` e alinhadas à direita. Verificado com `node --check`.
- [x] **v2.4.0 — Total do dia por cima de cada barra da previsão semanal**: as 7 colunas da previsão semanal passaram a mostrar o total diário (kWh, ex. `2.4`) por cima do gráfico; a barra cresce de baixo dessa etiqueta (`grid-template-rows: auto 1fr auto` com `.pv-weekly__bar-track`). Manual PT/EN atualizado (`m.s7f.p`, ainda 127 = 127 chaves).
- [x] **v2.4.1 — Unidade kWh nas etiquetas dos totais diários**: os valores por cima de cada barra da previsão semanal mostram agora a unidade (ex. `2.0 kWh`), à semelhança da temperatura que mostra sempre os graus. Smoke test atualizado (asserção `N.N kWh`).
- [x] **v2.4.2 — Etiqueta de temperatura cortada nos extremos do gráfico horário**: quando o máximo/mínimo caía nas primeiras/últimas horas, o `text-anchor="middle"` fazia o texto (com o `°`) ultrapassar o `viewBox` e ficar meio tapado. A âncora agora adapta-se perto das margens (`start`/`end`) e o texto fica dentro do SVG.
- [x] **v2.4.3 — Halo do ponto ainda cortado**: a sombra (círculo r=9) à volta do ponto máximo/mínimo continuava meio tapada nas margens — o `padX` foi aumentado de 6 → 16 px no `buildTempChart`, encolhendo ligeiramente o traçado para que ponto + halo e etiqueta fiquem dentro do SVG.
- [x] **v2.4.4 — Horas desalinhadas com as linhas-guia**: os rótulos usavam `space-between` (largura total) mas as guias do SVG estão recuadas pelo `pad` — `axisLabels(times, w, pad, bar)` coloca agora cada rótulo em posição absoluta (`left: gx/w %`, `translateX(-50%)`) a alinhar com a guia, com fórmula própria para gráficos de linha (solar/temp) e de barras (precipitação, PV mini); `.chart__axis` passou a `position: relative; height: 13px`.
- [x] **v2.4.5 — Hora 23h juntada aos gráficos horários**: as guias iam só até às 22h; todos os gráficos (solar, temperatura, precipitação, PV) passaram a ter a linha **23h** como fronteira final do dia (originalmente com etiqueta, refinado em v2.4.6).
- [x] **v2.4.6 — Ritmo dos rótulos corrigido (22h/23h)**: a etiqueta 23h na posição real criava um intervalo 22h→23h a meio do ritmo dos outros e, em ecrãs médios/pequenos, os dois rótulos ficavam meio sobrepostos. Tentativa inicial: manter a **linha-guia 23h** e voltar os rótulos ao ritmo par — insuficiente (ver v2.4.7).
- [x] **v2.4.7 — Eixo uniforme de 24 faixas (tentativa com 23h)**: com posições reais, a guia 23h nunca podia ter o mesmo espaço que as outras (1/23 vs 2/23), por isso os 4 gráficos passaram a usar um domínio de **24 faixas** (hora h → faixa h/24); nesta iteração tentou-se 13 guias equidistantes (0,2,…,22,23) com o rótulo 23h como fronteira final — resolvido em v2.4.8.
- [x] **v2.4.8 — Grid de 2 em 2 horas, sem 23h**: confirmado que as barras/colunas seguem horas pares, a marca 23h era desnecessária. Removidos guia e etiqueta 23h dos 4 gráficos — ficam **12 guias/etiquetas equidistantes (0,2,…,22)** alinhadas aos dados (domínio uniforme de 24 faixas mantido), sem marca extra no fim.
- [x] **v2.4.9 — Dia completo (fim de dia 00h)**: adicionada a **13.ª guia vertical no bordo direito** de cada gráfico com a etiqueta **00h do dia seguinte** (calculada da hora final +1h; com dados reais a partir da meia-noite dá "00h"), fechando o último seguimento — grid com 12 espaços iguais de 2h e o dia completo visível.
- [x] **v2.4.10 — Rótulo de fim de dia removido**: a etiqueta `00h`/`24h` no extremo direito era redundante/repetida (a esquerda já é 00h) — removida; a **guia vertical final mantém-se** como fronteira do dia, com o ritmo 0,2,…,22 intacto.

### ⏳ Pendentes / Opcionais
- [ ] Teste visual humano em vários navegadores/dispositivos.
- [ ] (Opcional) Unidades de vento alternáveis (km/h/mph — °C/°F já existe).
- [ ] (Opcional) Preferência `prefers-color-scheme` para o tema na primeira visita.

---

## Skills e regras definidos no workspace

- **Sem skills personalizadas** definidas no workspace até ao momento.
- Skill incorporada disponível: `customize-opencode` (apenas para configuração do próprio opencode — não aplicável a este projeto).
- **Regras aplicadas durante o desenvolvimento:**
  - Sem comentários no código, salvo se solicitado.
  - Seguir convenções existentes; código simples de página única sem dependências externas (CDN apenas para fontes).
  - Confidencialidade: sem segredos/chaves no repositório (a API escolhida não exige chave).
  - Verificações: `node --check` para JS, validação dos IDs do DOM após cada alteração e smoke-test de fluxo (harness DOM simulado em Node) quando se altera a lógica de renderização.
  - **Obrigatório a cada iteração**: atualizar este `progress.md` — plano, tarefas realizadas/pendentes e regras/skills.
  - **Obrigatório a cada iteração**: atualizar o `manual.html` (manual de utilização com infográficos) para refletir todas as funcionalidades existentes — o manual é bilingue **PT/EN** e as alterações têm de entrar nos **dois idiomas** — ver secção "REGRAS OBRIGATÓRIAS" no topo.

---

## Como executar
Sem build necessário — abrir `index.html` num navegador (ou servir pasta localmente, ex. `npx serve`).
Necessita de ligação à Internet para consultar a API.

## Fonte de dados
- Geocoding: https://geocoding-api.open-meteo.com
- Previsões: https://api.open-meteo.com (licença: dados abertos, ver open-meteo.com)