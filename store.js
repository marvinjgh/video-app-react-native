import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import reducer from "./reducers/index";
import storage from "redux-persist/lib/storage";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["navigation"]
};

const persistedReducer = persistReducer(persistConfig, reducer);

const state = {
  videos: {
    // suggestionList: [],       // Lista de sugerencias
    // categoryList: [],         // Lista de categorías
    suggestionLoading: true, // Estado de carga de la lista de sugerencias
    categoryLoading: true // Estado de carga de la lista de categorías
    // videoLoading: true,       // Estado de carga del video
    // paused: false,            // Indicador de pausa
    // progress: 0,              // Progreso del video entre 0 y 1
    // currentTime: '0:00',      // Tiempo actual en segundos
    // duration: 0,              // Duración del vídeo en segundos
    // changeActive: false,      // Activo mientras se cambia la posición del vídeo
    // fullscreen: false,        // Estado de fullscreen
    // selectedMovie: null,      // Movie to Display
    // query: '',                // Término buscado
    // noCoincidence: false,     // Indica si no hay coincidencia de búsqueda
  }
};

const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navigation
);
const store = createStore(
  persistedReducer,
  state,
  applyMiddleware(navigationMiddleware)
);
const persistor = persistStore(store);

export { store, persistor };
