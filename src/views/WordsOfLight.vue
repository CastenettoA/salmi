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

    <main>
      <h2>Parole di Luce</h2>


      <div class="wordsOfLight_lists">
        <div class="wordsOfLight_lists-word" v-bind:key="key" v-for="(word, key) in wordsOfLights">
          <!-- <span class="book-nuber" v-if="key+1 == 1 && salmo.favorite"><h3>Libro 1</h3></span> 
          TODO show book number if 1 to 50 and fav=true and isFirstTime ... -->
          <div class="image">
            <img src="@/assets/img/wordsoflight/1.jpg" :title="word.title">
          </div>

          <div class="description">
            <div class="middleBar">
              Salmo{{word.from}}
            </div>

            <div class="title">
              {{word.title}}
            </div>

            <div class="verse">
              <!-- todo: finish with FOR  -->
              {{word.content[0]}} 
            </div>
          </div>

        </div>
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
import wordsListJson from "@/assets/json/wordsOfLight.json";

export default {
  name: "Home",
  data: function () {
    return {
      salmi: salmiListJson.items,
      wordsOfLights: wordsListJson.items,
      thereIsFavorites: false
    };
  },

  created: function() {
    document.title = 'I Salmi Biblici • elenco dei tuoi salmi preferiti';
    document.getElementsByTagName('meta')["description"].content = "In questa pagina trovi l'elenco dei salmi che hai aggiunto ai tuoi favoriti.";
  
    // check if favorite exist, if so, update the salmi json
    let favoritePsalms = localStorage.getItem('favoritePsalms');
    if(favoritePsalms) {
      favoritePsalms = favoritePsalms.split(','); // arr like ['2','32']
      this.thereIsFavorites = true;

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
          
          // i check if there is fav. salmo. If don't i update a var
          let check = localStorage.getItem('favoritePsalms');
          if(!check) 
            this.thereIsFavorites = false;
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