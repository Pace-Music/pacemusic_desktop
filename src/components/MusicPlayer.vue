<template>
    <div class="player" :style="`background: linear-gradient(transparent -0px, rgba(255, 255, 255, 0.05) 100%), ${imageBackgroundColor}`">
        <div class="player_left_container">
            <div class="player__song">
                <div class="player__song-img">
                    <img crossorigin="anonymous" @load="getImageBackgroundColor" :src="musicPlayer.track.imageUrl" alt="Img" class="player__song-img-item">
                </div>
                <div class="player__song-data">
                    <a href="" class="user__data-name"><h4>{{ musicPlayer.track.name }}</h4></a>
                    <a href="" class="user__data-song"><p>{{ musicPlayer.track.author }}</p></a>
                </div>
            </div>
            <div class="media__btns">
                <button class="media__btns-btn like" :data-id-track="musicPlayer.track.id">
                    <div class="icon">
                        <Love class="icon-item"></Love>
                    </div>
                </button>
            </div>
        </div>

        <div class="player_center_container">
            <div class="player__media">
                <span class="player__media-start">{{ formattedCurrentTime }}</span>
                <input
                    type="range"
                    class="player__media-delay"
                    v-model="musicPlayer.currentTime"
                    min="0"
                    :max="musicPlayer.duration"
                    step="1"
                    @input="newTime($event.target.value)"
                />
                <span class="player__media-end">{{ formattedDuration }}</span>
            </div>
        </div>

        <div class="player_right_container">
            <button @click="playPause">{{ musicPlayer.playing ? 'Pause' : 'Play' }}</button>
        </div>
    </div>
</template>

<script>
import Love from '@/assets/icons/love.vue';
const { CoreAPI } = require('@/coreAPI')

export default {
    name: "MusicPlayerComponent",
    components: { Love },
    data() {
        return {
            audioPlayer: null,
            currentTrackIndex: 0,
            tracks: [
                // {
                //     id: 1,
                //     imageUrl:"https://i.scdn.co/image/ab67706f0000000254473de875fea0fd19d39037",
                //     audioSource:"/music/Schizophrenia.mp3", 
                //     author:"Виктор Попов",
                //     name:"Schizophrenia",
                // },
                // {
                //     id: 2,
                //     imageUrl: 'https://i.scdn.co/image/ab67616d00001e02e89fb5002cc6bd0b275c2384',
                //     audioSource: "https://api.pacemusic.ru/music/Kishlak.mp3",
                //     author: "Кишлак",
                //     name: "Кодировка",
                // },
                // {
                //     id: 3,
                //     imageUrl: 'https://i.scdn.co/image/ab67616d00001e02806c160566580d6335d1f16c',
                //     audioSource: "/music/Stand.mp3",
                //     author: "Виктор Попов",
                //     name: "Stand",
                // },
                // {
                //     id: 4,
                //     imageUrl: 'https://i.scdn.co/image/ab67616d00004851b329c1c8e51a33111f1a94bc',
                //     audioSource: "/music/Summer-Waltz.mp3",
                //     author: "Виктор Попов",
                //     name: "Summer-Waltz",
                // },
                // {
                //     id: 4,
                //     imageUrl: 'https://i.scdn.co/image/ab67616d00004851b2b6670e3aca9bcd55fbabbb',
                //     audioSource: "/music/Start_(orchestra).mp3",
                //     author: "Виктор Попов",
                //     name: "Start_(orchestra)",
                // }
            ],
            musicPlayer: {
                track: {},
                currentTime: 0,
                duration: 0,
                playing: false,
            },
            imageBackgroundColor: null,
        };
    },
    computed: {
        formattedCurrentTime() {
            return this.formatTime(this.musicPlayer.currentTime);
        },
        formattedDuration() {
            return this.formatTime(this.musicPlayer.duration);
        }
    },
    watch: {
        'musicPlayer.track.audioSource'(newSource) {
            this.changeTrack(newSource);
        }
    },
    mounted() {
        CoreAPI.post('/auth/index.php', 'POST', {
            action: "GET_TRACKS",
        }, (data) => {
            data.tracks.forEach(track => {
                this.tracks.push(
                    {
                        id: track.id,
                        imageUrl: track.poster_src,
                        audioSource: track.audio_src,
                        author: track.author,
                        name: track.name
                    }
                )
            });
            
            if (this.tracks.length > 0) {
                this.musicPlayer.track = this.tracks[0];
            }
            this.initAudioPlayer();
        });
    },
    beforeUnmount() {
        this.audioPlayer && this.audioPlayer.pause();
    },
    methods: {
        newTime(newTime) {
            this.audioPlayer.currentTime = newTime;
        },
        getImageBackgroundColor(event) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const width = event.target.width;
            const height = event.target.height;
            context.drawImage(event.target, 0, 0, width, height);
            const pixelData = context.getImageData(0, 0, 1, 1).data;
            const color = `rgba(${pixelData[1]}, ${pixelData[2]}, ${pixelData[3]}, 0.25`;
            this.imageBackgroundColor = color;
        },
        initAudioPlayer() {
            if (this.audioPlayer) {
                this.audioPlayer.src = this.musicPlayer.track.audioSource;
            } else {
                this.audioPlayer = new Audio(this.musicPlayer.track.audioSource);
            }
            this.audioPlayer.addEventListener('timeupdate', () => {
                this.musicPlayer.currentTime = this.audioPlayer.currentTime;
            });
            this.audioPlayer.addEventListener('loadedmetadata', () => {
                this.musicPlayer.duration = this.audioPlayer.duration;
            });
            this.audioPlayer.addEventListener('ended', this.playNextTrack);
            if (this.musicPlayer.playing) {
                this.audioPlayer.play();
            }
        },
        playPause() {
            if (!this.audioPlayer) {
                this.initAudioPlayer();
            }
            if (this.audioPlayer.src) { // Проверяем, загружен ли трек
                if (this.musicPlayer.playing) {
                    this.audioPlayer.pause();
                } else {
                    this.audioPlayer.play();
                }
                this.musicPlayer.playing = !this.musicPlayer.playing;
            } else {
                console.error('No track loaded to play.');
            }
        },
        formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        },
        changeTrack(newSource) {
            if (this.audioPlayer.src !== newSource) {
                this.audioPlayer.pause(); // Приостанавливаем проигрывание перед загрузкой нового трека
                this.audioPlayer.src = newSource;
                this.audioPlayer.load();
                this.audioPlayer.addEventListener('canplaythrough', () => {
                    this.audioPlayer.play();
                    this.musicPlayer.playing = true;
                }, { once: true }); // Чтобы событие сработало только один раз
            }
        },
        async playNextTrack() {
            const currentIndex = this.tracks.findIndex(track => track.id === this.musicPlayer.track.id);
            const nextIndex = (currentIndex + 1) % this.tracks.length;
            this.musicPlayer.track = this.tracks[nextIndex];
            await this.waitForAudioToEnd();
            this.changeTrack(this.musicPlayer.track.audioSource);
        },
        waitForAudioToEnd() {
            return new Promise((resolve) => {
                this.audioPlayer.addEventListener('ended', resolve);
            });
        },
    }
};
</script>


<style lang="scss" scoped>
    @import "../assets/styles/_vars";
    .player{
        flex: none;
        width: 100%;
        height: 90px;
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

        & .player_left_container{
            height: 100%;
            width: auto;
            display: flex;
            align-items: center;
            gap: $distance-between-blocks;
            & .player__song{
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
                    width: 125px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    gap: calc($distance-between-blocks * 0.5);
                    font-size: calc($font-size-relative * 0.8);
                    font-weight: 500;
    
                    & a{
                        width: 100%;
                        display: block;
                        flex: none;
                        
                        & h4{
                            width: 100%;
                            display: block;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        & p{
                            width: 100%;
                            display: block;
                            color: #BBB;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
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
            & .media__btns{
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                align-items: center;
                gap: $distance-between-blocks * .75;

                &-btn{
                    background:none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 27.5px;
                    height: 27.5px;
                    cursor: pointer;

                    &.like .icon .icon-item{
                        stroke: #D9D9D9;
                        opacity: 0.6;
                        stroke-width: 2.5px;

                        &:hover{
                            stroke: #FFF;
                            opacity: 1;
                        }
                    }
                    &.like.active .icon .icon-item{
                        stroke: transparent;
                        opacity: 1;
                        fill: red;
                        stroke-width: 2px;
                    }

                    & .icon{
                        width: inherit;
                        height: inherit;

                        &-item{
                            width: inherit;
                            height: inherit;
                        }
                    }
                }
            }
        }
    }
</style>