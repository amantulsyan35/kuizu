import '../styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';

import { QuestionProvider } from '../context/question-context';
import { UserProvider } from '../context/user-context';
import supabase from '../lib/supabase';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        updateSupabaseCookie(event, session);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  });
  async function updateSupabaseCookie(event: any, session: any) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  }
  return (
    <UserProvider>
      <QuestionProvider>
        <Component {...pageProps} />
      </QuestionProvider>
    </UserProvider>
  );
}

export default MyApp;
