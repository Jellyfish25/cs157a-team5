import styles from './customerHome.module.css';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { roleRequired } from '../../decorators';
import { useAuth } from '../../hooks';
import Link from 'next/link';

export default roleRequired('customer', function CustomerHome() {
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState<any>();
  const [searchTerm, setSearchTerm] = useState<String>('');
  const user = useAuth();
  const getData = () => {
    fetch('http://localhost:3000/api/getAllMedia')
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      });
  };
  const onChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSearchTerm(e.target.value);
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
        <Form>
          <Form.Group>
            <Form.Label>Search here!</Form.Label>
            <Form.Control
            type='textfield'
            name='searchT'
            onChange={onChange}></Form.Control>
          </Form.Group>
      </Form>
        <br></br>
        {list.map((obj) => {if (obj.title.includes(searchTerm)) {return (
          <>
            <Link
              href={`/customerMedia/${obj.title}`}
              key={obj.title}>{`${obj.title}`}</Link>
            <br></br>
          </>
        )}})}
      </section>

      <section>Hello, Customer!</section>
    </section>
  );
});
