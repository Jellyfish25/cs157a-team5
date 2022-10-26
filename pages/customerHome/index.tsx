import styles from './customerHome.module.css';
import { Button, Form } from 'react-bootstrap';

export default function CustomerHome() {
  const { Group, Label, Control, Select } = Form;
  return (
    <section className={styles.formWrapper}>
      <section className={styles.h1Styles}>
        <Group className='mb-3' controlId='displayOptions'>
          <Label>Display Options</Label>
          <Select aria-label='UserType'>
            <option value='Games'>Games</option>
            <option value='Movies'>Movies</option>
            <option value='Books'>Books</option>
            <option value='Music'>Music</option>
          </Select>
        </Group>
      </section>

      <Group className='mb-3' controlId='formBasicEmail'>
        <Control type='username' placeholder='Search for Media Title'></Control>
      </Group>
    </section>
  );
}
