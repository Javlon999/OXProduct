import {GET_TABLE_REQUEST,GET_TABLE_FAILURE,} from '../Actions'

const initialState={
    logging:false,
    getTable:[],
}

export function data(state=initialState,action){
    switch(action.type){
          
        case GET_TABLE_REQUEST:
            return {
              ...state,
              logging:true,
              getTable:action.payload
            }    
    
        case GET_TABLE_FAILURE:
             return {
              ...state,
               logging:false,
               getTable:action.payload
                } 
      
       
        default:
            return state;
    }

}