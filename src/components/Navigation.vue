<template>
    <aside class="aside__navigation">
        <div class="top">
            <RouterLink class="logo" to="/">
                <img src="../../public/icons/logo.png" alt="Pace Music">
            </RouterLink>
            <nav class="navigation">
                <ul class="navigation__list">
                    <li class="navigation__list-item">
                        <RouterLink class="navigation__list-item-href" to="/">
                            <Pace class="nav_icon"></Pace> Слушать 
                        </RouterLink>
                    </li>
                    <li class="navigation__list-item">
                        <RouterLink class="navigation__list-item-href" to="/review">
                           <Review class="nav_icon"></Review> Обзор
                        </RouterLink>
                    </li>
                    <li class="navigation__list-item">
                        <RouterLink class="navigation__list-item-href" to="/favorite">
                           <Favorite class="nav_icon"></Favorite> Любимое
                        </RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="bottom">
            <BetaBtn></BetaBtn>
            <p>Версия: {{ this.$store.getters.getAppVersion }}</p>
            <div class="user">
                <RouterLink to="/user" class="user__icon">
                    <img src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6561d83088410d6f4a17dfff_6561ee656e6f8b6285a47d48/scale_1200" alt="User" class="user__icon-img">
                </RouterLink>
                <div class="user__data">
                    <h4 class="user__data-name">Пользователь</h4>
                    <p class="user__data-song">Песня • Артист</p>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>
    import Favorite from '@/assets/icons/favorite.vue';
    import Pace from '@/assets/icons/pace.vue';
    import Review from '@/assets/icons/review.vue';
import BetaBtn from './BetaBtn.vue';

    export default {
        name: "NavigationComp",
        components: {
    Pace,
    Review,
    Favorite,
    BetaBtn
},
        computed: {
                isCurrentRoute() {
                    return this.$route.path;
                }
        }
}
</script>

<style lang="scss" scoped>
    @import "../assets/styles/_vars";
    .aside__navigation{
        width: 200px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        padding: $distance-between-blocks;

        & .top{ 
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: $distance-between-blocks;
            width: 100%;

            & .logo{
                width: inherit;
                transform: translateY(-6px);
                display: block;

                & img{
                    user-select: none;
                    width: inherit;
                }
            }

            & .navigation{
                width: inherit;
                padding: $distance-between-blocks;

                &__list{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: calc($distance-between-blocks * 1.5);
                    
                    &-item-href{
                        display: flex;
                        flex-direction: row;
                        align-items: flex-end;
                        font-size: calc($font-size-relative * 1.1);
                        font-weight: 300;
                        gap: 8px;
                        color: rgba(217, 217, 217, 0.6);

                        & .nav_icon{
                            opacity: 0.6;
                            fill: #D9D9D9;
                            width: calc($font-size-relative * 1.2);
                            height: calc($font-size-relative * 1.5);
                        }

                        &:hover{
                            color: rgba(255, 255, 255, 1);

                            & .nav_icon{
                                opacity: 1;
                                fill: #FFFFFF;
                            }
                        }

                        &.router-link-active{
                            color: rgb(255, 255, 255, 1);

                            & .nav_icon{
                                fill: #FFFFFF;
                                opacity: 1;
                            }
                        }
                    }
                }
            }
        }

        & .bottom{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: calc($distance-between-blocks * 2);

            & .user{
                width: inherit;
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: $distance-between-blocks;

                &__icon{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #282828;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex: none;
                    overflow: hidden;

                    &:hover{
                        border: 2.5px dotted #FFF;
                    }

                    &-img{
                        width: inherit;
                        height: inherit;
                        transform: scale(0.8);
                        border-radius: 50%;
                    }
                }

                &__data{
                    font-size: calc($font-size-relative * 0.9);
                    gap: calc($distance-between-blocks * 0.25);
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    flex-wrap: nowrap;
                    overflow: hidden;
                    
                    & h4, & p{
                        width: 100%;
                        display: block;
                        flex: none;
                    }
                }
            }
        }
    }
</style>