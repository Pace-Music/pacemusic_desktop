<template>
    <div class="search">
        <form @submit.prevent="search" class="search__form" action="/search" method="POST">
            <button class="search__form-icon" type="submit">
                <Search class="search__form-icon-svg"></Search>
            </button> 
            <input class="search__form-item" type="text" name="search" placeholder="Поиск" autocomplete="on">
        </form>
    </div>
</template>

<script>
    import Search from '@/assets/icons/find.vue'

    export default {
        name: "SearchComp",
        components: {
            Search
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/_vars";
    .search{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        &__form{
            width: 40%;
            height: inherit;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            padding: $distance-between-blocks calc($distance-between-blocks * 1.25);
            border-radius: calc($distance-between-blocks * 1.25);
            background: rgba(35, 35, 35, 0.2);
            gap: $font-size-main;
            box-shadow: inset 0px 4px 18px rgb(61 52 52 / 30%), inset 0px 1px 30px rgb(30 29 29 / 20%);
            
            &-icon{
                width: 1rem;
                height: 1rem;
                background: transparent;
                cursor: pointer;
                
                
                &-svg{
                    fill: rgba(255, 255, 255, 0.5);
                    width: 100%;
                    height: 100%;

                    &:active{
                        transform: scale(1.1);
                    }
                    
                    &:hover{
                        fill: rgba(255, 255, 255, 1);
                    }
                }
            }
            
            &-item{
                font-size: calc($distance-between-blocks * 1);
                background: transparent;
                width: 100%;
                height: 120%;
                color: $default-white-color-100;
                font-family: $font-Inter-sans-serif;

                &::placeholder{
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.25);
                }
            }
        }
    }
</style>