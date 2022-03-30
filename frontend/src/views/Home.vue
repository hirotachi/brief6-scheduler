 <template>
   <component :is="currentComponent"  :changeCurrentView="changeCurrentView"/>
</template>

<script setup>


import { computed, ref } from 'vue';
import Login from '@/components/Login';
import Register from '@/components/Register';

const currentView = ref('login');
const currentComponent = computed(() => currentView.value === "login" ? Login : Register)

function changeCurrentView() {
  const currentValue = currentView.value;
  currentView.value =  currentValue === 'login' ? 'create' : 'login';
}

</script>

<style scoped>

</style>