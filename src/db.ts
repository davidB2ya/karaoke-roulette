import Dexie, { Table } from 'dexie';

export interface Song {
  id?: number;
  name: string;
  category: string;
  artist: string;
  youtubeId: string;
}

export class KaraokeDatabase extends Dexie {
  songs!: Table<Song>;

  constructor() {
    super('KaraokeDatabase');
    this.version(1).stores({
      songs: '++id, name, category, artist, youtubeId'
    });
  }
}

export const db = new KaraokeDatabase();

// Inicializar la base de datos con más canciones de ejemplo
const initializeDatabase = async () => {
  const count = await db.songs.count();
  if (count === 0) {
    const sampleSongs: Song[] = [
      // Canciones de Disney
      { name: "Un Mundo Ideal", category: "Canciones de Disney", artist: "Brad Kane, Lea Salonga", youtubeId: "bGY9G9vKBOo" },
      { name: "Libre Soy", category: "Canciones de Disney", artist: "Carmen Sarahí", youtubeId: "L0MK7qz13bU" },
      { name: "Recuérdame", category: "Canciones de Disney", artist: "Carlos Rivera", youtubeId: "nTuxCagXHPE" },
      { name: "Bajo del Mar", category: "Canciones de Disney", artist: "Thalía", youtubeId: "Uuh8YVV7Ygk" },
      { name: "Colores en el Viento", category: "Canciones de Disney", artist: "Vanessa Williams", youtubeId: "TkV-of_eN2w" },
      { name: "Bella y Bestia Son", category: "Canciones de Disney", artist: "Pepe Mediavilla, Michelle", youtubeId: "7SXxGFmQIhE" },
      { name: "Hay un Amigo en Mí", category: "Canciones de Disney", artist: "Gipsy Kings", youtubeId: "ykroH9Yx5TE" },
      { name: "Reflejo", category: "Canciones de Disney", artist: "Christina Aguilera", youtubeId: "Wd2fSSt4MDg" },
      { name: "Qué Hay Más Allá", category: "Canciones de Disney", artist: "Auli'i Cravalho", youtubeId: "A4QuKwfv6Wk" },
      { name: "Sueña", category: "Canciones de Disney", artist: "Luis Miguel", youtubeId: "7AiMXwPiUVY" },
      { name: "Parte de Tu Mundo", category: "Canciones de Disney", artist: "María Caneda", youtubeId: "BT8i4RMR15c" },
      { name: "Supercalifragilisticoespialidoso", category: "Canciones de Disney", artist: "Julie Andrews", youtubeId: "8Ux9jQT_oGE" },
      
      // Reggaeton Viejo
      { name: "Gasolina", category: "Reggaeton Viejo", artist: "Daddy Yankee", youtubeId: "CCF1_jI8Prk" },
      { name: "La Tortura", category: "Reggaeton Viejo", artist: "Shakira ft. Alejandro Sanz", youtubeId: "Dsp_8Lm1eSk" },
      { name: "Ella Me Levantó", category: "Reggaeton Viejo", artist: "Daddy Yankee", youtubeId: "rJVJFNXkDhQ" },
      { name: "Atrévete-Te-Te", category: "Reggaeton Viejo", artist: "Calle 13", youtubeId: "vXtJkDHEAAc" },
      { name: "Pobre Diabla", category: "Reggaeton Viejo", artist: "Don Omar", youtubeId: "UKuL_g5Jcj8" },
      { name: "Mayor Que Yo", category: "Reggaeton Viejo", artist: "Wisin & Yandel, Daddy Yankee", youtubeId: "Oe5nMm7EjFU" },
      { name: "Yo Te Quiero", category: "Reggaeton Viejo", artist: "Wisin & Yandel", youtubeId: "j5J6zCFCL1I" },
      { name: "Llamado de Emergencia", category: "Reggaeton Viejo", artist: "Daddy Yankee", youtubeId: "9cZWqfwZlvs" },
      { name: "Noche de Entierro", category: "Reggaeton Viejo", artist: "Daddy Yankee, Tonny Tun Tun", youtubeId: "yzSlfb8KE1Q" },
      { name: "Impacto", category: "Reggaeton Viejo", artist: "Daddy Yankee", youtubeId: "P9wSPPPFVhQ" },
      { name: "Lo Que Pasó, Pasó", category: "Reggaeton Viejo", artist: "Daddy Yankee", youtubeId: "Z0eD5NbZpZE" },
      { name: "Baila Morena", category: "Reggaeton Viejo", artist: "Héctor & Tito", youtubeId: "0vHXCQqAngw" },
      
      // Reggaeton Nuevo
      { name: "Despacito", category: "Reggaeton Nuevo", artist: "Luis Fonsi, Daddy Yankee", youtubeId: "kJQP7kiw5Fk" },
      { name: "Calma", category: "Reggaeton Nuevo", artist: "Pedro Capó, Farruko", youtubeId: "1_zgKRBrT0Y" },
      { name: "Con Calma", category: "Reggaeton Nuevo", artist: "Daddy Yankee, Snow", youtubeId: "DiItGE3eAyQ" },
      { name: "Taki Taki", category: "Reggaeton Nuevo", artist: "DJ Snake, Selena Gomez, Ozuna", youtubeId: "ixkoVwKQaJg" },
      { name: "China", category: "Reggaeton Nuevo", artist: "Anuel AA, Daddy Yankee, Karol G", youtubeId: "0VR3dfZf9Yg" },
      { name: "Baila Baila Baila", category: "Reggaeton Nuevo", artist: "Ozuna", youtubeId: "32F2d-wj4Xw" },
      { name: "Otro Trago", category: "Reggaeton Nuevo", artist: "Sech, Darell", youtubeId: "t_qn-f7XfJo" },
      { name: "Soltera", category: "Reggaeton Nuevo", artist: "Lunay, Daddy Yankee, Bad Bunny", youtubeId: "8zQTfGbyY5I" },
      { name: "No Me Conoce", category: "Reggaeton Nuevo", artist: "Jhay Cortez, J Balvin, Bad Bunny", youtubeId: "w2C6RhQBYlg" },
      { name: "Adicto", category: "Reggaeton Nuevo", artist: "Tainy, Anuel AA, Ozuna", youtubeId: "6L_k74BOLag" },
      { name: "Que Tire Pa Lante", category: "Reggaeton Nuevo", artist: "Daddy Yankee", youtubeId: "OG-RNq7oRUM" },
      { name: "Yo x Ti, Tu x Mi", category: "Reggaeton Nuevo", artist: "ROSALÍA, Ozuna", youtubeId: "2j3x0VYnehg" },
      
      // A Duo
      { name: "Shallow", category: "A Duo", artist: "Lady Gaga, Bradley Cooper", youtubeId: "bo_efYhYU2A" },
      { name: "Señorita", category: "A Duo", artist: "Shawn Mendes, Camila Cabello", youtubeId: "Pkh8UtuejGw" },
      { name: "Me Niego", category: "A Duo", artist: "Reik ft. Ozuna, Wisin", youtubeId: "ASO_zypdnsQ" },
      { name: "Chantaje", category: "A Duo", artist: "Shakira, Maluma", youtubeId: "6Mgqbai3fKo" },
      { name: "Échame La Culpa", category: "A Duo", artist: "Luis Fonsi, Demi Lovato", youtubeId: "TyHvyGVs42U" },
      { name: "El Perdón", category: "A Duo", artist: "Nicky Jam, Enrique Iglesias", youtubeId: "hXI8RQYC36Q" },
      { name: "Felices los 4", category: "A Duo", artist: "Maluma, Marc Anthony", youtubeId: "t_jHrUE5IOk" },
      { name: "Bailando", category: "A Duo", artist: "Enrique Iglesias, Descemer Bueno, Gente De Zona", youtubeId: "NUsoVlDFqZg" },
      { name: "No Es Justo", category: "A Duo", artist: "J Balvin, Zion & Lennox", youtubeId: "Hn4sfC2PbhI" },
      { name: "Vente Pa' Ca", category: "A Duo", artist: "Ricky Martin, Maluma", youtubeId: "iOe6dI2JhgU" },
      { name: "Amigos Con Derechos", category: "A Duo", artist: "Reik, Maluma", youtubeId: "mbr10nO3JYw" },
      { name: "Robarte un Beso", category: "A Duo", artist: "Carlos Vives, Sebastián Yatra", youtubeId: "Mtau4v6foHA" },
      
      // Pop Latino
      { name: "Vivir Mi Vida", category: "Pop Latino", artist: "Marc Anthony", youtubeId: "YXnjy5YlDwk" },
      { name: "Bailando", category: "Pop Latino", artist: "Enrique Iglesias ft. Descemer Bueno, Gente de Zona", youtubeId: "NUsoVlDFqZg" },
      { name: "La Bicicleta", category: "Pop Latino", artist: "Shakira, Carlos Vives", youtubeId: "-UV0QGLmYys" },
      { name: "Danza Kuduro", category: "Pop Latino", artist: "Don Omar, Lucenzo", youtubeId: "7zp1TbLFPp8" },
      { name: "Propuesta Indecente", category: "Pop Latino", artist: "Romeo Santos", youtubeId: "QFs3PIZb3js" },
      { name: "Limbo", category: "Pop Latino", artist: "Daddy Yankee", youtubeId: "6BTjG-dhf5s" },
      { name: "Waka Waka", category: "Pop Latino", artist: "Shakira", youtubeId: "pRpeEdMmmQ0" },
      { name: "Duele el Corazón", category: "Pop Latino", artist: "Enrique Iglesias ft. Wisin", youtubeId: "xFutjZEBTXs" },
      { name: "Andas En Mi Cabeza", category: "Pop Latino", artist: "Chino & Nacho ft. Daddy Yankee", youtubeId: "hRVfqI2ihuY" },
      { name: "Hasta el Amanecer", category: "Pop Latino", artist: "Nicky Jam", youtubeId: "kkx-7fsiWgg" },
      { name: "El Perdedor", category: "Pop Latino", artist: "Enrique Iglesias ft. Marco Antonio Solís", youtubeId: "Ztk9t_m1FpY" },
      { name: "Súbeme La Radio", category: "Pop Latino", artist: "Enrique Iglesias ft. Descemer Bueno, Zion & Lennox", youtubeId: "9sg-A-eS6Ig" },
      
      // Rock en Español
      { name: "La Camisa Negra", category: "Rock en Español", artist: "Juanes", youtubeId: "kRt2sRyup6A" },
      { name: "Mariposa Traicionera", category: "Rock en Español", artist: "Maná", youtubeId: "av3wkasS-WQ" },
      { name: "Rayando el Sol", category: "Rock en Español", artist: "Maná", youtubeId: "bE3ABNHy5UM" },
      { name: "Cuando Pase el Temblor", category: "Rock en Español", artist: "Soda Stereo", youtubeId: "VR_K7qWcHUc" },
      { name: "Lamento Boliviano", category: "Rock en Español", artist: "Enanitos Verdes", youtubeId: "VtLjQgdfNeE" },
      { name: "Entre Dos Tierras", category: "Rock en Español", artist: "Héroes del Silencio", youtubeId: "6wMMcCkRAsk" },
      { name: "Persiana Americana", category: "Rock en Español", artist: "Soda Stereo", youtubeId: "5yCaP1AvVDE" },
      { name: "Maldito Duende", category: "Rock en Español", artist: "Héroes del Silencio", youtubeId: "IOYnXxMcZoM" },
      { name: "Clavado en un Bar", category: "Rock en Español", artist: "Maná", youtubeId: "fBrX8ZJCfEw" },
      { name: "Cuando Sea Grande", category: "Rock en Español", artist: "Cuarteto de Nos", youtubeId: "Wd2fSSt4MDg" },
      { name: "Flaca", category: "Rock en Español", artist: "Andrés Calamaro", youtubeId: "CG7rVuIZugU" },
      { name: "Oye Mi Amor", category: "Rock en Español", artist: "Maná", youtubeId: "J6Se3Gfj4uE" },
    ];
    await db.songs.bulkAdd(sampleSongs);
  }
};

initializeDatabase();