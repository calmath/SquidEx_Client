/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT, REGISTER_REQUEST, REGISTER_ERROR, REGISTER_SUCCESS } from '../actions/auth'
import squidexApi from 'utils/squidexApi'

const state = { profile: localStorage.getItem('user-profile') || {}, status: '', hasLoadedOnce: false }

const getters = {
  isAuthenticated: state => !!state.profile.id,
  authStatus: state => state.status,
}

const actions = {
  [AUTH_REQUEST]: ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      squidexApi.authenticateMember(user)
      .then(profile => {
        if (profile) {
          localStorage.setItem('user-profile', profile)
          commit(AUTH_SUCCESS, profile)
          resolve()
        } else {
          commit(AUTH_ERROR, 'User details incorrect')
          reject(new Error('User details incorrect'))
        }
        // Here set the header of your ajax library to the token value.
        // example with axios
        // axios.defaults.headers.common['Authorization'] = resp.token
      })
      .catch(err => {
        commit(AUTH_ERROR, err)
        localStorage.removeItem('user-profile')
        reject(err)
      })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-profile')
      resolve()
    })
  },
  [REGISTER_REQUEST]: ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit(REGISTER_REQUEST)
      squidexApi.createMember(user)
      .then(profile => {
        if (profile) {
          localStorage.setItem('user-profile', profile)
          commit(REGISTER_SUCCESS, profile)
          resolve()
        } else {
          commit(REGISTER_ERROR, 'User details incorrect')
          reject(new Error('User details incorrect'))
        }
        // Here set the header of your ajax library to the token value.
        // example with axios
        // axios.defaults.headers.common['Authorization'] = resp.token
      })
      .catch(err => {
        commit(REGISTER_ERROR, err)
        localStorage.removeItem('user-profile')
        reject(err)
      })
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, profile) => {
    state.status = 'success'
    state.profile = profile
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {}
  },
  [REGISTER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [REGISTER_SUCCESS]: (state, profile) => {
    state.status = 'success'
    state.profile = profile
    state.hasLoadedOnce = true
  },
  [REGISTER_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
