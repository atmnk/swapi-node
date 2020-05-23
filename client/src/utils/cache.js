export const getJwtToken = () => {
    return window.localStorage.getItem('token'); 
 };

export const storeToken = (token) => {
    window.localStorage.setItem('token', token);
};

export const clearStorage = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
};
