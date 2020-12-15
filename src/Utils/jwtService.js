// import FuseUtils from './FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


const Tag = '[src.store.actions]'
class jwtService  {
    init() {
        this.handleAuthentication();
    }
    setSession = access_token => {
        if (access_token) {
            localStorage.setItem('jwt_access_token', access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        } else {
            localStorage.removeItem('jwt_access_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };
    isAuthTokenValid = access_token => {
        if (!access_token) {
            return false;
        }
       
        // const currentTime = Date.now() / 1000;
        // if (decoded.exp < currentTime) {
        //     console.warn('access token expired');
        //     return false;
        // } else {
        //     return true;
        // }
    };
    

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new jwtService();
export default instance;