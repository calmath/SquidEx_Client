
import { INIT_REQUEST, INIT_ERROR, INIT_SUCCESS } from '../actions/init'
import squidexApi from 'utils/squidexApi'
import Vue from 'vue'

const state = { status: '', squidexToken: JSON.parse(localStorage.getItem('squidex-token') || '{}') }

const getters = {
  getSquidexToken: state => state.squidexToken,
  // TODO Check it's not expired...
  isTokenLoaded: state => !!state.squidexToken.access_token,
}

const actions = {
  [INIT_REQUEST]: ({commit, dispatch}) => {
    commit(INIT_REQUEST)
    squidexApi.getAccessToken()
      .then(resp => {
        localStorage.setItem('squidex-token', JSON.stringify(resp))
        commit(INIT_SUCCESS, JSON.stringify(resp))
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
