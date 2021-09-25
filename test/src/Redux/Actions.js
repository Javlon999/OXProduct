import axios from "axios";

import { history } from "../Containers/history";
export const LOGIN_REQUEST = "USERS_LOGIN_REQUEST";
export const LOGIN_SUCCESS = "USERS_LOGIN_SUCCESS";
export const LOGIN_FAILURE = "USERS_LOGIN_FAILURE";

export const LOGOUT = "LOGOUT";

export const GET_TABLE_REQUEST = "GET_TABLE_REQUEST";
export const GET_TABLE_FAILURE = "GET_TABLE_FAILURE";



const base_url = "https://face.ox-sys.com";

export function loginFetch({ password, username }) {
  const formData =new FormData();
  formData.append('_username', username)
  formData.append('_password', password)
  formData.append('_subdomain', 'face')
 
  const headers = {

    'Content-Type': 'application/x-www-form-urlencoded'
  };
  return function (dispatch) {
    return axios
      .post(`${base_url}/security/auth_check`, formData, { headers })
      .then(
        (response) => {
          dispatch(success(response.data));
          sessionStorage.setItem("test", JSON.stringify(response.data));
          history.push("/dashboard/table");
        },
        (error) => {
          console.log(error);
          dispatch(errorLogin(error));
        }
      );
  };
}


export function getFormData() {
  let test = JSON.parse(sessionStorage.getItem("test"));
  const formData =new FormData();
  formData.append('size', 1)
  formData.append('page', 1)
  let item={
    "size": 50,
    "page": 1,
    "stock": {
        "exist": true,
        "location": [
            42
        ]
    },
 }
 
  const headers = {
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + test.token
   
  };
  return function (dispatch) {
    return axios.post(`${base_url}/variations`,  item, { headers }).then(
      (response) => {
        dispatch(getTableData(response.data));
       
      },
      (error) => {
        console.log(error);
        dispatch(errorgetTableData(error));
      }
    );
  };
}



function success(response) {
  return {
    type: LOGIN_REQUEST,
    payload: response,
  };
}
function errorLogin(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
}


function getTableData(response) {
  return {
    type: GET_TABLE_REQUEST,
    payload: response,
  };
}
function errorgetTableData(error) {
  return {
    type: GET_TABLE_FAILURE,
    payload: error,
  };
}

