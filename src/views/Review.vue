<template>
    <Search></Search>
    <section class="section" id="replay">
        <h2 class="section-name">{{ $route.name }}</h2>
    </section>
</template>

<script>
    import Search from '@/components/Search.vue';

    export default {
        name: "ReviewView",
        components: {
            Search
        }
    }
</script>

<style lang="scss" scoped>

</style>