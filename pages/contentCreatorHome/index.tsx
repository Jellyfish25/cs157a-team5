import styles from './contentCreatorHome.module.css';
import { Form } from 'react-bootstrap';
import { roleRequired } from '../../decorators';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks';
import Link from 'next/link';

export default roleRequired('contentCreator', function ContentCreatorHome() {
  const [list, setList] = useState<any[]>([]);
  const user = useAuth();
  const getData = async () => {
    const res = await fetch('http://localhost:3000/api/getCCMedia', {
      method: 'POST',
      body: JSON.stringify({ creatorUsername: user?.username }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setList(data);
  };

  useEffect(() => {
    getData();
  }, []);
  const { Group, Label, Control, Select } = Form;
  return (
    <section className={styles.formWrapper}>
      <Group className='mb-3' controlId='displayOptions'>
        <br></br>
        <Link href='/createMedia'>Create Media</Link>
        <br></br>
        <Link href='/deleteMedia'>Delete Media</Link>
      </Group>
      <section className={styles.h1Styles}>
        <h1>Content Creator Homepage</h1>
        <h6>
          You have made all these medias! You must think you are really cool!
        </h6>
        <br></br>
        {list.map((obj) => (
          <>
            <Link
              href={`/contentCreatorMedia/${obj.mediaTitle}`}
              key={obj.mediaTitle}>{`${obj.mediaTitle}`}</Link>
            <br></br>
          </>
        ))}
      </section>

      <section>Hello, Content Creator!</section>
    </section>
  );
});
