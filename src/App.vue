<script>
  import Loader from '@/components/Loader.vue'
  import TitleBar from '@/components/TitleBar.vue'
  import MusicPlayer from '@/components/MusicPlayer.vue'
  import Navigation from '@/components/Navigation.vue'
  import Error from '@/views/Error.vue'
  import Gradient from './components/Gradient.vue'
  import BetaModal from './components/BetaModal.vue'
  
  import { appData } from '@/coreAPI/getData';

  export default {
    name:'MainApp',
    data(){
      return{
        showModal: false,
      }
    },
    components: {
        Loader,
        TitleBar,
        Navigation,
        MusicPlayer,
        Error,
        Gradient,
        BetaModal
    },
    mounted(){
      appData.getAppData("GET_VERSION")
      .then((result) => {
        console.log("SERVER VERSION " + result);
        console.log("APP VERSION " + process.env.PACKAGE_VERSION)

        if(result == process.env.PACKAGE_VERSION){
          this.$store.commit('setAppVersion', result);
          console.log("АКТУАЛЬНАЯ ВЕРСИЯ ПРИЛОЖЕНИЯ")
        } else{
          console.log("НАДО ОБНОВИТЬ ПРИЛОЖЕНИЕ")
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  };
</script>

<template>
  <Loader></Loader>
  <TitleBar></TitleBar>
  <Gradient></Gradient>
  <div id="application" v-if="!$route.path.startsWith('/error')">
    <div id="main-app">
      <aside class="aside">
        <Navigation>
          <button class="btn btn-commits" @click="showModal = !showModal" title="Показать версии">Версии</button>
        </Navigation>
        <section id="page">
          <BetaModal ref="betaModal" :show="showModal"></BetaModal>
          <div id="app-sect">
            <RouterView/>
          </div>
        </section>
      </aside>
      <MusicPlayer></MusicPlayer>
    </div>
  </div>
  <Error v-if="$route.path.startsWith('/error')"></Error>
</template>

<style lang="scss" scoped>
    @import "./assets/styles/_vars";
    .btn-commits{
        padding: $distance-between-blocks calc($distance-between-blocks * 2.5);
        border-radius: calc($distance-between-blocks * 1.5);
        background: rgba(35, 35, 35, 0.5);
        color: $default-white-color-75;
        border-radius: $distance-between-blocks;
        cursor: pointer;
        box-shadow: inset 0px 4px 18px rgb(61 52 52 / 30%), inset 0px 1px 30px rgb(30 29 29 / 20%);
        
        &:hover{
            background: rgba(35, 35, 35, 0.75);
            color: $default-white-color-100;
        }
    }
</style>