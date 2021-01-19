import axios from 'axios';
import moment from 'moment';
import { CLEAR_ERRORS, CLEAR_USER, GET_DATA, GET_ERRORS, GET_USER } from '../types.redux';


//Login - Get user 
export const loginUser = (userData, history) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            dispatch({ type: CLEAR_ERRORS })
            dispatch({
                type: GET_USER,
                payload: res.data
            })
            history.push('/dashboard');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
        );
}

export const logoutUser = (history) => dispatch => {
    dispatch({ type: CLEAR_USER })
    history.push('/login');
}


export const getData = () => dispatch => {
    axios.get('https://api.github.com/repositories/19438/issues')
        .then(ress => {
            let data = ress.data;
            // console.log(data)
            let usersData = []
            data.map(userDetails => {
                let user = {};
                user.name = userDetails.user.login;
                user.comment_created_at = moment(userDetails.created_at).format('MM-DD-YYYY')
                user.comment_updated_at = userDetails.updated_at;
                user.comment_count = userDetails.comments;
                user.number = userDetails.number;
                usersData.push(user);
            })
            dispatch({
                type: GET_DATA,
                payload: usersData
            })
        })
        .catch(err => console.log(err))
}