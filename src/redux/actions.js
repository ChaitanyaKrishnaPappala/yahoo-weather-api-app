import axios from 'axios';

const client = axios.create({baseURL: 'http://localhost:3000'})

export const addZipCode = (zipCode) => {
  return dispatch => {
     return client.post('/zipcodes', {zipCode})
         .then(res => {
             return dispatch({type: 'ADD_ZIPCODE_SUCCESS', data: res.data, zipCode})
         })
         .catch(err => {
             return dispatch({type: 'ADD_ZIPCODE_FAILURE', error: err.response})
      })
  }
};

export const fetchZipCodes = () => {
  return dispatch => {
     return client.get('/zipcodes')
         .then(res => {
             return dispatch({type: 'FETCH_ZIPCODES_SUCCESS', data: res.data || []})
         })
         .catch(err => {
             return dispatch({type: 'FETCH_ZIPCODES_FAILURE', error: err.response})
      })
  }
};

export const fetchWeatherByZipCode = (zipCode) => {
  return dispatch => {
      dispatch({type: 'FETCH_WEATHER_REQUEST'})
     return client.get(`/weather/zipcodes/${zipCode}`)
         .then(res => {
             return dispatch({type: 'FETCH_WEATHER_SUCCESS', data: res.data || {}})
         })
         .catch(err => {
             return dispatch({type: 'FETCH_WEATHER_FAILURE', error: err.response})
      })
  }
};


