import styles from './customerHome.module.css';
import { Button, Form } from 'react-bootstrap';

export default function CustomerHome() {
  const { Group, Label, Control, Select } = Form;
  return (
    <section className={styles.formWrapper}>
      <Group className='mb-3' controlId='formBasicEmail'>
        <Control type='username' placeholder='Search for Media Title'></Control>
      </Group>
    </section>
  );
}
