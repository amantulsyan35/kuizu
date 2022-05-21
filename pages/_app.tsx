import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QuestionProvider } from '../context/question-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QuestionProvider>
      <Component {...pageProps} />
    </QuestionProvider>
  );
}

export default MyApp;
