/// ACTIONS
import axios from 'axios'
import { config } from '../const'


export const setErrorMessage = (errorMessage) => {
  return {
    type: 'SET_ERROR_MESSAGE',
    payload: errorMessage
  }
}

export const clearErrorMessage = () => {
  return {
    type: 'CLEAR_ERROR_MESSAGE'
  }
}

export const showLoading = () => {
  return {
    type: 'SHOW_LOADING'
  }
}

export const clearLoading = () => {
  return {
    type: 'CLEAR_LOADING'
  }
}

export const setSortOrder = (order) => {
  return {
    type: 'SET_SORT_ORDER',
    payload: order
  }
}

export const getCurList = (path) => async dispatch => {
  try {
    const response = (await axios.get(`${config.url.API_URL}${path}`)).data
    // console.log(response)
    if (response.status === 'ok') {
      window.history.pushState("object or string", "Title", `/?list_id=${response.list.uid}`);
      dispatch({ type: 'GET_CURLIST', payload: response.list })
      dispatch(clearLoading());
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

export const addName = (listId, newName) => async (dispatch) => {
  try {
    const response = (await axios.post(config.url.API_URL, {
      id: listId,
      name: newName
    })).data
    if (response.status === 'ok') {
      console.log(response)
      dispatch({ type: "ADD_NAME", payload: response.name })
    }
    if (response.status === 'error') {
      dispatch(setErrorMessage(response.error))
    }
  }
  catch (error) {
    dispatch(setErrorMessage('Server is down. Try back later.'))
  }
}

export const changeNameStatus = (nameId) => {
  console.log('status')
  return async dispatch => {
    const response = (await axios.patch(`${config.url.API_URL}/names/${nameId}`)).data
    console.log(response.name)
    dispatch({ type: 'CHANGE_NAME_STATUS', payload: response.name })
  }
}

export const deleteName = (nameId) => {
  return async dispatch => {
    const response = (await axios.delete(`${config.url.API_URL}/names/${nameId}`)).data
    // console.log(response)
    dispatch({ type: "DELETE_NAME", payload: response.name })
  }
}

