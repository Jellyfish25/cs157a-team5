import { FormEventHandler, useState, ChangeEventHandler } from 'react';
import { Button, Form, Alert, FormControlProps } from 'react-bootstrap';
import { useUserCookie } from '../../hooks';
import { register } from '../../api';
import styles from './register.module.css';
import { User } from '../../types';
import { forwardOnAuth } from '../../decorators';
import { useRouter } from 'next/router';

export default forwardOnAuth(function Register() {
  const { Group, Label, Control, Select } = Form;
  const router = useRouter();
  const { setUserCookie } = useUserCookie();

  const [formState, setFormState] = useState<User & { password: string }>({
    username: '',
    password: '',
  });

  const [errMsg, setErrMsg] = useState('');

  const [ok, setOk] = useState('');

  const onSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();
    const { res, data } = await register(formState);
    if (!res.ok) {
      setErrMsg(data.error);
    } else {
      setOk(data.message);
      const { username, userType } = formState;
      setUserCookie({ username, userType });
      router.push('/');
    }
  };

  const onChange: FormControlProps['onChange'] &
    ChangeEventHandler<HTMLSelectElement> = (evt) => {
    const { value, name } = evt.currentTarget;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <section className={styles.formWrapper}>
      <Form className={styles.form + ' ' + styles.submit} onSubmit={onSubmit}>
        <Group className='mb-3' controlId='formUsername'>
          <Label>Username</Label>
          <Control
            type='username'
            placeholder='Username'
            name='username'
            onChange={onChange}></Control>
        </Group>

        <Group className='mb-3' controlId='formPassword'>
          <Label>Password</Label>
          <Control
            type='password'
            placeholder='Password'
            name='password'
            onChange={onChange}></Control>
        </Group>

        <Group className='mb-3' controlId='formUserType'>
          <Label>User Type</Label>
          <Select aria-label='UserType' name='userType' onChange={onChange}>
            <option value=''>Please select...</option>
            <option value='customer'>Customer</option>
            <option value='employee'>Employee</option>
            <option value='contentCreator'>Content Creator</option>
          </Select>
        </Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      {errMsg && (
        <Alert variant='warning' dismissible onClose={() => setErrMsg('')}>
          {errMsg}
        </Alert>
      )}
      {ok && <Alert variant='success'>{ok}</Alert>}
    </section>
  );
});
