import styles from './customerMedia.module.css';
import {MediaTable} from '../../components/';
import { Button, Form } from 'react-bootstrap';

export default function customerMedia() {
  const { Group, Label, Control, Select } = Form;
  return (
    <section className={styles.formWrapper}>
      <Group className='mb-3' controlId='displayOptions'></Group>

      <section className={styles.h1Styles}>
        <br></br>
        <MediaTable
          items={Array.from({ length: 1 }, (_, i) => ({
            name: 'SpiderMan-' + i,
            src: '/spider-man.webp',
          }))}
        />
      </section>

      <section className={styles.h1Styles}>
        <Button variant='null' type='submit'>
          Buy/Rent
        </Button>
        <br></br>
        <Button variant='null' type='submit'>
          View Info
        </Button>
        <br></br>
        <Button variant='null' type='submit'>
          Rate
        </Button>
        <br></br>
        <Button variant='null' type='submit'>
          Comment
        </Button>
      </section>
    </section>
  );
}
