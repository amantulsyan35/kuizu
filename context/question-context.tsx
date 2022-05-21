import { createContext, useContext, useReducer } from 'react';

const QuestionContext = createContext<UserContextType>({} as UserContextType);

type UserContextType = {
  questionState: QuestionStateType;
  questionDispatch: Dispatch;
};

type Dispatch = (action: QuestionActionType) => void;

interface QuestionActionType {
  type: 'SET_USER_ANSWERS';
  payload: QuestionDataType;
}

type QuestionProviderProps = {
  children: React.ReactNode;
};

type QuestionDataType = {
  questionIndex: number;
  selectedOption: string;
};

type QuestionStateType = {
  userAnswers: QuestionDataType[];
};

const QuestionProvider = ({ children }: QuestionProviderProps) => {
  const userReducerFunc = (
    state: QuestionStateType,
    action: QuestionActionType
  ): QuestionStateType => {
    switch (action.type) {
      case 'SET_USER_ANSWERS':
        return {
          ...state,
          userAnswers: state.userAnswers.some(
            (el) => el.questionIndex === action.payload.questionIndex
          )
            ? [
                ...state.userAnswers.filter(
                  (el) => el.questionIndex !== action.payload.questionIndex
                ),
                action.payload,
              ]
            : [...state.userAnswers, action.payload],
        };
      default:
        return state;
    }
  };

  const intitalState: QuestionStateType = {
    userAnswers: [],
  };

  const [questionState, questionDispatch] = useReducer(
    userReducerFunc,
    intitalState
  );

  return (
    <QuestionContext.Provider value={{ questionState, questionDispatch }}>
      {children}
    </QuestionContext.Provider>
  );
};

const useQuestionData = () => useContext(QuestionContext);

export { QuestionProvider, useQuestionData };
