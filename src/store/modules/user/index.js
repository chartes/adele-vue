import {http} from '../../../modules/http-common';
import {getUserRoles} from '../../../modules/user-helpers';
import { deleteCookie } from '../../../modules/cookies-helpers';

const state = {
  currentUser: null,

  usersSearchResults: [],
};

const mutations = {

  SET_USER_DATA (state, userData) {
    state.currentUser = {
      ...userData,
      isAdmin: userData.roles.indexOf("admin") > -1
    }
    localStorage.setItem('user', JSON.stringify(state.currentUser))
  },

  CLEAR_USER_DATA(state) {
    localStorage.removeItem('user')
    deleteCookie('csrf_access_token')
    deleteCookie('csrf_refresh_token')
    location.reload()
  }
};

const actions = {
  login ({ commit }, credentials) { 
    return http
      .post('login', credentials)
      .then(({ data }) => {
        console.log("LOGIN user data is:", data)
        commit('SET_USER_DATA', data)
      }).catch(({error}) => {
        console.log("LOGIN ERROR", error)
      })
  },

  logout({commit}) {
    commit('CLEAR_USER_DATA')
  },

  register({commit}) {
    console.log("Register: not yet implemented")
  },

 
};

const getters = {
  loggedIn(state) {
    return !!state.currentUser
  },
  currentUserIsAdmin(state) {
    return state.currentUser && state.currentUser.roles.includes('admin')
  },
  currentUserIsTeacher(state) {
    return state.currentUser && state.currentUser.roles.includes('teacher')
  },
  currentUserIsStudent(state) {
    return state.currentUser && state.currentUser.roles.includes('student') && !state.currentUser.roles.includes('teacher')
  },
  userFromWhitelist: (state) => (whitelist, userId) => {
    return whitelist.users.find(u => {
        return u.id === userId
    })
  }
};

const userModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default userModule;
