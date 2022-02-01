import {http, isValidJwt} from '../../../modules/http-common';

const state = {
  currentUser: null,
  jwt: localStorage.getItem('tokenAdele'),

  usersSearchResults: [],
};

const mutations = {

  SET_USER_DATA (state, userData) {
    if (userData) {
      state.currentUser = {
        ...userData,
        isAdmin: userData.roles.indexOf("admin") > -1
      }
    } else {
      state.currentUser = null
    }
  },

  SET_JWT_TOKEN(state, token) {
    if (token) {
      localStorage.tokenAdele = token;
    } else {
      localStorage.removeItem("tokenAdele");
    }
    state.jwt = token
  }
};

const actions = {
  setUserData({ commit }, userData) {
    commit('SET_USER_DATA', userData)
  },
  login ({ commit }, credentials) { 
    return http
      .post('login', credentials)
      .then(({ data }) => {
        commit('SET_USER_DATA', data.user_data)
        commit('SET_JWT_TOKEN', data.token)
        return data
      })  },

  async logout({commit}) {
    await http.get('logout')
    commit('SET_USER_DATA', null)
    commit('SET_JWT_TOKEN', null)
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

  async sendPasswordResetLink(_, {email}) {
    await http.post('send-password-reset-link', {email})
  },

  async resetPassword({commit}, {token, password, password2}) {
    return await http.post('reset-password', {token, password, password2})
  },

  async getTeachersList(state)  {
    const response = await http.get(`teachers`)
    return response.data.data.users
  }
 
};

const getters = {
  isAuthenticated(state) {
    return !!state.currentUser && isValidJwt(state.jwt)
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
