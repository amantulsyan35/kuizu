import { createContext, useContext, useReducer } from 'react';

type UserContextType = {
  userState: UserStateType;
  userDispatch: Dispatch;
};

type Dispatch = (action: UserActionType) => void;

type UserStateType = {
  userId: any;
};

interface UserActionType {
  type: 'SET_USER_TOKEN';
  payload: any;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const userReducerFunc = (
    state: UserStateType,
    action: UserActionType
  ): UserStateType => {
    switch (action.type) {
      case 'SET_USER_TOKEN':
        return { ...state, userId: action.payload };
      default:
        return state;
    }
  };

  const initialState: UserStateType = {
    userId: '',
  };

  const [userState, userDispatch] = useReducer(userReducerFunc, initialState);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
