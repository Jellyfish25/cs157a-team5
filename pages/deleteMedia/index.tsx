import { Button, Form } from 'react-bootstrap';
import styles from './deleteMedia.module.css';
import { roleRequired } from '../../decorators';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useAuth } from '../../hooks';

export default roleRequired('contentCreator', function DeleteMedia() {
  const [list, setList] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const user = useAuth();
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.checked) {
      setSelected([...selected, event.target.id]);
    } else {
      setSelected(selected.filter((title) => title != event.target.id));
    }
  };

  const buttonPressed: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const res = await fetch('http://localhost:3000/api/deleteMedia', {
      method: 'post',
      body: JSON.stringify({
        titles: selected,
        username: user?.username,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    getData();
  };

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
  return (
    <section className={styles.formWrapper}>
      <section className={styles.h1Styles}>
        <Form className={styles.form + ' ' + styles.submit}>
          <h1>Your Created Media</h1>
          <h6>Delete media here.</h6>
          {list.map((obj) => (
            <Form.Check
              type={'checkbox'}
              key={`${obj.mediaTitle}`}
              id={`${obj.mediaTitle}`}
              label={`${obj.mediaTitle}`}
              onChange={handleOnChange}
            />
          ))}
          <Button variant='primary' onClick={buttonPressed}>
            Delete
          </Button>
        </Form>
      </section>

      <section>Hello, Content Creator!</section>
    </section>
  );
});
