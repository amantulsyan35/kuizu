import Head from 'next/head';
import { Navbar } from '../../components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Layout.module.css';

interface IlayoutProps {
  title?: string;
  keywords: string;
  description: string;
  children: React.ReactNode;
}

const Layout = ({ title, keywords, description, children }: IlayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='keywords' content={keywords} />
        <meta name='description' content={description} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <ToastContainer position='bottom-right' />

      <main className={styles.container}>{children}</main>
    </>
  );
};

export default Layout;

Layout.defaultProps = {
  title: 'クイズ',
  keywords: 'blockchain, quiz, programming',
  description:
    'a test of knowledge, especially as a competition between individuals or teams as a form of entertainment.',
};
