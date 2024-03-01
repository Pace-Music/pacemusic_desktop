<template>
    <btn class="btn btn-commits" @click="getCommits()" title="Показать версии">Версии</btn>
</template>
  
<script>
  import axios from 'axios';
  
  export default {
    name: "BetaBtn",
    data() {
      return {
        commits: []
      };
    },
    methods: {
        showModal(commits){
            if(document.querySelector("#page #commits")){
                document.querySelector("#page #commits").remove()
            } else{
                document.querySelector("#page").innerHTML += `
                <section id="commits">
                    <div class="background" title="Закрыть просмотр версий"></div>
                    ${commits.map(commit => `
                        <ul>
                            <li class="app-version"><b>${commit.version == this.$store.getters.getAppVersion ? `${commit.version} - Текущая версия` : commit.version}</b></li>
                            ${commit.info.map(message => `<li><p>${message}</p></li>`).join('')}
                        </ul>`).join('')}
                </section>`
                document.querySelector("#page #commits .background").addEventListener("click", ()=> {
                    document.querySelector("#page #commits").remove()
                })
            }
        },
        getCommits() {
            if(this.commits.length == 0){
                let cnt = 0
                axios.get('https://api.github.com/repos/vkidik/pace_music-desktop/commits')
                .then(response => {
                    response.data.forEach(commitData => {
                        if(commitData.commit.message != 'init'){
                            let parts = commitData.commit.message.split('\n');
                            const version = parts.shift();
                            if(cnt == 0){
                                this.$store.commit('setAppVersion', version)
                                cnt += 1
                            }
                            const commit = {
                                version: version,
                                info: parts,
                            }
                            this.commits.push(commit);
                        }
                    })
                })
                .catch(error => {
                    console.error('Error fetching commits:', error);
                });
            } else{
                this.showModal(this.commits);
            }
        },
    },
    mounted(){
        this.getCommits()
    }
  }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/_vars";
    .btn-commits{
        padding: $distance-between-blocks calc($distance-between-blocks * 2.5);
        border-radius: calc($distance-between-blocks * 1.5);
        background: rgba(35, 35, 35, 0.5);
        color: $default-white-color-75;
        border-radius: $distance-between-blocks;
        cursor: pointer;
        box-shadow: inset 0px 4px 18px rgb(61 52 52 / 30%), inset 0px 1px 30px rgb(30 29 29 / 20%);
        
        &:hover{
            background: rgba(35, 35, 35, 0.75);
            color: $default-white-color-100;
        }
    }
</style>
