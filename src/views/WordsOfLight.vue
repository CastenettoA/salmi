<template>
  <div class="homepage">    

    <main>
      <header :class="[{ animationShow_v2_fast: stateManager.animationEnabled}, 'bgStars', 'mb-1' ]">
        <h1>Parole di Luce</h1>
      </header>


      <div :class="[{ animationShow_v3_fast: stateManager.animationEnabled}, 'wordsOfLight_lists' ]">
        <!-- 3 milestone 
        TITOLO . VERSO . RIFERIMENTO . IMMAGINE
        - 3 salmi
        - 7 salmi
        - 14 salmi 
        - 21 salmi -->



        <div class="wordsOfLight_lists-word" :class="{'today_wordOfLight': today_wordOfLight_is == key }" v-bind:key="key" v-for="(word, key) in wordsOfLights">
          <!-- <span class="book-nuber" v-if="key+1 == 1 && salmo.favorite"><h3>Libro 1</h3></span> 
          TODO show book number if 1 to 50 and fav=true and isFirstTime ... -->
          <div class="image">
            <!-- put the selected word on top -->
            <div class="today-word" v-if="today_wordOfLight_is == key">
              <span>La Parola del Giorno</span>
            </div>
            <img :src="require(`@/assets/img/wordsoflight/${key+1}.jpg`)" :title="word.title">
          </div>

          <div class="description">
            <div class="middleBar" :title="word.fromSalmoTitle" v-on:click="goToSalmo(word.fromSalmoNumber)" style="cursor: pointer;">
              Salmo {{word.fromSalmoNumber}} ({{word.fromSalmoNumberVerse}})
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
import {stateManager} from "@/stateManager.js";

export default {
  name: "Home",
  data: function () {
    return {
      salmi: salmiListJson.items,
      wordsOfLights: wordsListJson.items,
      thereIsFavorites: false,
      today_wordOfLight_is: 0,
      classN: 'highlight_word',
      stateManager
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

    // check of refresh the WordOfLight of the day
    let today_wordOfLight = localStorage.getItem('today_wordOfLight');
    if(today_wordOfLight) {
      let t = today_wordOfLight.split(';');

      if(parseInt(t[1]) == new Date().getDate()) {
        this.today_wordOfLight_is = t[0];
        // no need a new word, the word is of today
      } else {
        // ho! the word is old, generate a new onesss
        this.today_wordOfLight_is = Math.floor((Math.random()*this.wordsOfLights.length)); // get a random wordsoflight index
        localStorage.setItem('today_wordOfLight', this.today_wordOfLight_is + ';' + new Date().getDate()); // set the word on localStorage
      }
    } else {
      // the word not exist, user first time here. I set che today word of light :D
      this.today_wordOfLight_is = Math.floor((Math.random()*this.wordsOfLights.length)); // get a random wordsoflight index
      localStorage.setItem('today_wordOfLight', this.today_wordOfLight_is + ';' + new Date().getDate()); // set the word on localStorage
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
        this.stateManager.salmi_favorite_count = 1;
      } else {
        if(!favoritePsalms.split(',').includes(psalmNumber.toString())) {
          localStorage.setItem('favoritePsalms', favoritePsalms + ',' + psalmNumber);
          this.salmi[psalmNumber-1].favorite = true;
          this.stateManager.salmi_favorite_count = localStorage.getItem('favoritePsalms').split(',').length;
        } else {
          // current salmo is already favorite. I remove it.
          let fp = favoritePsalms.split(',');  // split the array
          let i = fp.indexOf(psalmNumber.toString()); // find the index of the element to remove
          fp.splice(i, 1); // remove 1 element at index 'i'
          localStorage.setItem('favoritePsalms', fp); // remove psalm from favorite in local storage
          this.salmi[psalmNumber-1].favorite = false; // remove favorite from salmi array
          this.stateManager.salmi_favorite_count--;
        }
      }
    }
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