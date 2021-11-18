import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import {reducers} from "./modules/index";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root", // 必须有的
  storage, // 缓存机制
  blacklist: ["logReducer"],
  // blacklist: ['name','age'] // reducer 里不持久化的数据,除此外均为持久化数据
};

const persistedReducers = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducers);
const persistor = persistStore(store);

export { store, persistor };
