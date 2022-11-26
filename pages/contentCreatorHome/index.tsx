import { MediaTable } from '../../components';
import styles from './contentCreatorHome.module.css';
import { Button, Form } from 'react-bootstrap';
import { roleRequired } from '../../decorators';
import Link from 'next/link';

export default roleRequired('contentCreator', function ContentCreatorHome() {
  const { Group, Label, Control, Select } = Form;
  return (
    <section className={styles.formWrapper}>
      <Group className='mb-3' controlId='displayOptions'>
        <Group className={styles.fontStyle}>
          <Link href='/createMedia'>Publish</Link>
          <br></br>
          <Link href='/deleteMedia'>Delete</Link>
          <br></br>
          <Label>Display Options</Label>
          <Select aria-label='UserType'>
            <option value='Games'>Games</option>
            <option value='Movies'>Movies</option>
            <option value='Books'>Books</option>
            <option value='Music'>Music</option>
          </Select>
        </Group>
      </Group>

      <section className={styles.h1Styles}>
        <Group className={styles.titleStyle}>Your Media</Group>
        <br></br>
        <MediaTable
          items={Array.from({ length: 10 }, (_, i) => ({
            name: 'SpiderMan-' + i,
            src: '/spider-man.webp',
          }))}
        />
      </section>
    </section>
  );
});
