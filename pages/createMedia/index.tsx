import { Button, Form, FormControlProps, Alert } from 'react-bootstrap';
import { ChangeEventHandler, useState, FormEventHandler } from 'react';

export default function CreateMedia() {
  const { Group, Label, Control, Select } = Form;

  const [formState, setFormState] = useState({
    title: '',
    cost: '',
    type: ''
  }) 
  const [errMsg, setErrMsg] = useState<string | undefined>(undefined)
  const [ok, setOk] = useState<string | undefined>(undefined)

  const onSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault()
    const res = await fetch('http://localhost:3000/api/create-media', {
      method: 'POST',
      body: JSON.stringify(formState)
    })
    const data = await res.json()
    if (!res.ok) {
      setErrMsg(data.error)
    } else {
      setOk(data.message)
      window.location.href = '/'
    }
  }

  const onChange: FormControlProps['onChange'] & ChangeEventHandler<HTMLSelectElement> = (evt) => {
    const { value, name } = evt.currentTarget
    setFormState({ ...formState, [name]: value })
  }

  return (
    <section>
      <Form
        onSubmit={onSubmit}>
        <Group className='mb-3' controlId='formTitle'>
          <Label>Title</Label>
          <Control
            type='text'
            placeholder='Title'
            name='title'
            onChange={onChange}></Control>
        </Group>

        <Group className='mb-3' controlId='formCost'>
          <Label>Cost ($)</Label>
          <Control
            as='input'
            type='number'
            placeholder='Cost'
            name='cost'
            step={0.01}
            onChange={onChange}></Control>
        </Group>

        <Group className='mb-3' controlId='formMediaType'>
          <Label>Media Type</Label>
          <Select aria-label='mediaType' name='type' onChange={onChange}>
            <option value='game'>Game</option>
            <option value='movie'>Movie</option>
            <option value='book'>Book</option>
            <option value='musicAlbum'>Music Album</option>
          </Select>
        </Group>

        <Button variant='primary' type='submit' >
          Create Media
        </Button>
      </Form>
      {errMsg && <Alert variant='warning' dismissible onClose={() => setErrMsg(undefined)}>{errMsg}</Alert>}
      {ok && <Alert variant='success'>{ ok }</Alert>}
    </section>
  );
}
