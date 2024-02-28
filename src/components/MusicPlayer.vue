<template>
    <div class="player">
        <div class="player__song">
            <div class="player__song-img">
                <img src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c906393cd082eb6c0a31a5ab" alt="Img" class="player__song-img-item">
            </div>
            <div class="player__song-data">
                <a href="" class="user__data-name"><h4 >Название песни</h4></a>
                <a href="" class="user__data-song"><p>Исполнитель</p></a>
            </div>
        </div>

        <div class="player__media">

        </div>
    </div>
</template>

<script>
    export default {
        name: "MusicPlayerComponent",
    }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/_vars";
    .player{
        flex: none;
        width: 100%;
        height: 90px;
        background: linear-gradient(transparent 0,rgba(0,0,0,.5) 100%),#0412786c;
        background-blend-mode: soft-light;
        mix-blend-mode: normal;
        backdrop-filter: blur(50px);
        border-radius: 1rem;
        padding: calc($distance-between-blocks * 0.9);
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        
        &__song{
            width: 200px;
            height: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            gap: calc($distance-between-blocks * 0.75);
            
            &-img{
                height: 100%;
                border-radius: 7.5px;
                overflow: hidden;
                flex: none;
                &:hover{
                    position: relative;
                    cursor: pointer;

                    &::after{
                        position: absolute;
                        content: "▲";
                        width: 100%;
                        height: 100%;
                        background: $default-black-color-25;
                        color: $default-white-color-100;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        top: 0;
                        left: 0;
                    }
                }

                &-item{
                    width: inherit;
                    height: inherit;
                }
            }

            &-data{
                flex: 1;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                gap: calc($distance-between-blocks * 0.5);
                font-size: calc($font-size-relative * 0.8);
                font-weight: 500;
                overflow: hidden;

                & a{
                    width: 100%;
                    display: block;
                    flex: none;
                    
                    & p{
                        color: #BBB;
                    }
                    
                    &:hover{
                        h4{
                            opacity: 0.9;
                        }
                        p{
                            color: #FFF;
                        }
                    }
                }
            }
        }
    }
</style>