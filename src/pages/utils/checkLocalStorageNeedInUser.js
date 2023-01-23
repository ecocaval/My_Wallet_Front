export default function checkLocalStorageNeedInUser(userInfo, setUserInfo){
    let user

    if (!userInfo.userId || !userInfo.token) {
        user = JSON.parse(localStorage.getItem('userInfo'))
        setUserInfo(user)
        return user
    
    }
    return userInfo
}