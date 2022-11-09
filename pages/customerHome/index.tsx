import styles from './customerHome.module.css';
import MediaTable from '../../components/mediaTable';
import { Button, Form } from 'react-bootstrap';

export default function CustomerHome() {
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
      </Group>

      <section className={styles.h1Styles}>
        <Group className='mb-3' controlId='formBasicEmail'>
          <Control type='username' placeholder='Search for Media Title'></Control>
        </Group>
        <br></br>
        <MediaTable
          items={Array.from({ length: 10 }, (_, i) => ({
            name: 'SpiderMan-' + i,
            src: '/spider-man.webp',
          }))}
        />
      </section>

      <section>
        Hello, Customer!
      </section>
    </section>
  );
}
