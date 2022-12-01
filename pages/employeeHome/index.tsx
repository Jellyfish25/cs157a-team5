import styles from './employeeHome.module.css';
import { Form } from 'react-bootstrap';
import { roleRequired } from '../../decorators';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks';
import Link from 'next/link';

export default roleRequired('employee', function EmployeeHome() {
  const [list, setList] = useState<any[]>([]);
  const user = useAuth();
  const getData = () => {
    fetch('http://localhost:3000/api/getAllMedia')
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  const { Group, Label, Control, Select } = Form;
  return (
    <section className={styles.formWrapper}>
      <Group className='mb-3' controlId='displayOptions'>
        <br></br>
        <Link href='/mediaRequests'>Review Media Requests</Link>
        <br></br>
        <Link href='/reminders'>Send Reminders</Link>
      </Group>
      <section className={styles.h1Styles}>
        <h1>Employee Homepage</h1>
        <h6>Pick one!</h6>
        <br></br>
        {list.map((obj) => (
          <>
            <Link
              href={`/employeeMedia/${obj.title}`}
              key={obj.title}>{`${obj.title}`}</Link>
            <br></br>
          </>
        ))}
      </section>

      <section>Hello, Employee!</section>
    </section>
  );
});
