<template>
    <div id="sidebar">
        <div class="settings_router">
            <RouterLink to="/settings" class="settings_router-link" title="Настройки">
                <svg class="settings_router-link-item" width="96" height="24" viewBox="0 0 96 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="12" fill="white"/>
                    <rect x="36" width="24" height="24" rx="12" fill="white"/>
                    <rect x="72" width="24" height="24" rx="12" fill="white"/>
                </svg>                    
            </RouterLink>
        </div>

        <div class="sidebar__btns">
            <button class="sidebar__btns-btn" @click="handleButton('MINIMIZE')">
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="22" y="34" width="30" height="3" rx="1.5" fill="inherit" stroke="none"/>
                </svg>             
            </button>
            <button class="sidebar__btns-btn" @click="handleButton('MAXIMIZE')">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6.2" y="6.2" width="11.1" height="11.1" rx="1.93889" fill="none" stroke="inherit" stroke-width="1.5"/>
                </svg>                                                                                          
            </button>
            <button class="sidebar__btns-btn close" @click="handleButton('CLOSE')">
                <svg style="transform: scale(0.9);" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4.55811" y="18.4142" width="19.5955" height="1.45332" rx="0.726659" stroke="none" transform="rotate(-45 4.55811 18.4142)" fill="inherit"/>
                    <rect x="5.58582" y="4.55811" width="19.5955" height="1.45332" rx="0.726659" stroke="none" transform="rotate(45 5.58582 4.55811)" fill="inherit"/>
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
        justify-content: space-between;

        width: 100%;
        height: 32px;
        user-select: none;
        -webkit-app-region: drag;
        overflow: hidden;

        & .settings_router{
            width: auto;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            &-link{
                padding: 0 calc($font-size-main / 1.25);
                -webkit-app-region: no-drag;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;

                &-item{
                    width: 24px;
                }
            }
        }

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
                cursor: pointer;

                & svg{
                    fill: $default-white-color-100;
                    stroke: $default-white-color-100;
                }

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