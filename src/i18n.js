/**
 * Internationalization helpers and copy catalog.
 */

export const DEFAULT_LANGUAGE = 'es';
export const LANGUAGE_STORAGE_KEY = 'soundlevel_language';

export const SUPPORTED_LANGUAGES = [
  { code: 'es', label: 'Español' },
  { code: 'gl', label: 'Galego' },
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ca', label: 'Català' },
  { code: 'eu', label: 'Euskara' },
];

const TRANSLATIONS = {
  es: {
    htmlLang: 'es',
    title: '🔊 SoundLevel - Monitor de Sonido en Clase',
    description:
      'Monitor de sonido ambiental para el aula. Mide el ruido en clase de forma divertida y ayuda a los alumnos a autorregularse.',
    languageLabel: 'Idioma',
    languageButtonLabel: 'Seleccionar idioma',
    appSubtitle: 'Monitor de Sonido en Clase',
    settingsButtonLabel: 'Abrir ajustes de niveles',
    settingsPanelLabel: 'Ajustes de niveles',
    settingsTitle: 'Ajuste de Niveles',
    thresholdWhisper: 'Límite medio',
    thresholdBalanced: 'Límite alto',
    thresholdLoud: 'Límite peligro',
    startButton: 'Empezar a medir',
    stopButton: 'Detener',
    meterUnit: 'nivel',
    historyLabel: '📊 Últimos 60 segundos',
    historyPlaceholder: 'Los datos aparecerán aquí...',
    statusIdle: 'Pulsa el micrófono para comenzar a medir 🎤',
    statusListening: 'Midiendo sonido en tiempo real...',
    mascotIdle: '¡Haz clic en el botón para empezar!',
    mascotListening: '¡Escuchando... a ver qué tal! 👂',
    mascotStopped: '¡Hasta la próxima! 👋',
    microphoneError:
      '⚠️ Necesitamos acceso al micrófono para medir el sonido. Permítelo en tu navegador.',
    streakLabel: 'Racha en zona ideal',
    bestStreakLabel: 'Mejor racha',
    zonesAriaLabel: 'Zonas de volumen',
    mascotAriaLabel: 'Mascota',
    meterAriaLabel: 'Medidor de nivel de sonido',
    historyAriaLabel: 'Historial reciente de niveles',
    zoneLabels: {
      whisper: 'Susurro',
      balanced: 'Equilibrio',
      loud: '¡Sube!',
      tooLoud: '¡Demasiado!',
    },
    zoneMessages: {
      whisper: [
        '¡Silencio absoluto! ¿Estáis ahí? 👻',
        '¡Modo ninja activado! 🥷',
      ],
      balanced: [
        '¡Perfecto! ¡Nivel ideal para trabajar! 💪',
        '¡Gran trabajo de equipo! 🤝',
      ],
      loud: [
        '¡Ey! ¡Bajemos un poquito! 📢',
        '¡Vamos a usar voz de interior! 🏠',
      ],
      tooLoud: [
        '🚨 ¡ALERTA ROJA! ¡Demasiado ruido! 🚨',
        '¡Respira hondo y baja el volumen! 🌬️',
      ],
    },
    streakMessages: {
      10: '👏 ¡10 segundos en zona ideal! ¡Seguid así! 👏',
      30: '🔥 ¡30 segundos! ¡La racha sigue! 🔥',
      60: '⭐ ¡1 MINUTO! ¡Sois unos cracks! ⭐',
      120: '🎉🎉 ¡2 MINUTOS en zona ideal! ¡Increíble! 🎉🎉',
      180: '🏆🏆🏆 ¡3 MINUTOS! ¡Sois leyendas del silencio! 🏆🏆🏆',
      default: '✨ ¡Gran trabajo! ✨',
    },
    timeUnits: { second: 's', minute: 'm' },
  },
  gl: {
    htmlLang: 'gl',
    title: '🔊 SoundLevel - Monitor de Son na Aula',
    description:
      'Monitor de son ambiental para a aula. Mide o ruído na clase dun xeito divertido e axuda ao alumnado a autorregularse.',
    languageLabel: 'Idioma',
    languageButtonLabel: 'Seleccionar idioma',
    appSubtitle: 'Monitor de Son na Aula',
    settingsButtonLabel: 'Abrir axustes de niveis',
    settingsPanelLabel: 'Axustes de niveis',
    settingsTitle: 'Axuste de Niveis',
    thresholdWhisper: 'Límite medio',
    thresholdBalanced: 'Límite alto',
    thresholdLoud: 'Límite de perigo',
    startButton: 'Comezar a medir',
    stopButton: 'Deter',
    meterUnit: 'nivel',
    historyLabel: '📊 Últimos 60 segundos',
    historyPlaceholder: 'Os datos aparecerán aquí...',
    statusIdle: 'Preme o micrófono para comezar a medir 🎤',
    statusListening: 'Medindo o son en tempo real...',
    mascotIdle: 'Preme no botón para empezar!',
    mascotListening: 'Escoitando... a ver que tal vai! 👂',
    mascotStopped: 'Ata a próxima! 👋',
    microphoneError:
      '⚠️ Precisamos acceso ao micrófono para medir o son. Permíteo no navegador.',
    streakLabel: 'Racha en zona ideal',
    bestStreakLabel: 'Mellor racha',
    zonesAriaLabel: 'Zonas de volume',
    mascotAriaLabel: 'Mascota',
    meterAriaLabel: 'Medidor de nivel de son',
    historyAriaLabel: 'Historial recente de niveis',
    zoneLabels: {
      whisper: 'Sussurro',
      balanced: 'Equilibrio',
      loud: 'Sube!',
      tooLoud: 'Demasiado!',
    },
    zoneMessages: {
      whisper: [
        'Silencio absoluto! Estades aí? 👻',
        'Modo ninja activado! 🥷',
      ],
      balanced: [
        'Perfecto! Nivel ideal para traballar! 💪',
        'Gran traballo en equipo! 🤝',
      ],
      loud: [
        'Ei! Baixemos un chisquiño! 📢',
        'Imos usar voz de interior! 🏠',
      ],
      tooLoud: [
        '🚨 ALERTA VERMELLA! Demasiado ruído! 🚨',
        'Respira fondo e baixa o volume! 🌬️',
      ],
    },
    streakMessages: {
      10: '👏 10 segundos en zona ideal! Seguide así! 👏',
      30: '🔥 30 segundos! A racha continúa! 🔥',
      60: '⭐ 1 MINUTO! Sodes unhas máquinas! ⭐',
      120: '🎉🎉 2 MINUTOS en zona ideal! Incrible! 🎉🎉',
      180: '🏆🏆🏆 3 MINUTOS! Sodes lendas do silencio! 🏆🏆🏆',
      default: '✨ Gran traballo! ✨',
    },
    timeUnits: { second: 's', minute: 'm' },
  },
  en: {
    htmlLang: 'en',
    title: '🔊 SoundLevel - Classroom Sound Monitor',
    description:
      'A classroom sound monitor that measures noise in a playful way and helps students self-regulate.',
    languageLabel: 'Language',
    languageButtonLabel: 'Select language',
    appSubtitle: 'Classroom Sound Monitor',
    settingsButtonLabel: 'Open level settings',
    settingsPanelLabel: 'Level settings',
    settingsTitle: 'Level Settings',
    thresholdWhisper: 'Medium limit',
    thresholdBalanced: 'High limit',
    thresholdLoud: 'Danger limit',
    startButton: 'Start measuring',
    stopButton: 'Stop',
    meterUnit: 'level',
    historyLabel: '📊 Last 60 seconds',
    historyPlaceholder: 'Data will appear here...',
    statusIdle: 'Press the microphone to start measuring 🎤',
    statusListening: 'Measuring sound in real time...',
    mascotIdle: 'Click the button to get started!',
    mascotListening: 'Listening... let us see how it goes! 👂',
    mascotStopped: 'See you next time! 👋',
    microphoneError:
      '⚠️ We need microphone access to measure sound. Please allow it in your browser.',
    streakLabel: 'Ideal-zone streak',
    bestStreakLabel: 'Best streak',
    zonesAriaLabel: 'Volume zones',
    mascotAriaLabel: 'Mascot',
    meterAriaLabel: 'Sound level meter',
    historyAriaLabel: 'Recent level history',
    zoneLabels: {
      whisper: 'Whisper',
      balanced: 'Balanced',
      loud: 'Too High',
      tooLoud: 'Way Too Loud',
    },
    zoneMessages: {
      whisper: [
        'Absolute silence! Are you even there? 👻',
        'Ninja mode activated! 🥷',
      ],
      balanced: [
        'Perfect! Ideal level for working! 💪',
        'Great teamwork! 🤝',
      ],
      loud: [
        'Hey! Let us bring it down a bit! 📢',
        'Indoor voices, please! 🏠',
      ],
      tooLoud: [
        '🚨 RED ALERT! Too much noise! 🚨',
        'Take a breath and bring the volume down! 🌬️',
      ],
    },
    streakMessages: {
      10: '👏 10 seconds in the ideal zone! Keep it up! 👏',
      30: '🔥 30 seconds! The streak is alive! 🔥',
      60: '⭐ 1 MINUTE! You are crushing it! ⭐',
      120: '🎉🎉 2 MINUTES in the ideal zone! Incredible! 🎉🎉',
      180: '🏆🏆🏆 3 MINUTES! Silence legends! 🏆🏆🏆',
      default: '✨ Great work! ✨',
    },
    timeUnits: { second: 's', minute: 'm' },
  },
  pt: {
    htmlLang: 'pt',
    title: '🔊 SoundLevel - Monitor de Som na Sala de Aula',
    description:
      'Monitor de som ambiente para a sala de aula. Mede o ruído de forma divertida e ajuda os alunos a se autorregularem.',
    languageLabel: 'Idioma',
    languageButtonLabel: 'Selecionar idioma',
    appSubtitle: 'Monitor de Som na Sala de Aula',
    settingsButtonLabel: 'Abrir ajustes de níveis',
    settingsPanelLabel: 'Ajustes de níveis',
    settingsTitle: 'Ajuste de Níveis',
    thresholdWhisper: 'Limite médio',
    thresholdBalanced: 'Limite alto',
    thresholdLoud: 'Limite de perigo',
    startButton: 'Começar a medir',
    stopButton: 'Parar',
    meterUnit: 'nível',
    historyLabel: '📊 Últimos 60 segundos',
    historyPlaceholder: 'Os dados aparecerão aqui...',
    statusIdle: 'Toque no microfone para começar a medir 🎤',
    statusListening: 'Medindo o som em tempo real...',
    mascotIdle: 'Clique no botão para começar!',
    mascotListening: 'Ouvindo... vamos ver como está! 👂',
    mascotStopped: 'Até a próxima! 👋',
    microphoneError:
      '⚠️ Precisamos de acesso ao microfone para medir o som. Permita isso no navegador.',
    streakLabel: 'Sequência na zona ideal',
    bestStreakLabel: 'Melhor sequência',
    zonesAriaLabel: 'Zonas de volume',
    mascotAriaLabel: 'Mascote',
    meterAriaLabel: 'Medidor de nível de som',
    historyAriaLabel: 'Histórico recente de níveis',
    zoneLabels: {
      whisper: 'Sussurro',
      balanced: 'Equilíbrio',
      loud: 'Alto demais',
      tooLoud: 'Exagerado',
    },
    zoneMessages: {
      whisper: [
        'Silêncio total! Tem alguém aí? 👻',
        'Modo ninja ativado! 🥷',
      ],
      balanced: [
        'Perfeito! Nível ideal para trabalhar! 💪',
        'Ótimo trabalho em equipe! 🤝',
      ],
      loud: [
        'Ei! Vamos baixar um pouco! 📢',
        'Vamos usar voz de sala de aula! 🏠',
      ],
      tooLoud: [
        '🚨 ALERTA VERMELHO! Barulho demais! 🚨',
        'Respire fundo e abaixe o volume! 🌬️',
      ],
    },
    streakMessages: {
      10: '👏 10 segundos na zona ideal! Continuem assim! 👏',
      30: '🔥 30 segundos! A sequência continua! 🔥',
      60: '⭐ 1 MINUTO! Vocês mandaram bem! ⭐',
      120: '🎉🎉 2 MINUTOS na zona ideal! Incrível! 🎉🎉',
      180: '🏆🏆🏆 3 MINUTOS! Lendas do silêncio! 🏆🏆🏆',
      default: '✨ Excelente trabalho! ✨',
    },
    timeUnits: { second: 's', minute: 'm' },
  },
  fr: {
    htmlLang: 'fr',
    title: '🔊 SoundLevel - Moniteur Sonore pour la Classe',
    description:
      'Un moniteur sonore pour la classe qui mesure le bruit de façon ludique et aide les élèves à s’autoréguler.',
    languageLabel: 'Langue',
    languageButtonLabel: 'Choisir la langue',
    appSubtitle: 'Moniteur Sonore pour la Classe',
    settingsButtonLabel: 'Ouvrir les réglages des niveaux',
    settingsPanelLabel: 'Réglages des niveaux',
    settingsTitle: 'Réglage des Niveaux',
    thresholdWhisper: 'Limite moyenne',
    thresholdBalanced: 'Limite haute',
    thresholdLoud: 'Limite danger',
    startButton: 'Commencer la mesure',
    stopButton: 'Arrêter',
    meterUnit: 'niveau',
    historyLabel: '📊 60 dernières secondes',
    historyPlaceholder: 'Les données apparaîtront ici...',
    statusIdle: 'Appuyez sur le micro pour commencer la mesure 🎤',
    statusListening: 'Mesure du son en temps réel...',
    mascotIdle: 'Cliquez sur le bouton pour commencer !',
    mascotListening: 'À l’écoute... voyons comment ça se passe ! 👂',
    mascotStopped: 'À bientôt ! 👋',
    microphoneError:
      '⚠️ Nous avons besoin de l’accès au microphone pour mesurer le son. Autorisez-le dans votre navigateur.',
    streakLabel: 'Série en zone idéale',
    bestStreakLabel: 'Meilleure série',
    zonesAriaLabel: 'Zones de volume',
    mascotAriaLabel: 'Mascotte',
    meterAriaLabel: 'Indicateur de niveau sonore',
    historyAriaLabel: 'Historique récent des niveaux',
    zoneLabels: {
      whisper: 'Chuchotement',
      balanced: 'Équilibre',
      loud: 'Trop fort',
      tooLoud: 'Beaucoup trop fort',
    },
    zoneMessages: {
      whisper: [
        'Silence total ! Vous êtes encore là ? 👻',
        'Mode ninja activé ! 🥷',
      ],
      balanced: [
        'Parfait ! Niveau idéal pour travailler ! 💪',
        'Très beau travail d’équipe ! 🤝',
      ],
      loud: [
        'Hé ! On baisse un peu le volume ! 📢',
        'On garde une voix de classe, s’il vous plaît ! 🏠',
      ],
      tooLoud: [
        '🚨 ALERTE ROUGE ! Trop de bruit ! 🚨',
        'Respirez un grand coup et baissez le volume ! 🌬️',
      ],
    },
    streakMessages: {
      10: '👏 10 secondes en zone idéale ! Continuez ! 👏',
      30: '🔥 30 secondes ! La série continue ! 🔥',
      60: '⭐ 1 MINUTE ! Vous assurez ! ⭐',
      120: '🎉🎉 2 MINUTES en zone idéale ! Incroyable ! 🎉🎉',
      180: '🏆🏆🏆 3 MINUTES ! Légendes du silence ! 🏆🏆🏆',
      default: '✨ Excellent travail ! ✨',
    },
    timeUnits: { second: 's', minute: 'm' },
  },
  de: {
    htmlLang: 'de',
    title: '🔊 SoundLevel - Geräuschmonitor fürs Klassenzimmer',
    description:
      'Ein Geräuschmonitor für das Klassenzimmer, der Lautstärke spielerisch misst und Schülerinnen und Schülern bei der Selbstregulation hilft.',
    languageLabel: 'Sprache',
    languageButtonLabel: 'Sprache auswählen',
    appSubtitle: 'Geräuschmonitor fürs Klassenzimmer',
    settingsButtonLabel: 'Pegel-Einstellungen öffnen',
    settingsPanelLabel: 'Pegel-Einstellungen',
    settingsTitle: 'Pegel-Einstellungen',
    thresholdWhisper: 'Mittlere Grenze',
    thresholdBalanced: 'Hohe Grenze',
    thresholdLoud: 'Gefahrengrenze',
    startButton: 'Messung starten',
    stopButton: 'Stoppen',
    meterUnit: 'pegel',
    historyLabel: '📊 Letzte 60 Sekunden',
    historyPlaceholder: 'Die Daten erscheinen hier...',
    statusIdle: 'Drücke auf das Mikrofon, um zu starten 🎤',
    statusListening: 'Geräusch wird in Echtzeit gemessen...',
    mascotIdle: 'Klicke auf den Button, um zu starten!',
    mascotListening: 'Ich höre zu... mal sehen, wie es läuft! 👂',
    mascotStopped: 'Bis zum nächsten Mal! 👋',
    microphoneError:
      '⚠️ Wir brauchen Mikrofonzugriff, um den Ton zu messen. Bitte erlaube ihn im Browser.',
    streakLabel: 'Serie in der Idealzone',
    bestStreakLabel: 'Beste Serie',
    zonesAriaLabel: 'Lautstärkezonen',
    mascotAriaLabel: 'Maskottchen',
    meterAriaLabel: 'Schallpegel-Anzeige',
    historyAriaLabel: 'Verlauf der letzten Werte',
    zoneLabels: {
      whisper: 'Flüstern',
      balanced: 'Ausgeglichen',
      loud: 'Zu laut',
      tooLoud: 'Viel zu laut',
    },
    zoneMessages: {
      whisper: [
        'Absolute Stille! Seid ihr noch da? 👻',
        'Ninja-Modus aktiviert! 🥷',
      ],
      balanced: [
        'Perfekt! Idealer Pegel zum Arbeiten! 💪',
        'Tolles Teamwork! 🤝',
      ],
      loud: [
        'Hey! Ein bisschen leiser bitte! 📢',
        'Bitte mit Klassenzimmerstimme sprechen! 🏠',
      ],
      tooLoud: [
        '🚨 ROTALARM! Viel zu laut! 🚨',
        'Tief durchatmen und leiser werden! 🌬️',
      ],
    },
    streakMessages: {
      10: '👏 10 Sekunden in der Idealzone! Weiter so! 👏',
      30: '🔥 30 Sekunden! Die Serie läuft! 🔥',
      60: '⭐ 1 MINUTE! Ihr seid stark! ⭐',
      120: '🎉🎉 2 MINUTEN in der Idealzone! Unglaublich! 🎉🎉',
      180: '🏆🏆🏆 3 MINUTEN! Legenden der Stille! 🏆🏆🏆',
      default: '✨ Großartige Arbeit! ✨',
    },
    timeUnits: { second: 's', minute: 'm' },
  },
  ca: {
    htmlLang: 'ca',
    title: '🔊 SoundLevel - Monitor de So a l’Aula',
    description:
      'Monitor de so ambiental per a l’aula. Mesura el soroll d’una manera divertida i ajuda l’alumnat a autoregular-se.',
    languageLabel: 'Idioma',
    languageButtonLabel: 'Seleccionar idioma',
    appSubtitle: 'Monitor de So a l’Aula',
    settingsButtonLabel: 'Obre els ajustos de nivells',
    settingsPanelLabel: 'Ajustos de nivells',
    settingsTitle: 'Ajust de Nivells',
    thresholdWhisper: 'Límit mitjà',
    thresholdBalanced: 'Límit alt',
    thresholdLoud: 'Límit de perill',
    startButton: 'Comença a mesurar',
    stopButton: 'Atura',
    meterUnit: 'nivell',
    historyLabel: '📊 Últims 60 segons',
    historyPlaceholder: 'Les dades apareixeran aquí...',
    statusIdle: 'Prem el micròfon per començar a mesurar 🎤',
    statusListening: 'Mesurant el so en temps real...',
    mascotIdle: 'Fes clic al botó per començar!',
    mascotListening: 'Escoltant... a veure com va! 👂',
    mascotStopped: 'Fins la propera! 👋',
    microphoneError:
      '⚠️ Necessitem accés al micròfon per mesurar el so. Permet-lo al navegador.',
    streakLabel: 'Ratxa a la zona ideal',
    bestStreakLabel: 'Millor ratxa',
    zonesAriaLabel: 'Zones de volum',
    mascotAriaLabel: 'Mascota',
    meterAriaLabel: 'Mesurador de nivell de so',
    historyAriaLabel: 'Historial recent de nivells',
    zoneLabels: {
      whisper: 'Xiuxiueig',
      balanced: 'Equilibri',
      loud: 'Massa alt',
      tooLoud: 'Excessiu',
    },
    zoneMessages: {
      whisper: [
        'Silenci absolut! Hi sou? 👻',
        'Mode ninja activat! 🥷',
      ],
      balanced: [
        'Perfecte! Nivell ideal per treballar! 💪',
        'Molt bona feina en equip! 🤝',
      ],
      loud: [
        'Ep! Baixem una mica! 📢',
        'Fem servir veu d’aula, si us plau! 🏠',
      ],
      tooLoud: [
        '🚨 ALERTA VERMELLA! Massa soroll! 🚨',
        'Respira fons i baixa el volum! 🌬️',
      ],
    },
    streakMessages: {
      10: '👏 10 segons a la zona ideal! Continueu així! 👏',
      30: '🔥 30 segons! La ratxa continua! 🔥',
      60: '⭐ 1 MINUT! Sou genials! ⭐',
      120: '🎉🎉 2 MINUTS a la zona ideal! Increïble! 🎉🎉',
      180: '🏆🏆🏆 3 MINUTS! Llegendes del silenci! 🏆🏆🏆',
      default: '✨ Molt bona feina! ✨',
    },
    timeUnits: { second: 's', minute: 'm' },
  },
  eu: {
    htmlLang: 'eu',
    title: '🔊 SoundLevel - Ikasgelako Soinu Monitorea',
    description:
      'Ikasgelarako giro-soinu monitorea. Zarata modu dibertigarrian neurtzen du eta ikasleei beren burua erregulatzen laguntzen die.',
    languageLabel: 'Hizkuntza',
    languageButtonLabel: 'Hizkuntza hautatu',
    appSubtitle: 'Ikasgelako Soinu Monitorea',
    settingsButtonLabel: 'Mailen ezarpenak ireki',
    settingsPanelLabel: 'Mailen ezarpenak',
    settingsTitle: 'Mailen Ezarpena',
    thresholdWhisper: 'Muga ertaina',
    thresholdBalanced: 'Muga altua',
    thresholdLoud: 'Arrisku muga',
    startButton: 'Neurtzen hasi',
    stopButton: 'Gelditu',
    meterUnit: 'maila',
    historyLabel: '📊 Azken 60 segundoak',
    historyPlaceholder: 'Datuak hemen agertuko dira...',
    statusIdle: 'Sakatu mikrofonoa neurtzen hasteko 🎤',
    statusListening: 'Soinua denbora errealean neurtzen...',
    mascotIdle: 'Egin klik botoian hasteko!',
    mascotListening: 'Entzuten... ikus dezagun zer moduz! 👂',
    mascotStopped: 'Hurrengora arte! 👋',
    microphoneError:
      '⚠️ Mikrofonoaren sarbidea behar dugu soinua neurtzeko. Baimendu nabigatzailean.',
    streakLabel: 'Eremu idealeko bolada',
    bestStreakLabel: 'Boladarik onena',
    zonesAriaLabel: 'Bolumen eremuak',
    mascotAriaLabel: 'Maskota',
    meterAriaLabel: 'Soinu mailaren neurgailua',
    historyAriaLabel: 'Azken mailen historia',
    zoneLabels: {
      whisper: 'Xuxurla',
      balanced: 'Oreka',
      loud: 'Altuegia',
      tooLoud: 'Gehiegizkoa',
    },
    zoneMessages: {
      whisper: [
        'Isiltasun osoa! Hor al zaudete? 👻',
        'Ninja modua aktibatuta! 🥷',
      ],
      balanced: [
        'Primeran! Lan egiteko maila egokia! 💪',
        'Talde-lan bikaina! 🤝',
      ],
      loud: [
        'Aizu! Jaitsi dezagun pixka bat! 📢',
        'Ikasgelako ahotsa erabili dezagun! 🏠',
      ],
      tooLoud: [
        '🚨 ALERTA GORRIA! Zarata gehiegi! 🚨',
        'Arnasa hartu eta bolumena jaitsi! 🌬️',
      ],
    },
    streakMessages: {
      10: '👏 10 segundo eremu idealean! Segi horrela! 👏',
      30: '🔥 30 segundo! Boladak jarraitzen du! 🔥',
      60: '⭐ MINUTU 1! Primeran zabiltzate! ⭐',
      120: '🎉🎉 2 MINUTU eremu idealean! Sinestezina! 🎉🎉',
      180: '🏆🏆🏆 3 MINUTU! Isiltasunaren kondairak! 🏆🏆🏆',
      default: '✨ Lan bikaina! ✨',
    },
    timeUnits: { second: 's', minute: 'm' },
  },
};

export function normalizeLanguage(value) {
  if (!value) return DEFAULT_LANGUAGE;
  const normalized = value.toLowerCase();
  const shortCode = normalized.split('-')[0];
  return TRANSLATIONS[shortCode] ? shortCode : DEFAULT_LANGUAGE;
}

export function detectLanguage() {
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];

  for (const browserLanguage of browserLanguages) {
    const normalized = normalizeLanguage(browserLanguage);
    if (TRANSLATIONS[normalized]) {
      return normalized;
    }
  }

  return DEFAULT_LANGUAGE;
}

export function getTranslation(language) {
  return TRANSLATIONS[normalizeLanguage(language)];
}

export function getRandomZoneMessage(language, zoneId) {
  const translation = getTranslation(language);
  const messages = translation.zoneMessages[zoneId] || [];
  return messages[Math.floor(Math.random() * messages.length)] || translation.statusListening;
}

export function getStreakMessage(language, seconds) {
  const messages = getTranslation(language).streakMessages;

  if (seconds >= 180) return messages[180];
  if (seconds >= 120) return messages[120];
  if (seconds >= 60) return messages[60];
  if (seconds >= 30) return messages[30];
  if (seconds >= 10) return messages[10];

  return messages.default;
}

export function formatDuration(language, seconds) {
  const { second, minute } = getTranslation(language).timeUnits;

  if (seconds < 60) {
    return `${seconds}${second}`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}${minute} ${remainder}${second}`;
}
