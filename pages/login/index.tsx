import { Button, Form } from 'react-bootstrap';
import styles from './login.module.css';
import { useUserCookie } from '../../hooks';
import { forwardOnAuth } from '../../decorators';

export default forwardOnAuth(function Login() {
  const { Group, Label, Control, Select } = Form;

  const { setUserCookie } = useUserCookie();

  return (
    <section className={styles.formWrapper}>
      <Form
        className={styles.form + ' ' + styles.submit}
        onSubmit={() =>
          setUserCookie({ username: 'TestUser', userType: 'customer' })
        }>
        <Group className='mb-3' controlId='formBasicEmail'>
          <Label>Username</Label>
          <Control type='username' placeholder='Username'></Control>
        </Group>

        <Group className='mb-3' controlId='formBasicPassword'>
          <Label>Password</Label>
          <Control type='password' placeholder='Password'></Control>
        </Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </section>
  );
});
