import {
  loginApi,
  getInfoApi
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

// import {
//   reject,
//   resolve
// } from 'core-js/fn/promise'

const getDefaultState = () => {
  return {
    user: null // 存储登录成功后服务器返回的数据
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER(state, payload) {
    state.user = payload
  }
}

const actions = {
  // 用于提交 登入请求
  // 解构出 提交的表单, 并赋值给 userInfo
  login({
    commit
  }, userInfo) {

    return new Promise((resolve, reject) => {
      loginApi(userInfo).then((res) => {
        // 返回的数据对象中 解构出 data
        const {
          data
        } = res
        if (data) {
          // 登录成功
          commit('SET_USER', data)
          resolve()

        } else {
          reject(res)
        }
      }).catch((error) => {
        reject(error)
      })
    })

  },


  // 根据 token 恢复用户的登录状态
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfoApi().then(res => {
        // 根据后端写的情况, 如果请求返回的结果 字符串 那就是 token 失效了
        if (typeof res === 'string') {
          reject()
        } else {
          // token 是有效的  ，那就把请求到的用户数据更新给 user
          commit('SET_USER', res.data)
          resolve()
        }
      })
    })
  },

  // 退出登录
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // 删除 token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      // 登录超时，token 失效，那就把本地的存储的 token 删除
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
