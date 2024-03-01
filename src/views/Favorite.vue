<template>
    <Search></Search>
    <section class="section" id="replay">
        <h2 class="section-name">Любимые</h2>
    </section>
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