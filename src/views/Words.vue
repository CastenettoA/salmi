<template>
  <main>
    <div class="single-salmo">

      <h1>
        <span class="gradient">Salmi</span>
        <span class="desc"
          > &bull; Le parole più frequenti nei salmi biblici</span
        >
      </h1>

      <p>Breve statistica delle parole più ricorrenti all'interno dei Salmi Biblici.</p>

      <div class="elencoSalmi">
          <!-- improve this search only in content @todo -->
          <div><button><b>Signore</b> • 796 volte</button></div>
          <div><button><b>Dio</b> • 565 volte</button></div>
          <div><button><b>Terra</b> • 192 volte</button></div>
          <div><button><b>Cuore</b> • 136 volte</button></div>
          <div><button><b>Anima</b> • 101 volte</button></div>
          <div><button><b>Israele</b> • 96 volte</button></div>
          <div><button><b>Nemici</b> • 96 volte</button></div>
          <div><button><b>Giustizia</b> • 96 volte</button></div>
          <div><button><b>Uomo</b> • 87 volte</button></div>
          <div><button><b>Amore</b> • 86 volte</button></div>
          <div><button><b>Salvezza</b> • 83 volte</button></div>
          <div><button><b>Eterno</b> • 71 volte</button></div>
          <div><button><b>Cieli</b> • 70 volte</button></div>
          <div><button><b>Bontà</b> • 54 volte</button></div>
          <div><button><b>Fedeltà</b> • 48 volte</button></div>
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

export default {
  data: function () {
    return {
      salmi: salmi.items,
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