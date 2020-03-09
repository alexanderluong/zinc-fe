import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { systemReducer } from "./system/reducers";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStore
const persistStore = require("redux-persist").persistStore;

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  system: systemReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type AppState = ReturnType<typeof persistedReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    persistedReducer,
    composeWithDevTools(middleWareEnhancer)
  );
  let persistor = persistStore(store);

  return { store, persistor };
}
