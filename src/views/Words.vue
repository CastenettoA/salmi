<template>
  <main>
    <div class="single-salmo">
        <small class="copyright-sanpaolo">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square-fill" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
          <span>Il testo biblico è tratto da <a href="https://www.edizionisanpaolo.it/">LA BIBBIA. Nuova versione dai testi originali</a>, San Paolo Edizioni 2010.</span>
        </small>

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