import { Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import styles from './mediaRequests.module.css';
import { roleRequired } from '../../decorators';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useAuth } from '../../hooks';

export default roleRequired('employee', function MediaRequests() {
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

  const buttonPressed = (decision: string) => {
    const fetchFunct: MouseEventHandler<HTMLButtonElement> = async (e) => {
      const res = await fetch('http://localhost:3000/api/updateRequests', {
        method: 'post',
        body: JSON.stringify({
          titles: selected,
          decision: decision,
          eUsername: user?.username,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      getData();
    };
    return fetchFunct;
  };

  const getData = () => {
    fetch('http://localhost:3000/api/getRequests')
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const { Group, Label, Control, Select } = Form;
  return (
    <section className={styles.formWrapper}>
      <Group className='mb-3' controlId='displayOptions'>
        <br></br>
        <Link href='/employeeHome'>Employee Home</Link>
        <br></br>
        <Link href='/reminders'>Send Reminders</Link>
      </Group>

      <section className={styles.h1Styles}>
        <Group className='mb-3' controlId='formBasicEmail'>
          <Control
            type='username'
            placeholder='Search for Media Title'></Control>
        </Group>
        <br></br>
        <Form className={styles.form + ' ' + styles.submit}>
          <h1>Media Requests</h1>
          <h6>
            Approve the wholesome, family-friendly media requests and deny the
            meany weany naughty media requests.
          </h6>
          {list.map((obj) => (
            <Form.Check
              type={'checkbox'}
              key={`${obj.mediaTitle}`}
              id={`${obj.mediaTitle}`}
              label={`${obj.mediaTitle}`}
              onChange={handleOnChange}
            />
          ))}
          <Button variant='primary' onClick={buttonPressed('approved')}>
            Approve
          </Button>
          <Button variant='primary' onClick={buttonPressed('denied')}>
            Deny
          </Button>
        </Form>
      </section>

      <section>Hello, Employee!</section>
    </section>
  );
});
