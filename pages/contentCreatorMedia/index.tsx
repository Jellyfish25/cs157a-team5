import styles from './contentCreatorMedia.module.css';
import MediaTable from '../../components/mediaTable';
import { Button, Form } from 'react-bootstrap';
import { roleRequired } from '../../decorators';
import { arrayBuffer } from 'stream/consumers';

import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export default roleRequired('contentCreator', function ContentCreatorMedia() {
  const { Group, Label, Control, Select } = Form;

  const [radioValue, setRadioValue] = useState('1');

  const radioButton = [
    { name: 'Preview', value: '1' },
    { name: 'Edit', value: '2' },
  ];

  return (
    <section className={styles.formWrapper}>

      <section className={styles.h1Styles}>
        <MediaTable
          items={Array.from({ length: 1 }, (_, i) => ({
            name: 'SpiderMan-',
            src: '/spider-man.webp',
          }))}
        />
        <br></br>
        {/* replace "username" with the current user's account name */}
        publisher: username
      </section>

      <section>
        <ButtonGroup className={styles.buttonStyle}>
          {radioButton.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx == 1 ? 'light' : 'light'}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        <Group className={styles.contentBorder}>
          
          Template text
        </Group>
        {/* <Button variant='light' type='submit' className={styles.buttonStyle}>
            Preview
          </Button>
          <Button className={styles.buttonStyle}>
            Edit
          </Button> */}
      </section>
    </section>
  );
});