// a simple global state manager with 'vue reactive'
// https://pinia.vuejs.org/ for a more pro approach
import { reactive } from 'vue'
export const stateManager = reactive({
    salmi_favorite_count: 0,
    set(n) {
        this.salmi_favorite_count = n;
    }
});