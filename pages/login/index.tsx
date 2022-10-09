import { Button, Form } from 'react-bootstrap'
import styles from './login.module.css'

export default function Login() {
  const { Group, Label, Control, Select } = Form;
  return (
    <section className={styles.formWrapper}>
      <Form className={styles.form + " " + styles.submit}>
        <Group className='mb-3' controlId='formBasicEmail'>
          <Label>Username</Label>
          <Control type='username' placeholder='Username'></Control>
        </Group>

        <Group className='mb-3' controlId='formBasicPassword'>
          <Label>Password</Label>
          <Control type='password' placeholder='Password'></Control>
        </Group>

      <Button variant='primary' type='submit'>Submit</Button>
    </Form>
    </section>
    
  )
}