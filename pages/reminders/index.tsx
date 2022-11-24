import { Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import styles from './reminders.module.css';
import { roleRequired } from '../../decorators';

export default roleRequired('employee', function Reminders() {
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
        <Link href='/mediaRequests'>Review Media Requests</Link>
      </Group>

      <section className={styles.h1Styles}>
        <Group className='mb-3' controlId='formBasicEmail'>
          <Control
            type='username'
            placeholder='Search for Media Title'></Control>
        </Group>
        <br></br>
        <Form className={styles.form + ' ' + styles.submit}>
          <h1>Reminders</h1>
          <h6>
            Send reminders to naughty customers who forget to return their media
          </h6>
          <Form.Check type={'checkbox'} id={`kim kard`} label={`kim kard`} />
          <Form.Check type={'checkbox'} id={`person 2`} label={`person 2`} />
          <Form.Check type={'checkbox'} id={`person 3`} label={`person 3`} />
          <Form.Check type={'checkbox'} id={`person 4`} label={`person 4`} />
          <Button variant='primary' type='submit'>
            Send Reminders, UwU
          </Button>
        </Form>
      </section>

      <section>Hello, Employee!</section>
    </section>
  );
});
