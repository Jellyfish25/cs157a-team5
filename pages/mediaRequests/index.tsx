import { Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import styles from './mediaRequests.module.css';
import { roleRequired } from '../../decorators';

export default roleRequired('employee', function mediaRequests() {
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
          <Form.Check type={'checkbox'} id={`Smile`} label={`Smile`} />
          <Form.Check type={'checkbox'} id={`Joker`} label={`Joker`} />
          <Form.Check
            type={'checkbox'}
            id={`The Human Centipede`}
            label={`The Human Centipede`}
          />
          <Form.Check type={'checkbox'} id={`One Piece`} label={`One Piece`} />
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
