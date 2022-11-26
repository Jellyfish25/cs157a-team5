import { Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import styles from './reminders.module.css';
import { roleRequired } from '../../decorators';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useAuth } from '../../hooks';

export default roleRequired('employee', function Reminders() {
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
    const res = await fetch('http://localhost:3000/api/sendReminders', {
      method: 'post',
      body: JSON.stringify({
        username: user?.username,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    getData();
  };

  const getData = () => {
    fetch('http://localhost:3000/api/getLateUsers')
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
        <Link href='/mediaRequests'>Review Media Requests</Link>
      </Group>

      <section className={styles.h1Styles}>
        <Form className={styles.form + ' ' + styles.submit}>
        <h1>Reminders</h1>
          <h6>
            Send reminders to naughty customers who forget to return their media
          </h6>
          {list.map((obj) => (
            <Form.Check
              type={'checkbox'}
              key={`${obj.customerUsername}`}
              id={`${obj.customerUsername}`}
              label={`${obj.customerUsername}`}
              onChange={handleOnChange}
            />
          ))}
          <Button variant='primary' onClick={buttonPressed}>
            Remind
          </Button>
        </Form>
      </section>

      <section>Hello, Employee!</section>
    </section>
  );
});
