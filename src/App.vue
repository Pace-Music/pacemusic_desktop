<script>
  import Loading from "../src/components/Loader.vue";
  import TitleBar from "../src/components/TitleBar.vue";
  import MusicPlayer from "./components/MusicPlayer.vue";
  import Navigation from "./components/Navigation.vue";
  
  export default {
    name:'MainApp',
    components: {
        Loading,
        TitleBar,
        Navigation,
        MusicPlayer
    },
  };
</script>

<template>
  <Loading></Loading>
  <TitleBar></TitleBar>
  <div id="application">
    <Navigation></Navigation>
    <aside class="aside">
      <section id="page">
        <RouterView/>
      </section>
      <MusicPlayer></MusicPlayer>
    </aside>
  </div>
</template>