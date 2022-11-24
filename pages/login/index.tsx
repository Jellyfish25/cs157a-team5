import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Button, Form, FormControlProps } from 'react-bootstrap';
import { login } from '../../api';
import { useUserCookie } from '../../hooks';
import { User } from '../../types';
import styles from './login.module.css';
import { forwardOnAuth } from '../../decorators';

export default forwardOnAuth(function Login() {
  const { setUserCookie } = useUserCookie();

  const [formState, setFormState] = useState<User & { password: string }>({
    username: '',
    password: '',
  });

  const onSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();
    const { res, data } = await login(formState);
    if (!res.ok) {
    } else {
      const { username, userType } = data;
      setUserCookie({ username, userType });
      window.location.href = '/';
    }
  };

  const onChange: FormControlProps['onChange'] &
    ChangeEventHandler<HTMLSelectElement> = (evt) => {
    const { value, name } = evt.currentTarget;
    setFormState({ ...formState, [name]: value });
  };

  const { Group, Label, Control, Select } = Form;

  return (
    <section className={styles.formWrapper}>
      <Form className={styles.form + ' ' + styles.submit} onSubmit={onSubmit}>
        <Group className='mb-3' controlId='formBasicEmail'>
          <Label>Username</Label>
          <Control
            type='username'
            placeholder='Username'
            name='username'
            onChange={onChange}></Control>
        </Group>

        <Group className='mb-3' controlId='formBasicPassword'>
          <Label>Password</Label>
          <Control
            type='password'
            placeholder='Password'
            name='password'
            onChange={onChange}></Control>
        </Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </section>
  );
});
