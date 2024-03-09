<template>
    <Search></Search>
    <section class="section" id="replay">
        <h2 class="section-name">{{ getDay() }}</h2>
    </section>
    <section class="section" id="listen_again" v-if="$store.state.token != 'not_access'">
        <h3 class="section-name">Cлушать снова</h3>
    </section>
</template>

<script>
import Search from '@/components/Search.vue';

    export default {
        name: "MainView",
        components: {
            Search
        },
        methods: {
            getDay(){
                let o = new Date, n = o.getHours();
                return n >= 6 && n < 12 ? `Доброе утро!` : n >= 12 && n < 18 ? `Добрый день!` : n >= 18 && n < 24 ? `Добрый вечер!` : `Доброй ночи!`;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/_vars";
    
    #app-sect{
        width: 100%;
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: calc($distance-between-blocks * 1.5);
    }
</style>