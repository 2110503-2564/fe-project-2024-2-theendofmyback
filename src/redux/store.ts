import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { promotionSlice } from "./feature/promotionSlice"; // Import promotionSlice
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";

// Create a custom WebStorage to handle persistence in a server-side environment
function createPersistsStorage(): WebStorage {
    const isServer = typeof window === 'undefined'; 
    if (isServer) { 
        return {
            getItem() {
                return Promise.resolve(null);
            },
            setItem() {
                return Promise.resolve();
            },
            removeItem() {
                return Promise.resolve();
            }
        };
    }
    return createWebStorage('local');
}

const storage = createPersistsStorage();

// Redux persist configuration
const persistConfig = {
    key: "rootPersist",
    storage,
};

// Combine reducers - add promotionSlice
const rootReducer = combineReducers({
    promotionSlice: promotionSlice.reducer, // Added promotionSlice
    // bookSlice: bookSlice.reducer, // Uncomment if you still want to use bookSlice
});

// Persist the combined reducers
const reduxPersistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: reduxPersistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
