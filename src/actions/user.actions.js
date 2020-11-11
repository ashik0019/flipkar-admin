import axios from "../helpers/axios"
import { authConstants, userConstant } from "./constants"


//signup process...................................................
export const signup = (user) =>{
    return async (dispatch) => {
        dispatch({type: userConstant.USER_REGISTER_REQUEST})
        const res = await axios.post('/admin/signup', {
            ...user
        })


        if(res.status === 201) {
            const {message} = res.data;
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({
                type: userConstant.USER_REGISTER_SUCCESS,
                payload: {message}
            })
        }else{
            if(res.status === 400) {
                dispatch({
                    type: userConstant.USER_REGISTER_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                })
            }
        }
    }
}
