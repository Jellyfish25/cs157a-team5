import { useRouter } from 'next/router';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../hooks';
import styles from './customerMedia.module.css';
import Link from 'next/link';

export default function MediaPage() {
  const user = useAuth();
  const [media, setMedia] = useState<any>();
  const [err, setErr] = useState<any>();
  const [form, setForm] = useState<any>();
  const router = useRouter();
  const { mediaTitle } = router.query;

  const getData = async () => {
    if (mediaTitle) {
      const res = await fetch('http://localhost:3000/api/getMedia', {
        method: 'POST',
        body: JSON.stringify({ mediaTitle }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setMedia(data);
    }
  };

  const doRent = async () => {
    const res = await fetch('http://localhost:3000/api/rentMedia', {
      method: 'POST',
      body: JSON.stringify({
        mediaTitle: media.title,
        customerUsername: user?.username,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.status === 409) {
      setErr("You're already renting this.");
    }
    await getData();
  };

  const doSubmit: MouseEventHandler = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/api/evalMedia', {
      method: 'POST',
      body: JSON.stringify({
        ...form,
        customer: user?.username,
        mediaTitle: media.title,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getData();
  }, [router]);

  return (
    <div>
      <Link href='/customerHome'>Home</Link>
      <h1>{media?.title}</h1>
      <h3>{'Cost: $' + media?.cost}</h3>
      <h3>{'Current inventory: ' + media?.inventory}</h3>
      <h3>{'Media type: ' + media?.type}</h3>
      <Button variant='primary' onClick={doRent}>
        Rent
      </Button>
      <h6>{err}</h6>
      <Form>
        <div className={styles.rating} id='ratingContainer'>
          <label htmlFor='ratingContainer'>Rate this</label>
          {[1, 2, 3, 4, 5].map((number) => {
            return (
              <Form.Check
                type='radio'
                key={number}
                label={number}
                name='rating'
                value={number}
                onChange={onChange}
              />
            );
          })}
        </div>
        <Form.Group>
          <Form.Label>Leave a comment!</Form.Label>
          <Form.Control
            type='textfield'
            name='comment'
            onChange={onChange}></Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit' onClick={doSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
