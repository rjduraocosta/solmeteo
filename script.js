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
  themeBtn: document.getElementById("themeBtn"),
};

let weatherData = null;
let placeName = "";
let selectedDay = 0;
let unitCelsius = true;

const PV_KEY = "skycast:pv";
const RECENTS_KEY = "skycast:recents";
const THEME_KEY = "skycast:theme";
const UNIT_KEY = "skycast:unit";
const PV_PALETTE = ["#38bdf8", "#818cf8", "#34d399", "#fb7185"];
const PV_TOTAL_COLOR = "#fbbf24";
const AQI_API = "https://air-quality-api.open-meteo.com/v1/air-quality";
const REVERSE_GEO_API = "https://geocoding-api.open-meteo.com/v1/reverse";
const WEATHER_CACHE_KEY = "skycast:wc";
const CACHE_TTL_MS = 20 * 60 * 1000;
const APP_VERSION = "2.5.2";

const LANG_KEY = "skycast:lang";
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

let lang = localStorage.getItem(LANG_KEY);
if (!I18N[lang]) lang = "pt";
const saveLang = (next) => {
  lang = I18N[next] ? next : "pt";
  localStorage.setItem(LANG_KEY, lang);
};
const t = (key, args) => {
  let s = I18N[lang][key];
  if (s == null) s = key;
  if (args) args.forEach((v, i) => {
    s = s.split("{" + i + "}").join(String(v));
  });
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
    const raw = localStorage.getItem(WEATHER_CACHE_KEY);
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
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(store));
  } catch {}
}

function getRecents() {
  try {
    const raw = localStorage.getItem(RECENTS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.slice(0, 6) : [];
  } catch {
    return [];
  }
}

function saveRecents(list) {
  try {
    localStorage.setItem(RECENTS_KEY, JSON.stringify(list.slice(0, 6)));
  } catch {}
}

function addRecent(place) {
  const lat = Number(place.lat);
  const lon = Number(place.lon);
  const list = getRecents().filter((p) => p && !(Number(p.lat) === lat && Number(p.lon) === lon));
  list.unshift({ lat, lon, name: place.name || t("place.fallback"), region: place.region || "" });
  saveRecents(list);
  renderRecents();
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
      "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",
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
  return `${data.latitude.toFixed(2)}°, ${data.longitude.toFixed(2)}°`;
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
  document.querySelectorAll(".unit__btn").forEach((b) => {
    b.classList.toggle("active", b.getAttribute("data-unit") === (unitCelsius ? "c" : "f"));
  });
}

function setUnit(next) {
  const isC = next === "c";
  unitCelsius = isC;
  localStorage.setItem(UNIT_KEY, isC ? "c" : "f");
  applyUnitButtons();
  if (weatherData) renderDay(selectedDay);
}

function applyTheme() {
  const theme = localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#eef2f9" : "#0b1020");
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem(THEME_KEY, next);
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
  els.statWind.textContent = `${Math.round(c.wind_speed_10m)} km/h ${degToCompass(c.wind_direction_10m)}`;
  els.statUv.textContent = uvLevel(c.uv_index);

  els.sunrise.textContent = formatTime(data.daily.sunrise[0]);
  els.sunset.textContent = formatTime(data.daily.sunset[0]);
  els.heroCoords.textContent = coordsLabel(data);
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
  els.statWind.textContent = `${Math.round(data.hourly.wind_speed_10m[idx])} km/h`;
  els.statUv.textContent = uvLevel(data.hourly.uv_index[idx] || 0);

  els.sunrise.textContent = formatTime(data.daily.sunrise[day]);
  els.sunset.textContent = formatTime(data.daily.sunset[day]);
  els.heroCoords.textContent = coordsLabel(data);
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
    tariff: 0.15,
    thermal: "fixed",
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
  const saved = localStorage.getItem(PV_KEY);
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
      tariff: s.tariff != null ? Number(s.tariff) : def.tariff,
      thermal: s.thermal === "temp" ? "temp" : "fixed",
      groups,
    };
  } catch {
    return def;
  }
}

function savePvSettings(s) {
  localStorage.setItem(PV_KEY, JSON.stringify(s));
}

function pvConfigPreview() {
  const s = loadPvSettings(weatherData ? weatherData.latitude : 0);
  const active = s.groups.filter((g) => g.kwp > 0);
  const total = active.reduce((a, g) => a + g.kwp, 0);
  const names = active.map((g) => `${fmtDec(g.kwp)} kWp · ${compassName(g.az)} ${g.az}° · ${g.tilt}°`).join(" + ");
  const thermal = s.thermal === "temp" ? t("pv.thermal.saved.real") : t("pv.thermal.saved.fixed");
  els.pvSummary.textContent =
    `${fmtDec(total)} kWp ${names ? "[" + names + "]" : ""} · ${s.eff}% · ${fmtTariff(s.tariff)} €/kWh · ${thermal}`;
}

function fmtTariff(v) {
  return Number(v).toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
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
  els.pvTariff.value = s.tariff;
  els.pvThermal.value = s.thermal;
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
  const euros = total * settings.tariff;
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
              <span class="pv-mini__kwh">${pg.total.toFixed(1)} kWh</span>
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
  els.pvChart.innerHTML = buildPvChart(sumProd, { h: 170, color: PV_TOTAL_COLOR, id: "pvGradTotal" });
  els.pvEcon.innerHTML = t("pv.cmp", [
    perGroup.length || 0,
    total.toFixed(1),
    euros.toFixed(2),
    settings.tariff.toFixed(3),
    thermalNote,
  ]);
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
  els.pvWeeklyTotal.textContent = `${week.toFixed(1)} kWh · ${(week * settings.tariff).toFixed(2)} €`;
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
    value.textContent = v.toFixed(1) + " kWh";
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
  const pad = 6;
  const color = opts.color || "#34d399";
  const gid = opts.id || "pvGrad";
  const n = production.length || 1;
  const maxV = Math.max.apply(null, production.concat([0.1]));
  const stepX = (W - pad * 2) / n;
  const bw = Math.min(Math.max(stepX * 0.62, 6), 20);
  const plotH = H - 14;

  let bars = "";
  production.forEach((v, i) => {
    const h = v > 0 ? Math.max((v / maxV) * plotH, 2) : 0;
    const cx = pad + stepX * i + stepX / 2;
    bars += `
      <rect x="${(cx - bw / 2).toFixed(1)}" y="${(H - 6 - h).toFixed(1)}"
            width="${bw.toFixed(1)}" height="${h.toFixed(1)}"
            rx="${Math.min(3, bw / 2).toFixed(1)}" fill="url(#${gid})"/>
    `;
  });

  let guides = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    .map((i) => {
      const gx = pad + (i / 12) * (W - pad * 2);
      return `<line x1="${gx.toFixed(1)}" y1="6" x2="${gx.toFixed(1)}" y2="${H - 6}" stroke="#e2e8f0" stroke-opacity="0.05"/>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${t("pv.aria")}">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.4"/>
        </linearGradient>
      </defs>
      ${guides}
      <line x1="${pad}" y1="${H - 6}" x2="${W - pad}" y2="${H - 6}"
            stroke="#3b4a72" stroke-width="1.5" stroke-dasharray="4 4"/>
      ${bars}
    </svg>
  `;
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
    tariff: parseFloat(els.pvTariff.value),
    thermal: els.pvThermal.value === "temp" ? "temp" : "fixed",
  };
  const bad = [raw.eff, raw.tariff, ...groups.flatMap((g) => [g.kwp, g.tilt, g.az])]
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
  localStorage.removeItem(PV_KEY);
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
  unitCelsius = localStorage.getItem(UNIT_KEY) !== "f";
  document.getElementById("appVersion").textContent = APP_VERSION;
  applyStaticTranslations();
  applyTheme();
  applyUnitButtons();
  renderRecents();
  document.querySelectorAll(".lang__btn").forEach((b) => {
    b.addEventListener("click", () => setLang(b.getAttribute("data-lang")));
  });
  document.querySelectorAll(".unit__btn").forEach((b) => {
    b.addEventListener("click", () => setUnit(b.getAttribute("data-unit")));
  });
  els.themeBtn.addEventListener("click", toggleTheme);
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
  const saved = localStorage.getItem("skycast:region");
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