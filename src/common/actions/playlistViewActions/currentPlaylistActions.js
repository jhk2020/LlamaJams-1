import request from 'superagent';

export function loadPlaylist(code) {
  return {
    types: ['LOAD_PLAYLIST', 'LOAD_PLAYLIST_SUCCESS', 'LOAD_PLAYLIST_FAIL'],
    promise: generatePromise(code)
  }
}

function generatePromise (body) {
  const promise = new Promise((resolve, reject) => {
    request
    .get(`http://localhost:5000/api/playlist/${body}`)
    .end((err, data) => err ? reject(err) : resolve(data));
  });
  return promise;
}

export function setCurrentPlaylistCode(playlistCode) {
  return {
    type: 'SET_CURRENT_PLAYLIST_CODE',
    playlistCode
  }
}

export function receiveSocket(socketId) {
  return {
    type: 'RECEIVE_SOCKET',
    socketId
  }
}
