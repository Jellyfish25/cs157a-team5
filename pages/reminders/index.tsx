import { Button, Form } from 'react-bootstrap';
import styles from './reminders.module.css';

export default function Reminders() {
  const { Group, Label, Control, Select } = Form;
  return (
    <section className={styles.formWrapper}>
      <Form className={styles.form + ' ' + styles.submit}>
      <h1>Reminders</h1>
      <h6>Send reminders to naughty customers who forget to return their media</h6>
      <Form.Check type={'checkbox'} id={`kim kard`} label={`kim kard`}/>
      <Form.Check type={'checkbox'} id={`person 2`} label={`person 2`}/>
      <Form.Check type={'checkbox'} id={`person 3`} label={`person 3`}/>
      <Form.Check type={'checkbox'} id={`person 4`} label={`person 4`}/>
      </Form>
    </section>
  );
}
