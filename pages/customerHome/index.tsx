import styles from './customerHome.module.css';
import { Button, Form } from 'react-bootstrap';
import { roleRequired } from '../../decorators';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks';
import Link from 'next/link';

export default roleRequired('customer', function CustomerHome() {
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
      <section className={styles.h1Styles}>
        <h1>Customer Homepage</h1>
        <h6>Pick one!</h6>
        <br></br>
        {list.map((obj) => (
          <>
            <Link
              href={`/customerMedia/${obj.title}`}
              key={obj.title}>{`${obj.title}`}</Link>
            <br></br>
          </>
        ))}
      </section>

      <section>Hello, Customer!</section>
    </section>
  );
});
