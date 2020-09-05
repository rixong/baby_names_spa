/// ACTIONS
import axios from 'axios'
import { config } from '../const'

export const SetErrorMessage = (error) => {
  return {
    type:'SET_ERROR_MESSAGE',
    payload: error
  }
}

export const getCurList = (path) => async dispatch => {
  try {
    const response = (await axios.get(`${config.url.API_URL}${path}`)).data
    // console.log(response)
    if (response.status === 'ok') {
      window.history.pushState("object or string", "Title", `/?list_id=${response.list.uid}`);
      dispatch({ type: 'GET_CURLIST', payload: response.list })
    } else {
      dispatch (SetErrorMessage(response.error));
    }
  }
  catch (error) {    
    dispatch (SetErrorMessage('Server is down. Try back later.'));
  }


}


export const getNames = () => {
  return {

  }
}

export const addName = () => {
  return {

  }
}

export const changeStatus = () => {
  return {

  }
}

export const deleteName = () => {
  return {

  }
}