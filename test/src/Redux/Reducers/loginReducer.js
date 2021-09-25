import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT} from '../Actions'


    let userData = JSON.parse(sessionStorage.getItem('test'));
    // console.log('userData',userData)
    const initialState = userData ? { logging: true, userData } : {userData:[],logging:false};
   console.log('initialState',initialState)

export function authentication(state=initialState,action){


    switch(action.type){
        case LOGIN_REQUEST:
            return {
                ...state,
                logging:true,
                userData:action.payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                logging:true,
                userData:action.payload
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                logging:false,
                userData:action.payload
            }
      
        case LOGOUT:
            return {}
            
        default:
            return state;
    }

}