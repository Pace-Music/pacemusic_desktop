import { createStore } from 'vuex'

export default createStore({
  state: {
    token: 'not_access',
    account: {
      id: 0,
      name: 'Тестовый пользователь',
      src_img: 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6561d83088410d6f4a17dfff_6561ee656e6f8b6285a47d48/scale_1200',
      now_playing: 'Какая-то песня • Артист песни'
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
