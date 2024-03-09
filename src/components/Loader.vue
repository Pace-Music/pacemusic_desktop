<script>
    export default{
        name: "LoaderComponent",
        mounted() {
            setTimeout(() => {
                console.log("Загрузка завершается или уже завершена");
                setTimeout(() => {
                    if (this.$refs.preloader) {
                        document.querySelector('.container_loading').classList.add('loading__end');
                        setTimeout(() => {
                            document.body.removeAttribute("class")
                            if (document.querySelector('.container_loading')) {
                                document.querySelector('.container_loading').remove();
                            }
                        }, 1000);
                    }
                }, 5000);
            }, 1000);
        },
    }
</script>


<template>
    <div class="container_loading" ref="preloader">
        <video 
            class="container_loading-loader" 
            ref="loader" 
            src="../assets/videos/Pace_music-loader.mp4"
            autoplay></video>
    </div>
</template>

<style lang="scss" scoped>
    .container_loading{
        flex: 1;
        position: fixed;
        width: 100vw;
        height: 100vh;
        display: flex;
        background:#FFF;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 1;

        &-loader{
            height: 100%;
        }
    }

    .loading__end{
        transition: opacity 1.5s linear;
        opacity: 0;
      }
</style>

