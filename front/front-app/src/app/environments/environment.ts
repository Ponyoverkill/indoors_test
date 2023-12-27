export const WSGI_HOST = "http://localhost:3302"
export const ASGI_HOST = "localhost:3301"
export const STATIC_HOST = "http://localhost:3303"

export const BACKEND_URLS = {
  login: `${WSGI_HOST}/api/v1/user/login/`,
  refresh: `${WSGI_HOST}/api/v1/user/refresh/`,
  verify: `${WSGI_HOST}/api/v1/user/verify/`,
  register: `${WSGI_HOST}/api/v1/user/register/`,
  user: `${WSGI_HOST}/api/v1/user/`,
  kittens: `${WSGI_HOST}/api/v1/kittens/`,
  breeds: `${WSGI_HOST}/api/v1/breeds/`,
  wools: `${WSGI_HOST}/api/v1/wools/`,
  myKittens: `${WSGI_HOST}/api/v1/my-kittens/`,
  chat: `ws://${ASGI_HOST}/ws/chat/`,
  getRoom: `http://${ASGI_HOST}/api/v1/chat/`,
  ws: `ws://${ASGI_HOST}/ws/`
}


export const environment = {
  production: true
};
