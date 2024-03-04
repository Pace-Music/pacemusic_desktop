<template>
    <section id="commits" v-if="show">
        <h4 class="commit__connect" v-if="loaded == false">Получение актуальных версий...</h4>
        <div v-else class="commit_container">
            <ul v-for="(commit, index) in commits" :key="index">
                <li class="app-version">
                    <a :href="commit.url">
                        <b>
                            {{ 
                                commit.version === `v ${require('/package.json').version}` ?
                                `${commit.version} - Текущая версия` :
                                (index === 0 && !commit.version.includes("Текущая версия") ?
                                commit.version + " Новая Версия" :
                                commit.version)
                            }}
                        </b>
                    </a>
                </li>
                <li v-for="message in commit.info" :key="message">
                    <p>{{ message }}</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { appData } from '@/coreAPI/getData';

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
                appData.getAppData("GET_COMMITS")
                .then((result) => {
                    console.log(result);
                    this.commits = result
                    this.loaded = true
                }).catch((err) => {
                    console.log(err);
                    this.error = err
                    return err
                });
            }
        },
    },
    watch: {
        show(newVal) {
            if (newVal) this.getCommits();
        }
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
