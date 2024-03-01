<template>
    <div id="links">
        <header class="links">
            <nav class="links__navigation">
                <ul class="links__navigation__list">
                    <li class="links__navigation__list-item">
                        <RouterLink class="links__navigation__list-item-href" to="/settings"><Settings></Settings></RouterLink>
                    </li>
                </ul>
            </nav>
        </header>
    </div>
</template>

<script>
    import Settings from '@/assets/icons/settings.vue'

    export default {
        name: "LinksView",
        components: {
            Settings
        }
    }
</script>

<style lang="scss" scoped>
    .links{
        width: 100%;
        height: auto;

        &__navigation{
            width: 100%;
            height: auto;

            &__list{
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;

                &-item{
                    width: 30px;
                    height: 30px;

                    &-href{
                        display: block;
                        width: 100%;
                        height: 100%;

                        & svg{
                            width: 100%;
                            height: 100%;
                            stroke: #D9D9D9;
                            opacity: 0.6;
                            transition: 0.5s linear all;

                            &:hover{
                                stroke: #FFF;
                                fill: #FFF;
                            }
                        }
                    }
                }
            }
        }
    }
</style>