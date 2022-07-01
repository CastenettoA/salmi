<template>
  <div class="homepage">    
    <div class="title">
      <h1><span class="gradient">Salmi Biblici</span></h1>
      <span class="desc"
        ><i
          >dal greco psalmós, der. di psállō ‘canto con accompagnamento di
          cetra’</i
        ></span
      >
    </div>

    <details>
      <summary>Cos'è il Libro dei Salmi?</summary>
      <p>
        Il Libro dei Salmi è un testo contenuto nella Bibbia che racchiude al
        suo interno 150 Salmi, delle composizioni poetiche sacre scritte da vari
        autori (principalmente dal re Davide).
      </p>
      <p>
        Possiamo dire che contengono un sunto di tutta la dottrina dell'Antico
        Testamento. Sono considerati un manuale di preghiera e meditazione che
        Dio stesso a voluto dare ai suoi figli. 
      </p>

      <p>
        Il salterio è diviso in 5 parti, in analogia con il Pentateuco, e ciascuna parte termina con una benedizione o dossologia
      </p>

      <button v-on:click="goToBook(1)">📕 Libro 1 →</button>
      <button v-on:click="goToBook(2)">📕 Libro 2 →</button>
      <button v-on:click="goToBook(3)">📕 Libro 3 →</button>
      <button v-on:click="goToBook(4)">📕 Libro 4 →</button>
      <button v-on:click="goToBook(5)">📕 Libro 5 →</button>
      <hr>
      <button v-on:click="goToPenitenziali()">📕 I 7 Salmi Penitenziali →</button>
      <button v-on:click="goToWords()">📔 Le parole più ricorrenti nei Salmi →</button>

      <!-- https://www.vatican.va/roman_curia/congregations/cfaith/pcb_documents/rc_con_cfaith_doc_19100501_psalmorum_it.html -->
    </details>

    <main>
      <h2>Elenco</h2>
      <p style="font-size: 13.6px;">Qui sotto trovi l'elenco ordinato di tutti i 150 Salmi Biblici. Per leggere il singolo Salmo clicca sul numero o sul titolo corrispondente. Se vuoi effettuare una <b>ricerca</b> puoi farlo utilizzando la ricerca del tuo Browser Web ed inserire il numero o il titolo del Salmo. Clicca qui per scoprire le <a v-on:click="goToWords()" style="cursor: pointer;">parole più ricorrenti nei Salmi Biblici.</a></p>
      
      <div class="psalms-option-menu">
        <button class="small-button colorfull-light-green" v-on:click="getCasualSalmo()">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24"> <!-- dice icon -->
              <path fill="currentColor" d="M19.78,3H11.22C10.55,3 10,3.55 10,4.22V8H16V14H19.78C20.45,14 21,13.45 21,12.78V4.22C21,3.55 20.45,3 19.78,3M12.44,6.67C11.76,6.67 11.21,6.12 11.21,5.44C11.21,4.76 11.76,4.21 12.44,4.21A1.23,1.23 0 0,1 13.67,5.44C13.67,6.12 13.12,6.67 12.44,6.67M18.56,12.78C17.88,12.79 17.33,12.24 17.32,11.56C17.31,10.88 17.86,10.33 18.54,10.32C19.22,10.31 19.77,10.86 19.78,11.56C19.77,12.23 19.23,12.77 18.56,12.78M18.56,6.67C17.88,6.68 17.33,6.13 17.32,5.45C17.31,4.77 17.86,4.22 18.54,4.21C19.22,4.2 19.77,4.75 19.78,5.44C19.78,6.12 19.24,6.66 18.56,6.67M4.22,10H12.78A1.22,1.22 0 0,1 14,11.22V19.78C14,20.45 13.45,21 12.78,21H4.22C3.55,21 3,20.45 3,19.78V11.22C3,10.55 3.55,10 4.22,10M8.5,14.28C7.83,14.28 7.28,14.83 7.28,15.5C7.28,16.17 7.83,16.72 8.5,16.72C9.17,16.72 9.72,16.17 9.72,15.5A1.22,1.22 0 0,0 8.5,14.28M5.44,11.22C4.77,11.22 4.22,11.77 4.22,12.44A1.22,1.22 0 0,0 5.44,13.66C6.11,13.66 6.66,13.11 6.66,12.44V12.44C6.66,11.77 6.11,11.22 5.44,11.22M11.55,17.33C10.88,17.33 10.33,17.88 10.33,18.55C10.33,19.22 10.88,19.77 11.55,19.77A1.22,1.22 0 0,0 12.77,18.55H12.77C12.77,17.88 12.23,17.34 11.56,17.33H11.55Z" />
          </svg>
          <span>mi sento fortunato</span>
        </button>

        <button class="small-button" v-on:click="scrollToBottom()">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M12,17L17,12H14V8H10V12H7L12,17Z" />
          </svg>
          <span>scorri alla fine</span>
        </button>
      </div>

      <div class="elencoSalmi">
        <div class="single-salmo" v-bind:key="key" v-for="(salmo, key) in salmi">
          <span class="book-nuber" v-if="key+1 == 1"><h3>Libro 1</h3></span>

          <button>
            <div class="salmo-secondary-info">
              <span class="salmo-number">salmo {{ salmo.titleWithNumber.split('Salmo')[1].trim() }}</span> 
              <div class="star" v-on:click="addToFavorites(key+1)" title="Aggiungi-Rimuovi dai preferiti">
                    <svg v-if="!salmo.favorite" xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="bi bi-star" viewBox="0 0 18 18">
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                    </svg>

                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#FFAE42" class="bi bi-star-fill" viewBox="0 0 18 18"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path></svg>
                </div>
            </div>
            <b class="salmo-title" v-on:click="goToSalmo(key + 1)">{{ salmo.title }}</b> → 
            <span class="salmo-description" v-on:click="goToSalmo(key + 1)">{{ salmo.description }}</span>
          </button>

          <span v-if="key+1 == 41"><h3>Libro 2</h3></span>
          <span v-if="key+1 == 72"><h3>Libro 3</h3></span>
          <span v-if="key+1 == 89"><h3>Libro 4</h3></span>
          <span v-if="key+1 == 106"><h3>Libro 5</h3></span>
        </div>
      </div>

      <div class="psalms-option-menu">
        <button class="small-button" v-on:click="scrollToTop()">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21M12,7L7,12H10V16H14V12H17L12,7Z" />
          </svg>
          <span>torna su</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script>
/*

problema: i salmi che iniziano con un nome Lamed -, nella prima riga manca il nome.
*/

// @ is an alias to /src
import salmiListJson from "@/assets/json/salmi.json";

export default {
  name: "Home",
  data: function () {
    return {
      salmi: salmiListJson.items,
    };
  },

  created: function() {
    document.title = 'Tutti i Salmi • elenco dei 150 Salmi Biblici';
    document.getElementsByTagName('meta')["description"].content = " I salmi contengono un sunto di tutta la dottrina dell'Antico Testamento. I salmisti non parlano che a Dio o di Dio e delle altre cose solo in relazione con Lui. Possiamo dire che è un manuale di pregriera che Dio stesso ha voluto dare ai suoi figli. Servì di preghiera al Redentore, agli Apostoli, a Maria; manuale di preghiera e meditazione.";
  
    // check if favorite exist, if so, update the salmi json
    let favoritePsalms = localStorage.getItem('favoritePsalms');
    if(favoritePsalms) {
      favoritePsalms = favoritePsalms.split(','); // arr like ['2','32']

      for(let el of favoritePsalms) {
        // set salmo to favorite 
        let salmo = this.salmi[el-1];
        if(salmo) {
          salmo.favorite = true;
        }
      }
    }
  },

  methods: {
    goToSalmo: function (n) {
      this.$router.push({ name: "salmo", params: { number: n } });
    },

    goToBook: function (n) {
      this.$router.push({ name: "book", params: { number: n } });
    },

    goToPenitenziali: function () {
      this.$router.push({ name: "penitenziali" });
    },

    goToWords: function () {
      this.$router.push({ name: "words" });
    },

    getCasualSalmo: function() { // go to a random salmo page
      let randomSalmoNum = Math.floor(Math.random()*149)+1; // todo: check if 150 is shown
      this.$router.push({ name: "salmo", params: { number: randomSalmoNum }});
    },

    scrollToTop: function() {
       window.scrollTo({ top: 0, behavior: 'auto' });
    },

        scrollToBottom: function() {
      const scrollingElement = (document.scrollingElement || document.body);
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    },

    addToFavorites: function(psalmNumber) { 
      let favoritePsalms = localStorage.getItem('favoritePsalms'); // [1,2,5]
      if(!favoritePsalms) {
        localStorage.setItem('favoritePsalms', psalmNumber); // add salmo to local storage
        this.salmi[psalmNumber-1].favorite = true; // add favorite to salmi array
      } else {
        if(!favoritePsalms.split(',').includes(psalmNumber.toString())) {
          localStorage.setItem('favoritePsalms', favoritePsalms + ',' + psalmNumber);
          this.salmi[psalmNumber-1].favorite = true;
        } else {
          // current salmo is already favorite. I remove it.
          let fp = favoritePsalms.split(',');  // split the array
          let i = fp.indexOf(psalmNumber.toString()); // find the index of the element to remove
          fp.splice(i, 1); // remove 1 element at index 'i'
          localStorage.setItem('favoritePsalms', fp); // remove psalm from favorite in local storage
          this.salmi[psalmNumber-1].favorite = false; // remove favorite from salmi array 
        }
      }
      // let favoriteWords = localStorage.getItem('favoriteWords');
      // if (!favoriteWords) { // se non ci sono faviriti aggiungo la parola ai favoriti
      //     localStorage.setItem('favoriteWords', word);
      // } else if (!favoriteWords.split(',').includes(word) ) { // se l'elemento non è già nei favoriti, lo aggiungo. Devo fare toString in quanto la local storage lavora in STRINGHE
      //    localStorage.setItem('favoriteWords', favoriteWords + ',' + word);
      // } else if (favoriteWords.split(',').includes(word)) { // se la parola è presente, la rimuovo dai favoriti
      //    let f = favoriteWords.split(',');
      //    f.splice(f.indexOf(word), 1);
      //    localStorage.setItem('favoriteWords', f);
      // }
    },
  },

  filters: {
    truncateWord: function(text, length, suffix) {
      if(text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    }
  }
};
</script>

<style lang="scss">
</style>