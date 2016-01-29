import { List, fromJS } from 'immutable';

export default function queue(state = List(), action) {
  switch(action.type) {
    case 'ADD_TRACK_TO_QUEUE':
      const track = fromJS(action.track);
      return state.unshift(track).sortBy(track => track.get('vote'));

    case 'ADD_TRACK_TO_QUEUE_IN_DB_SUCCESS':
      return state;

    case 'ADD_TRACK_TO_QUEUE_IN_DB_FAIL':
      return state;

    case 'SET_CURRENT_TRACK':
      if (state.size === 1) {
        return List();
      }
      return state.slice(1);

    case 'UPVOTE_TRACK':
      const updatedQueue = state.updateIn(
        [state.findIndex(track => track.get('id') === action.track), 'vote'],
        vote => vote + 1
      );
      return updatedQueue.sortBy(track => track.get('vote'));

    case 'DOWNVOTE_TRACK':
      const index = state.findIndex(track => track.get('id') === action.track);
      let newQueue = state.updateIn([index, 'vote'], vote => vote - 1);
      if (state.getIn([index, 'vote']) <= -2) {
        newQueue = state.delete(index);
      }
      return newQueue.sortBy(track => track.get('vote'));

    case 'LOAD_PLAYLIST_SUCCESS':
      return state.concat(fromJS(action.res.playlist.queue)).reverse();

    case 'LOAD_PLAYLIST_FAIL':
      return state;

    case 'SAVE_PLAYLIST_SUCCESS':
      return state;

    case 'SAVE_PLAYLIST_FAIL':
      return state;

    default:
      return state;
  }
}
