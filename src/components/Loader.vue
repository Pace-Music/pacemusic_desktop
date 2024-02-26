<script>
    // import icon from '@/assets/icons/icon.vue'

    export default{
        name: "LoaderComponent", 
        components: {
            // icon
        },
        mounted() {
            console.log("Loading is ending...");
            setTimeout(() => {
                if (this.$refs.preloader) {
                    document.querySelector('.container_loading').classList.add('loading__end');
                    setTimeout(() => {
                        document.body.classList.remove('hidden');
                        if (document.querySelector('.container_loading')) {
                            document.querySelector('.container_loading').remove();
                        }
                    }, 1250);
                }
            }, 2000);
        },
    }
</script>


<template>
    <div class="container_loading" ref="preloader">
        <!-- <icon class="container_loading-icon"></icon> -->
    </div>
</template>

<style lang="scss" scoped>
    .container_loading{
        /*background: ;*/
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;

        &-icon{
            width: 15%;
            height: 15%;
        }
    }

    .loading__end{
        transition: opacity 1.5s linear;
        opacity: 0;
      }
</style>

