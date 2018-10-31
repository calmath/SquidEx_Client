
import { INIT_REQUEST, INIT_ERROR, INIT_SUCCESS } from '../actions/init'
import squidexApi from 'utils/squidexApi'
import Vue from 'vue'

const state = { status: '', squidexToken: localStorage.getItem('squidex-token') || {} }

const getters = {
  getSquidexToken: state => state.squidexToken,
  isTokenLoaded: state => !!state.squidexToken.access_token,
}

const actions = {
  [INIT_REQUEST]: ({commit, dispatch}) => {
    commit(INIT_REQUEST)
    squidexApi.getAccessToken()
      .then(resp => {
        localStorage.setItem('squidex-token', resp)
        commit(INIT_SUCCESS, resp)
      })
      .catch(resp => {
        commit(INIT_ERROR)
      })
  },
}

const mutations = {
  [INIT_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [INIT_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'squidexToken', resp)
  },
  [INIT_ERROR]: (state) => {
    state.status = 'error'
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
