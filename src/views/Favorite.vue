<template>
    <Search></Search>
    <div id="app-sect">
        <section class="section" id="replay">
            <h2 class="section-name">Любимые</h2>
        </section>
    </div>
</template>

<script>
    import Search from '@/components/Search.vue';

    export default {
        name: "FavoriteView",
        components: {
            Search
        }
    }
</script>

<style lang="scss" scoped>

</style>