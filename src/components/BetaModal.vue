<template>
    <section id="commits" v-if="show">
        <h4 class="commit__connect" v-if="loaded == false">Получение актуальных версий...</h4>
        <div v-else class="commit_container">
            <ul v-for="(commit, index) in commits" :key="index">
                <li class="app-version">
                    <b>{{ commit.version === $store.getters.getAppVersion ? `${commit.version} - Текущая версия` : commit.version }}</b>
                </li>
                <li v-for="message in commit.info" :key="message">
                    <p>{{ message }}</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: "BetaModalComp",
    props: {
        show: Boolean,
    },
    data() {
        return {
            commits: [],
            error: null,
            loaded: false
        };
    },
    methods: {
        getCommits() {
            if (this.commits.length === 0) {
                axios.get('https://api.github.com/repos/vkidik/pace_music-desktop/commits')
                .then(response => {
                    const newCommits = response.data
                    .filter(commitData => commitData.commit.message !== 'init')
                    .map(commitData => {
                        const parts = commitData.commit.message.split('\n');
                        const version = parts.shift();
                        return {
                            version: version,
                            info: parts,
                        };
                    });
                    this.loaded = true
                    this.commits = newCommits;
                    if (newCommits.length > 0) {
                        this.$store.commit('setAppVersion', newCommits[0].version);
                    }
                })
                .catch(error => {
                    console.error('Error fetching commits:', error);
                    this.error = error;
                    return this.error
                })
            }
        },
    },
    mounted(){
        this.getCommits()
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_vars";

#commits{
    position: absolute;
    z-index: 3;
    height: 100%;
    width: 100%;
    background-color: $default-black-color-75;

    & .commit__connect{
        margin: calc($distance-between-blocks * 3);
        color: $default-white-color-100;
    }

    & .commit_container{
        position: absolute;
        width: calc(100% - 10px);
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        z-index: 5;
    
        & ul{
            flex: none;
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: calc($distance-between-blocks * 3);
            font-size: calc($font-size-relative * 1);
    
            & li:first-child{
                margin-bottom: calc($distance-between-blocks * 0.5);
                font-size: calc($font-size-relative * 1.5);
            }
        }
    }
}
</style>
