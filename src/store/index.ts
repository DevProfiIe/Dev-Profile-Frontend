import { configureStore } from '@reduxjs/toolkit';

/* slice */
import popupSlice from './reducers/popupSlice';
import userSlice from './reducers/UserSlice';

const store = configureStore({
  reducer: {
    popup: popupSlice,
    user: userSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
