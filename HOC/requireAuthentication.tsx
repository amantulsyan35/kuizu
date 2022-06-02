import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import supabase from '../lib/supabase';
import { redirect } from '../lib/redirect';

export const requireAuthentication = (gssp: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const { user } = await supabase.auth.api.getUserByCookie(ctx.req);
    console.log(user);
    if (!user) {
      redirect(ctx, '/auth/login');
    }
    return await gssp(ctx);
  };
};
