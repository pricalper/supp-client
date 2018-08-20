// ADAPTERS
import {API_ROOT} from './AdapterConstants'
import {INIT_HEADERS} from './AdapterConstants'
import {AUTH_HEADERS_JSON} from './AdapterConstants'

class AdapterUser {

  //JWT management
  static setToken(jsonToken) {
    return localStorage.setItem("token", jsonToken)
  }

  static getToken() {
    return localStorage.getItem("token")
  }

  static saveTokenAsCookie() {
    document.cookie = 'X-Authorization=' + this.getToken() + '; path=/';
  }

  static deleteToken() {
    localStorage.removeItem("token")
  }

  //login to receive JWT. getCurrentUser is an Thunk action
  static login(loginState) {
    return fetch(`${API_ROOT}/user_token`, {
    method: 'POST',
    headers: INIT_HEADERS,
    body: JSON.stringify({
      "auth": {
        "email": loginState.email,
        "password": loginState.password
      }})
    })
    .then(resp => resp.json())
  }

  static signup(signupState) {
    return fetch(`${API_ROOT}/users/create`, {
    method: 'POST',
    headers: INIT_HEADERS,
    body: JSON.stringify({
      "user": {
        "email": signupState.email,
        "password": signupState.password,
        "password_confirmation": signupState.confirmPassword,
        "username": signupState.username
      }})
    })
  }        

  static  persistAddInterests(userId, userInterests) {
    let bodyPersistAddInterests = {"user": {
      "interests": userInterests
    }};
    return fetch(`${API_ROOT}/user/${userId}/interests`, {
        method: 'POST',
        headers: AUTH_HEADERS_JSON,
        body: JSON.stringify(bodyPersistAddInterests)
    })
    .then(resp => resp.json())
  }

  static  persistRemoveInterests(userInterests) {
    let bodyPersistRemoveInterests = {"user": {
      "interests": userInterests
    }};
    return fetch(`${API_ROOT}/user_interests/${userInterests.id}`, {
        method: 'DELETE',
        headers: AUTH_HEADERS_JSON,
        body: JSON.stringify(bodyPersistRemoveInterests)
    }).then(resp => resp.json())
  }
}

export default AdapterUser;
