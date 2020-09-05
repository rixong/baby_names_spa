/// ACTIONS
import axios from 'axios'
import { config } from '../const'


export const setErrorMessage = (errorMessage) => {
  return {
    type: 'SET_ERROR_MESSAGE',
    payload: errorMessage
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
      dispatch(setErrorMessage(response.error));
    }
  }
  catch (error) {
    dispatch(setErrorMessage('Server is down. Try back later.'));
  }
}

export const getNames = (listId) => {
  // console.log('go', `${config.url.API_URL}/names?list_id=${listId}`)
  return async (dispatch) => {
    const response = (await axios.get(`${config.url.API_URL}/names?list_id=${listId}`)).data;
    dispatch({ type: 'GET_NAMES', payload: response.names });
  };
};

export const addName = (listId, name) => {
  console.log('Go')
  return async (dispatch) => {
    const response = await axios.post(config.url.API_URL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify({
          id: listId,
          name: name
        })
    })
    console.log(response.data)
    dispatch({type: "ADD_NAME", payload: response.name})
  }
}


//   const response = await fetch(`${URL}`, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body:
//       JSON.stringify({
//         id: listId,
//         name: name
//       })
//   })

export const changeStatus = () => {
  return {

  }
}

export const deleteName = () => {
  return {

  }
}