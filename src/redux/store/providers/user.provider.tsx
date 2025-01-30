// UserProvider.tsx
import { useDispatch } from 'react-redux';
import store, { AppDispatch } from '../store';
import { fetchUser } from '../slices/authSlice';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

interface UserProviderProps {
  children: React.ReactNode;
}

// Wrap children with the Redux Provider and initialize the user data.
export function UserProvider({ children }: UserProviderProps) {
  return (
    <Provider store={store}>
      <UserInitializer>{children}</UserInitializer>
    </Provider>
  );
}

export function UserInitializer({ children }: UserProviderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    } else {
      dispatch({ type: 'user/setReady', payload: true }); // Set ready if no token
    }
  }, [token, dispatch]);

  return <Provider store={store}>{children}</Provider>;
}
