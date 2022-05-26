import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QuestionProvider } from '../context/question-context';
import { UserProvider } from '../context/user-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <QuestionProvider>
        <Component {...pageProps} />
      </QuestionProvider>
    </UserProvider>
  );
}

export default MyApp;
