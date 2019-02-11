/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT, REGISTER_REQUEST, REGISTER_ERROR, REGISTER_SUCCESS, PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_ERROR, UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_ERROR } from '../actions/auth'
import squidexApi from 'utils/squidexApi'

const state = { profileId: localStorage.getItem('user-profileId'), profile: localStorage.getItem('user-profile') || {}, status: '', hasLoadedOnce: false }

const getters = {
  isAuthenticated: state => !!state.profileId,
  authStatus: state => state.status,
  profileId: state => state.profileId,
}

const actions = {
  [AUTH_REQUEST]: ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      squidexApi.authenticateMember(user)
      .then(profile => {
        if (profile) {
          localStorage.setItem('user-profile', profile)
          localStorage.setItem('user-profileId', profile.id)
          commit(AUTH_SUCCESS, profile)
          resolve()
        } else {
          commit(AUTH_ERROR, 'User details incorrect')
          reject(new Error('User details incorrect'))
        }
      })
      .catch(err => {
        commit(AUTH_ERROR, err)
        // localStorage.removeItem('user-profile')
        // localStorage.removeItem('user-profileId')
        reject(err)
      })
    })
  },
  [PROFILE_REQUEST]: ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit(PROFILE_REQUEST)
      squidexApi.getMember(user)
      .then(profile => {
        if (profile) {
          localStorage.setItem('user-profile', profile)
          commit(PROFILE_SUCCESS, profile)
          resolve()
        } else {
          commit(PROFILE_ERROR, 'User details incorrect')
          reject(new Error('User details incorrect'))
        }
      })
      .catch(err => {
        commit(PROFILE_ERROR, err)
        localStorage.removeItem('user-profile')
        localStorage.removeItem('user-profileId')
        reject(err)
      })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-profile')
      localStorage.removeItem('user-profileId')
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
      })
      .catch(err => {
        commit(REGISTER_ERROR, err)
        localStorage.removeItem('user-profile')
        localStorage.removeItem('user-profileId')
        reject(err)
      })
    })
  },
  [UPDATE_REQUEST]: ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit(UPDATE_REQUEST)
      if (user.location) {
        squidexApi.updateMemberLocation(user)
        .then(profile => {
          if (profile) {
            commit(UPDATE_SUCCESS, state.profile)
            resolve()
          } else {
            commit(UPDATE_ERROR, 'User details incorrect')
            reject(new Error('User details incorrect'))
          }
        })
        .catch(err => {
          commit(UPDATE_ERROR, err)
          localStorage.removeItem('user-profile')
          localStorage.removeItem('user-profileId')
          reject(err)
        })
      } else {
        squidexApi.updateMember(user)
        .then(profile => {
          if (profile) {
            localStorage.setItem('user-profile', profile)
            commit(UPDATE_SUCCESS, profile)
            resolve()
          } else {
            commit(UPDATE_ERROR, 'User details incorrect')
            reject(new Error('User details incorrect'))
          }
        })
        .catch(err => {
          commit(UPDATE_ERROR, err)
          localStorage.removeItem('user-profile')
          localStorage.removeItem('user-profileId')
          reject(err)
        })
      }
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, profile) => {
    state.status = 'success'
    state.profileId = profile.id
    state.profile = profile
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [PROFILE_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [PROFILE_SUCCESS]: (state, profile) => {
    state.status = 'success'
    state.profileId = profile.id
    state.profile = profile
    state.hasLoadedOnce = true
  },
  [PROFILE_ERROR]: (state) => {
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
  },
  [UPDATE_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [UPDATE_SUCCESS]: (state, profile) => {
    state.status = 'success'
    state.profile = profile
    state.hasLoadedOnce = true
  },
  [UPDATE_ERROR]: (state) => {
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
