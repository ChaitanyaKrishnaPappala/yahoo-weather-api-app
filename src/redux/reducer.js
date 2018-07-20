import {Map, Set, fromJS}  from 'immutable'

const reducer = (state = Map(), action) => {
  switch (action.type){
      case 'ADD_ZIPCODE_SUCCESS':
        let zipCodes = state.get('zipCodes', Set());
        zipCodes = zipCodes.add(action.zipCode || '');
        return state.set('zipCodes', zipCodes);
      case 'FETCH_ZIPCODES_SUCCESS':
          zipCodes = action.data.map(value => {
              return value.zipCode || '';
          });
        return state.set('zipCodes', Set(zipCodes))
      case 'FETCH_WEATHER_FAILURE':
        return state.set('loading', false)
      case 'FETCH_WEATHER_SUCCESS':
          state = state.set('loading', false)
          return state.set('weather', fromJS(action.data[0]))
      case 'FETCH_WEATHER_REQUEST':
          return state.set('loading', true)
      default:
          return state;
  }
};

export default reducer
