import { VideoItem, PressItem, SocialLink, GalleryPhoto, TrackItem, MerchItem } from '../types';

export const LP_TRACKS_SIDE_ONE: TrackItem[] = [
  { number: 1, title: 'ENEMIGA', duration: '2:00', side: 'ONE' },
  { number: 2, title: 'RISCO', duration: '2:58', side: 'ONE' },
  { number: 3, title: 'MURO DE BERLIM', duration: '2:42', side: 'ONE' },
  { number: 4, title: 'SWEET NOTHIN\'S', duration: '2:18', side: 'ONE', guests: 'Lap steel guitar by Pedro Petracco, Bass and tremolo guitar by Thiago Melvin' },
  { number: 5, title: 'VÍTIMA', duration: '2:56', side: 'ONE' },
  { number: 6, title: 'RECADO', duration: '3:20', side: 'ONE', guests: 'Flute by Kira Krempova' },
];

export const LP_TRACKS_SIDE_TWO: TrackItem[] = [
  { number: 1, title: 'RUNNING OUTTA LUCK', duration: '2:20', side: 'TWO' },
  { number: 2, title: 'CIDADE FANTASMA', duration: '2:55', side: 'TWO' },
  { number: 3, title: 'MOLAMBO', duration: '2:51', side: 'TWO' },
  { number: 4, title: 'COMO O DIABO TE AMA', duration: '3:01', side: 'TWO', guests: 'Lead Guitar by Gabriel Guedes, Acoustic guitar and backings by Lucian Satan' },
  { number: 5, title: 'MACHT NIX', duration: '2:37', side: 'TWO' },
  { number: 6, title: 'ANGELA', duration: '3:59', side: 'TWO', guests: 'Harmonica by Ivanoé Braga' },
  { number: 7, title: 'AO HOMEM QUE DORME NO CHÃO', duration: '2:30', side: 'TWO', guests: 'Brazilian ten-string guitar by Eristhal Luz' },
];

export const SPECIAL_GUESTS = [
  { track: 'SWEET NOTHIN\'S', guest: 'Lap steel guitar by Pedro Petracco, Bass and tremolo guitar by Thiago Melvin' },
  { track: 'RECADO', guest: 'Flute by Kira Krempova' },
  { track: 'COMO O DIABO TE AMA', guest: 'Lead Guitar by Gabriel Guedes, Acoustic guitar and backings by Lucian Satan' },
  { track: 'ANGELA', guest: 'Harmonica by Ivanoé Braga' },
  { track: 'AO HOMEM QUE DORME NO CHÃO', guest: 'Brazilian ten-string guitar by Eristhal Luz' },
];

export const ALBUM_CREDITS = {
  producedAndRecorded: 'Produced and Recorded by Murilo Sá and LOVNIS',
  mixedBy: 'Mixed by Murilo Sá, Bernar Gomma, Amanda Longo, Putti',
  coverArtwork: 'Cover Artwork by Murilo Sá',
  albumDesign: 'Album Design by Murilo and Bernar',
  photographers: 'Photos by Thania Rodriguez, Bruna Marques, Philippe Baptista, Dafne Photographie, Chris Gegembauer, AMICOPADULA, Silvio Pelegrin and Robert Lingott',
  specialGuests: [
    'SWEET NOTHIN\'S: Lap steel guitar by Pedro Petracco, Bass & tremolo guitar by Thiago Melvin',
    'RECADO: Flute by Kira Krempova',
    'COMO O DIABO TE AMA: Lead Guitar by Gabriel Guedes, Acoustic guitar & backings by Lucian Satan',
    'ANGELA: Harmonica by Ivanoé Braga',
    'AO HOMEM QUE DORME NO CHÃO: Brazilian ten-string guitar by Eristhal Luz',
  ],
};

export const LINER_NOTES = {
  dedication: 'In memory of Amanda Longo a.k.a. Suzan Flag (1987-2024)',
  columns: [
    `This self-titled debut is the manifesto of what Amanda and I started as a duo in 2020, Brazil. Separated for two years by the turns of life, we built a master plan to reunite for good. We married, said hello to never and moved to Berlin with two suitcases, a Höfner bass, a Teisco guitar and brand new songs.\n\nDuring those early years we lived in eight temporary flats, spreading our collages, old mobile studio, pictures and paintings all over each place. Cut-ups on the wall, lit candles, lyrics, full ashtrays, empty bottles, whisky and gin.\n\nFor the whole lockdown we slept by day and wrote songs all night. Eyeball on eyeball. There was no goal, but to please ourselves and lock the world outside.\n\nWith concerts allowed again, we started playing live as a duo with a cassette machine. Luckily we found Putti (or he found us), our perfectly matched, big-hearted drum powerhouse. The group was complete when`,
    `Amanda brought Bernar into the band: He came running into the crowd with his red fuzz guitar like a madman. As a four-piece band we played all the concerts of Amanda's last year in Berlin.\n\nLove was the reason this project started. It is the essence of this record and what kept us going together as a group to finish the album.\n\nAfter Amanda left us in November '24, Putti, Bernar and I were left with most of the tracks featuring her voice, bass and guitars recorded. Some months later we sat down. We agreed to continue. What followed was the hardest work we ever did:\n\nA necessary act of love for her and our music, a way to turn our grief into something meaningful. Endless mixing sessions with her voice, however without her unique laugh, jokes or her pushing back on a mix - simply heartbreaking. Eventually, we found joy and gave a new coat of paint to the tragic canvas.`,
    `This collection of songs is our polaroid. It is the sonic journey of our last five years. It stands as the raw final act of Amanda's artistic life, her rolling-stone spirit and the love and music shared by all of us.\n\nWe move into the future, carrying her forever in our hearts and finding new ways to keep alive the fire we started.\n\nFor Amanda, who lived as an artist.\nListen from start to finish.\nThis is the story of our lives.`,
  ],
  authorSignature: 'Murilo Sá',
};

export const BAND_MEMBERS_CREDITS = [
  {
    name: 'AMANDA LONGO',
    role: 'Lead/backing vocals, electric guitar and bass guitar',
    years: '1987 – 2024',
    aka: '',
    image: '/assets/drive/cutouts/amanda.jpg',
    backcoverCutout: '/assets/drive/cutouts/amanda.jpg',
    sessionPhoto: '/assets/drive/amanda-longo.jpg',
  },
  {
    name: 'MURILO SÁ',
    role: 'Lead/backing vocals, electric/acoustic guitar, bass, piano/keys, percussion and drums',
    years: '',
    aka: '',
    image: '/assets/drive/cutouts/murilo.jpg',
    backcoverCutout: '/assets/drive/cutouts/murilo.jpg',
    sessionPhoto: '/assets/drive/murilo-sa.jpg',
  },
  {
    name: 'BERNAR GOMMA',
    role: 'Bass guitar and electric guitar',
    years: '',
    aka: '',
    image: '/assets/drive/cutouts/bernar.jpg',
    backcoverCutout: '/assets/drive/cutouts/bernar.jpg',
    sessionPhoto: '/assets/drive/bernar-gomma.jpg',
  },
  {
    name: 'PUTTI',
    role: 'Drums, percussion and backing vocals',
    years: '',
    aka: '',
    image: '/assets/drive/cutouts/putti.jpg',
    backcoverCutout: '/assets/drive/cutouts/putti.jpg',
    sessionPhoto: '/assets/drive/putti-drums.jpg',
  },
];

export const PRESALE_CONFIG = {
  onlineReleaseDate: '30.10.2026',
  releaseMonthYear: 'October 2026',
  vinylDeliveryForecast: 'Estimated shipping in ~3 months (January/February 2027)',
  cassetteDeliveryForecast: 'Available now · Immediate Dispatch',
  toteDeliveryForecast: 'Available now · Immediate Dispatch',
};

export const MERCH_ITEMS: MerchItem[] = [
  {
    id: 'merch-vinyl-lp',
    title: 'LOVNIS Debut LP (12" Vinyl)',
    subtitle: 'Limited First Edition · Heavyweight 180g Black Vinyl',
    price: '€ 28.00',
    format: '12" Vinyl LP · 33⅓ RPM',
    image: '/assets/drive/vinyl-mockup.png',
    hoverImage: '/assets/drive/back-cover.jpg',
    isPreorder: true,
    badge: 'FLAGSHIP PRE-SALE',
    deliveryForecast: 'Forecast for vinyl delivery: ~3 months from now (Jan/Feb 2027)',
    description:
      'The 13-track debut album recorded in Berlin with Amanda Longo. Mastered for vinyl at 33⅓ RPM, housed in a heavyweight printed sleeve with high-gloss artwork, printed inner sleeve with full lyrics, liner notes and archival band photos.',
    features: [
      '180g Audiophile Black Vinyl',
      'Heavyweight 350gsm Jacket',
      'Printed inner sleeve with Amanda Longo dedication & liner notes',
      'Instant digital download on Online Release Date: 30.10.2026',
    ],
  },
  {
    id: 'merch-cassette',
    title: 'LOVNIS Debut Album Cassette Tape',
    subtitle: 'Limited First Edition · High-Bias Analog Tape with J-Card',
    price: '€ 14.00',
    format: 'Analog Audio Cassette Tape',
    image: '/src/assets/images/lovnis_cassette_merch_1791066574533.jpg',
    hoverImage: '/assets/drive/cover-art-new.jpg',
    isPreorder: false,
    badge: 'AVAILABLE NOW',
    deliveryForecast: 'Available now · Immediate Dispatch',
    description:
      'The complete 13-track debut album recorded in Berlin with Amanda Longo on high-bias analog magnetic cassette. Includes fold-out full-color J-card with lyrics and artwork.',
    features: [
      'High-bias analog tape shell with white pad printing',
      'Fold-out multi-panel J-card with lyrics & liner notes',
      'Includes digital FLAC / MP3 download code',
      'Worldwide immediate shipping',
    ],
  },
  {
    id: 'merch-tote',
    title: 'LOVNIS Canvas Tote Bag',
    subtitle: '100% Organic Heavy Cotton · Hand Screenprinted',
    price: '€ 18.00',
    format: 'Screenprinted Canvas Tote Bag',
    image: '/assets/drive/tote-bag.jpg',
    hoverImage: '/assets/drive/tote-bag.jpg',
    isPreorder: false,
    badge: 'AVAILABLE NOW',
    deliveryForecast: 'Available now · Immediate Dispatch',
    description:
      'Official LOVNIS durable heavyweight natural cotton canvas tote bag. Long reinforced handles, fits vinyl records comfortably for everyday carry.',
    features: [
      'Fits up to 25 12" vinyl records comfortably',
      '100% organic heavy combed cotton canvas',
      'Hand screenprinted in Berlin',
      'Reinforced cross-stitching on handles',
    ],
  },
  {
    id: 'merch-art-print',
    title: 'LOVNIS 12" Debut Album Art Print',
    subtitle: 'Limited Edition 12" × 12" Archival Screenprint',
    price: '€ 12.00',
    format: '12" × 12" Heavyweight Art Print',
    image: '/assets/drive/cover-art.jpg',
    hoverImage: '/assets/drive/back-cover.jpg',
    isPreorder: false,
    badge: 'AVAILABLE NOW',
    deliveryForecast: 'Available now · Immediate Dispatch',
    description:
      'Official 12" × 12" archival art print of the LOVNIS debut LP cover artwork collage by Murilo Sá. Printed on 300gsm heavyweight fine-art cotton paper, ready for framing.',
    features: [
      '12" × 12" standard vinyl frame size',
      '300gsm heavyweight archival textured art paper',
      'Features full official border artwork',
      'Immediate dispatch worldwide',
    ],
  },
];

export const BAND_INFO = {
  name: 'LOVNIS',
  tagline: 'Brazilian Psych-Rock · Berlin',
  origin: 'Berlin, Germany',
  roots: 'Brazil',
  coFounders: ['Murilo Sá', 'Amanda Longo (in memoriam)'],
  activeMembers: [
    { name: 'Murilo Sá', role: 'Vocals, Guitars, Bass, Keys & Production', origin: 'Salvador / Berlin' },
    { name: 'Bernar Gomma', role: 'Bass & Electric Guitar', origin: 'Rio de Janeiro / Berlin' },
    { name: 'Putti', role: 'Drums & Percussion', origin: 'São Paulo / Berlin' },
  ],
  memorial: {
    name: 'Amanda Longo',
    aka: 'Suzan Flag (1987 – 2024)',
    role: 'Co-founder, Vocals, Guitars, Art & Concept',
    tributeText:
      'Amanda co-founded LOVNIS and infused the project with fearless energy, visual artistry, and soulful songwriting. Following her tragic loss in November 2024, the band honors her indelible spirit by bringing their self-titled debut album—fully recorded together—to life in October 2026.',
  },
  genres: [
    'Brazilian Psych-Rock',
    'Tropicália',
    '1960s Garage & Surf',
    'Jovem Guarda',
    'Lo-Fi Rock',
  ],
  contacts: {
    riderUrl:
      'https://drive.google.com/file/d/1H2p3gbtmX17lbkp8WawXuKGKsSdwf8pC/view?usp=drive_link',
    email: 'duolovnis@gmail.com',
    phone: '+49 17625876173',
    phoneName: 'Murilo',
    whatsappUrl: 'https://wa.me/4917625876173?text=Hello%20Murilo%2C%20contacting%20regarding%20LOVNIS%20booking',
    telegramUrl: 'https://t.me/+4917625876173',
    epkUrl: 'https://duolovnis.wixsite.com',
  },
  debutAlbum: {
    title: 'LOVNIS (Self-Titled Debut Album)',
    releaseDate: 'October 30, 2026',
    status: 'Official Debut LP · Pre-Sale Active',
    description:
      'Recorded in Berlin with co-founder Amanda Longo, the 13-track debut LP captures LOVNIS at their purest: fuzzy guitars, hypnotic Brazilian grooves, garage surf hooks, and heartfelt psychedelic poetry.',
  },
};

export const FEATURED_HERO_VIDEO: VideoItem = {
  id: 'amanda-last-concert',
  title: "Amanda Longo's Last Concert (Berlin 2024)",
  category: 'live',
  year: '2024',
  youtubeId: 'Lud4zu2C0aY',
  youtubeQuery: 'LOVNIS Amanda Longo Last Concert',
  youtubeUrl: 'https://www.youtube.com/watch?v=Lud4zu2C0aY',
  description: "The full live performance of Amanda's last concert with LOVNIS in Berlin, recorded days before her tragic passing in November 2024.",
};

export const ALL_VIDEOS: VideoItem[] = [
  FEATURED_HERO_VIDEO,
  {
    id: 'doces-conversas',
    title: 'LOVNIS - Doces Conversas (Lyric Video)',
    category: 'music-video',
    year: '2022',
    youtubeId: 'UqIhLdXhI20',
    youtubeQuery: 'LOVNIS Doces Conversas Lyric Video',
    youtubeUrl: 'https://www.youtube.com/watch?v=UqIhLdXhI20',
    description: 'Official lyric video for Doces Conversas. Melodic fuzz guitar lines, warm vocal harmonies and kaleidoscopic typography.',
  },
  {
    id: 'filme-de-terror-live',
    title: 'LOVNIS - Filme de Terror live @ Loophole, Berlin',
    category: 'live',
    year: '2022',
    youtubeId: 'dE5kCvc1dCs',
    youtubeQuery: 'LOVNIS Filme de Terror live Loophole Berlin',
    youtubeUrl: 'https://www.youtube.com/watch?v=dE5kCvc1dCs',
    description: 'Raw live performance captured at the legendary underground basement rock venue Loophole in Berlin-Neukölln.',
  },
  {
    id: 'loophole-reel-2024',
    title: 'LOVNIS - Live at Loophole Berlin - Reel (jan/2024)',
    category: 'live',
    year: '2024',
    youtubeId: 'h7I2LxHgqe4',
    youtubeQuery: 'LOVNIS Live at Loophole Berlin Reel 2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=h7I2LxHgqe4',
    description: 'Live concert archival reel from Loophole Berlin (January 2024), featuring Amanda Longo on bass and vocals.',
  },
  {
    id: 'tudo-isso-lido-2023',
    title: 'LOVNIS - Tudo Isso eu Já Sei (Live at Lido-Berlin) 2023',
    category: 'live',
    year: '2023',
    youtubeId: 'lfj0bbLhaas',
    youtubeQuery: 'LOVNIS Tudo Isso eu Já Sei Live at Lido Berlin 2023',
    youtubeUrl: 'https://www.youtube.com/watch?v=lfj0bbLhaas',
    description: 'Live at the historic Kreuzberg rock venue Lido in Berlin, performing the high-energy psych anthem Tudo Isso Eu Já Sei.',
  },
  {
    id: '2020-kulturmarkthalle',
    title: 'LOVNIS - 2020 (Live at Kulturmarkthalle - Berlin)',
    category: 'live',
    year: '2021',
    youtubeId: 'DzbgORAypb8',
    youtubeQuery: 'LOVNIS 2020 Live at Kulturmarkthalle Berlin',
    youtubeUrl: 'https://www.youtube.com/watch?v=DzbgORAypb8',
    description: 'Atmospheric live set recorded in Berlin at Kulturmarkthalle, capturing the hypnotic, reverb-drenched guitar textures.',
  },
  {
    id: 'tudo-isso-eu-ja-sei',
    title: 'LOVNIS - Tudo Isso Eu Já Sei',
    category: 'music-video',
    year: '2020',
    youtubeId: 'vOCW5OFIM1k',
    youtubeQuery: 'LOVNIS Tudo Isso Eu Já Sei official music video',
    youtubeUrl: 'https://www.youtube.com/watch?v=vOCW5OFIM1k',
    description: 'Official music video combining vibrant kaleidoscope visuals, 1960s Brazilian garage-surf tones, dual vocals and infectious hooks.',
  },
  {
    id: 'filme-de-terror-curta',
    title: 'LOVNIS - Filme de Terror (curta-metragem)',
    category: 'music-video',
    year: '2020',
    youtubeId: 'yNjG3wRQHmk',
    youtubeQuery: 'LOVNIS Filme de Terror curta metragem',
    youtubeUrl: 'https://www.youtube.com/watch?v=yNjG3wRQHmk',
    description: 'Artistic short film and music video paying homage to 1920s German expressionist cinema, paired with fuzzy psych-rock riffs.',
  },
  {
    id: '2020-official-video',
    title: 'LOVNIS - 2020',
    category: 'music-video',
    year: '2020',
    youtubeId: 'z5z3kor7U6c',
    youtubeQuery: 'LOVNIS 2020 official video',
    youtubeUrl: 'https://www.youtube.com/watch?v=z5z3kor7U6c',
    description: 'Official music video. A visceral reflection on isolation, creative urgency, and artistic resistance during turbulent times.',
  },
];

export const MUSIC_VIDEOS = ALL_VIDEOS.filter((v) => v.category === 'music-video');
export const LIVE_VIDEOS = ALL_VIDEOS.filter((v) => v.category === 'live');

export const PRESS_HIGHLIGHTS: PressItem[] = [
  {
    id: 'rolling-stone',
    outlet: 'Rolling Stone Magazine',
    tag: 'HOTLIST #20',
    headline: 'HOTLIST #20 — Rolling Stone Brasil',
    snippet:
      'Destaque para a produção transcontinental mais vibrante com o som psicodélico e a energia crua da LOVNIS conectando Salvador, Rio, SP e Berlim.',
    accentColor: '#ef4444',
  },
  {
    id: 'pop-fantasma',
    outlet: 'Pop Fantasma',
    tag: 'Artist Feature',
    headline: 'POP FANTASMA apresenta LOVNIS',
    snippet:
      '“Amanda Longo e Murilo Sá mergulham em discos de rock psicodélico e garage 60s, criando uma ponte sonora visceral com a cena underground de Berlim.”',
    accentColor: '#f43f5e',
  },
  {
    id: 'scream-yell',
    outlet: 'Scream & Yell',
    tag: 'Interview & Special',
    headline: 'Três perguntas: Murilo Sá e Amanda Longo',
    snippet:
      'Criatividade intensa, urgência estética e manifesto sonoro no underground berlinense gravado em fita e amplificadores valvulados.',
    accentColor: '#ec4899',
  },
  {
    id: 'tmdqa',
    outlet: 'Tenho Mais Discos Que Amigos!',
    tag: 'National Releases',
    headline: 'Lançamentos: LOVNIS',
    snippet:
      'Entre os lançamentos mais inventivos e autênticos, o som transcontinental traz frescor, psicodelia brasileira e garage rock sem concessões.',
    accentColor: '#38bdf8',
  },
  {
    id: 'music-non-stop',
    outlet: 'Music Non Stop',
    tag: 'Weekly Highlights',
    headline: 'Destaques da Semana',
    snippet:
      'Tropicália, afrojazz, garage rock e samba psicodélico: a seleção dos lançamentos mais instigantes conectando Brasil e Europa.',
    accentColor: '#a855f7',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Bandcamp',
    url: 'https://lovnis.bandcamp.com',
    handle: 'lovnis.bandcamp.com',
    iconName: 'disc',
    description: 'Vinyl pre-sale, digital discography & merchandise',
    primaryAction: 'Pre-Order on Bandcamp',
  },
  {
    name: 'SoundCloud',
    url: 'https://soundcloud.com/lovnis',
    handle: 'soundcloud.com/lovnis',
    iconName: 'cloud',
    description: 'Original studio recordings, session outtakes & audio archives',
    primaryAction: 'Stream on SoundCloud',
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/search/LOVNIS',
    handle: 'spotify:artist:LOVNIS',
    iconName: 'spotify',
    description: 'Follow on Spotify for the October 30, 2026 album drop',
    primaryAction: 'Pre-Save / Listen',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@LOVNIS.LOVETHIS',
    handle: '@LOVNIS.LOVETHIS',
    iconName: 'youtube',
    description: 'Official music videos, Berlin concert archives & visual art',
    primaryAction: 'Subscribe Channel',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/lovnis.lovethis/',
    handle: 'lovnis.lovethis',
    iconName: 'instagram',
    description: 'Official band announcements, photography & updates',
    primaryAction: 'Follow on Instagram',
  },
  {
    name: 'EPK / Website',
    url: 'https://duolovnis.wixsite.com',
    handle: 'duolovnis.wixsite.com',
    iconName: 'globe',
    description: 'Official electronic press kit, historical archives & documentation',
    primaryAction: 'Visit Legacy EPK',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Amanda Longo (1987 — 2024)',
    caption: 'Amanda Longo, co-founder and soul of LOVNIS. Vocals, guitars, and art.',
    location: 'Berlin Photo Sessions',
    imageUrl: '/assets/drive/amanda-longo.jpg',
  },
  {
    id: 'gal-2',
    title: 'LOVNIS Debut Album Cover Art',
    caption: 'Official 12" vinyl artwork. Collage by Murilo Sá.',
    location: 'Berlin / Sub Tropics',
    imageUrl: '/assets/drive/cover-art.jpg',
  },
  {
    id: 'gal-3',
    title: 'Vinyl Back Cover & Lineup',
    caption: 'High-res vinyl back cover with tracklist and band session portraits.',
    location: 'Berlin Underground',
    imageUrl: '/assets/drive/back-cover.jpg',
  },
  {
    id: 'gal-4',
    title: 'Murilo Sá · Sub Tropics Studio',
    caption: 'Murilo Sá, founder and producer, during debut album recording sessions.',
    location: 'Berlin',
    imageUrl: '/assets/drive/murilo-sa.jpg',
  },
];
