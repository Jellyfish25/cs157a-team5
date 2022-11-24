import styles from './employeeHome.module.css';
import Link from 'next/link';
import { MediaTable } from '../../components';
import { Form } from 'react-bootstrap';
import { roleRequired } from '../../decorators';

export default roleRequired('employee', function EmployeeHome() {
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
        <br></br>
        <Link href='/mediaRequests'>Review Media Requests</Link>
        <br></br>
        <Link href='/reminders'>Send Reminders</Link>
      </Group>

      <section className={styles.h1Styles}>
        <Group className='mb-3' controlId='formBasicEmail'>
          <Control
            type='username'
            placeholder='Search for Media Title'></Control>
        </Group>
        <br></br>
        <MediaTable
          items={Array.from({ length: 10 }, (_, i) => ({
            name: 'SpiderMan-' + i,
            src: '/spider-man.webp',
          }))}
        />
      </section>

      <section>Hello, Employee!</section>
    </section>
  );
});
