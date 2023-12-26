export const BACKEND_HOST = "127.0.0.1:8000"

export const BACKEND_URLS = {
  login: `http://${BACKEND_HOST}/api/v1/user/login/`,
  refresh: `http://${BACKEND_HOST}/api/v1/user/refresh/`,
  verify: `http://${BACKEND_HOST}/api/v1/user/verify/`,
  register: `http://${BACKEND_HOST}/api/v1/user/register/`,
  user: `http://${BACKEND_HOST}/api/v1/user/`,
  kittens: `http://${BACKEND_HOST}/api/v1/kittens/`,
  breeds: `http://${BACKEND_HOST}/api/v1/breeds/`,
  wools: `http://${BACKEND_HOST}/api/v1/wools/`,
  myKittens: `http://${BACKEND_HOST}/api/v1/my-kittens/`,
  chat: `ws://${BACKEND_HOST}/ws/chat/`,
  getRoom: `http://${BACKEND_HOST}/api/v1/chat/`,
  ws: `ws://${BACKEND_HOST}/ws/`

}

export const environment = {
  production: false
};
