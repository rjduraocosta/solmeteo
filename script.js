const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const METEO_API = "https://api.open-meteo.com/v1/forecast";

const WMO = {
  0: { label: "Céu limpo", icon: "clear" },
  1: { label: "Maioritariamente limpo", icon: "clear" },
  2: { label: "Parcialmente nublado", icon: "partly" },
  3: { label: "Céu encoberto", icon: "cloudy" },
  45: { label: "Nevoeiro", icon: "fog" },
  48: { label: "Nevoeiro gelado", icon: "fog" },
  51: { label: "Chuviscos ligeiros", icon: "drizzle" },
  53: { label: "Chuviscos", icon: "drizzle" },
  55: { label: "Chuviscos densos", icon: "drizzle" },
  56: { label: "Chuvisco gelado", icon: "sleet" },
  57: { label: "Chuvisco gelado denso", icon: "sleet" },
  61: { label: "Chuva ligeira", icon: "rain" },
  63: { label: "Chuva moderada", icon: "rain" },
  65: { label: "Chuva forte", icon: "rain" },
  66: { label: "Chuva gelada", icon: "sleet" },
  67: { label: "Chuva gelada forte", icon: "sleet" },
  71: { label: "Queda de neve ligeira", icon: "snow" },
  73: { label: "Queda de neve moderada", icon: "snow" },
  75: { label: "Queda de neve intensa", icon: "snow" },
  77: { label: "Grãos de neve", icon: "snow" },
  80: { label: "Aguaceiros ligeiros", icon: "rain" },
  81: { label: "Aguaceiros", icon: "rain" },
  82: { label: "Aguaceiros violentos", icon: "rain" },
  85: { label: "Aguaceiros de neve", icon: "snow" },
  86: { label: "Aguaceiros de neve fortes", icon: "snow" },
  95: { label: "Trovoada", icon: "storm" },
  96: { label: "Trovoada com granizo", icon: "storm" },
  99: { label: "Trovoada com granizo forte", icon: "storm" },
};

const ICONS = {
  clear: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="24" cy="24" r="7" fill="currentColor" stroke="none"/>
    <path d="M24 4v5M24 39v5M4 24h5M39 24h5M10.3 10.3l3.5 3.5M34.2 34.2l3.5 3.5M37.7 10.3l-3.5 3.5M13.8 34.2l-3.5 3.5"/>
  </svg>`,
  partly: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <g fill="#fbbf24" stroke="none"><circle cx="16" cy="5" r="2.6"/><circle cx="7" cy="12" r="2"/><circle cx="25" cy="12" r="1.8"/><circle cx="11" cy="21" r="1.6"/></g>
    <circle cx="19" cy="26" r="8" fill="currentColor" stroke="none" opacity="0.9"/>
    <path d="M33 44a10 10 0 0 1 0-20 9 9 0 0 1 17.5 3 7 7 0 0 1 1.5 14z" transform="translate(-8,-4)" fill="#cbd5e1" stroke="#8b95ad"/>
  </svg>`,
  cloudy: `<svg viewBox="0 0 48 48" fill="none" stroke="#8b95ad" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 34a5 5 0 0 1 0-10 8 8 0 0 1 15.4-3.4A6.5 6.5 0 0 1 31 34z" fill="#cbd5e1" stroke="#8b95ad"/>
  </svg>`,
  fog: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 12h20M10 18h28M12 24h24M14 30h20M12 36h24" opacity="0.8"/>
  </svg>`,
  drizzle: `<svg viewBox="0 0 48 48" fill="none" stroke="#8b95ad" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 20a5 5 0 0 1 0-10 8 8 0 0 1 15.4-3.4A6.5 6.5 0 0 1 28 20z" fill="#cbd5e1"/>
    <path d="M18 30l-2 5M26 30l-2 5M34 30l-2 5M22 38l-2 5M30 38l-2 5" stroke="#7dd3fc" fill="none"/>
  </svg>`,
  rain: `<svg viewBox="0 0 48 48" fill="none" stroke="#8b95ad" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 18a5 5 0 0 1 0-10 8 8 0 0 1 15.4-3.4A6.5 6.5 0 0 1 28 18z" fill="#cbd5e1"/>
    <path d="M16 30l-3 8M26 28l-3 8M36 30l-3 8" stroke="#5aa7e8" fill="none"/>
  </svg>`,
  sleet: `<svg viewBox="0 0 48 48" fill="none" stroke="#8b95ad" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 18a5 5 0 0 1 0-10 8 8 0 0 1 15.4-3.4A6.5 6.5 0 0 1 28 18z" fill="#cbd5e1"/>
    <path d="M20 30l-4 8M30 30l-4 8" stroke="#a5b4fc" fill="none"/>
    <path d="M20 33h.01M30 33h.01" stroke="#94a3b8" stroke-width="3"/>
  </svg>`,
  snow: `<svg viewBox="0 0 48 48" fill="none" stroke="#8b95ad" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 18a5 5 0 0 1 0-10 8 8 0 0 1 15.4-3.4A6.5 6.5 0 0 1 28 18z" fill="#cbd5e1"/>
    <g fill="#ffffff" stroke="none"><circle cx="17" cy="30" r="2"/><circle cx="25" cy="34" r="2"/><circle cx="33" cy="30" r="2"/><circle cx="21" cy="38" r="2"/><circle cx="29" cy="42" r="2"/></g>
  </svg>`,
  storm: `<svg viewBox="0 0 48 48" fill="none" stroke="#8b95ad" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 18a5 5 0 0 1 0-10 8 8 0 0 1 15.4-3.4A6.5 6.5 0 0 1 28 18z" fill="#cbd5e1"/>
    <path d="M22 30l-4 10h7l-3 8M30 30l-3 8" stroke="#fbbf24" fill="none" stroke-width="2.4"/>
  </svg>`,
};

const els = {
  searchForm: document.getElementById("searchForm"),
  searchInput: document.getElementById("searchInput"),
  suggestions: document.getElementById("suggestions"),
  locateBtn: document.getElementById("locateBtn"),
  loader: document.getElementById("loader"),
  hero: document.getElementById("hero"),
  forecastPanel: document.getElementById("forecastPanel"),
  dailyPanel: document.getElementById("dailyPanel"),
  regionName: document.getElementById("regionName"),
  regionNow: document.getElementById("regionNow"),
  heroTemp: document.getElementById("heroTemp"),
  heroIcon: document.getElementById("heroIcon"),
  heroDesc: document.getElementById("heroDesc"),
  heroFeels: document.getElementById("heroFeels"),
  heroCoords: document.getElementById("heroCoords"),
  statMaxMin: document.getElementById("statMaxMin"),
  statHumidity: document.getElementById("statHumidity"),
  statWind: document.getElementById("statWind"),
  statUv: document.getElementById("statUv"),
  sunrise: document.getElementById("sunrise"),
  sunset: document.getElementById("sunset"),
  heroCoordsChip: document.getElementById("heroCoordsChip"),
  heroDaylightVal: document.getElementById("heroDaylightVal"),
  sunArcSvg: document.getElementById("sunArcSvg"),
  sunArcBg: document.getElementById("sunArcBg"),
  sunArcActive: document.getElementById("sunArcActive"),
  sunArcNoonTime: document.getElementById("sunArcNoonTime"),
  sunArcBody: document.getElementById("sunArcBody"),
  sunArcStatusText: document.getElementById("sunArcStatusText"),
  hourlyList: document.getElementById("hourlyList"),
  dailyList: document.getElementById("dailyList"),
  hourlySpan: document.getElementById("hourlySpan"),
  solarPanel: document.getElementById("solarPanel"),
  solarChart: document.getElementById("solarChart"),
  solarAxis: document.getElementById("solarAxis"),
  solarPeak: document.getElementById("solarPeak"),
  solarSpan: document.getElementById("solarSpan"),
  rainChart: document.getElementById("rainChart"),
  rainAxis: document.getElementById("rainAxis"),
  rainTotal: document.getElementById("rainTotal"),
  tempPanel: document.getElementById("tempPanel"),
  tempChart: document.getElementById("tempChart"),
  tempAxis: document.getElementById("tempAxis"),
  tempRange: document.getElementById("tempRange"),
  tempSpan: document.getElementById("tempSpan"),
  pvPanel: document.getElementById("pvPanel"),
  pvSpan: document.getElementById("pvSpan"),
  pvSummary: document.getElementById("pvSummary"),
  pvTariffChip: document.getElementById("pvTariffChip"),
  pvConfigBtn: document.getElementById("pvConfigBtn"),
  pvConfig: document.getElementById("pvConfig"),
  pvGroups: [0, 1, 2, 3].map((i) => ({
    kwp: document.getElementById("pvKp" + i),
    tilt: document.getElementById("pvTilt" + i),
    az: document.getElementById("pvAz" + i),
  })),
  pvEff: document.getElementById("pvEff"),
  pvTariff: document.getElementById("pvTariff"),
  pvThermal: document.getElementById("pvThermal"),
  pvReset: document.getElementById("pvReset"),
  pvCharts: document.getElementById("pvCharts"),
  pvDayTotal: document.getElementById("pvDayTotal"),
  pvPeakPower: document.getElementById("pvPeakPower"),
  pvChart: document.getElementById("pvChart"),
  pvAxis: document.getElementById("pvAxis"),
  pvEcon: document.getElementById("pvEcon"),
  pvExportBtn: document.getElementById("pvExportBtn"),
  pvWeeklyBox: document.getElementById("pvWeeklyBox"),
  pvWeeklyTotal: document.getElementById("pvWeeklyTotal"),
  pvWeeklyBars: document.getElementById("pvWeeklyBars"),
  toast: document.getElementById("toast"),
  recentsBar: document.getElementById("recentsBar"),
  recentsList: document.getElementById("recentsList"),
  dayPrevBtn: document.getElementById("dayPrevBtn"),
  dayNextBtn: document.getElementById("dayNextBtn"),
  dayNavLabel: document.getElementById("dayNavLabel"),
  statAqi: document.getElementById("statAqi"),
  statAqiBox: document.getElementById("statAqiBox"),
  statUvBox: document.getElementById("statUvBox"),
  heroAlertChip: document.getElementById("heroAlertChip"),
  heroAlertsBanner: document.getElementById("heroAlertsBanner"),
  statUvPeak: document.getElementById("statUvPeak"),
  themeBtn: document.getElementById("themeBtn"),
  pvTariffType: document.getElementById("pvTariffType"),
  pvTariffSimpleBox: document.getElementById("pvTariffSimpleBox"),
  pvCycleBox: document.getElementById("pvCycleBox"),
  pvTariffCycle: document.getElementById("pvTariffCycle"),
  pvTariffPeakBox: document.getElementById("pvTariffPeakBox"),
  pvTariffPeak: document.getElementById("pvTariffPeak"),
  pvTariffOffPeakBox: document.getElementById("pvTariffOffPeakBox"),
  pvTariffOffPeak: document.getElementById("pvTariffOffPeak"),
  pvBattery: document.getElementById("pvBattery"),
  pvBattMinSoc: document.getElementById("pvBattMinSoc"),
  pvDailyKwh: document.getElementById("pvDailyKwh"),
  pvExportTariff: document.getElementById("pvExportTariff"),
  pvBalanceCard: document.getElementById("pvBalanceCard"),
  pvSelfVal: document.getElementById("pvSelfVal"),
  pvSelfPct: document.getElementById("pvSelfPct"),
  pvBattVal: document.getElementById("pvBattVal"),
  pvBattSoc: document.getElementById("pvBattSoc"),
  pvExportVal: document.getElementById("pvExportVal"),
  pvExportEuros: document.getElementById("pvExportEuros"),
  pvImportVal: document.getElementById("pvImportVal"),
  pvImportCost: document.getElementById("pvImportCost"),
  pvBalanceBenefit: document.getElementById("pvBalanceBenefit"),
  pvSegSelf: document.getElementById("pvSegSelf"),
  pvSegBatt: document.getElementById("pvSegBatt"),
  pvSegExport: document.getElementById("pvSegExport"),
  pvCompassCard: document.getElementById("pvCompassCard"),
  pvCompassTabs: document.getElementById("pvCompassTabs"),
  pvCompassVal0: document.getElementById("pvCompassVal0"),
  pvCompassVal1: document.getElementById("pvCompassVal1"),
  pvCompassVal2: document.getElementById("pvCompassVal2"),
  pvCompassVal3: document.getElementById("pvCompassVal3"),
  pvCompassReadoutAngle: document.getElementById("pvCompassReadoutAngle"),
  pvCompassReadoutDir: document.getElementById("pvCompassReadoutDir"),
  pvCompassReadoutOpt: document.getElementById("pvCompassReadoutOpt"),
  pvCompassSvg: document.getElementById("pvCompassSvg"),
  pvCompassNeedleGroup: document.getElementById("pvCompassNeedleGroup"),
  pvCompassGhostNeedles: document.getElementById("pvCompassGhostNeedles"),
  pvCompassPresets: document.getElementById("pvCompassPresets"),
  compassLblN: document.getElementById("compassLblN"),
  compassLblNE: document.getElementById("compassLblNE"),
  compassLblE: document.getElementById("compassLblE"),
  compassLblSE: document.getElementById("compassLblSE"),
  compassLblS: document.getElementById("compassLblS"),
  compassLblSO: document.getElementById("compassLblSO"),
  compassLblO: document.getElementById("compassLblO"),
  compassLblNO: document.getElementById("compassLblNO"),
  chipLblN: document.getElementById("chipLblN"),
  chipLblNE: document.getElementById("chipLblNE"),
  chipLblE: document.getElementById("chipLblE"),
  chipLblSE: document.getElementById("chipLblSE"),
  chipLblS: document.getElementById("chipLblS"),
  chipLblSO: document.getElementById("chipLblSO"),
  chipLblO: document.getElementById("chipLblO"),
  chipLblNO: document.getElementById("chipLblNO"),
};

let weatherData = null;
let placeName = "";
let selectedDay = 0;
let unitCelsius = true;
let unitWind = "kmh";

const PV_KEY = "skycast:pv";
const RECENTS_KEY = "skycast:recents";
const THEME_KEY = "skycast:theme";
const UNIT_KEY = "skycast:unit";
const WIND_UNIT_KEY = "skycast:wind_unit";
const PV_VIEW_KEY = "skycast:pv_view";
let pvViewMode = "both";
const PV_PALETTE = ["#38bdf8", "#818cf8", "#34d399", "#fb7185"];
const PV_TOTAL_COLOR = "#fbbf24";
const AQI_API = "https://air-quality-api.open-meteo.com/v1/air-quality";
const REVERSE_GEO_API = "https://geocoding-api.open-meteo.com/v1/reverse";
const WEATHER_CACHE_KEY = "skycast:wc";
const CACHE_TTL_MS = 20 * 60 * 1000;
const APP_VERSION = "2.12.2";

const LANG_KEY = "skycast:lang";

function safeStorageGet(key, fallback = null) {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? val : fallback;
  } catch {
    return fallback;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeStorageRemove(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

const I18N = {
  pt: {
    locale: "pt-PT",
    days: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
    months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    dirs: ["N", "NE", "E", "SE", "S", "SO", "O", "NO"],
    "app.title": "SolMeteo — Meteorologia",
    "search.placeholder": "Pesquisar cidade ou região…",
    "search.aria": "Pesquisar cidade",
    "suggestions.aria": "Sugestões",
    "locate.title": "Usar a minha localização",
    "locate.aria": "Usar a minha localização",
    "manual.title": "Manual de utilização",
    "manual.aria": "Abrir o manual de utilização",
    "manual.label": "Manual",
    "lang.aria": "Idioma",
    "loader.aria": "A carregar",
    "loader.text": "A consultar as condições atmosféricas…",
    "hero.feels": "Sensação térmica {0}°",
    "hero.forecast": "Previsão para as 13:00",
    "stat.maxmin": "Máx / Mín",
    "stat.humidity": "Humidade",
    "stat.wind": "Vento",
    "stat.uv": "Índice UV",
    "sun.rise": "Nascer do sol",
    "sun.set": "Pôr do sol",
    "hourly.title": "Previsão horária",
    "hourly.sub": "Próximas 24 horas",
    "hourly.now": "Agora",
    "temp.title": "Temperatura ao longo do dia",
    "temp.label": "Temperatura horária",
    "temp.aria": "Gráfico de temperatura ao longo do dia",
    "temp.range": "Máx {0}° · Mín {1}°",
    "solar.title": "Radiação solar & precipitação",
    "solar.label": "Radiação solar",
    "solar.aria": "Gráfico de radiação solar ao longo do dia",
    "rain.label": "Precipitação",
    "rain.none": "Sem precipitação prevista",
    "rain.aria": "Gráfico de precipitação ao longo do dia",
    "pv.title": "Produção solar estimada",
    "pv.btn": "Configurar sistema",
    "pv.head.power": "Potência (kWp)",
    "pv.head.tilt": "Inclinação (°)",
    "pv.head.az": "Orientação (°)",
    "pv.field.eff": "Rendimento (%)",
    "pv.field.tariff": "Tarifa (€/kWh)",
    "pv.field.thermal": "Efeito térmico",
    "pv.save": "Guardar",
    "pv.reset": "Repor automático",
    "pv.hint": "Linhas com 0 kWp são ignoradas. Os valores guardados aplicam-se a todas as cidades.",
    "pv.total": "Produção total estimada",
    "pv.empty": "Define a potência (kWp) em pelo menos uma orientação para veres a estimativa.",
    "pv.cmp": "Produção total das {0} orientações: <strong>{1} kWh</strong> · economia ≈ <strong>{2} €</strong> com tarifa de {3} €/kWh (valor indicativo) — {4}",
    "pv.thermal.real": "efeito térmico modelado com a temperatura real (hora a hora)",
    "pv.thermal.fixednote": "efeito térmico incluído no rendimento",
    "pv.thermal.saved.real": "térmica real",
    "pv.thermal.saved.fixed": "térmica fixa",
    "pv.aria": "Gráfico da produção estimada com térmica variável",
    "pv.tip.groups.aria": "Ajuda sobre múltiplas orientações",
    "pv.tip.eff.aria": "Ajuda sobre rendimento",
    "pv.tip.tariff.aria": "Ajuda sobre tarifa",
    "pv.tip.thermal.aria": "Ajuda sobre efeito térmico",
    "pv.tip.groups": "Apoia até <strong>4 orientações</strong> (ex.: telhados com painéis em várias águas). Cada linha é um grupo com a sua potência (kWp), inclinação e orientação.<br/><strong>Linhas com 0 kWp são ignoradas</strong> e não aparecem nos gráficos.<br/>Sugestão de inclinação: ≈ latitude (39° em Lisboa). Orientação: 0° N · 90° E · 180° S · 270° O.",
    "pv.tip.eff": "Perdas reais do sistema: inversor, cabos, temperatura dos módulos e sujidade. Valor típico: 75–85%.",
    "pv.tip.tariff": "Preço médio da energia para estimar o valor da produção em euros. Valor meramente indicativo — não substitui o teu contrato de fornecimento.",
    "pv.tip.thermal": "<strong>Incluído no rendimento</strong> — o fator térmico é um valor fixo dentro do rendimento (típico 75–85%).<br/><strong>Temperatura real</strong> — usa a temperatura do dia à hora a hora: os módulos perdem ~0,4% por cada °C acima de 25°C (NOCT 45°C). Com esta opção, o rendimento refere-se apenas a outras perdas (inversor, cabos, sujidade — típico 90–95%); o efeito da temperatura é somado automaticamente, individualmente por orientação.",
    "pv.thermal.fixed": "Incluído no rendimento (fixo)",
    "pv.thermal.temp": "Temperatura real (hora a hora)",
    "pv.toast.saved": "Configuração fotovoltaica guardada.",
    "pv.toast.reset": "Repostas as definições automáticas do sistema.",
    "pv.toast.bad": "Preenche todos os campos com valores válidos (≥ 0).",
    "pv.toast.noactive": "Define a potência (kWp) de pelo menos uma orientação.",
    "daily.title": "Previsão a 7 dias",
    "daily.sub": "Dia a dia",
    "day.today": "Hoje",
    "footer.source": "Fonte:",
    "footer.manual": "Manual de utilização",
    "footer.version": "Versão",
    "suggest.empty": "Sem resultados — tenta outra localização.",
    "toast.fetch": "Não foi possível obter os dados. Verifica a ligação e tenta novamente.",
    "toast.geo.unsupported": "A geolocalização não é suportada neste navegador.",
    "toast.geo.fail": "Não foi possível obter a localização. Verifica as permissões.",
    "place.fallback": "Localização",
    "place.mine": "A minha localização",
    "place.unknown": "Desconhecido",
    "uv.low": "Baixo",
    "uv.moderate": "Moderado",
    "uv.high": "Elevado",
    "uv.veryhigh": "Muito elevado",
    "uv.extreme": "Extremo",
    "stat.aqi": "Qualidade do Ar",
    "aqi.good": "Bom",
    "aqi.fair": "Razoável",
    "aqi.moderate": "Moderado",
    "aqi.poor": "Mau",
    "aqi.veryPoor": "Muito mau",
    "aqi.na": "—",
    "unit.aria": "Unidades de temperatura",
    "unit.wind.aria": "Unidades de velocidade do vento",
    "stat.wind.toggle": "Alternar unidade de velocidade do vento (km/h / mph)",
    "theme.title": "Alternar modo claro / escuro",
    "theme.aria": "Alternar tema",
    "recents.label": "Recentes:",
    "recents.aria": "Cidades recentes",
    "daynav.prev": "Dia anterior",
    "daynav.next": "Dia seguinte",
    "daynav.aria": "Navegar entre dias",
    "pv.export": "Exportar CSV",
    "pv.export.title": "Exportar dados do dia para CSV",
    "pv.export.done": "Ficheiro CSV descarregado.",
    "pv.weekly.title": "Previsão semanal (7 dias acumulados)",
    "pv.peak.tag": "Pico: {0} kW ({1})",
    "pv.peak.title": "Potência de pico instantânea estimada",
    "pv.mode.aria": "Modo de visualização do gráfico solar",
    "pv.mode.both": "Ambos",
    "pv.mode.kwh": "kWh (Energia)",
    "pv.mode.kw": "kW (Potência)",
    "pv.aria.power": "Curva de potência instantânea em kW",
    "pv.field.battery": "Bateria (kWh)",
    "pv.tip.battery.aria": "Ajuda sobre capacidade da bateria",
    "pv.tip.battery": "Capacidade útil de armazenamento em bateria residencial. Define <strong>0</strong> se o teu sistema não tiver bateria. Valores comuns: 5 ou 10 kWh.",
    "pv.field.battminsoc": "Reserva mín. (%)",
    "pv.tip.battminsoc.aria": "Ajuda sobre reserva mínima da bateria",
    "pv.tip.battminsoc": "Nível mínimo de carga (SoC) abaixo do qual a bateria cessa a descarga para proteger as células e manter reserva de emergência (0% a 100%). Padrão: 20%.",
    "pv.field.baseload": "Consumo diário (kWh)",
    "pv.tip.baseload.aria": "Ajuda sobre consumo diário da casa",
    "pv.tip.baseload": "Consumo diário total da habitação em kWh (ex.: fatura mensal a dividir por 30 dias). Valores típicos: 8 a 15 kWh/dia.",
    "pv.field.export": "Injeção (€/kWh)",
    "pv.tip.export.aria": "Ajuda sobre tarifa de injeção",
    "pv.tip.export": "Remuneração paga pelo excedente solar injetado na rede elétrica. Tipicamente cerca de 0,04 a 0,07 €/kWh.",
    "pv.field.tarifftype": "Tipo de tarifa",
    "pv.tip.tarifftype.aria": "Ajuda sobre tipo de tarifa",
    "pv.tip.tarifftype": "Escolhe entre <strong>Tarifa Simples</strong> (preço fixo 24h) ou <strong>Bi-horária</strong> (preços diferenciados dia/noite e fins de semana segundo a ERSE).",
    "pv.tariff.chiptitle": "Alterar tarifário de eletricidade",
    "pv.tariff.badge_simple": "Tarifa Simples",
    "pv.tariff.badge_bihourly": "Tarifa Bi-horária",
    "pv.cycle.short_daily": "Diário",
    "pv.cycle.short_weekly": "Semanal",
    "pv.sec.panels": "Painéis Solares & Orientações",
    "pv.sec.tariff": "Tarifário de Eletricidade & Rede",
    "pv.sec.battery": "Bateria & Consumo Residencial",
    "pv.sec.efficiency": "Rendimento & Modelo Térmico",
    "pv.tariff.simple": "Simples (fixa 24h)",
    "pv.tariff.bihourly": "Bi-horária (dia/noite)",
    "pv.field.cycle": "Ciclo bi-horário",
    "pv.tip.cycle.aria": "Ajuda sobre ciclo bi-horário",
    "pv.tip.cycle": "<strong>Ciclo Diário:</strong> Vazio das 22h às 08h todos os dias.<br/><strong>Ciclo Semanal:</strong> Dias úteis (vazio 00h–07h), Sábado (vazio 00h–09h, 14h–20h, 22h–24h), Domingo (vazio 24h).",
    "pv.cycle.daily": "Ciclo Diário",
    "pv.cycle.weekly": "Ciclo Semanal",
    "pv.field.tariffpeak": "Tarifa Dia / Fora Vazio (€/kWh)",
    "pv.tip.tariffpeak.aria": "Ajuda sobre tarifa fora de vazio",
    "pv.tip.tariffpeak": "Preço da eletricidade nas horas diurnas (fora de vazio). Tipicamente 0,18 a 0,25 €/kWh.",
    "pv.field.tariffoffpeak": "Tarifa Noite / Vazio (€/kWh)",
    "pv.tip.tariffoffpeak.aria": "Ajuda sobre tarifa de vazio",
    "pv.tip.tariffoffpeak": "Preço da eletricidade nas horas económicas (vazio). Tipicamente 0,10 a 0,13 €/kWh.",
    "pv.cmp.bihourly": "Produção total das {0} orientações: <strong>{1} kWh</strong> · economia ≈ <strong>{2} €</strong> com tarifa bi-horária ({3} € dia / {4} € noite) — {5}",
    "pv.balance.title": "Autoconsumo & Bateria",
    "pv.balance.sub": "Balanço das 24h",
    "pv.metric.self": "Autoconsumo Total",
    "pv.metric.self.sub": "{0}% autossuficiente",
    "pv.metric.self.detail": "{0} kWh sol + {1} kWh bat · {2}% autossuficiente",
    "pv.metric.batt": "Bateria (Descarga)",
    "pv.metric.batt.soc": "SoC final: {0}%",
    "pv.metric.batt.detail": "Carregou {0} kWh · SoC: {1}%",
    "pv.metric.export": "Injetado na Rede",
    "pv.metric.import": "Importado da Rede",
    "pv.metric.cost": "Custo: {0} €",
    "pv.balance.nobatt": "Sem bateria",
    "pv.compass.title": "Rosa dos Ventos & Orientação dos Painéis",
    "pv.compass.g1": "String 1",
    "pv.compass.g2": "String 2",
    "pv.compass.g3": "String 3",
    "pv.compass.g4": "String 4",
    "pv.compass.opt": "180° (Sul) = Ótimo solar",
    "pv.compass.drag_hint": "Arrasta o mostrador para rodar",
    "cardinal.n": "Norte",
    "cardinal.ne": "Nordeste",
    "cardinal.e": "Este",
    "cardinal.se": "Sudeste",
    "cardinal.s": "Sul",
    "cardinal.so": "Sudoeste",
    "cardinal.o": "Oeste",
    "cardinal.no": "Noroeste",
    "stat.uv.toggle": "Ver Índice UV e alertas meteorológicos",
    "hero.alert.chip": "⚠ {0} Alerta(s)",
    "advisory.title": "Índice UV & Alertas Meteorológicos",
    "advisory.uv.title": "Escala do Índice UV",
    "advisory.uv.peak": "Pico previsto de {0} às {1}",
    "advisory.uv.peak_none": "Sem radiação UV significativa hoje",
    "advisory.uv.window": "Maior intensidade entre as {0} e as {1}",
    "advisory.uv.level.low": "Baixo (0–2)",
    "advisory.uv.level.mod": "Moderado (3–5)",
    "advisory.uv.level.high": "Elevado (6–7)",
    "advisory.uv.level.veryhigh": "Muito Alto (8–10)",
    "advisory.uv.level.extreme": "Extremo (11+)",
    "advisory.alerts.title": "Alertas Meteorológicos",
    "advisory.alerts.sub_count": "{0} alerta(s) ativo(s) para hoje",
    "advisory.alerts.sub_none": "Sem avisos meteorológicos ativos para hoje",
    "advisory.alerts.stable": "Estável",
    "advisory.alerts.active": "Atenção ({0})",
    "advisory.alert.wind.title": "Vento Muito Forte / Rajadas",
    "advisory.alert.wind.desc": "Rajadas estimadas de até {0} ({1} nós).",
    "advisory.alert.rain.title": "Precipitação Intensa / Acumulada",
    "advisory.alert.rain.desc": "Precipitação acumulada diária prevista de {0} mm.",
    "advisory.alert.storm.title": "Trovoada / Risco de Granizo",
    "advisory.alert.storm.desc": "Condições atmosféricas instáveis com trovoada e possível ocorrência de granizo.",
    "advisory.alert.heat.title": "Calor Extremo / Alerta Térmico",
    "advisory.alert.heat.desc": "Temperatura máxima prevista de {0} {1}.",
    "advisory.alert.frost.title": "Risco de Gelo / Temperatura Negativa",
    "advisory.alert.frost.desc": "Temperatura mínima prevista de {0} {1}.",
    "advisory.alert.aqi.title": "Qualidade do Ar Degradada",
    "advisory.alert.aqi.desc": "Índice Europeu de Qualidade do Ar (EAQI) elevado.",
    "advisory.alerts.none_title": "Condições Favoráveis",
    "advisory.alerts.none_desc": "Não foram identificados limiares meteorológicos severos para este dia.",
    "sun.arc.coords_title": "Coordenadas geográficas",
    "sun.arc.daylight_title": "Duração total de luz solar",
    "sun.arc.sunset_in": "Pôr do sol em {0}",
    "sun.arc.sunrise_in": "Nascer do sol em {0}",
    "sun.arc.night": "Noite",
    "sun.arc.daylight_total": "{0} de luz solar",
    "stat.uv.peak_sub": "pico {0} às {1}",
    "stat.uv.peak_hour": "pico às {0}",
    "hero.alerts.none": "Sem alertas ativos",
  },
  en: {
    locale: "en-GB",
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    dirs: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
    "app.title": "SolMeteo — Weather",
    "search.placeholder": "Search city or region…",
    "search.aria": "Search city",
    "suggestions.aria": "Suggestions",
    "locate.title": "Use my location",
    "locate.aria": "Use my location",
    "manual.title": "User manual",
    "manual.aria": "Open the user manual",
    "manual.label": "Manual",
    "lang.aria": "Language",
    "loader.aria": "Loading",
    "loader.text": "Fetching current conditions…",
    "hero.feels": "Feels like {0}°",
    "hero.forecast": "Forecast for 13:00",
    "stat.maxmin": "Max / Min",
    "stat.humidity": "Humidity",
    "stat.wind": "Wind",
    "stat.uv": "UV index",
    "sun.rise": "Sunrise",
    "sun.set": "Sunset",
    "hourly.title": "Hourly forecast",
    "hourly.sub": "Next 24 hours",
    "hourly.now": "Now",
    "temp.title": "Temperature through the day",
    "temp.label": "Hourly temperature",
    "temp.aria": "Temperature chart through the day",
    "temp.range": "Max {0}° · Min {1}°",
    "solar.title": "Solar radiation & precipitation",
    "solar.label": "Solar radiation",
    "solar.aria": "Solar radiation chart through the day",
    "rain.label": "Precipitation",
    "rain.none": "No precipitation expected",
    "rain.aria": "Precipitation chart through the day",
    "pv.title": "Estimated solar production",
    "pv.btn": "Set up system",
    "pv.head.power": "Power (kWp)",
    "pv.head.tilt": "Tilt (°)",
    "pv.head.az": "Orientation (°)",
    "pv.field.eff": "Efficiency (%)",
    "pv.field.tariff": "Tariff (€/kWh)",
    "pv.field.thermal": "Thermal effect",
    "pv.save": "Save",
    "pv.reset": "Reset to auto",
    "pv.hint": "Rows with 0 kWp are ignored. Saved values apply to all cities.",
    "pv.total": "Estimated total production",
    "pv.empty": "Set the power (kWp) in at least one orientation to see the estimate.",
    "pv.cmp": "Total production from {0} orientations: <strong>{1} kWh</strong> · savings ≈ <strong>{2} €</strong> at {3} €/kWh (indicative) — {4}",
    "pv.thermal.real": "thermal effect modelled with real hourly temperature",
    "pv.thermal.fixednote": "thermal effect included in efficiency",
    "pv.thermal.saved.real": "real thermal",
    "pv.thermal.saved.fixed": "fixed thermal",
    "pv.aria": "Estimated production chart with variable derating",
    "pv.tip.groups.aria": "Help about multiple orientations",
    "pv.tip.eff.aria": "Help about efficiency",
    "pv.tip.tariff.aria": "Help about tariff",
    "pv.tip.thermal.aria": "Help about thermal effect",
    "pv.tip.groups": "Supports up to <strong>4 orientations</strong> (e.g. roofs with panels on several slopes). Each row is a group with its own power (kWp), tilt and orientation.<br/><strong>Rows with 0 kWp are ignored</strong> and do not appear on charts.<br/>Tilt suggestion: ≈ latitude (39° in Lisbon). Orientation: 0° N · 90° E · 180° S · 270° W.",
    "pv.tip.eff": "Real system losses: inverter, cables, module temperature and soiling. Typical value: 75–85%.",
    "pv.tip.tariff": "Average energy price to estimate the value of production in euros. Merely indicative — does not replace your supply contract.",
    "pv.tip.thermal": "<strong>Included in efficiency</strong> — the thermal factor is a fixed value within efficiency (typical 75–85%).<br/><strong>Real temperature</strong> — uses the day's hourly temperature: modules lose ~0.4% per °C above 25°C (NOCT 45°C). With this option, efficiency refers only to other losses (inverter, cables, soiling — typical 90–95%); the thermal effect is added automatically, individually per orientation.",
    "pv.thermal.fixed": "Included in efficiency (fixed)",
    "pv.thermal.temp": "Real temperature (hourly)",
    "pv.toast.saved": "Photovoltaic configuration saved.",
    "pv.toast.reset": "System automatic defaults restored.",
    "pv.toast.bad": "Fill in all fields with valid values (≥ 0).",
    "pv.toast.noactive": "Set the power (kWp) of at least one orientation.",
    "daily.title": "7-day forecast",
    "daily.sub": "Day by day",
    "day.today": "Today",
    "footer.source": "Source:",
    "footer.manual": "User manual",
    "footer.version": "Version",
    "suggest.empty": "No results — try another location.",
    "toast.fetch": "Could not fetch data. Check your connection and try again.",
    "toast.geo.unsupported": "Geolocation is not supported in this browser.",
    "toast.geo.fail": "Could not get your location. Check permissions.",
    "place.fallback": "Location",
    "place.mine": "My location",
    "place.unknown": "Unknown",
    "uv.low": "Low",
    "uv.moderate": "Moderate",
    "uv.high": "High",
    "uv.veryhigh": "Very high",
    "uv.extreme": "Extreme",
    "stat.aqi": "Air Quality",
    "aqi.good": "Good",
    "aqi.fair": "Fair",
    "aqi.moderate": "Moderate",
    "aqi.poor": "Poor",
    "aqi.veryPoor": "Very poor",
    "aqi.na": "—",
    "unit.aria": "Temperature units",
    "unit.wind.aria": "Wind speed units",
    "stat.wind.toggle": "Toggle wind speed units (km/h / mph)",
    "theme.title": "Toggle light / dark mode",
    "theme.aria": "Toggle theme",
    "recents.label": "Recent:",
    "recents.aria": "Recent cities",
    "daynav.prev": "Previous day",
    "daynav.next": "Next day",
    "daynav.aria": "Navigate between days",
    "pv.export": "Export CSV",
    "pv.export.title": "Export day data to CSV",
    "pv.export.done": "CSV file downloaded.",
    "pv.weekly.title": "Weekly forecast (7-day total)",
    "pv.peak.tag": "Peak: {0} kW ({1})",
    "pv.peak.title": "Estimated instantaneous peak power",
    "pv.mode.aria": "Solar chart visualization mode",
    "pv.mode.both": "Both",
    "pv.mode.kwh": "kWh (Energy)",
    "pv.mode.kw": "kW (Power)",
    "pv.aria.power": "Instantaneous power curve in kW",
    "pv.field.battery": "Battery (kWh)",
    "pv.tip.battery.aria": "Help on battery capacity",
    "pv.tip.battery": "Usable residential battery storage capacity. Set to <strong>0</strong> if your system has no battery. Typical values: 5 or 10 kWh.",
    "pv.field.battminsoc": "Min. reserve (%)",
    "pv.tip.battminsoc.aria": "Help on minimum battery reserve",
    "pv.tip.battminsoc": "Minimum state of charge (SoC) threshold below which the battery stops discharging to protect cell lifespan and preserve emergency backup (0% to 100%). Default: 20%.",
    "pv.field.baseload": "Daily consumption (kWh)",
    "pv.tip.baseload.aria": "Help on household daily consumption",
    "pv.tip.baseload": "Total daily electrical consumption of your home in kWh (e.g. monthly bill divided by 30 days). Typical values: 8 to 15 kWh/day.",
    "pv.field.export": "Grid feed-in (€/kWh)",
    "pv.tip.export.aria": "Help on grid feed-in tariff",
    "pv.tip.export": "Remuneration rate for solar surplus injected back into the grid. Typically ~0.04 to 0.07 €/kWh.",
    "pv.field.tarifftype": "Tariff type",
    "pv.tip.tarifftype.aria": "Help on tariff type",
    "pv.tip.tarifftype": "Choose between <strong>Flat Tariff</strong> (fixed 24h rate) or <strong>Bi-hourly Tariff</strong> (differentiated peak/off-peak rates according to ERSE regulations).",
    "pv.tariff.chiptitle": "Change electricity tariff",
    "pv.tariff.badge_simple": "Flat Tariff",
    "pv.tariff.badge_bihourly": "Bi-Hourly Tariff",
    "pv.cycle.short_daily": "Daily",
    "pv.cycle.short_weekly": "Weekly",
    "pv.sec.panels": "Solar Panels & Orientations",
    "pv.sec.tariff": "Electricity Tariff & Grid",
    "pv.sec.battery": "Battery & Household Consumption",
    "pv.sec.efficiency": "Efficiency & Thermal Model",
    "pv.tariff.simple": "Flat (fixed 24h)",
    "pv.tariff.bihourly": "Bi-hourly (day/night)",
    "pv.field.cycle": "Bi-hourly cycle",
    "pv.tip.cycle.aria": "Help on bi-hourly cycle",
    "pv.tip.cycle": "<strong>Daily Cycle:</strong> Off-peak from 22:00 to 08:00 every day.<br/><strong>Weekly Cycle:</strong> Weekdays (off-peak 00h–07h), Saturday (off-peak 00h–09h, 14h–20h, 22h–24h), Sunday (off-peak 24h).",
    "pv.cycle.daily": "Daily Cycle",
    "pv.cycle.weekly": "Weekly Cycle",
    "pv.field.tariffpeak": "Peak Tariff / Day (€/kWh)",
    "pv.tip.tariffpeak.aria": "Help on peak tariff",
    "pv.tip.tariffpeak": "Electricity price during daytime peak hours. Typically 0.18 to 0.25 €/kWh.",
    "pv.field.tariffoffpeak": "Off-Peak Tariff / Night (€/kWh)",
    "pv.tip.tariffoffpeak.aria": "Help on off-peak tariff",
    "pv.tip.tariffoffpeak": "Electricity price during economy off-peak hours. Typically 0.10 to 0.13 €/kWh.",
    "pv.cmp.bihourly": "Total production from {0} orientations: <strong>{1} kWh</strong> · savings ≈ <strong>{2} €</strong> with bi-hourly tariff ({3} € day / {4} € night) — {5}",
    "pv.balance.title": "Self-Consumption & Battery",
    "pv.balance.sub": "24h Energy Balance",
    "pv.metric.self": "Total Self-Consumed",
    "pv.metric.self.sub": "{0}% self-sufficient",
    "pv.metric.self.detail": "{0} kWh sol + {1} kWh batt · {2}% self-sufficient",
    "pv.metric.batt": "Battery (Discharge)",
    "pv.metric.batt.soc": "Final SoC: {0}%",
    "pv.metric.batt.detail": "Charged {0} kWh · SoC: {1}%",
    "pv.metric.export": "Injected to Grid",
    "pv.metric.import": "Imported from Grid",
    "pv.metric.cost": "Cost: {0} €",
    "pv.balance.nobatt": "No battery",
    "pv.compass.title": "Interactive Compass & Array Azimuth",
    "pv.compass.g1": "String 1",
    "pv.compass.g2": "String 2",
    "pv.compass.g3": "String 3",
    "pv.compass.g4": "String 4",
    "pv.compass.opt": "180° (South) = Optimal solar",
    "pv.compass.drag_hint": "Drag dial to rotate",
    "cardinal.n": "North",
    "cardinal.ne": "Northeast",
    "cardinal.e": "East",
    "cardinal.se": "Southeast",
    "cardinal.s": "South",
    "cardinal.so": "Southwest",
    "cardinal.o": "West",
    "cardinal.no": "Northwest",
    "stat.uv.toggle": "View UV Index and weather alerts",
    "hero.alert.chip": "⚠ {0} Alert(s)",
    "advisory.title": "UV Index & Severe Weather Alerts",
    "advisory.uv.title": "UV Index Scale",
    "advisory.uv.peak": "Peak forecast at {0} at {1}",
    "advisory.uv.peak_none": "No significant UV radiation today",
    "advisory.uv.window": "Highest intensity between {0} and {1}",
    "advisory.uv.level.low": "Low (0–2)",
    "advisory.uv.level.mod": "Moderate (3–5)",
    "advisory.uv.level.high": "High (6–7)",
    "advisory.uv.level.veryhigh": "Very High (8–10)",
    "advisory.uv.level.extreme": "Extreme (11+)",
    "advisory.alerts.title": "Severe Weather Alerts",
    "advisory.alerts.sub_count": "{0} active alert(s) today",
    "advisory.alerts.sub_none": "No active weather warnings today",
    "advisory.alerts.stable": "Calm",
    "advisory.alerts.active": "Alert ({0})",
    "advisory.alert.wind.title": "High Wind / Gust Warning",
    "advisory.alert.wind.desc": "Estimated wind gusts up to {0} ({1} kt).",
    "advisory.alert.rain.title": "Heavy / Torrential Rainfall Warning",
    "advisory.alert.rain.desc": "Forecast daily rainfall of {0} mm.",
    "advisory.alert.storm.title": "Thunderstorm / Hail Warning",
    "advisory.alert.storm.desc": "Unstable atmospheric conditions with thunderstorm and possible hail.",
    "advisory.alert.heat.title": "Extreme Heat Warning",
    "advisory.alert.heat.desc": "Maximum temperature forecast of {0} {1}.",
    "advisory.alert.frost.title": "Frost & Freeze Warning",
    "advisory.alert.frost.desc": "Minimum temperature forecast of {0} {1}.",
    "advisory.alert.aqi.title": "Degraded Air Quality Warning",
    "advisory.alert.aqi.desc": "Elevated European Air Quality Index (EAQI).",
    "advisory.alerts.none_title": "Favorable Conditions",
    "advisory.alerts.none_desc": "No severe weather thresholds detected for this day.",
    "sun.arc.coords_title": "Geographic coordinates",
    "sun.arc.daylight_title": "Total daylight duration",
    "sun.arc.sunset_in": "Sunset in {0}",
    "sun.arc.sunrise_in": "Sunrise in {0}",
    "sun.arc.night": "Nighttime",
    "sun.arc.daylight_total": "{0} of daylight",
    "stat.uv.peak_sub": "peak {0} at {1}",
    "stat.uv.peak_hour": "peak at {0}",
    "hero.alerts.none": "No active alerts",
  },
};

const WMO_LABELS = {
  pt: {
    0: "Céu limpo", 1: "Maioritariamente limpo", 2: "Parcialmente nublado", 3: "Céu encoberto",
    45: "Nevoeiro", 48: "Nevoeiro gelado", 51: "Chuviscos ligeiros", 53: "Chuviscos", 55: "Chuviscos densos",
    56: "Chuvisco gelado", 57: "Chuvisco gelado denso", 61: "Chuva ligeira", 63: "Chuva moderada", 65: "Chuva forte",
    66: "Chuva gelada", 67: "Chuva gelada forte", 71: "Queda de neve ligeira", 73: "Queda de neve moderada",
    75: "Queda de neve intensa", 77: "Grãos de neve", 80: "Aguaceiros ligeiros", 81: "Aguaceiros",
    82: "Aguaceiros violentos", 85: "Aguaceiros de neve", 86: "Aguaceiros de neve fortes", 95: "Trovoada",
    96: "Trovoada com granizo", 99: "Trovoada com granizo forte",
  },
  en: {
    0: "Clear sky", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Foggy", 48: "Rime fog", 51: "Light drizzle", 53: "Drizzle", 55: "Dense drizzle",
    56: "Freezing drizzle", 57: "Dense freezing drizzle", 61: "Light rain", 63: "Moderate rain", 65: "Heavy rain",
    66: "Freezing rain", 67: "Heavy freezing rain", 71: "Light snowfall", 73: "Moderate snowfall",
    75: "Heavy snowfall", 77: "Snow grains", 80: "Light showers", 81: "Showers",
    82: "Violent showers", 85: "Snow showers", 86: "Heavy snow showers", 95: "Thunderstorm",
    96: "Thunderstorm with hail", 99: "Heavy thunderstorm with hail",
  },
};

let lang = safeStorageGet(LANG_KEY);
if (!I18N[lang]) lang = "pt";
const saveLang = (next) => {
  lang = I18N[next] ? next : "pt";
  safeStorageSet(LANG_KEY, lang);
};
const t = (key, ...rest) => {
  let s = I18N[lang][key];
  if (s == null) s = key;
  const args = rest.length === 1 && Array.isArray(rest[0]) ? rest[0] : rest;
  if (args && args.length) {
    args.forEach((v, i) => {
      s = s.split("{" + i + "}").join(String(v));
    });
  }
  return s;
};
const wmoLabel = (code) => (WMO_LABELS[lang][code] != null ? WMO_LABELS[lang][code] : t("place.unknown"));
const dayNames = () => I18N[lang].days;
const monthNames = () => I18N[lang].months;

function applyStaticTranslations() {
  if (document.documentElement) document.documentElement.lang = lang;
  try { document.title = t("app.title"); } catch (e) {}
  if (!document.querySelectorAll) return;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.getAttribute("data-i18n-html"));
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    if (el.placeholder != null) el.placeholder = t(el.getAttribute("data-i18n-ph"));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    if (el.title != null) el.title = t(el.getAttribute("data-i18n-title"));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
  });
  document.querySelectorAll(".lang__btn").forEach((b) => {
    b.classList.toggle("active", b.getAttribute("data-lang") === lang);
  });
}

function setLang(next) {
  if (next === lang) return;
  saveLang(next);
  applyStaticTranslations();
  updateCompassLabels();
  updatePvCompass();
  if (weatherData) renderDay(selectedDay);
}

let suggestionIndex = -1;
let suggestionsData = [];
let toastTimer = null;

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 3500);
}

function wmoInfo(code, isDay = true) {
  const w = WMO[code];
  return { label: w ? wmoLabel(code) : t("place.unknown"), icon: (w || { icon: "cloudy" }).icon };
}

function iconShell(name) {
  return ICONS[name] || ICONS.cloudy;
}

function formatTime(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return "—";
  return d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
}

function formatClock(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return "—";
  return d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
}

async function searchCities(query) {
  if (!query.trim()) {
    suggestionsData = [];
    closeSuggestions();
    return;
  }
  try {
    const data = await fetchJSON(
      `${GEO_API}?name=${encodeURIComponent(query)}&count=7&language=${lang === "pt" ? "pt" : "en"}&format=json`
    );
    suggestionsData = (data.results || []).filter(
      (r) => r && r.latitude != null && r.longitude != null
    );
    renderSuggestions();
  } catch {
    suggestionsData = [];
    closeSuggestions();
  }
}

function renderSuggestions() {
  els.suggestions.innerHTML = "";
  if (suggestionsData.length === 0) {
    const div = document.createElement("div");
    div.className = "suggestion__empty";
    div.textContent = t("suggest.empty");
    els.suggestions.appendChild(div);
    els.suggestions.classList.add("open");
    return;
  }
  suggestionsData.forEach((place, i) => {
    const div = document.createElement("div");
    div.className = "suggestion";
    if (i === suggestionIndex) div.classList.add("active");
    const name = document.createElement("span");
    name.className = "suggestion__name";
    name.textContent = place.name;
    const meta = document.createElement("span");
    meta.className = "suggestion__meta";
    const parts = [place.country, place.admin1].filter(Boolean);
    meta.textContent = parts.join(" · ");
    div.appendChild(name);
    div.appendChild(meta);
    div.addEventListener("mousedown", () => selectPlace(place));
    div.addEventListener("mouseenter", () => {
      suggestionIndex = i;
      highlightSuggestions();
    });
    els.suggestions.appendChild(div);
  });
  els.suggestions.classList.add("open");
}

function highlightSuggestions() {
  Array.from(els.suggestions.children).forEach((c, i) => {
    c.classList.toggle("active", i === suggestionIndex);
  });
}

function closeSuggestions() {
  els.suggestions.classList.remove("open");
  suggestionIndex = -1;
}

function selectPlace(place) {
  closeSuggestions();
  els.searchInput.blur();
  localStorage.setItem(
    "skycast:region",
    JSON.stringify({
      lat: place.latitude,
      lon: place.longitude,
      name: place.name,
      region: place.country || "",
    })
  );
  loadWeather(place.latitude, place.longitude, place.name, place.country || "");
}

function cacheKey(lat, lon) {
  return `${Number(lat).toFixed(4)}_${Number(lon).toFixed(4)}`;
}

function readWeatherCache(key) {
  try {
    const raw = safeStorageGet(WEATHER_CACHE_KEY);
    if (!raw) return null;
    const store = JSON.parse(raw);
    const entry = store[key];
    if (!entry || Date.now() - entry.ts > CACHE_TTL_MS) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function writeWeatherCache(key, data) {
  try {
    const raw = localStorage.getItem(WEATHER_CACHE_KEY);
    const store = raw ? JSON.parse(raw) : {};
    store[key] = { ts: Date.now(), data };
    safeStorageSet(WEATHER_CACHE_KEY, JSON.stringify(store));
  } catch {}
}

function getRecents() {
  try {
    const raw = safeStorageGet(RECENTS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.slice(0, 6) : [];
  } catch {
    return [];
  }
}

function saveRecents(list) {
  try {
    safeStorageSet(RECENTS_KEY, JSON.stringify(list.slice(0, 6)));
  } catch {}
}

function addRecent(place) {
  const lat = Number(place.lat);
  const lon = Number(place.lon);
  const list = getRecents().filter((p) => p && !(Number(p.lat) === lat && Number(p.lon) === lon));
  list.unshift({ lat, lon, name: place.name || t("place.fallback"), region: place.region || "" });
  saveRecents(list);
  renderRecents();
  initPvCompass();
}

function renderRecents() {
  const list = getRecents();
  els.recentsBar.hidden = list.length === 0;
  els.recentsList.innerHTML = "";
  list.forEach((p) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "recent-chip";
    chip.textContent = p.name;
    if (
      weatherData &&
      Math.abs(weatherData.latitude - Number(p.lat)) < 0.01 &&
      Math.abs(weatherData.longitude - Number(p.lon)) < 0.01
    ) {
      chip.classList.add("recent-chip--active");
    }
    chip.addEventListener("click", () => loadWeather(Number(p.lat), Number(p.lon), p.name, p.region || ""));
    els.recentsList.appendChild(chip);
  });
}

function aqiBand(v) {
  if (v <= 20) return t("aqi.good");
  if (v <= 40) return t("aqi.fair");
  if (v <= 60) return t("aqi.moderate");
  if (v <= 80) return t("aqi.poor");
  return t("aqi.veryPoor");
}

async function loadAqi(lat, lon) {
  try {
    const data = await fetchJSON(
      `${AQI_API}?latitude=${Number(lat).toFixed(4)}&longitude=${Number(lon).toFixed(4)}&current=european_aqi&timezone=auto`
    );
    const v = data.current && data.current.european_aqi;
    if (v == null) {
      els.statAqiBox.hidden = true;
      return;
    }
    els.statAqiBox.hidden = false;
    els.statAqi.textContent = `${Math.round(v)} · ${aqiBand(v)}`;
  } catch {
    els.statAqiBox.hidden = true;
  }
}

async function loadWeather(lat, lon, name, region) {
  els.loader.classList.add("visible");
  els.hero.hidden = true;
  els.forecastPanel.hidden = true;
  els.tempPanel.hidden = true;
  els.solarPanel.hidden = true;
  if (els.advisoryPanel) els.advisoryPanel.hidden = true;
  els.pvPanel.hidden = true;
  els.dailyPanel.hidden = true;

  const params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lon.toFixed(4),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,uv_index",
    hourly:
      "temperature_2m,weather_code,precipitation_probability,shortwave_radiation,precipitation,relative_humidity_2m,wind_speed_10m,uv_index,direct_normal_irradiance,diffuse_radiation",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max",
    timezone: "auto",
    forecast_days: "7",
  });

  try {
    const key = cacheKey(lat, lon);
    const cached = readWeatherCache(key);
    if (cached) {
      renderWeather(cached, name, region);
    } else {
      const data = await fetchJSON(`${METEO_API}?${params.toString()}`);
      writeWeatherCache(key, data);
      renderWeather(data, name, region);
    }
    addRecent({ lat, lon, name: name || t("place.fallback"), region: region || "" });
    loadAqi(lat, lon);
  } catch {
    showToast(t("toast.fetch"));
    els.loader.classList.remove("visible");
  }
}

function degToCompass(deg) {
  const dirs = I18N[lang].dirs;
  return dirs[Math.round(deg / 45) % 8];
}

function renderWeather(data, name, region) {
  if (!data.current) throw new Error("Dados em falta");
  weatherData = data;
  placeName = name || t("place.fallback");
  selectedDay = 0;

  renderDay(0);

  els.loader.classList.remove("visible");
  els.hero.hidden = false;
  els.forecastPanel.hidden = false;
  els.tempPanel.hidden = false;
  els.solarPanel.hidden = false;
  if (els.advisoryPanel) els.advisoryPanel.hidden = false;
  els.pvPanel.hidden = false;
  els.dailyPanel.hidden = false;
  els.hero.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderDay(day) {
  if (!weatherData) return;
  if (day === 0) {
    renderHeroCurrent(weatherData, placeName);
  } else {
    renderHeroDay(weatherData, day, placeName);
  }
  renderHourly(weatherData, day);
  renderCharts(weatherData, day);
  renderTempChart(weatherData, day);
  renderAdvisory(weatherData, day);
  renderPv(weatherData, day);
  renderDaily(weatherData, day);
  updateDayNav();
}

function selectDay(day) {
  if (!weatherData || day === selectedDay) return;
  selectedDay = day;
  renderDay(day);
  els.forecastPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function navDay(step) {
  if (!weatherData) return;
  const next = selectedDay + step;
  if (next < 0 || next >= weatherData.daily.time.length) return;
  selectedDay = next;
  renderDay(next);
}

function updateDayNav() {
  const len = weatherData ? weatherData.daily.time.length : 0;
  els.dayNavLabel.textContent = weatherData ? dayLabel(selectedDay) : "";
  els.dayPrevBtn.disabled = !weatherData || selectedDay <= 0;
  els.dayNextBtn.disabled = !weatherData || selectedDay >= len - 1;
}

function coordsLabel(data) {
  const lat = data.latitude;
  const lon = data.longitude;
  const latHemi = lat >= 0 ? "N" : "S";
  const lonHemi = lon >= 0 ? "E" : (lang === "pt" ? "O" : "W");
  return `${Math.abs(lat).toFixed(2)}° ${latHemi} · ${Math.abs(lon).toFixed(2)}° ${lonHemi}`;
}

function fmtDec(v) {
  return Number(v)
    .toFixed(2)
    .replace(/\.?0+$/, "");
}

function tempDisplay(c) {
  return unitCelsius ? Math.round(c) : Math.round((c * 9) / 5 + 32);
}

function applyUnitButtons() {
  document.querySelectorAll(".unit__btn:not(.wind__btn)").forEach((b) => {
    b.classList.toggle("active", b.getAttribute("data-unit") === (unitCelsius ? "c" : "f"));
  });
}

function setUnit(next) {
  const isC = next === "c";
  unitCelsius = isC;
  safeStorageSet(UNIT_KEY, isC ? "c" : "f");
  applyUnitButtons();
  unitWind = safeStorageGet(WIND_UNIT_KEY) === "mph" ? "mph" : "kmh";
  applyWindUnitButtons();
  pvViewMode = safeStorageGet(PV_VIEW_KEY) || "both";
  applyPvViewButtons();
  if (weatherData) renderDay(selectedDay);
}

function windDisplay(kmh) {
  if (kmh == null || isNaN(kmh)) return "--";
  if (unitWind === "mph") {
    return `${Math.round(kmh * 0.621371)} mph`;
  }
  return `${Math.round(kmh)} km/h`;
}

function applyPvViewButtons() {
  document.querySelectorAll(".pv-view-btn").forEach((b) => {
    b.classList.toggle("active", b.getAttribute("data-mode") === pvViewMode);
  });
}

function setPvViewMode(next) {
  pvViewMode = next || "both";
  safeStorageSet(PV_VIEW_KEY, pvViewMode);
  applyPvViewButtons();
  if (weatherData) renderPv(weatherData, selectedDay);
}

function applyWindUnitButtons() {
  document.querySelectorAll(".wind__btn").forEach((b) => {
    b.classList.toggle("active", b.getAttribute("data-wind") === unitWind);
  });
}

function setWindUnit(next) {
  unitWind = next === "mph" ? "mph" : "kmh";
  safeStorageSet(WIND_UNIT_KEY, unitWind);
  applyWindUnitButtons();
  if (weatherData) renderDay(selectedDay);
}

function toggleWindUnit() {
  setWindUnit(unitWind === "kmh" ? "mph" : "kmh");
}

function applyTheme() {
  let theme = safeStorageGet(THEME_KEY);
  if (!theme) {
    theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#eef2f9" : "#0b1020");
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  const next = current === "light" ? "dark" : "light";
  safeStorageSet(THEME_KEY, next);
  applyTheme();
}

function dayLabel(day) {
  if (!weatherData) return "";
  const date = new Date(weatherData.daily.time[day] + "T12:00:00Z");
  const dm = dayNames();
  const mm = monthNames();
  const dateSpan = `${date.getUTCDate()} ${mm[date.getUTCMonth()]}`;
  if (day === 0) return `${t("day.today")} · ${dateSpan}`;
  return `${dm[date.getUTCDay()]} · ${dateSpan}`;
}

function renderHeroCurrent(data, name) {
  const c = data.current;
  const info = wmoInfo(c.weather_code, c.is_day);
  els.regionName.textContent = name;
  els.regionNow.textContent = formatClock(c.time);
  els.heroTemp.textContent = `${tempDisplay(c.temperature_2m)}°`;
  els.heroIcon.innerHTML = iconShell(info.icon);
  els.heroDesc.textContent = info.label;
  els.heroFeels.textContent = t("hero.feels", [tempDisplay(c.apparent_temperature)]);

  const max = data.daily.temperature_2m_max[0];
  const min = data.daily.temperature_2m_min[0];
  els.statMaxMin.textContent = `${tempDisplay(max)}° / ${tempDisplay(min)}°`;
  els.statHumidity.textContent = `${Math.round(c.relative_humidity_2m)}%`;
  els.statWind.textContent = `${windDisplay(c.wind_speed_10m)} ${degToCompass(c.wind_direction_10m)}`;
  // UV Index with peak
  const dailyUvs0 = data.hourly && data.hourly.uv_index ? data.hourly.uv_index.slice(0, 24) : [];
  let peakUv0 = 0;
  let peakHour0 = "12:00";
  if (dailyUvs0.length > 0) {
    peakUv0 = Math.max(...dailyUvs0);
    const maxIdx0 = dailyUvs0.indexOf(peakUv0);
    peakHour0 = formatClock(data.hourly.time[maxIdx0]);
  }
  const uvVal0 = c.uv_index != null ? c.uv_index : 0;
  const tierClass0 = getUvTierClass(uvVal0);
  els.statUv.innerHTML = `<span class="${tierClass0}">${uvVal0.toFixed(1)} &middot; ${uvTierName(uvVal0)}</span>`;
  if (els.statUvPeak) {
    els.statUvPeak.textContent = t("stat.uv.peak_sub", [peakUv0.toFixed(1), peakHour0]);
  }

  els.sunrise.textContent = formatTime(data.daily.sunrise[0]);
  els.sunset.textContent = formatTime(data.daily.sunset[0]);
  els.heroCoords.textContent = coordsLabel(data);
  renderSunArc(data, 0);
}

function renderHeroDay(data, day, name) {
  const idx = day * 24 + 13;
  const code = data.hourly.weather_code[idx];
  const info = wmoInfo(code);
  els.regionName.textContent = name;
  els.regionNow.textContent = dayLabel(day);
  els.heroTemp.textContent = `${tempDisplay(data.hourly.temperature_2m[idx])}°`;
  els.heroIcon.innerHTML = iconShell(info.icon);
  els.heroDesc.textContent = info.label;
  els.heroFeels.textContent = t("hero.forecast");

  const max = data.daily.temperature_2m_max[day];
  const min = data.daily.temperature_2m_min[day];
  els.statMaxMin.textContent = `${tempDisplay(max)}° / ${tempDisplay(min)}°`;
  els.statHumidity.textContent = `${Math.round(data.hourly.relative_humidity_2m[idx])}%`;
  els.statWind.textContent = windDisplay(data.hourly.wind_speed_10m[idx]);
  // UV Index for selected day
  const dailyUvsDay = data.hourly && data.hourly.uv_index ? data.hourly.uv_index.slice(day * 24, (day + 1) * 24) : [];
  let peakUvDay = 0;
  let peakHourDay = "12:00";
  if (dailyUvsDay.length > 0) {
    peakUvDay = Math.max(...dailyUvsDay);
    const maxIdxDay = dailyUvsDay.indexOf(peakUvDay);
    peakHourDay = formatClock(data.hourly.time[day * 24 + maxIdxDay]);
  }
  const tierClassDay = getUvTierClass(peakUvDay);
  els.statUv.innerHTML = `<span class="${tierClassDay}">${peakUvDay.toFixed(1)} &middot; ${uvTierName(peakUvDay)}</span>`;
  if (els.statUvPeak) {
    els.statUvPeak.textContent = t("stat.uv.peak_hour", [peakHourDay]);
  }

  els.sunrise.textContent = formatTime(data.daily.sunrise[day]);
  els.sunset.textContent = formatTime(data.daily.sunset[day]);
  els.heroCoords.textContent = coordsLabel(data);
  renderSunArc(data, day);
}



function getUvTierClass(uv) {
  if (uv < 3) return "stat__value--low";
  if (uv < 6) return "stat__value--mod";
  if (uv < 8) return "stat__value--high";
  if (uv < 11) return "stat__value--veryhigh";
  return "stat__value--extreme";
}

function uvTierName(uv) {
  if (uv < 3) return t("advisory.uv.level.low");
  if (uv < 6) return t("advisory.uv.level.mod");
  if (uv < 8) return t("advisory.uv.level.high");
  if (uv < 11) return t("advisory.uv.level.veryhigh");
  return t("advisory.uv.level.extreme");
}

function renderSunArc(data, day = 0) {
  if (!els.sunArcSvg || !data.daily || !data.daily.sunrise) return;

  const sunriseStr = data.daily.sunrise[day];
  const sunsetStr = data.daily.sunset[day];
  if (!sunriseStr || !sunsetStr) return;

  const sunriseDate = new Date(sunriseStr);
  const sunsetDate = new Date(sunsetStr);
  const daylightMs = Math.max(0, sunsetDate.getTime() - sunriseDate.getTime());
  const daylightHours = Math.floor(daylightMs / (1000 * 60 * 60));
  const daylightMins = Math.round((daylightMs % (1000 * 60 * 60)) / (1000 * 60));
  const daylightFormatted = `${daylightHours}h ${daylightMins}m`;

  if (els.heroDaylightVal) {
    els.heroDaylightVal.textContent = daylightFormatted;
  }

  // Solar Noon time (midpoint between sunrise and sunset)
  const solarNoonMs = sunriseDate.getTime() + daylightMs / 2;
  const solarNoonDate = new Date(solarNoonMs);
  if (els.sunArcNoonTime) {
    els.sunArcNoonTime.textContent = formatTime(solarNoonDate);
  }

  // Determine current position
  const now = day === 0 ? new Date() : null;
  let isDaytime = true;
  let progress = 0.5; // default noon for future days
  let statusText = t("sun.arc.daylight_total", [daylightFormatted]);

  if (now && day === 0) {
    const nowMs = now.getTime();
    const srMs = sunriseDate.getTime();
    const ssMs = sunsetDate.getTime();

    if (nowMs >= srMs && nowMs <= ssMs) {
      isDaytime = true;
      progress = Math.max(0, Math.min(1, (nowMs - srMs) / (ssMs - srMs)));
      const msToSunset = Math.max(0, ssMs - nowMs);
      const hToSunset = Math.floor(msToSunset / (1000 * 60 * 60));
      const mToSunset = Math.round((msToSunset % (1000 * 60 * 60)) / (1000 * 60));
      const timeRemaining = hToSunset > 0 ? `${hToSunset}h ${mToSunset}m` : `${mToSunset}m`;
      statusText = `${t("sun.arc.sunset_in", [timeRemaining])} · ${Math.round(progress * 100)}%`;
    } else {
      isDaytime = false;
      let nextSunriseDate;
      if (nowMs < srMs) {
        nextSunriseDate = sunriseDate;
      } else {
        nextSunriseDate = data.daily.sunrise[1] ? new Date(data.daily.sunrise[1]) : new Date(srMs + 24 * 3600 * 1000);
      }
      const msToSunrise = Math.max(0, nextSunriseDate.getTime() - nowMs);
      const hToSunrise = Math.floor(msToSunrise / (1000 * 60 * 60));
      const mToSunrise = Math.round((msToSunrise % (1000 * 60 * 60)) / (1000 * 60));
      const timeRemaining = hToSunrise > 0 ? `${hToSunrise}h ${mToSunrise}m` : `${mToSunrise}m`;
      statusText = `${t("sun.arc.night")} · ${t("sun.arc.sunrise_in", [timeRemaining])}`;
      progress = nowMs > ssMs ? 1 : 0;
    }
  }

  if (els.sunArcStatusText) {
    els.sunArcStatusText.textContent = statusText;
  }

  // Update SVG Arc stroke and Sun/Moon Body position
  // Parametric ellipse: a = 125, b = 85, center (150, 105)
  if (isDaytime) {
    const tAngle = progress * Math.PI;
    const x = 150 - 125 * Math.cos(tAngle);
    const y = 105 - 85 * Math.sin(tAngle);

    if (els.sunArcBody) {
      els.sunArcBody.setAttribute("transform", `translate(${x.toFixed(1)}, ${y.toFixed(1)})`);
      els.sunArcBody.classList.remove("is-night");
      els.sunArcBody.classList.add("is-day");
    }

    if (els.sunArcActive) {
      const totalLen = els.sunArcActive.getTotalLength ? els.sunArcActive.getTotalLength() : 333;
      els.sunArcActive.style.strokeDasharray = `${totalLen} ${totalLen}`;
      els.sunArcActive.style.strokeDashoffset = `${totalLen * (1 - progress)}`;
      els.sunArcActive.style.opacity = "1";
    }
  } else {
    // Night position on lower night arc
    const x = 150;
    const y = 135;
    if (els.sunArcBody) {
      els.sunArcBody.setAttribute("transform", `translate(${x}, ${y})`);
      els.sunArcBody.classList.add("is-night");
      els.sunArcBody.classList.remove("is-day");
    }
    if (els.sunArcActive) {
      els.sunArcActive.style.opacity = "0";
    }
  }
}

function renderHourly(data, day) {
  const start = day * 24;
  const now = data.current.time;
  els.hourlySpan.textContent = day === 0 ? t("hourly.sub") : dayLabel(day);
  els.hourlyList.innerHTML = "";

  for (let i = 0; i < 24; i++) {
    const idx = start + i;
    const time = data.hourly.time[idx];
    const code = data.hourly.weather_code[idx];
    const precip = data.hourly.precipitation_probability?.[idx];
    const info = wmoInfo(code);
    const isNow = day === 0 && time === now;

    const div = document.createElement("div");
    div.className = "hour" + (isNow ? " hour--now" : "");

    const d = new Date(time);
    const tLabel = d.toLocaleTimeString(I18N[lang].locale, { hour: "2-digit", minute: "2-digit" });

    div.innerHTML = `
      <span class="hour__time">${isNow ? t("hourly.now") : tLabel}</span>
      <span class="hour__icon">${iconShell(info.icon)}</span>
      <span class="hour__temp">${tempDisplay(data.hourly.temperature_2m[idx])}°</span>
      ${precip != null
        ? `<span class="hour__precip">${precipIcon()}${precip}%</span>`
        : ""}
    `;
    els.hourlyList.appendChild(div);
  }
}

function uvLevel(uv) {
  if (uv < 3) return `${uv.toFixed(1)} · ${t("uv.low")}`;
  if (uv < 6) return `${uv.toFixed(1)} · ${t("uv.moderate")}`;
  if (uv < 8) return `${uv.toFixed(1)} · ${t("uv.high")}`;
  if (uv < 11) return `${uv.toFixed(1)} · ${t("uv.veryhigh")}`;
  return `${uv.toFixed(1)} · ${t("uv.extreme")}`;
}

function precipIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="width:11px;height:11px"><path d="M12 3s6 6 6 10a6 6 0 0 1-12 0c0-4 6-10 6-10z"/></svg>`;
}

function renderDaily(data, day) {
  els.dailyList.innerHTML = "";
  const days = data.daily.time;

  days.forEach((daily, i) => {
    const info = wmoInfo(data.daily.weather_code[i]);
    const date = new Date(daily + "T12:00:00Z");
    const isToday = i === 0;
    const dm = dayNames();
    const mm = monthNames();
    const today = t("day.today");
    const dayName = isToday ? today : dm[date.getUTCDay()];
    const dateSpan = `${date.getUTCDate()} ${mm[date.getUTCMonth()]}`;

    const div = document.createElement("div");
    div.className = "day" + (i === day ? " day--active" : "");
    div.setAttribute("role", "button");
    div.setAttribute("tabindex", "0");
    div.setAttribute("aria-label", `${dayName}, ${dateSpan}`);

    div.innerHTML = `
      <span class="day__name">${escapeHtml(dayName)}<small>${dateSpan}</small></span>
      <span class="day__icon">${iconShell(info.icon)}</span>
      <span class="day__desc">${info.label}</span>
      <span class="day__min">${tempDisplay(data.daily.temperature_2m_min[i])}°</span>
      <span class="day__max">${tempDisplay(data.daily.temperature_2m_max[i])}°</span>
    `;

    div.addEventListener("click", () => selectDay(i));
    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectDay(i);
      }
    });

    els.dailyList.appendChild(div);
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderCharts(data, day) {
  const start = day * 24;
  const times = data.hourly.time.slice(start, start + 24);
  const solar = (data.hourly.shortwave_radiation || []).slice(start, start + 24);
  const rain = (data.hourly.precipitation || []).slice(start, start + 24);

  els.solarAxis.innerHTML = axisLabels(times, 600, 6);
  els.rainAxis.innerHTML = axisLabels(times);
  els.solarSpan.textContent = dayLabel(day);

  const peak = solar.length ? Math.max.apply(null, solar) : 0;
  els.solarPeak.textContent = `${Math.round(peak)} W/m²`;

  const totalRain = rain.reduce((a, b) => a + b, 0);
  els.rainTotal.textContent = `${totalRain.toFixed(1)} mm`;

  els.solarChart.innerHTML = buildSolarChart(solar, times);
  els.rainChart.innerHTML = buildRainChart(rain, totalRain);

  els.solarPanel.hidden = false;
}

function axisLabels(times, w = 600, pad = 6) {
  const inner = w - pad * 2;
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    .map((i) => {
      const gx = pad + (i / 12) * inner;
      const label = i === 12 ? "" : formatHourLabel(times[i * 2]);
      return `<span style="left:${((gx / w) * 100).toFixed(3)}%">${label}</span>`;
    })
    .join("");
}

function formatHourLabel(time) {
  if (!time) return "--h";
  const d = new Date(time);
  return `${String(d.getHours()).padStart(2, "0")}h`;
}

function buildSolarChart(solar, times) {
  const W = 600;
  const H = 150;
  const pad = 6;
  const n = solar.length;
  const maxV = Math.max.apply(null, solar.concat([100]));
  const plotH = H - 12;
  const stepX = (W - pad * 2) / n;
  const x = (i) => pad + i * stepX;
  const y = (v) => H - 6 - (Math.max(v, 0) / maxV) * plotH;

  let line = "";
  let area = `M ${pad} ${H - 6} `;
  solar.forEach((v, i) => {
    const px = x(i).toFixed(1);
    const py = y(v).toFixed(1);
    line += `${i ? "L" : "M"} ${px} ${py} `;
    area += `L ${px} ${py} `;
  });
  const endX = (W - pad).toFixed(1);
  area += `L ${endX} ${H - 6} Z`;

  let peak = "";
  const peakIdx = solar.indexOf(Math.max.apply(null, solar));
  if (solar[peakIdx] > 0) {
    const px = x(peakIdx);
    const py = y(solar[peakIdx]);
    peak = `
      <circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="10" fill="#fbbf24" opacity="0.25"/>
      <circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4.5" fill="#fbbf24" stroke="#0b1020" stroke-width="1.5"/>
    `;
  }

  let guides = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    .map((i) => {
      const gx = pad + (i / 12) * (W - pad * 2);
      return `<line x1="${gx.toFixed(1)}" y1="6" x2="${gx.toFixed(1)}" y2="${H - 6}" stroke="#e2e8f0" stroke-opacity="0.05"/>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${t("solar.aria")}">
      <defs>
        <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#fbbf24" stop-opacity="0.02"/>
        </linearGradient>
      </defs>
      ${guides}
      <path d="${area}" fill="url(#solarGrad)"/>
      <path d="${line}" fill="none" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${peak}
    </svg>
  `;
}

function buildRainChart(rain, totalRain) {
  const W = 600;
  const H = 150;
  const pad = 6;
  const n = rain.length || 1;
  const maxV = Math.max.apply(null, rain.concat([1]));
  const stepX = (W - pad * 2) / n;
  const bw = Math.min(Math.max(stepX * 0.6, 6), 18);
  const plotH = H - 14;

  let bars = "";
  rain.forEach((v, i) => {
    const h = v > 0 ? Math.max((v / maxV) * plotH, 3) : 0;
    const cx = pad + stepX * i + stepX / 2;
    bars += `
      <rect x="${(cx - bw / 2).toFixed(1)}" y="${(H - 6 - h).toFixed(1)}"
            width="${bw.toFixed(1)}" height="${h.toFixed(1)}"
            rx="${Math.min(3, bw / 2).toFixed(1)}" fill="url(#rainGrad)"/>
    `;
  });

  const none = totalRain <= 0
    ? `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
           fill="#6b7599" font-size="14">${t("rain.none")}</text>`
    : "";

  let guides = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    .map((i) => {
      const gx = pad + (i / 12) * (W - pad * 2);
      return `<line x1="${gx.toFixed(1)}" y1="6" x2="${gx.toFixed(1)}" y2="${H - 6}" stroke="#e2e8f0" stroke-opacity="0.05"/>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${t("rain.aria")}">
      <defs>
        <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.45"/>
        </linearGradient>
      </defs>
      ${guides}
      <line x1="${pad}" y1="${H - 6}" x2="${W - pad}" y2="${H - 6}"
            stroke="#3b4a72" stroke-width="1.5" stroke-dasharray="4 4"/>
      ${bars}
      ${none}
    </svg>
  `;
}

function renderTempChart(data, day) {
  const start = day * 24;
  const times = data.hourly.time.slice(start, start + 24);
  const temps = data.hourly.temperature_2m.slice(start, start + 24);

  els.tempAxis.innerHTML = axisLabels(times, 600, 16);
  els.tempSpan.textContent = dayLabel(day);
  els.tempRange.textContent = t("temp.range", [tempDisplay(data.daily.temperature_2m_max[day]), tempDisplay(data.daily.temperature_2m_min[day])]);
  els.tempChart.innerHTML = buildTempChart(temps);
}

function buildTempChart(temps) {
  const W = 600;
  const H = 170;
  const padX = 16;
  const topPad = 34;
  const bottomY = H - 12;
  const plotH = bottomY - topPad;
  const n = temps.length;
  const maxV = Math.max.apply(null, temps);
  const minV = Math.min.apply(null, temps);
  const span = maxV - minV || 1;
  const stepX = (W - padX * 2) / n;
  const x = (i) => padX + i * stepX;
  const y = (v) => bottomY - ((v - minV) / span) * plotH;

  let line = "";
  let area = `M ${padX} ${bottomY} `;
  temps.forEach((v, i) => {
    const px = x(i).toFixed(1);
    const py = y(v).toFixed(1);
    line += `${i ? "L" : "M"} ${px} ${py} `;
    area += `L ${px} ${py} `;
  });
  const endX = (W - padX).toFixed(1);
  area += `L ${endX} ${bottomY} Z`;

  const marker = (i, v, kind) => {
    const px = x(i);
    const py = y(v);
    const color = kind === "high" ? "#fbbf24" : "#7dd3fc";
    const labelY = Math.max(py - 16, 11);
    const anchor = px <= 34 ? "start" : px >= W - 34 ? "end" : "middle";
    const tx = anchor === "middle" ? px : anchor === "start" ? Math.max(px, 8) : Math.min(px, W - 8);
    return `
      <circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="9" fill="${color}" opacity="0.22"/>
      <circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3.8" fill="${color}" stroke="#0b1020" stroke-width="1.4"/>
      <text x="${tx.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="${anchor}" fill="${color}" font-size="13" font-weight="700">${tempDisplay(v)}°</text>
    `;
  };

  const maxIdx = temps.indexOf(maxV);
  const minIdx = temps.indexOf(minV);
  let markers = marker(maxIdx, maxV, "high");
  if (minIdx !== maxIdx) markers += marker(minIdx, minV, "low");

  let guides = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    .map((i) => {
      const gx = padX + (i / 12) * (W - padX * 2);
      return `<line x1="${gx.toFixed(1)}" y1="2" x2="${gx.toFixed(1)}" y2="${bottomY}" stroke="#e2e8f0" stroke-opacity="0.05"/>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${t("temp.aria")}">
      <defs>
        <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#60a5fa" stop-opacity="0.02"/>
        </linearGradient>
      </defs>
      ${guides}
      <path d="${area}" fill="url(#tempGrad)"/>
      <path d="${line}" fill="none" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${markers}
    </svg>
  `;
}

function compassName(az) {
  const names = I18N[lang].dirs;
  const norm = ((Math.round(az) % 360) + 360) % 360;
  return names[Math.round(norm / 45) % 8];
}

function pvDefaults(lat) {
  const tilt = Math.min(60, Math.max(5, Math.round(Math.abs(lat))));
  return {
    eff: 80,
    tariffType: "simple",
    tariffCycle: "daily",
    tariff: 0.15,
    tariffPeak: 0.19,
    tariffOffPeak: 0.11,
    thermal: "fixed",
    batteryCap: 0,
    battMinSoc: 20,
    dailyKwh: 10,
    exportPrice: 0.05,
    groups: [
      { kwp: 5, tilt, az: lat >= 0 ? 180 : 0 },
      { kwp: 0, tilt: 0, az: 0 },
      { kwp: 0, tilt: 0, az: 0 },
      { kwp: 0, tilt: 0, az: 0 },
    ],
  };
}

function loadPvSettings(lat) {
  const def = pvDefaults(lat);
  const saved = safeStorageGet(PV_KEY);
  if (!saved) return def;
  try {
    const s = JSON.parse(saved);
    let groups;
    if (Array.isArray(s.groups)) {
      groups = s.groups.slice(0, 4).map((g) => ({
        kwp: Math.max(0, Number(g.kwp) || 0),
        tilt: Math.max(0, Number(g.tilt) || 0),
        az: Math.max(0, Number(g.az) || 0),
      }));
    } else {
      groups = [
        {
          kwp: Math.max(0, Number(s.kp) || def.groups[0].kwp),
          tilt: Number(s.tilt) != null ? Number(s.tilt) : def.groups[0].tilt,
          az: Number(s.az) != null ? Number(s.az) : def.groups[0].az,
        },
        { kwp: 0, tilt: 0, az: 0 },
        { kwp: 0, tilt: 0, az: 0 },
        { kwp: 0, tilt: 0, az: 0 },
      ];
    }
    while (groups.length < 4) groups.push({ kwp: 0, tilt: 0, az: 0 });
    if (!groups.some((g) => g.kwp > 0)) {
      groups[0] = { ...def.groups[0] };
    }
    return {
      eff: Number(s.eff) || def.eff,
      tariffType: s.tariffType === "bi-hourly" ? "bi-hourly" : "simple",
      tariffCycle: s.tariffCycle === "weekly" ? "weekly" : "daily",
      tariff: s.tariff != null ? Number(s.tariff) : def.tariff,
      tariffPeak: s.tariffPeak != null ? Number(s.tariffPeak) : (s.tariff != null ? Number(s.tariff) : def.tariffPeak),
      tariffOffPeak: s.tariffOffPeak != null ? Number(s.tariffOffPeak) : def.tariffOffPeak,
      thermal: s.thermal === "temp" ? "temp" : "fixed",
      batteryCap: Math.max(0, Number(s.batteryCap) || 0),
      battMinSoc: s.battMinSoc != null ? Math.min(100, Math.max(0, Number(s.battMinSoc))) : def.battMinSoc,
      dailyKwh: Math.max(0, s.dailyKwh != null ? Number(s.dailyKwh) : (s.baseLoad != null ? (Number(s.baseLoad) * 24) / 1000 : def.dailyKwh)),
      exportPrice: Math.max(0, s.exportPrice != null ? Number(s.exportPrice) : def.exportPrice),
      groups,
    };
  } catch {
    return def;
  }
}

function savePvSettings(s) {
  safeStorageSet(PV_KEY, JSON.stringify(s));
}

function pvConfigPreview() {
  const s = loadPvSettings(weatherData ? weatherData.latitude : 0);
  const active = s.groups.filter((g) => g.kwp > 0);
  const total = active.reduce((a, g) => a + g.kwp, 0);
  const names = active.map((g) => `${fmtDec(g.kwp)} kWp · ${compassName(g.az)} ${g.az}° · ${g.tilt}°`).join(" + ");
  const thermal = s.thermal === "temp" ? t("pv.thermal.saved.real") : t("pv.thermal.saved.fixed");
  const battInfo = s.batteryCap > 0 ? ` · ${fmtDec(s.batteryCap)} kWh bat (${s.battMinSoc != null ? s.battMinSoc : 20}% res)` : "";
  const tariffStr = s.tariffType === "bi-hourly"
    ? `${fmtTariff(s.tariffPeak)}/${fmtTariff(s.tariffOffPeak)} €/kWh (${s.tariffCycle === "weekly" ? "sem" : "dia"})`
    : `${fmtTariff(s.tariff)} €/kWh`;
  els.pvSummary.textContent =
    `${fmtDec(total)} kWp ${names ? "[" + names + "]" : ""} · ${s.eff}% · ${tariffStr} · ${thermal}${battInfo}`;
  if (els.pvTariffChip) {
    if (s.tariffType === "bi-hourly") {
      const cycleName = s.tariffCycle === "weekly" ? t("pv.cycle.short_weekly") : t("pv.cycle.short_daily");
      els.pvTariffChip.textContent = `${t("pv.tariff.badge_bihourly")} (${fmtTariff(s.tariffPeak)} / ${fmtTariff(s.tariffOffPeak)} € · ${cycleName})`;
    } else {
      els.pvTariffChip.textContent = `${t("pv.tariff.badge_simple")} (${fmtTariff(s.tariff)} €/kWh)`;
    }
  }
}

function fmtTariff(v) {
  return Number(v).toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
}

function updateTariffVisibility(type) {
  const isBi = type === "bi-hourly";
  if (els.pvTariffSimpleBox) els.pvTariffSimpleBox.hidden = isBi;
  if (els.pvCycleBox) els.pvCycleBox.hidden = !isBi;
  if (els.pvTariffPeakBox) els.pvTariffPeakBox.hidden = !isBi;
  if (els.pvTariffOffPeakBox) els.pvTariffOffPeakBox.hidden = !isBi;
}


let activeCompassGroup = 0;
let isDraggingCompass = false;

function getCardinalDirection(deg) {
  deg = ((Math.round(deg) % 360) + 360) % 360;
  const dirs = I18N[lang].dirs;
  const cardinals = [
    t("cardinal.n"),
    t("cardinal.ne"),
    t("cardinal.e"),
    t("cardinal.se"),
    t("cardinal.s"),
    t("cardinal.so"),
    t("cardinal.o"),
    t("cardinal.no"),
  ];
  const idx = Math.round(deg / 45) % 8;
  return {
    abbr: dirs[idx],
    full: cardinals[idx],
  };
}

function updateCompassLabels() {
  const dirs = I18N[lang].dirs;
  if (els.compassLblN) els.compassLblN.textContent = dirs[0];
  if (els.compassLblNE) els.compassLblNE.textContent = dirs[1];
  if (els.compassLblE) els.compassLblE.textContent = dirs[2];
  if (els.compassLblSE) els.compassLblSE.textContent = dirs[3];
  if (els.compassLblS) els.compassLblS.textContent = dirs[4];
  if (els.compassLblSO) els.compassLblSO.textContent = dirs[5];
  if (els.compassLblO) els.compassLblO.textContent = dirs[6];
  if (els.compassLblNO) els.compassLblNO.textContent = dirs[7];

  if (els.chipLblN) els.chipLblN.textContent = dirs[0];
  if (els.chipLblNE) els.chipLblNE.textContent = dirs[1];
  if (els.chipLblE) els.chipLblE.textContent = dirs[2];
  if (els.chipLblSE) els.chipLblSE.textContent = dirs[3];
  if (els.chipLblS) els.chipLblS.textContent = dirs[4];
  if (els.chipLblSO) els.chipLblSO.textContent = dirs[5];
  if (els.chipLblO) els.chipLblO.textContent = dirs[6];
  if (els.chipLblNO) els.chipLblNO.textContent = dirs[7];
}

function updatePvCompass() {
  if (!els.pvCompassCard || !els.pvGroups) return;

  const angles = els.pvGroups.map((g) => {
    const val = parseFloat(g.az ? g.az.value : 0);
    return isNaN(val) ? 0 : ((val % 360) + 360) % 360;
  });

  const kwps = els.pvGroups.map((g) => {
    const val = parseFloat(g.kwp ? g.kwp.value : 0);
    return isNaN(val) ? 0 : val;
  });

  // 1. Update tab indicators
  for (let i = 0; i < 4; i++) {
    const valEl = document.getElementById("pvCompassVal" + i);
    if (valEl) valEl.textContent = `${Math.round(angles[i])}°`;
    const tabEl = document.querySelector(`.pv-compass-tab[data-group="${i}"]`);
    if (tabEl) {
      tabEl.classList.toggle("active", i === activeCompassGroup);
      tabEl.setAttribute("aria-selected", i === activeCompassGroup ? "true" : "false");
    }
  }

  // 2. Active Needle
  const activeAngle = Math.round(angles[activeCompassGroup]);
  const activeColor = PV_PALETTE[activeCompassGroup];

  if (els.pvCompassNeedleGroup) {
    els.pvCompassNeedleGroup.setAttribute("transform", `rotate(${activeAngle}, 120, 120)`);
    const needleLine = els.pvCompassNeedleGroup.querySelector(".pv-compass-needle__line");
    const needleTip = els.pvCompassNeedleGroup.querySelector(".pv-compass-needle__tip");
    if (needleLine) needleLine.setAttribute("stroke", activeColor);
    if (needleTip) needleTip.setAttribute("fill", activeColor);
  }

  // 3. Ghost Needles for other configured orientations
  if (els.pvCompassGhostNeedles) {
    let ghostsHtml = "";
    for (let i = 0; i < 4; i++) {
      if (i !== activeCompassGroup && kwps[i] > 0) {
        const ang = Math.round(angles[i]);
        const col = PV_PALETTE[i];
        ghostsHtml += `
          <g transform="rotate(${ang}, 120, 120)" opacity="0.6">
            <line x1="120" y1="120" x2="120" y2="35" stroke="${col}" stroke-width="2.5" stroke-dasharray="4 3" stroke-linecap="round" />
            <polygon points="120,24 115,35 125,35" fill="${col}" />
          </g>
        `;
      }
    }
    els.pvCompassGhostNeedles.innerHTML = ghostsHtml;
  }

  // 4. Update Readout
  const dirInfo = getCardinalDirection(activeAngle);
  if (els.pvCompassReadoutAngle) {
    els.pvCompassReadoutAngle.textContent = `${activeAngle}°`;
    els.pvCompassReadoutAngle.style.color = activeColor;
  }
  if (els.pvCompassReadoutDir) {
    els.pvCompassReadoutDir.textContent = `${dirInfo.abbr} · ${dirInfo.full}`;
  }
  if (els.pvCompassReadoutOpt) {
    const isOpt = activeAngle >= 150 && activeAngle <= 210;
    els.pvCompassReadoutOpt.classList.toggle("is-optimal", isOpt);
  }

  // 5. Update Preset Buttons active state
  document.querySelectorAll(".pv-compass-chip").forEach((chip) => {
    const chipAz = parseInt(chip.getAttribute("data-az"), 10);
    chip.classList.toggle("active", Math.abs(chipAz - activeAngle) <= 5);
  });
}

function setCompassAngleFromEvent(e) {
  if (!els.pvCompassSvg || !els.pvGroups || !els.pvGroups[activeCompassGroup]) return;
  const rect = els.pvCompassSvg.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  let clientX = e.clientX;
  let clientY = e.clientY;
  if (clientX == null && e.touches && e.touches[0]) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  }
  if (clientX == null || clientY == null) return;

  const dx = clientX - centerX;
  const dy = clientY - centerY;
  let angle = Math.round(Math.atan2(dx, -dy) * (180 / Math.PI));
  if (angle < 0) angle += 360;
  if (angle >= 360) angle = 0;

  const azInput = els.pvGroups[activeCompassGroup].az;
  if (azInput) {
    azInput.value = angle;
    updatePvCompass();
  }
}

function initPvCompass() {
  if (!els.pvCompassCard) return;

  updateCompassLabels();

  // 1. Tabs click
  document.querySelectorAll(".pv-compass-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const g = parseInt(tab.getAttribute("data-group"), 10);
      if (!isNaN(g)) {
        activeCompassGroup = g;
        updatePvCompass();
      }
    });
  });

  // 2. Preset Chips click
  document.querySelectorAll(".pv-compass-chip").forEach((chip) => {
    chip.addEventListener("click", (e) => {
      e.preventDefault();
      const az = parseInt(chip.getAttribute("data-az"), 10);
      if (!isNaN(az) && els.pvGroups[activeCompassGroup] && els.pvGroups[activeCompassGroup].az) {
        els.pvGroups[activeCompassGroup].az.value = az;
        updatePvCompass();
      }
    });
  });

  // 3. Pointer drag on SVG dial
  if (els.pvCompassSvg) {
    const onPointerMove = (e) => {
      if (!isDraggingCompass) return;
      if (e.cancelable) e.preventDefault();
      setCompassAngleFromEvent(e);
    };

    const onPointerUp = () => {
      if (isDraggingCompass) {
        isDraggingCompass = false;
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
      }
    };

    const onPointerDown = (e) => {
      if (e.cancelable) e.preventDefault();
      isDraggingCompass = true;
      setCompassAngleFromEvent(e);
      window.addEventListener("pointermove", onPointerMove, { passive: false });
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
    };

    els.pvCompassSvg.addEventListener("pointerdown", onPointerDown);
  }

  // 4. Connect inputs to compass
  els.pvGroups.forEach((g, idx) => {
    if (g.az) {
      g.az.addEventListener("input", () => {
        activeCompassGroup = idx;
        updatePvCompass();
      });
      g.az.addEventListener("focus", () => {
        activeCompassGroup = idx;
        updatePvCompass();
      });
    }
    if (g.kwp) {
      g.kwp.addEventListener("input", updatePvCompass);
      g.kwp.addEventListener("focus", () => {
        activeCompassGroup = idx;
        updatePvCompass();
      });
    }
    if (g.tilt) {
      g.tilt.addEventListener("focus", () => {
        activeCompassGroup = idx;
        updatePvCompass();
      });
    }
  });

  updatePvCompass();
}

function pvFillForm() {
  const s = loadPvSettings(weatherData ? weatherData.latitude : 0);
  els.pvGroups.forEach((r, i) => {
    const g = s.groups[i];
    r.kwp.value = g.kwp;
    r.tilt.value = g.tilt;
    r.az.value = g.az;
  });
  els.pvEff.value = s.eff;
  if (els.pvTariffType) {
    els.pvTariffType.value = s.tariffType || "simple";
    updateTariffVisibility(els.pvTariffType.value);
  }
  if (els.pvTariffCycle) els.pvTariffCycle.value = s.tariffCycle || "daily";
  if (els.pvTariff) els.pvTariff.value = s.tariff;
  if (els.pvTariffPeak) els.pvTariffPeak.value = s.tariffPeak != null ? s.tariffPeak : 0.19;
  if (els.pvTariffOffPeak) els.pvTariffOffPeak.value = s.tariffOffPeak != null ? s.tariffOffPeak : 0.11;
  els.pvThermal.value = s.thermal;
  if (els.pvBattery) els.pvBattery.value = s.batteryCap || 0;
  if (els.pvBattMinSoc) els.pvBattMinSoc.value = s.battMinSoc != null ? s.battMinSoc : 20;
  if (els.pvDailyKwh) els.pvDailyKwh.value = Number(s.dailyKwh != null ? s.dailyKwh : 10).toFixed(1);
  if (els.pvExportTariff) els.pvExportTariff.value = s.exportPrice != null ? s.exportPrice : 0.05;
  updatePvCompass();
}

function equationOfTime(dayOfYear) {
  const b = ((2 * Math.PI) / 365) * (dayOfYear - 81);
  return 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
}

function dayOfYear(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 0)) / 864e5);
}

function sunAzEl(lat, lon, dateStr, hour, utcOffsetH) {
  const phi = (lat * Math.PI) / 180;
  const doy = dayOfYear(dateStr);
  const solarTime = hour - utcOffsetH + lon / 15 + equationOfTime(doy) / 60;
  const hourAngle = ((solarTime - 12) * 15 * Math.PI) / 180;
  const dec = ((-23.44 * Math.cos(((2 * Math.PI) / 365) * (doy + 10)) * Math.PI) / 180);
  const sinEl = Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(hourAngle);
  const elev = Math.asin(Math.max(-1, Math.min(1, sinEl)));
  const cosAz = elev > 0.001
    ? (Math.sin(dec) - Math.sin(elev) * Math.sin(phi)) / (Math.cos(elev) * Math.cos(phi) || 1e-9)
    : 0;
  let az = (Math.acos(Math.max(-1, Math.min(1, cosAz))) * 180) / Math.PI;
  if (hourAngle > 0) az = 360 - az;
  return { elev: (elev * 180) / Math.PI, az };
}

function pvHourEstimate(dni, ghi, dif, lat, lon, dateStr, hour, utcOffsetH, tilt, az) {
  const sun = sunAzEl(lat, lon, dateStr, hour, utcOffsetH);
  if (sun.elev <= 0.5) return 0;
  const el = (sun.elev * Math.PI) / 180;
  const t = (tilt * Math.PI) / 180;
  const cosInc =
    Math.sin(el) * Math.cos(t) +
    Math.cos(el) * Math.sin(t) * Math.cos(((sun.az - az) * Math.PI) / 180);
  const inc = Math.max(0, cosInc);
  const poa = dni * inc + dif * (1 + Math.cos(t)) / 2 + ghi * 0.2 * (1 - Math.cos(t)) / 2;
  return poa > 0 ? poa : 0;
}

function pvTempDerate(tamb, poa) {
  const cellTemp = tamb + 25 * (poa / 800);
  const derate = 1 - 0.004 * (cellTemp - 25);
  return Math.max(0, derate);
}


function getHourlyTariff(settings, dateStr, hour) {
  if (settings.tariffType !== "bi-hourly") {
    return settings.tariff || 0.15;
  }
  let isOffPeak = false;
  if (settings.tariffCycle === "weekly" && dateStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 = Sun, 6 = Sat
    if (dow === 0) {
      isOffPeak = true; // Sunday 24h
    } else if (dow === 6) {
      isOffPeak = hour < 9 || (hour >= 14 && hour < 20) || hour >= 22;
    } else {
      isOffPeak = hour < 7;
    }
  } else {
    // Daily cycle: 22h-08h
    isOffPeak = hour >= 22 || hour < 8;
  }
  return isOffPeak
    ? (settings.tariffOffPeak != null ? settings.tariffOffPeak : 0.11)
    : (settings.tariffPeak != null ? settings.tariffPeak : 0.19);
}

function simulateBatteryAndConsumption(production, settings, initialSoc, dateStr) {
  const cap = Math.max(0, settings.batteryCap || 0);
  const battMinSoc = Math.min(100, Math.max(0, settings.battMinSoc != null ? Number(settings.battMinSoc) : 20));
  const minSocKwh = cap * (battMinSoc / 100);
  const dailyKwh = Math.max(0, settings.dailyKwh != null ? settings.dailyKwh : 10);
  const exportTariff = settings.exportPrice != null ? settings.exportPrice : 0.05;

  // Typical residential hourly load weighting (averages 1.0x)
  const hourlyProfile = [
    0.6, 0.5, 0.5, 0.5, 0.6, 0.8,
    1.3, 1.5, 1.2, 0.9, 0.8, 0.9,
    1.1, 1.0, 0.9, 0.9, 1.0, 1.2,
    1.6, 1.8, 1.7, 1.4, 1.0, 0.7
  ];

  const batteryMaxKw = cap > 0 ? Math.min(Math.max(cap * 0.5, 2.5), 5.0) : 0;
  const effRoundtrip = 0.92;
  const effCharge = Math.sqrt(effRoundtrip);
  const effDischarge = Math.sqrt(effRoundtrip);

  let soc;
  if (initialSoc != null) {
    soc = Math.min(cap, Math.max(minSocKwh, initialSoc));
  } else if (cap > 0) {
    // Standalone single-day spin-up convergence
    let tempSoc = cap * 0.5;
    for (let iter = 0; iter < 2; iter++) {
      for (let i = 0; i < 24; i++) {
        const genKwh = production[i] || 0;
        const loadKwh = (dailyKwh / 24) * (hourlyProfile[i] || 1.0);
        if (genKwh >= loadKwh) {
          const surplus = genKwh - loadKwh;
          const room = cap - tempSoc;
          const grossTaken = Math.min(surplus, batteryMaxKw || 3.0, room / effCharge);
          tempSoc = Math.min(cap, tempSoc + Math.max(0, grossTaken * effCharge));
        } else {
          const deficit = loadKwh - genKwh;
          const usableSoc = Math.max(0, tempSoc - minSocKwh);
          const discharge = Math.min(deficit, batteryMaxKw || 3.0, usableSoc * effDischarge);
          tempSoc = Math.max(minSocKwh, tempSoc - (discharge / effDischarge));
        }
      }
    }
    soc = tempSoc;
  } else {
    soc = 0;
  }

  let totalSolar = 0;
  let totalLoad = 0;
  let totalSelfDirect = 0;
  let totalBatteryCharge = 0;
  let totalBatteryDischarge = 0;
  let totalGridExport = 0;
  let totalGridImport = 0;

  const hourly = production.map((genKwh, i) => {
    totalSolar += genKwh;
    const loadKwh = (dailyKwh / 24) * (hourlyProfile[i] || 1.0);
    totalLoad += loadKwh;

    let direct = 0;
    let charge = 0;
    let discharge = 0;
    let gridExport = 0;
    let gridImport = 0;

    if (genKwh >= loadKwh) {
      direct = loadKwh;
      const surplus = genKwh - loadKwh;
      if (cap > 0 && soc < cap) {
        const room = cap - soc;
        const maxChargeGross = batteryMaxKw || 3.0;
        const grossTaken = Math.min(surplus, maxChargeGross, room / effCharge);
        charge = Math.max(0, grossTaken * effCharge);
        soc = Math.min(cap, soc + charge);
        gridExport = Math.max(0, surplus - grossTaken);
      } else {
        gridExport = surplus;
      }
    } else {
      direct = genKwh;
      const deficit = loadKwh - genKwh;
      const usableSoc = Math.max(0, soc - minSocKwh);
      if (cap > 0 && usableSoc > 0.001) {
        const maxDischargeNet = batteryMaxKw || 3.0;
        const potentialDischarge = Math.min(deficit, maxDischargeNet, usableSoc * effDischarge);
        discharge = Math.max(0, potentialDischarge);
        soc = Math.max(minSocKwh, soc - (discharge / effDischarge));
        gridImport = Math.max(0, deficit - discharge);
      } else {
        gridImport = deficit;
      }
    }

    totalSelfDirect += direct;
    totalBatteryCharge += charge;
    totalBatteryDischarge += discharge;
    totalGridExport += gridExport;
    totalGridImport += gridImport;

    return {
      hour: i,
      solar: genKwh,
      load: loadKwh,
      direct,
      charge,
      discharge,
      gridExport,
      gridImport,
      soc
    };
  });

  let totalSavingsDirect = 0;
  let totalSavingsBattery = 0;
  let totalGridCost = 0;
  let totalExportRevenue = 0;

  hourly.forEach((h) => {
    const rate = getHourlyTariff(settings, dateStr, h.hour);
    totalSavingsDirect += h.direct * rate;
    totalSavingsBattery += h.discharge * rate;
    totalGridCost += h.gridImport * rate;
    totalExportRevenue += h.gridExport * exportTariff;
  });

  const totalSelfConsumed = totalSelfDirect + totalBatteryDischarge;
  const selfConsumptionRate = totalSolar > 0 ? Math.min(100, (totalSelfConsumed / totalSolar) * 100) : 0;
  const selfSufficiencyRate = totalLoad > 0 ? Math.min(100, (totalSelfConsumed / totalLoad) * 100) : 0;
  const savingsDirect = totalSavingsDirect + totalSavingsBattery;
  const exportRevenue = totalExportRevenue;
  const totalFinancialBenefit = savingsDirect + exportRevenue;
  const gridCost = totalGridCost;

  return {
    cap,
    battMinSoc,
    minSocKwh,
    dailyKwh,
    totalSolar,
    totalLoad,
    totalSelfDirect,
    totalSelfConsumed,
    totalBatteryCharge,
    totalBatteryDischarge,
    totalGridExport,
    totalGridImport,
    selfConsumptionRate,
    selfSufficiencyRate,
    savingsDirect,
    exportRevenue,
    totalFinancialBenefit,
    gridCost,
    startSoc: initialSoc != null ? initialSoc : soc,
    finalSoc: soc,
    hourly
  };
}

function simulateForecastBattery(data, settings) {
  const days = Math.min(7, Math.floor((data.hourly.time || []).length / 24));
  const utcOffsetH = (data.utc_offset_seconds || 0) / 3600;
  const groups = settings.groups.filter((g) => g.kwp > 0);
  const ghi = data.hourly.shortwave_radiation || [];
  const dni = data.hourly.direct_normal_irradiance || [];
  const dif = data.hourly.diffuse_radiation || [];

  const cap = Math.max(0, settings.batteryCap || 0);
  const battMinSoc = Math.min(100, Math.max(0, settings.battMinSoc != null ? Number(settings.battMinSoc) : 20));
  const minSocKwh = cap * (battMinSoc / 100);

  // 1. Pre-calculate hourly PV generation and date strings for each forecast day
  const dailyProds = [];
  const dailyDates = [];
  for (let d = 0; d < days; d++) {
    const start = d * 24;
    const prod24 = [];
    const dateStr = (data.hourly.time[start] || "").slice(0, 10);
    dailyDates.push(dateStr);
    for (let i = 0; i < 24; i++) {
      const idx = start + i;
      const t = data.hourly.time[idx];
      if (!t) {
        prod24.push(0);
        continue;
      }
      const hour = Number(t.slice(11, 13));
      let hourProd = 0;
      for (const g of groups) {
        const poa = pvHourEstimate(
          dni[idx] || 0,
          ghi[idx] || 0,
          dif[idx] || 0,
          data.latitude,
          data.longitude,
          dateStr,
          hour,
          utcOffsetH,
          g.tilt,
          g.az
        );
        let kwh = (poa / 1000) * g.kwp * (settings.eff / 100);
        if (settings.thermal === "temp" && poa > 0) {
          const tamb = data.hourly.temperature_2m?.[idx];
          kwh *= pvTempDerate(tamb != null ? tamb : 20, poa);
        }
        hourProd += kwh > 0 ? kwh : 0;
      }
      prod24.push(hourProd);
    }
    dailyProds.push(prod24);
  }

  // 2. Cyclic Steady-State Convergence (Spin-up Loop):
  // Instead of an arbitrary fixed SoC (such as 25%), run a 2-pass warm-up cycle
  // across the multi-day forecast sequence to establish the natural periodic
  // state of charge entering midnight of Day 0, eliminating cold-start boundary artifacts.
  let currentSoc = minSocKwh;
  if (cap > 0 && dailyProds.length > 0) {
    let warmSoc = cap * 0.5;
    for (let iter = 0; iter < 2; iter++) {
      for (let d = 0; d < days; d++) {
        const s = simulateBatteryAndConsumption(dailyProds[d], settings, warmSoc, dailyDates[d]);
        warmSoc = s.finalSoc;
      }
    }
    currentSoc = warmSoc;
  }

  // 3. Multi-day continuous simulation carryover
  const results = [];
  for (let d = 0; d < days; d++) {
    const sim = simulateBatteryAndConsumption(dailyProds[d], settings, currentSoc, dailyDates[d]);
    currentSoc = sim.finalSoc;
    results.push(sim);
  }
  return results;
}


function toggleHeroAlerts() {
  if (!els.advisoryPanel) return;
  els.advisoryPanel.hidden = false;
  els.advisoryPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  if (els.advisoryUvCard) {
    els.advisoryUvCard.classList.remove("highlight-pulse");
    void els.advisoryUvCard.offsetWidth; // force reflow
    els.advisoryUvCard.classList.add("highlight-pulse");
    setTimeout(() => {
      els.advisoryUvCard.classList.remove("highlight-pulse");
    }, 2000);
  }
}

function renderAdvisory(data, day) {
  if (!els.advisoryPanel || !data || !data.hourly) return;

  const startIdx = day * 24;
  const endIdx = startIdx + 24;
  const dayUv = data.hourly.uv_index ? data.hourly.uv_index.slice(startIdx, endIdx) : [];

  // 1. Calculate Peak UV and Protection Window
  let maxUv = 0;
  let peakHour = -1;
  for (let h = 0; h < dayUv.length; h++) {
    const val = dayUv[h] != null ? Number(dayUv[h]) : 0;
    if (val > maxUv) {
      maxUv = val;
      peakHour = h;
    }
  }

  // Daily parameter check if higher
  if (data.daily && data.daily.uv_index_max && data.daily.uv_index_max[day] != null) {
    const dailyMax = Number(data.daily.uv_index_max[day]);
    if (dailyMax > maxUv) maxUv = dailyMax;
  }
  maxUv = Math.round(maxUv * 10) / 10;

  // Protection Window: hours where UV >= 2.95 (WHO threshold for protection)
  let winStart = -1;
  let winEnd = -1;
  for (let h = 0; h < dayUv.length; h++) {
    const val = dayUv[h] != null ? Number(dayUv[h]) : 0;
    if (val >= 2.95) {
      if (winStart === -1) winStart = h;
      winEnd = h;
    }
  }

  // 2. Set Advisory Panel subtitle (day label)
  if (els.advisorySpan) {
    const d = new Date(data.daily.time[day] + "T12:00:00");
    const dayName = day === 0 ? t("hero.today") : I18N[lang].days[d.getDay()];
    const dateFormatted = `${d.getDate()} ${I18N[lang].months[d.getMonth()]}`;
    els.advisorySpan.textContent = `${dayName} · ${dateFormatted}`;
  }

  // 3. Determine UV risk level & pill
  let uvClass = "advisory-pill--low";
  let uvLevelText = t("advisory.uv.level.low");

  if (maxUv >= 11) {
    uvClass = "advisory-pill--extreme";
    uvLevelText = t("advisory.uv.level.extreme");
  } else if (maxUv >= 8) {
    uvClass = "advisory-pill--veryhigh";
    uvLevelText = t("advisory.uv.level.veryhigh");
  } else if (maxUv >= 6) {
    uvClass = "advisory-pill--high";
    uvLevelText = t("advisory.uv.level.high");
  } else if (maxUv >= 3) {
    uvClass = "advisory-pill--mod";
    uvLevelText = t("advisory.uv.level.mod");
  }

  if (els.advisoryUvPill) {
    els.advisoryUvPill.className = `advisory-pill ${uvClass}`;
    els.advisoryUvPill.textContent = `UV ${maxUv.toFixed(1)} · ${uvLevelText}`;
  }

  // UV meter pointer position: map 0 to 12 scale to percentage (0% to 100%)
  if (els.uvMeterPointer) {
    const clampedPct = Math.min(100, Math.max(0, (maxUv / 12) * 100));
    els.uvMeterPointer.style.left = `${clampedPct.toFixed(1)}%`;
  }

  // Peak and high intensity Window label
  if (els.advisoryUvPeak) {
    if (peakHour >= 0 && maxUv > 0.5) {
      const peakFormatted = `${String(peakHour).padStart(2, "0")}:00`;
      let text = t("advisory.uv.peak", maxUv.toFixed(1), peakFormatted);
      if (winStart !== -1 && winEnd !== -1) {
        const startStr = `${String(winStart).padStart(2, "0")}:00`;
        const endStr = `${String(winEnd + 1).padStart(2, "0")}:00`;
        text += ` · ${t("advisory.uv.window", startStr, endStr)}`;
      }
      els.advisoryUvPeak.textContent = text;
    } else {
      els.advisoryUvPeak.textContent = t("advisory.uv.peak_none");
    }
  }

  // 4. Evaluate Severe Weather Alerts
  const alerts = [];

  // Wind / Gusts
  let gustMax = 0;
  if (data.daily && data.daily.wind_gusts_10m_max && data.daily.wind_gusts_10m_max[day] != null) {
    gustMax = Number(data.daily.wind_gusts_10m_max[day]);
  }
  let windMax = 0;
  if (data.daily && data.daily.wind_speed_10m_max && data.daily.wind_speed_10m_max[day] != null) {
    windMax = Number(data.daily.wind_speed_10m_max[day]);
  }
  const gustDisplayStr = windDisplay(gustMax);
  const tempUnitStr = unitCelsius ? "°C" : "°F";

  if (gustMax >= 70) {
    alerts.push({
      type: "danger",
      icon: "🌪️",
      title: t("advisory.alert.wind.title"),
      desc: t("advisory.alert.wind.desc", gustDisplayStr, Math.round(gustMax * 0.539957)),
    });
  } else if (gustMax >= 50 || windMax >= 40) {
    alerts.push({
      type: "warning",
      icon: "💨",
      title: t("advisory.alert.wind.title"),
      desc: t("advisory.alert.wind.desc", gustDisplayStr, Math.round(gustMax * 0.539957)),
    });
  }

  // Heavy Rain / Precipitation
  let rainSum = 0;
  if (data.daily && data.daily.precipitation_sum && data.daily.precipitation_sum[day] != null) {
    rainSum = Number(data.daily.precipitation_sum[day]);
  } else if (data.hourly && data.hourly.precipitation) {
    for (let h = 0; h < 24; h++) {
      rainSum += Number(data.hourly.precipitation[startIdx + h] || 0);
    }
  }
  rainSum = Math.round(rainSum * 10) / 10;

  if (rainSum >= 30) {
    alerts.push({
      type: "danger",
      icon: "🌧️",
      title: t("advisory.alert.rain.title"),
      desc: t("advisory.alert.rain.desc", rainSum.toFixed(1)),
    });
  } else if (rainSum >= 15) {
    alerts.push({
      type: "warning",
      icon: "🌦️",
      title: t("advisory.alert.rain.title"),
      desc: t("advisory.alert.rain.desc", rainSum.toFixed(1)),
    });
  }

  // Thunderstorm / Hail
  const dayCodes = [];
  if (data.daily && data.daily.weather_code && data.daily.weather_code[day] != null) {
    dayCodes.push(data.daily.weather_code[day]);
  }
  if (data.hourly && data.hourly.weather_code) {
    for (let h = 0; h < 24; h++) {
      dayCodes.push(data.hourly.weather_code[startIdx + h]);
    }
  }
  const hasSevereStorm = dayCodes.some((c) => c === 96 || c === 99);
  const hasStorm = dayCodes.some((c) => c === 95);

  if (hasSevereStorm) {
    alerts.push({
      type: "danger",
      icon: "⛈️",
      title: t("advisory.alert.storm.title"),
      desc: t("advisory.alert.storm.desc"),
    });
  } else if (hasStorm) {
    alerts.push({
      type: "warning",
      icon: "🌩️",
      title: t("advisory.alert.storm.title"),
      desc: t("advisory.alert.storm.desc"),
    });
  }

  // Extreme Heat
  let tempMax = -999;
  if (data.daily && data.daily.temperature_2m_max && data.daily.temperature_2m_max[day] != null) {
    tempMax = Number(data.daily.temperature_2m_max[day]);
  }
  if (tempMax >= 38) {
    alerts.push({
      type: "danger",
      icon: "🔥",
      title: t("advisory.alert.heat.title"),
      desc: t("advisory.alert.heat.desc", tempDisplay(tempMax), tempUnitStr),
    });
  } else if (tempMax >= 33) {
    alerts.push({
      type: "warning",
      icon: "☀️",
      title: t("advisory.alert.heat.title"),
      desc: t("advisory.alert.heat.desc", tempDisplay(tempMax), tempUnitStr),
    });
  }

  // Frost / Freezing
  let tempMin = 999;
  if (data.daily && data.daily.temperature_2m_min && data.daily.temperature_2m_min[day] != null) {
    tempMin = Number(data.daily.temperature_2m_min[day]);
  }
  if (tempMin <= -4) {
    alerts.push({
      type: "danger",
      icon: "❄️",
      title: t("advisory.alert.frost.title"),
      desc: t("advisory.alert.frost.desc", tempDisplay(tempMin), tempUnitStr),
    });
  } else if (tempMin <= 0) {
    alerts.push({
      type: "warning",
      icon: "🧊",
      title: t("advisory.alert.frost.title"),
      desc: t("advisory.alert.frost.desc", tempDisplay(tempMin), tempUnitStr),
    });
  }

  // Render Alerts List
  if (els.advisoryAlertsList) {
    if (alerts.length === 0) {
      els.advisoryAlertsList.innerHTML = `
        <div class="alert-item alert-item--info">
          <span class="alert-item__icon" aria-hidden="true">☀️</span>
          <div class="alert-item__content">
            <span class="alert-item__title">${t("advisory.alerts.none_title")}</span>
            <span class="alert-item__desc">${t("advisory.alerts.none_desc")}</span>
          </div>
        </div>
      `;
      if (els.advisoryAlertsBadge) {
        els.advisoryAlertsBadge.className = "advisory-pill advisory-pill--stable";
        els.advisoryAlertsBadge.textContent = t("advisory.alerts.stable");
      }
      if (els.advisoryAlertsSub) {
        els.advisoryAlertsSub.textContent = t("advisory.alerts.sub_none");
      }
    } else {
      const hasDanger = alerts.some((a) => a.type === "danger");
      const badgeClass = hasDanger ? "advisory-pill--danger" : "advisory-pill--warning";

      if (els.advisoryAlertsBadge) {
        els.advisoryAlertsBadge.className = `advisory-pill ${badgeClass}`;
        els.advisoryAlertsBadge.textContent = t("advisory.alerts.active", alerts.length);
      }
      if (els.advisoryAlertsSub) {
        els.advisoryAlertsSub.textContent = t("advisory.alerts.sub_count", alerts.length);
      }

      els.advisoryAlertsList.innerHTML = alerts
        .map(
          (a) => `
          <div class="alert-item alert-item--${a.type}">
            <span class="alert-item__icon" aria-hidden="true">${a.icon}</span>
            <div class="alert-item__content">
              <span class="alert-item__title">${a.title}</span>
              <span class="alert-item__desc">${a.desc}</span>
            </div>
          </div>
        `
        )
        .join("");
    }
  }

  // Hero Alert Chip
  if (els.heroAlertChip) {
    if (alerts.length > 0) {
      els.heroAlertChip.hidden = false;
      els.heroAlertChip.textContent = t("hero.alert.chip", alerts.length);
      els.heroAlertChip.title = alerts.map((a) => a.title).join(" · ");
    } else {
      els.heroAlertChip.hidden = true;
    }
  }
}

function renderPv(data, day) {
  const settings = loadPvSettings(data.latitude);
  const start = day * 24;
  const times = data.hourly.time.slice(start, start + 24);
  const ghiArr = data.hourly.shortwave_radiation.slice(start, start + 24);
  const dniArr = data.hourly.direct_normal_irradiance?.slice(start, start + 24) || [];
  const difArr = data.hourly.diffuse_radiation?.slice(start, start + 24) || [];
  const utcOffsetH = (data.utc_offset_seconds || 0) / 3600;

  const groups = settings.groups
    .map((g) => ({ ...g }))
    .filter((g) => g.kwp > 0);

  const perGroup = groups.map((g) => {
    const prod = times.map((t, i) => {
      const hour = Number(t.slice(11, 13));
      const dateStr = t.slice(0, 10);
      const poa = pvHourEstimate(
        dniArr[i] || 0,
        ghiArr[i] || 0,
        difArr[i] || 0,
        data.latitude,
        data.longitude,
        dateStr,
        hour,
        utcOffsetH,
        g.tilt,
        g.az
      );
      let kwh = (poa / 1000) * g.kwp * (settings.eff / 100);
      if (settings.thermal === "temp" && poa > 0) {
        const tamb = data.hourly.temperature_2m?.[start + i];
        kwh *= pvTempDerate(tamb != null ? tamb : 20, poa);
      }
      return kwh > 0 ? kwh : 0;
    });
    return { g, prod, total: prod.reduce((a, b) => a + b, 0) };
  });

  const sumProd = times.map((_, i) => perGroup.reduce((a, pg) => a + pg.prod[i], 0));
  const total = sumProd.reduce((a, b) => a + b, 0);
  const euros = times.map((t, i) => sumProd[i] * getHourlyTariff(settings, t.slice(0, 10), Number(t.slice(11, 13)))).reduce((a, b) => a + b, 0);
  const thermalNote =
    settings.thermal === "temp"
      ? t("pv.thermal.real")
      : t("pv.thermal.fixednote");

  if (perGroup.length) {
    els.pvCharts.innerHTML = perGroup
      .map((pg, k) => {
        const color = PV_PALETTE[k % PV_PALETTE.length];
        return `
          <div class="pv-mini">
            <div class="pv-mini__head">
              <span class="pv-mini__name">
                <span class="pv-mini__dot" style="background:${color}"></span>
                ${compassName(pg.g.az)} ${pg.g.az}° · ${pg.g.tilt}° · ${pg.g.kwp} kWp
              </span>
              <span class="pv-mini__kwh">${pg.total.toFixed(1)} kWh <span class="pv-mini__peak">· ${Math.max.apply(null, pg.prod).toFixed(2)} kWpico</span></span>
            </div>
            <div class="chart__canvas">${buildPvChart(pg.prod, { h: 90, color, id: "pvGrad" + k })}</div>
            <div class="chart__axis chart__axis--mini">${axisLabels(times)}</div>
          </div>`;
      })
      .join("");
  } else {
    els.pvCharts.innerHTML = `<p class="pv-econ">${t("pv.empty")}</p>`;
  }

  els.pvAxis.innerHTML = axisLabels(times);
  els.pvSpan.textContent = dayLabel(day);
  els.pvDayTotal.textContent = `${total.toFixed(1)} kWh`;
  const peakVal = sumProd.length ? Math.max.apply(null, sumProd) : 0;
  const peakIdx = sumProd.indexOf(peakVal);
  if (els.pvPeakPower) {
    if (peakVal > 0.05) {
      els.pvPeakPower.hidden = false;
      els.pvPeakPower.textContent = t("pv.peak.tag", [peakVal.toFixed(2), formatHourLabel(times[peakIdx])]);
    } else {
      els.pvPeakPower.hidden = true;
    }
  }
  els.pvChart.innerHTML = buildPvChart(sumProd, { h: 170, color: PV_TOTAL_COLOR, id: "pvGradTotal", mode: pvViewMode, times });
  if (settings.tariffType === "bi-hourly") {
    els.pvEcon.innerHTML = t("pv.cmp.bihourly", [
      perGroup.length || 0,
      total.toFixed(1),
      euros.toFixed(2),
      (settings.tariffPeak != null ? settings.tariffPeak : 0.19).toFixed(3),
      (settings.tariffOffPeak != null ? settings.tariffOffPeak : 0.11).toFixed(3),
      thermalNote,
    ]);
  } else {
    els.pvEcon.innerHTML = t("pv.cmp", [
      perGroup.length || 0,
      total.toFixed(1),
      euros.toFixed(2),
      settings.tariff.toFixed(3),
      thermalNote,
    ]);
  }
  // Battery & Self-consumption simulation (continuous multi-day cycle)
  const forecastSims = simulateForecastBattery(data, settings);
  const curDateStr = (times[0] || "").slice(0, 10);
  const sim = (forecastSims && forecastSims[day]) ? forecastSims[day] : simulateBatteryAndConsumption(sumProd, settings, null, curDateStr);
  if (els.pvBalanceCard) {
    if (els.pvSelfVal) els.pvSelfVal.textContent = `${sim.totalSelfConsumed.toFixed(1)} kWh`;
    if (els.pvSelfPct) {
      els.pvSelfPct.textContent = t("pv.metric.self.detail", [
        sim.totalSelfDirect.toFixed(1),
        sim.totalBatteryDischarge.toFixed(1),
        Math.round(sim.selfSufficiencyRate),
      ]);
    }
    
    if (els.pvBattVal) {
      if (sim.cap > 0) {
        els.pvBattVal.textContent = `${sim.totalBatteryDischarge.toFixed(1)} kWh`;
        if (els.pvBattSoc) {
          els.pvBattSoc.textContent = t("pv.metric.batt.detail", [
            sim.totalBatteryCharge.toFixed(1),
            Math.round((sim.finalSoc / sim.cap) * 100),
          ]);
        }
      } else {
        els.pvBattVal.textContent = t("pv.balance.nobatt");
        if (els.pvBattSoc) els.pvBattSoc.textContent = "0.0 kWh";
      }
    }

    if (els.pvExportVal) els.pvExportVal.textContent = `${sim.totalGridExport.toFixed(1)} kWh`;
    if (els.pvExportEuros) els.pvExportEuros.textContent = `+${sim.exportRevenue.toFixed(2)} €`;

    if (els.pvImportVal) els.pvImportVal.textContent = `${sim.totalGridImport.toFixed(1)} kWh`;
    if (els.pvImportCost) els.pvImportCost.textContent = t("pv.metric.cost", [sim.gridCost.toFixed(2)]);

    if (els.pvBalanceBenefit) els.pvBalanceBenefit.textContent = `+${sim.totalFinancialBenefit.toFixed(2)} €`;

    // Partition bar
    const totalPartition = sim.totalSelfDirect + sim.totalBatteryDischarge + sim.totalGridExport || 1;
    const pctSelf = Math.max(3, (sim.totalSelfDirect / totalPartition) * 100);
    const pctBatt = sim.cap > 0 ? Math.max(0, (sim.totalBatteryDischarge / totalPartition) * 100) : 0;
    const pctExport = Math.max(0, 100 - pctSelf - pctBatt);

    if (els.pvSegSelf) els.pvSegSelf.style.width = `${pctSelf.toFixed(1)}%`;
    if (els.pvSegBatt) {
      els.pvSegBatt.style.width = `${pctBatt.toFixed(1)}%`;
      els.pvSegBatt.hidden = sim.cap <= 0;
    }
    if (els.pvSegExport) els.pvSegExport.style.width = `${pctExport.toFixed(1)}%`;
  }

  renderPvWeekly(pvTotalsByDay(data, settings), settings);
  pvConfigPreview();
}

function pvTotalsByDay(data, settings) {
  const days = Math.min(7, Math.floor((data.hourly.time || []).length / 24));
  const utcOffsetH = (data.utc_offset_seconds || 0) / 3600;
  const groups = settings.groups.filter((g) => g.kwp > 0);
  const ghi = data.hourly.shortwave_radiation || [];
  const dni = data.hourly.direct_normal_irradiance || [];
  const dif = data.hourly.diffuse_radiation || [];
  const totals = [];
  for (let d = 0; d < days; d++) {
    const start = d * 24;
    let sum = 0;
    groups.forEach((g) => {
      for (let i = 0; i < 24; i++) {
        const t = data.hourly.time[start + i];
        if (!t) break;
        const hour = Number(t.slice(11, 13));
        const dateStr = t.slice(0, 10);
        const poa = pvHourEstimate(
          dni[start + i] || 0,
          ghi[start + i] || 0,
          dif[start + i] || 0,
          data.latitude,
          data.longitude,
          dateStr,
          hour,
          utcOffsetH,
          g.tilt,
          g.az
        );
        let kwh = (poa / 1000) * g.kwp * (settings.eff / 100);
        if (settings.thermal === "temp" && poa > 0) {
          const tamb = data.hourly.temperature_2m?.[start + i];
          kwh *= pvTempDerate(tamb != null ? tamb : 20, poa);
        }
        sum += kwh > 0 ? kwh : 0;
      }
    });
    totals.push(sum);
  }
  return totals;
}

function renderPvWeekly(totals, settings) {
  if (!weatherData || !totals.length || totals.every((v) => v === 0)) {
    els.pvWeeklyBox.hidden = true;
    return;
  }
  els.pvWeeklyBox.hidden = false;
  const week = totals.reduce((a, b) => a + b, 0);
  let weekEuros = 0;
  totals.forEach((v, d) => {
    const dStart = d * 24;
    for (let h = 0; h < 24; h++) {
      const t = weatherData.hourly.time[dStart + h];
      if (t) {
        const dDate = t.slice(0, 10);
        // Estimate proportion
        weekEuros += (v / 24) * getHourlyTariff(settings, dDate, h);
      }
    }
  });
  els.pvWeeklyTotal.textContent = `${week.toFixed(1)} kWh · ${weekEuros.toFixed(2)} €`;
  els.pvWeeklyBars.innerHTML = "";
  const max = Math.max.apply(null, totals.concat([0.1]));
  totals.forEach((v, i) => {
    const col = document.createElement("div");
    col.className = "pv-weekly__bar-col" + (i === selectedDay ? " active" : "");
    col.setAttribute("role", "button");
    col.setAttribute("tabindex", "0");
    col.setAttribute("aria-label", `${dayLabel(i)} · ${v.toFixed(1)} kWh`);
    const value = document.createElement("span");
    value.className = "pv-weekly__bar-value";
    value.innerHTML = `<span class="pv-weekly__bar-num">${v.toFixed(1)}</span><span class="pv-weekly__bar-unit"> kWh</span>`;
    const track = document.createElement("div");
    track.className = "pv-weekly__bar-track";
    const bar = document.createElement("div");
    bar.className = "pv-weekly__bar";
    bar.style.height = (v > 0 ? Math.max(8, (v / max) * 100) : 3) + "%";
    const label = document.createElement("span");
    label.className = "pv-weekly__day-label";
    const date = new Date(weatherData.daily.time[i] + "T12:00:00Z");
    try {
      label.textContent = new Intl.DateTimeFormat(I18N[lang].locale, { weekday: "short" }).format(date);
    } catch {
      label.textContent = String(date.getUTCDate());
    }
    track.appendChild(bar);
    col.appendChild(value);
    col.appendChild(track);
    col.appendChild(label);
    col.addEventListener("click", () => selectDay(i));
    col.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectDay(i);
      }
    });
    els.pvWeeklyBars.appendChild(col);
  });
}

function exportPvCsv() {
  if (!weatherData) return;
  const data = weatherData;
  const settings = loadPvSettings(data.latitude);
  const start = selectedDay * 24;
  const groups = settings.groups.filter((g) => g.kwp > 0);
  const utcOffsetH = (data.utc_offset_seconds || 0) / 3600;
  const head = ["date", "hour", "temp_c", "precip_prob_pct", "precip_mm", "ghi_wm2", "dni_wm2", "diffuse_wm2"];
  groups.forEach((g, k) => head.push(`pv${k + 1}_kwh`));
  head.push("pv_total_kwh");
  const lines = [head.join(",")];
  for (let i = 0; i < 24; i++) {
    const t = data.hourly.time[start + i];
    if (!t) break;
    const hour = Number(t.slice(11, 13));
    const dateStr = t.slice(0, 10);
    const ghi = data.hourly.shortwave_radiation?.[start + i] || 0;
    const dni = data.hourly.direct_normal_irradiance?.[start + i] || 0;
    const dif = data.hourly.diffuse_radiation?.[start + i] || 0;
    const row = [
      dateStr,
      String(hour).padStart(2, "0"),
      data.hourly.temperature_2m?.[start + i] ?? "",
      data.hourly.precipitation_probability?.[start + i] ?? "",
      data.hourly.precipitation?.[start + i] ?? "",
      ghi.toFixed(1),
      dni.toFixed(1),
      dif.toFixed(1),
    ];
    const kwhs = groups.map((g) => {
      const poa = pvHourEstimate(dni, ghi, dif, data.latitude, data.longitude, dateStr, hour, utcOffsetH, g.tilt, g.az);
      let kwh = (poa / 1000) * g.kwp * (settings.eff / 100);
      if (settings.thermal === "temp" && poa > 0) {
        const tamb = data.hourly.temperature_2m?.[start + i];
        kwh *= pvTempDerate(tamb != null ? tamb : 20, poa);
      }
      return (kwh > 0 ? kwh : 0).toFixed(3);
    });
    const total = kwhs.reduce((a, b) => a + parseFloat(b), 0).toFixed(3);
    lines.push(row.concat(kwhs, [total]).join(","));
  }
  const city = (placeName || "solmeteo").toLowerCase().replace(/[^a-z0-9]+/g, "_") || "solmeteo";
  const fileName = `solmeteo_${(data.hourly.time[start] || "day").slice(0, 10)}_${city}.csv`;
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast(t("pv.export.done"));
}

function buildPvChart(production, opts = {}) {
  const W = 600;
  const H = opts.h || 170;
  const pad = 10;
  const color = opts.color || "#34d399";
  const gid = opts.id || "pvGrad";
  const mode = opts.mode || (opts.id === "pvGradTotal" ? pvViewMode : "bars");
  const n = production.length || 1;
  const maxV = Math.max.apply(null, production.concat([0.1]));
  const stepX = (W - pad * 2) / n;
  const bw = Math.min(Math.max(stepX * 0.58, 6), 18);
  const plotH = H - 24;

  let bars = "";
  const points = [];

  production.forEach((v, i) => {
    const cx = pad + stepX * i + stepX / 2;
    const cy = H - 8 - (Math.max(v, 0) / maxV) * plotH;
    points.push({ x: cx, y: cy, v });

    if (mode === "bars" || mode === "both") {
      const h = v > 0 ? Math.max((v / maxV) * plotH, 2) : 0;
      const opacity = mode === "both" ? "0.62" : "0.95";
      bars += `
        <rect x="${(cx - bw / 2).toFixed(1)}" y="${(H - 8 - h).toFixed(1)}"
              width="${bw.toFixed(1)}" height="${h.toFixed(1)}"
              rx="${Math.min(3, bw / 2).toFixed(1)}" fill="url(#${gid})" opacity="${opacity}"/>
      `;
    }
  });

  let curveEl = "";
  if (mode === "curve" || mode === "both") {
    let dLine = "";
    let dArea = `M ${points[0].x.toFixed(1)} ${H - 8} `;
    
    points.forEach((p, i) => {
      if (i === 0) {
        dLine += `M ${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
        dArea += `L ${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
      } else {
        const prev = points[i - 1];
        const cpX = ((prev.x + p.x) / 2).toFixed(1);
        dLine += `C ${cpX} ${prev.y.toFixed(1)}, ${cpX} ${p.y.toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
        dArea += `C ${cpX} ${prev.y.toFixed(1)}, ${cpX} ${p.y.toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
      }
    });

    const lastX = points[points.length - 1].x.toFixed(1);
    dArea += `L ${lastX} ${H - 8} Z`;
    const curveStroke = opts.id === "pvGradTotal" ? "#38bdf8" : color;

    curveEl = `
      ${mode === "curve" ? `<path d="${dArea}" fill="url(#${gid}Area)"/>` : ""}
      <path d="${dLine}" fill="none" stroke="${curveStroke}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  }

  let peakMarker = "";
  const peakVal = Math.max.apply(null, production);
  if (peakVal > 0.05 && (mode === "curve" || mode === "both")) {
    const peakIdx = production.indexOf(peakVal);
    const p = points[peakIdx];
    const markerColor = "#38bdf8";
    const anchor = p.x <= 40 ? "start" : p.x >= W - 40 ? "end" : "middle";
    const labelX = anchor === "middle" ? p.x : anchor === "start" ? Math.max(p.x, 10) : Math.min(p.x, W - 10);
    const labelY = Math.max(p.y - 10, 14);

    peakMarker = `
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="8" fill="${markerColor}" opacity="0.22"/>
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.6" fill="${markerColor}" stroke="#0b1020" stroke-width="1.3"/>
      <text x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="${anchor}" fill="${markerColor}" font-size="11" font-weight="700">${peakVal.toFixed(2)} kW</text>
    `;
  }

  let guides = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    .map((i) => {
      const gx = pad + (i / 12) * (W - pad * 2);
      return `<line x1="${gx.toFixed(1)}" y1="6" x2="${gx.toFixed(1)}" y2="${H - 8}" stroke="#e2e8f0" stroke-opacity="0.05"/>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${t("pv.aria")}">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.4"/>
        </linearGradient>
        <linearGradient id="${gid}Area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.02"/>
        </linearGradient>
      </defs>
      ${guides}
      <line x1="${pad}" y1="${H - 8}" x2="${W - pad}" y2="${H - 8}"
            stroke="#3b4a72" stroke-width="1.5" stroke-dasharray="4 4"/>
      ${bars}
      ${curveEl}
      ${peakMarker}
    </svg>
  `;
}

if (els.pvTariffChip) {
  els.pvTariffChip.addEventListener("click", () => {
    els.pvConfig.hidden = false;
    els.pvConfigBtn.setAttribute("aria-expanded", "true");
    pvFillForm();
    const sec = document.getElementById("pvTariffSection");
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth", block: "center" });
      sec.classList.add("highlight-pulse");
      setTimeout(() => sec.classList.remove("highlight-pulse"), 1600);
    }
    if (els.pvTariffType) {
      els.pvTariffType.focus();
    }
  });
}

if (els.pvTariffType) {
  els.pvTariffType.addEventListener("change", (e) => {
    updateTariffVisibility(e.target.value);
  });
}

els.pvConfigBtn.addEventListener("click", () => {
  const wasHidden = els.pvConfig.hidden;
  els.pvConfig.hidden = !wasHidden;
  els.pvConfigBtn.setAttribute("aria-expanded", String(wasHidden));
  if (wasHidden) pvFillForm();
});

els.pvConfig.addEventListener("submit", (e) => {
  e.preventDefault();
  const groups = els.pvGroups.map((r) => ({
    kwp: parseFloat(r.kwp.value),
    tilt: parseFloat(r.tilt.value),
    az: parseFloat(r.az.value),
  }));
  const raw = {
    groups,
    eff: parseFloat(els.pvEff.value),
    tariffType: els.pvTariffType ? els.pvTariffType.value : "simple",
    tariffCycle: els.pvTariffCycle ? els.pvTariffCycle.value : "daily",
    tariff: els.pvTariff && els.pvTariff.value ? parseFloat(els.pvTariff.value) : 0.15,
    tariffPeak: els.pvTariffPeak && els.pvTariffPeak.value ? parseFloat(els.pvTariffPeak.value) : 0.19,
    tariffOffPeak: els.pvTariffOffPeak && els.pvTariffOffPeak.value ? parseFloat(els.pvTariffOffPeak.value) : 0.11,
    thermal: els.pvThermal.value === "temp" ? "temp" : "fixed",
    batteryCap: els.pvBattery ? Math.max(0, parseFloat(els.pvBattery.value) || 0) : 0,
    battMinSoc: els.pvBattMinSoc ? Math.min(100, Math.max(0, parseFloat(els.pvBattMinSoc.value) || 0)) : 20,
    dailyKwh: els.pvDailyKwh ? Math.max(0, parseFloat(els.pvDailyKwh.value) || 0) : 10,
    exportPrice: els.pvExportTariff ? Math.max(0, parseFloat(els.pvExportTariff.value) || 0) : 0.05,
  };
  const tariffCheck = raw.tariffType === "bi-hourly" ? [raw.tariffPeak, raw.tariffOffPeak] : [raw.tariff];
  const bad = [raw.eff, ...tariffCheck, ...groups.flatMap((g) => [g.kwp, g.tilt, g.az])]
    .some((v) => isNaN(v) || v < 0);
  if (bad) {
    showToast(t("pv.toast.bad"));
    return;
  }
  const anyActive = groups.some((g) => g.kwp > 0);
  if (!anyActive) {
    showToast(t("pv.toast.noactive"));
    return;
  }
  els.pvConfig.hidden = true;
  els.pvConfigBtn.setAttribute("aria-expanded", "false");
  savePvSettings(raw);
  if (weatherData) renderDay(selectedDay);
  showToast(t("pv.toast.saved"));
});

els.pvReset.addEventListener("click", () => {
  safeStorageRemove(PV_KEY);
  els.pvConfig.hidden = true;
  els.pvConfigBtn.setAttribute("aria-expanded", "false");
  if (weatherData) renderDay(selectedDay);
  showToast(t("pv.toast.reset"));
});

els.searchInput.addEventListener(
  "input",
  debounce(() => {
    suggestionIndex = -1;
    searchCities(els.searchInput.value);
  }, 280)
);

els.searchInput.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (suggestionsData.length) {
      suggestionIndex = (suggestionIndex + 1) % suggestionsData.length;
      highlightSuggestions();
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (suggestionsData.length) {
      suggestionIndex =
        (suggestionIndex - 1 + suggestionsData.length) % suggestionsData.length;
      highlightSuggestions();
    }
  } else if (e.key === "Enter") {
    if (suggestionIndex >= 0 && suggestionsData[suggestionIndex]) {
      e.preventDefault();
      selectPlace(suggestionsData[suggestionIndex]);
    }
  } else if (e.key === "Escape") {
    closeSuggestions();
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search")) closeSuggestions();
});

els.locateBtn.addEventListener("click", () => {
  if (!("geolocation" in navigator)) {
    showToast(t("toast.geo.unsupported"));
    return;
  }
  els.locateBtn.disabled = true;
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      els.locateBtn.disabled = false;
      const { latitude, longitude } = pos.coords;
      const mine = t("place.mine");
      try {
        const data = await fetchJSON(
          `${REVERSE_GEO_API}?latitude=${latitude}&longitude=${longitude}&language=${lang === "pt" ? "pt" : "en"}&format=json`
        );
        const place = data.results?.[0];
        loadWeather(latitude, longitude, place ? place.name : mine, place ? place.country : "");
      } catch {
        loadWeather(latitude, longitude, mine, "");
      }
    },
    (err) => {
      els.locateBtn.disabled = false;
      showToast(t("toast.geo.fail"));
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

els.dayPrevBtn.addEventListener("click", () => navDay(-1));
els.dayNextBtn.addEventListener("click", () => navDay(1));

els.pvExportBtn.addEventListener("click", exportPvCsv);

(async function init() {
  unitCelsius = safeStorageGet(UNIT_KEY) !== "f";
  unitWind = safeStorageGet(WIND_UNIT_KEY) === "mph" ? "mph" : "kmh";
  document.getElementById("appVersion").textContent = APP_VERSION;
  applyStaticTranslations();
  applyTheme();
  applyUnitButtons();
  applyWindUnitButtons();
  renderRecents();
  document.querySelectorAll(".lang__btn").forEach((b) => {
    b.addEventListener("click", () => setLang(b.getAttribute("data-lang")));
  });
  document.querySelectorAll(".unit__btn:not(.wind__btn)").forEach((b) => {
    b.addEventListener("click", () => setUnit(b.getAttribute("data-unit")));
  });
  document.querySelectorAll(".wind__btn").forEach((b) => {
    b.addEventListener("click", () => setWindUnit(b.getAttribute("data-wind")));
  });
  document.querySelectorAll(".pv-view-btn").forEach((b) => {
    b.addEventListener("click", () => setPvViewMode(b.getAttribute("data-mode")));
  });
  const statWindBox = document.getElementById("statWindBox");
  if (statWindBox) {
    statWindBox.addEventListener("click", toggleWindUnit);
    statWindBox.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleWindUnit();
      }
    });
  }

  if (els.statUvBox) {
    els.statUvBox.addEventListener("click", toggleHeroAlerts);
    els.statUvBox.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleHeroAlerts();
      }
    });
  }

  if (els.heroAlertChip) {
    els.heroAlertChip.addEventListener("click", toggleHeroAlerts);
    els.heroAlertChip.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleHeroAlerts();
      }
    });
  }
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
      if (!safeStorageGet(THEME_KEY)) {
        applyTheme();
      }
    });
  }
  els.themeBtn.addEventListener("click", toggleTheme);
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
  const saved = safeStorageGet("skycast:region");
  if (saved) {
    try {
      const p = JSON.parse(saved);
      await loadWeather(p.lat, p.lon, p.name, p.region);
      return;
    } catch {}
  }
  try {
    const geo = await fetchJSON(
      "https://ipapi.co/json/"
    ).catch(() => null);
    if (geo && geo.latitude && geo.longitude) {
      await loadWeather(
        geo.latitude,
        geo.longitude,
        geo.city || t("place.mine"),
        geo.country_name || ""
      );
    } else {
      await loadWeather(38.7223, -9.1393, "Lisboa", "Portugal");
    }
  } catch {
    await loadWeather(38.7223, -9.1393, "Lisboa", "Portugal");
  }
})();