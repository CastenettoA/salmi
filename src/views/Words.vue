<template>
  <main>
    <div class="single-salmo">
      <header :class="[{ animationShow_v2: stateManager.animationEnabled}, 'bgSea' ]">
      <h1>Salmi &bull; Le parole più frequenti nei salmi biblici</h1>
        <p>Breve statistica delle parole più ricorrenti all'interno dei Salmi Biblici.</p>
    </header>

      <div :class="[{ animationShow_v3: stateManager.animationEnabled}, 'elencoSalmi' ]">
          <!-- improve this search only in content @todo -->
          <div><button><b class="salmo-title">Signore</b> • <span class="salmo-description">796 volte</span></button></div>
          <div><button><b class="salmo-title">Dio</b> •  <span class="salmo-description">565 volte</span></button></div>
          <div><button><b class="salmo-title">Terra</b> •  <span class="salmo-description">192 volte</span></button></div>
          <div><button><b class="salmo-title">Cuore</b> •  <span class="salmo-description">136 volte</span></button></div>
          <div><button><b class="salmo-title">Anima</b> •  <span class="salmo-description">101 volte</span></button></div>
          <div><button><b class="salmo-title">Israele</b> •  <span class="salmo-description">96 volte</span></button></div>
          <div><button><b class="salmo-title">Nemici</b> •  <span class="salmo-description">96 volte</span></button></div>
          <div><button><b class="salmo-title">Giustizia</b> •  <span class="salmo-description">96 volte</span></button></div>
          <div><button><b class="salmo-title">Uomo</b> •  <span class="salmo-description">87 volte</span></button></div>
          <div><button><b class="salmo-title">Amore</b> •  <span class="salmo-description">86 volte</span></button></div>
          <div><button><b class="salmo-title">Salvezza</b> •  <span class="salmo-description">83 volte</span></button></div>
          <div><button><b class="salmo-title">Eterno</b> •  <span class="salmo-description">71 volte</span></button></div>
          <div><button><b class="salmo-title">Cieli</b> •  <span class="salmo-description">70 volte</span></button></div>
          <div><button><b class="salmo-title">Bontà</b> •  <span class="salmo-description">54 volte</span></button></div>
          <div><button><b class="salmo-title">Fedeltà</b> •  <span class="salmo-description">48 volte</span></button></div>
      </div>

              <small class="copyright-sanpaolo">
        <svg style="width:19px;height:19px; opacity: .7;" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
        </svg>
          <span>Il testo biblico è tratto da <a href="https://www.edizionisanpaolo.it/">LA BIBBIA. Nuova versione dai testi originali</a>, San Paolo Edizioni 2010.</span>
        </small>

    </div>

  </main>
</template>

<script>
import salmi from "@/assets/json/salmi.json";
import {stateManager} from "@/stateManager.js";


export default {
  data: function () {
    return {
      salmi: salmi.items,
      headerBg: 'bg1',
      stateManager,
    };
  },
  created: function(){
    this.scrollToTop();
    document.title = ' Le parole più frequenti nel Salterio';
    document.getElementsByTagName('meta')["description"].content = 'Elenco della parole utilizzare più di frequente all\'interno del Salterio.';
  },
  
  methods: {
    scrollToTop() { // needed because the windwos was not to top... try to belive it
        window.scrollTo(0,0);
    },
   
    goHome: function () {
      this.$router.push({ name: "home" });
    },
  },
};
</script>


<style lang="scss">
</style>