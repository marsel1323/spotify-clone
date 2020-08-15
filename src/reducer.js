export const initialState = {
  user: null,
  playlists: [],
  spotify: null,
  playlist: null,
  top_artists: null,
  playing: false,
  item: null,

  accessToken:localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  expiresIn: localStorage.getItem('expiresIn'),
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_TOKEN":
      localStorage.setItem('accessToken', action.token.accessToken);
      localStorage.setItem('refreshToken', action.token.refreshToken);
      localStorage.setItem('expiresIn', action.token.expiresIn);
      return {
        ...state,
        ...action.token,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };

    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };

    case "SET_PLAYLIST":
      return {
        ...state,
        playlist: action.playlist,
      };

    case "SET_TOP_ARTISTS":
      return {
        ...state,
        top_artists: action.top_artists,
      };

    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };

    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    default:
      return state;
  }
};

export default reducer;
