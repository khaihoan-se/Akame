export const userAccessToken = () => {
    const accessToken: any= localStorage.getItem('accessToken') !== 'undefined' 
    ? JSON.parse(localStorage.getItem('accessToken') || '{}') 
    : localStorage.clear();

    return accessToken
}

export const fetchUser = () => {
    const userInfo: any= localStorage.getItem('user') !== 'undefined' 
    ? JSON.parse(localStorage.getItem('user') || '{}') 
    : localStorage.clear();

    return userInfo
}