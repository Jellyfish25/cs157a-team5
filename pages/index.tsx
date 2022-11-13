import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { Form } from 'react-bootstrap';
import { useUserCookie } from '../hooks';
import { useEffect } from 'react';
import { forwardOnAuth } from '../decorators';

const Home: NextPage = () => {
  const { Group } = Form;
  const { userCookie } = useUserCookie();

  useEffect(() => {
    console.table(userCookie);
  }, []);

  return (
    <div className={styles.container}>
      <Group className='mb-3'>
        Pick One:
        <br></br>
        <br></br>
        <Link href='/register'>REGISTER</Link>
        <br></br>
        <br></br>
        <Link href='/login'>LOGIN</Link>
      </Group>
    </div>
  );
};

export default forwardOnAuth(Home);
