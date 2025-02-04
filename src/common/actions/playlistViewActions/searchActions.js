export function updateQuery(searchbarQuery) {
  return {
    type: 'UPDATE_QUERY',
    searchbarQuery
  }
}

export function clearQuery() {
  return {
    type: 'CLEAR_QUERY'
  }
}

export function fetchSongs(searchbarQuery) {
  return dispatch => {
    SC.get('/tracks', {
      q: searchbarQuery,
      limit: 12,
      linked_partitioning: 1
    })
    .then((results) => {
        dispatch(updateQueryTracks(results.collection));
        if (results.next_href) {
          dispatch(saveNextPageUrl(results.next_href));
        } else {
          dispatch(saveNextPageUrl(''));
        }
      });
  }
}

function updateQueryTracks(results) {
  return {
    type: 'UPDATE_QUERY_TRACKS',
    results
  }
}

function saveNextPageUrl(url) {
  return {
    type: 'SAVE_NEXT_PAGE_URL',
    url
  }
}

export function fetchMoreSongs(searchbarQuery) {
  return (dispatch, getState) => {
    let { searchTracks } = getState();
    if (searchTracks.get('nextPageUrl')) {
      $.get(searchTracks.get('nextPageUrl'))
        .done((results) => {
          dispatch(fetchMoreSongsFromSC(results.collection));
          if (results.next_href) {
            dispatch(saveNextPageUrl(results.next_href));
          } else {
            dispatch(saveNextPageUrl(''));
          }
        })
    }
  }
}

function fetchMoreSongsFromSC(results) {
  return {
    type: 'FETCH_MORE_SONGS_FROM_SC',
    results
  }
}
