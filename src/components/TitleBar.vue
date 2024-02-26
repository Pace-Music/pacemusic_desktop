<template>
    <div id="sidebar">
        <div class="sidebar__btns">
            <button class="sidebar__btns-btn" @click="handleButton('MINIMIZE')">
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="34" width="32" height="3" rx="1.5" fill="#7E51FD"/>
                </svg>                                     
            </button>
            <button class="sidebar__btns-btn" @click="handleButton('MAXIMIZE')">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6.2" y="6.2" width="11.1" height="11.1" rx="1.93889" stroke="#7E51FD" stroke-width="1.5"/>
                </svg>                                                                                          
            </button>
            <button class="sidebar__btns-btn close" @click="handleButton('CLOSE')">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4.55811" y="18.4142" width="19.5955" height="1.45332" rx="0.726659" transform="rotate(-45 4.55811 18.4142)" fill="#7E51FD"/>
                    <rect x="5.58582" y="4.55811" width="19.5955" height="1.45332" rx="0.726659" transform="rotate(45 5.58582 4.55811)" fill="#7E51FD"/>
                </svg>                      
            </button>
        </div>
    </div>
</template>

<script>
const { ipcRenderer } = require('electron');

export default {
    name: "SideBarComponent",
    methods: {
        handleButton(btn){
            console.log(`WINDOW_${btn}`);
            ipcRenderer.send(`WINDOW_${btn}`,);
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "../assets/styles/_vars";

    #sidebar {
        display: flex;
        position: sticky;
        top: 0;
        inset-block-start: 0;
        inset-inline-end: 0;
        inset-inline-start: 0;
        
        z-index: 9999;
        flex: none;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;

        width: 100%;
        height: 32px;
        user-select: none;
        -webkit-app-region: drag;
        overflow: hidden;

        & .sidebar__btns{
            height: 100%;
            display: inline-flex;

            &-btn{
                height: 100%;
                width: 48px;
                padding: 0 calc($font-size-main / 2);
                display: flex;
                align-items: center;
                justify-content: center;
                background: transparent;
                color: #A186EE;
                -webkit-app-region: no-drag;

                &:hover{
                    background: #FFFFFF22;

                    &.close{
                        background: #d61313CC;
                    }
                }
            }
        }
    }
</style>