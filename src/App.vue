<script>
  import Loader from '@/components/Loader.vue'
  import TitleBar from '@/components/TitleBar.vue'
  import MusicPlayer from '@/components/MusicPlayer.vue'
  import Navigation from '@/components/Navigation.vue'
  import Links from '@/components/Links.vue'
  import Error from '@/views/Error.vue'
  import Gradient from './components/Gradient.vue'
  
  export default {
    name:'MainApp',
    components: {
        Loader,
        TitleBar,
        Navigation,
        MusicPlayer,
        Error,
        Links,
        Gradient,
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
        </Navigation>
        <section id="page">
          <div id="app-sect">
            <RouterView/>
          </div>
        </section>
      </aside>
      <MusicPlayer></MusicPlayer>
    </div>
    <Links></Links>
  </div>
  <Error v-if="$route.path.startsWith('/error')"></Error>
</template>