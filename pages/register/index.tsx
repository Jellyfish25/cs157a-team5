import { Button, Form } from 'react-bootstrap';
import styles from './register.module.css';

export default function Register() {
  const { Group, Label, Control, Select } = Form;
  return (
    <section className={styles.formWrapper}>
      <Form className={styles.form + ' ' + styles.submit}>
        <Group className='mb-3' controlId='formBasicEmail'>
          <Label>Username</Label>
          <Control type='username' placeholder='Username'></Control>
        </Group>

        <Group className='mb-3' controlId='formBasicPassword'>
          <Label>Password</Label>
          <Control type='password' placeholder='Password'></Control>
        </Group>

        <Group className='mb-3' controlId='formUserType'>
          <Label>User Type</Label>
          <Select aria-label='UserType'>
            <option value='Customer'>Customer</option>
            <option value='Employee'>Employee</option>
            <option value='Content Creator'>Content Creator</option>
          </Select>
        </Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </section>
  );
}