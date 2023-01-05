import { FC, Suspense } from 'react';
import { Footer, Container } from 'shared/ui';
import { Header } from 'widgets/header';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export const Layout: FC = () => {
  return (
    <Container className={styles.wrapper}>
      <Header />
      <main className={styles.content}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </Container>
  );
};
