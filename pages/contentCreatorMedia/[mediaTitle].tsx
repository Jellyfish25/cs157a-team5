import { useRouter } from 'next/router';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../hooks';

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

  const doSubmit: MouseEventHandler = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/api/updateMediaInfo', {
      method: 'POST',
      body: JSON.stringify({
        ...form,
        customer: user?.username,
        mediaTitle: media.title,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    getData();
  };

  const onChange: ChangeEventHandler<HTMLInputElement & HTMLSelectElement> = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getData();
  }, [router]);

  return (
    <div>
      <h1>{media?.title}</h1>
      <h3>{'Cost: $' + media?.cost}</h3>
      <h3>{'Current inventory: ' + media?.inventory}</h3>
      <h3>{'Media type: ' + media?.type}</h3>
      <Form>
        <Form.Group>
          <Form.Label>Update Cost:</Form.Label>
          <Form.Control
            type='number'
            name='newCost'
            step={0.01}
            onChange={onChange}></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formMediaType'>
          <Form.Label>Media Type</Form.Label>
          <Form.Select aria-label='mediaType' name='type' onChange={onChange}>
            <option value=''></option>
            <option value='game'>Game</option>
            <option value='movie'>Movie</option>
            <option value='book'>Book</option>
            <option value='musicAlbum'>Music Album</option>
          </Form.Select> 
        </Form.Group>
        <Button variant='primary' type='submit' onClick={doSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
