function videos(state = {}, action) {
  switch (action.type) {
    case 'SET_SUGGESTION_LIST': {
      return {...state, ...action.payload}
    }
    case 'SET_CATEGORY_LIST': {
      return {...state, ...action.payload}
    }
    case 'SET_SELECTED_MOVIE': {
      return {...state, selectedMovie: action.payload.movie}
    }
    case 'PLAY_PAUSE_VIDEO': {
      return {...state, ...action.payload}
    }
    case 'VIDEO_STOP_LOADING': {
      return {...state, ...action.payload}
    }
    default:
      return state
  }
}

export default videos;