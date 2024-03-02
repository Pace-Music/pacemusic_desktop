<template>
    <div id="links">
        <header class="settings">
            <nav class="settings__navigation">
                <ul class="settings__navigation__list">
                    <li class="settings__navigation__list-item">
                        <RouterLink class="settings__navigation__list-item-href" to="/settings"><Settings class="nav_icon"></Settings></RouterLink>
                    </li>
                </ul>
            </nav>
        </header>
        <div class="links">
            <div class="links__container">
                <h3 class="links__container-title">Подключенные аккаунты:</h3>
                <div class="links__container-accounts">
                    <div v-for="(account, index) in services" :key="index" class="account">
                        <div class="account__icon">
                            <img class="account__icon-item" :src="account.icon" :alt="account.name">
                        </div>
                        <div class="account__title">
                            <h4 class="account__title-name">{{ account.name }}</h4>
                        </div>
                    </div>
                    <button class="account add_account"><h5>+</h5></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Settings from '@/assets/icons/settings.vue'

    export default {
        name: "LinksView",
        components: {
            Settings
        },
        data(){
            return{
                services: [
                    {
                        name: "Spotify",
                        icon: "https://storage.googleapis.com/pr-newsroom-wp/1/2021/02/Spotify_Icon_RGB_Green.png",
                    },
                    {
                        name: "Яндекс Музыка",
                        icon: "https://jobs.s3.yandex.net/public_services/one.png_eefec2c0278245cd8b89f91181221d32",
                    },
                    {
                        name: "Apple Music",
                        icon: "https://music.apple.com/assets/favicon/favicon-180.png",
                    },
                    {
                        name: "YouTube Music",
                        icon: "https://music.youtube.com/img/favicon_144.png",
                    },
                    // {
                    //     name: "SoundCloud",
                    //     icon: "https://soundcloud.com/pwa-round-icon-192x192.png",
                    // },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/_vars";

    #links{
        flex-direction: column;
        gap: calc($distance-between-blocks * 1.5);
        & .settings{
            width: 100%;
            height: auto;
            flex: none;
    
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
        & .links{
            flex: 1;
            position: relative;

            &__container{
                width: 100%;
                position: absolute;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: calc($distance-between-blocks * 1.5);
                
                &-accounts{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: calc($distance-between-blocks * 1.1);

                    & .account{
                        width: 100%;
                        padding: calc($distance-between-blocks * 1.375);
                        background: $default-grey-color-50;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: flex-start;
                        gap: $distance-between-blocks * 1.375;
                        overflow: hidden;
                        border-radius: $distance-between-blocks * 1.5;

                        &.add_account{
                            justify-content: center;
                            margin-top: $distance-between-blocks * 1.375;
                            box-shadow: inset 0px 4px 18px rgba(98, 98, 98, 0.3), inset 0px 1px 30px rgba(98, 98, 98, 0.3);
                            color: $default-white-color-100;
                            cursor: pointer;

                            &:hover{
                                background: $default-grey-color-75;
                            }

                            & h5{
                                font-size: 24px;
                                user-select: none;
                            }
                        }

                        &__icon{
                            height: 40px;
                            width: 40px;
                            
                            &-item{
                                user-select: none;
                                width: inherit;
                                height: inherit;
                            }
                        }
                    }
                }
            }
        }
    }
</style>