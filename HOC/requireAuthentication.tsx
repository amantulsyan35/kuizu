import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import supabase from '../lib/supabase';
import { redirect } from '../lib/redirect';

export const requireAuthentication = (gssp: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    let currentUser;
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        currentUser = session?.user ?? null;
      }
    );
    if (currentUser === null) {
      redirect(ctx, '/auth/login');
    }

    return await gssp(ctx);
  };
};
