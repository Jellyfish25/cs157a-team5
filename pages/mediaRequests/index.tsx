import { Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import styles from './mediaRequests.module.css';
import { roleRequired } from '../../decorators';
import { useEffect, useState } from 'react';

export default roleRequired('employee', function MediaRequests() {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3000/api/getRequests').then((res) =>
      res.json()).then((data) => {
        setList(data);
      });
  },[]);

  const { Group, Label, Control, Select } = Form;
  return (
    <section className={styles.formWrapper}>
      <Group className='mb-3' controlId='displayOptions'>
        <Label>Display Options</Label>
        <Select aria-label='UserType'>
          <option value='Games'>Games</option>
          <option value='Movies'>Movies</option>
          <option value='Books'>Books</option>
          <option value='Music'>Music</option>
        </Select>
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
          {list.map((obj) => <Form.Check type={'checkbox'} key={`${obj.mediaTitle}`} id={`${obj.mediaTitle}`} label={`${obj.mediaTitle}`}/>)}
          <Button variant='primary' type='submit'>
            Approve
          </Button>
          <Button variant='primary' type='submit'>
            Deny
          </Button>
        </Form>
      </section>

      <section>Hello, Employee!</section>
    </section>
  );
});
