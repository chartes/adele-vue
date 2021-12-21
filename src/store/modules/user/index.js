import {http} from '../../../modules/http-common';
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
    localStorage.setItem('user-adele', JSON.stringify(state.currentUser))
  },

  CLEAR_USER_DATA(state) {
    localStorage.removeItem('user-adele')
    deleteCookie('csrf_access_token')
    deleteCookie('csrf_refresh_token')
    deleteCookie('access_token_cookie')
    deleteCookie('refresh_token_cookie')
    location.reload()
  }
};

const actions = {
  login ({ commit }, credentials) { 
    return http
      .post('login', credentials)
      .then(({ data }) => {
        commit('SET_USER_DATA', data)
        return data
      }).catch(({error}) => {
        return error
      })
  },

  async logout({commit}) {
    await http.get('logout')
    commit('CLEAR_USER_DATA')
  },

  register({commit}) {
    console.log("Register: not yet implemented")
  },

  async save({dispatch}, userData) {
    try {
      const newData = await http.post('update-user', userData)
      const loginResponse = await dispatch('login', {
        email: newData.data.email,
        password: userData.password
      })
      if (loginResponse.errors) {
        return {
          error: loginResponse.errors.details
        }
      } else {
        return {
          error : null,
        } 
      }
    } catch (e) {
      return {
        error : e,
      } 
    }
  },

  async inviteUser({state}, {email, role}) {
    try {
      const response = await http.post('invite-user', {email, role})  
      return {
        error: response.error
      }
    } catch (e) {
      return {
        error: e
      }
    }
  },

  async getTeachersList(state)  {
    const response = await http.get(`teachers`)
    return response.data.data.users
  }
 
};

const getters = {
  isAuthenticated(state) {
    return !!state.currentUser
  },
  currentUserIsAdmin(state) {
    return state.currentUser && state.currentUser.roles.includes('admin')
  },
  currentUserIsTeacher(state) {
    return state.currentUser && state.currentUser.roles.includes('teacher')
  },
  currentUserIsStudent(state) {
    return state.currentUser && state.currentUser.roles.includes('student') && !state.currentUser.roles.includes('teacher')  && !state.currentUser.roles.includes('admin')
  },
  userFromWhitelist: (state) => (whitelist, userId) => {
    return whitelist.users.find(u => {
        return u.id === userId
    })
  },
  getUser: (state) => async (userId) => {
    const response = await http.get(`users/${userId}`)
    return response.data
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
