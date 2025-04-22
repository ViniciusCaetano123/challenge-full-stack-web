
export const login = (credentials) => ({
    url: '/auth/login',
        config: {
        method: 'post',
        data: credentials
    },
  })
  
export const getProfile = () => ({
    url: '/auth/me',
    method: 'get'
})