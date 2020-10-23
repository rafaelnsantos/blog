import styled from 'styled-components';
import { Form } from '../Form';
import { TextInput } from '../molecules/TextInput';
import * as yup from 'yup';
interface Form {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface ContactFormProps {
  onSubmit: (values: Form) => Promise<unknown>;
}

const StyledButton = styled.button`
  background: var(--accent-green);
  padding: 10px;
  border-radius: 10px;
  float: right;
  box-shadow: 3px 5px 6px var(--shadow-bg-inset);
  color: black;
`;

export function ContactForm(props: ContactFormProps) {
  return (
    <Form
      initialValues={{
        name: '',
        email: '',
        message: '',
        phone: '',
      }}
      onSubmit={async (values, bag) => {
        try {
          await props.onSubmit(values);
          bag.resetForm();
        } catch (err) {
          console.log(err);
        } finally {
          bag.setSubmitting(false);
        }
      }}
      validationSchema={yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().required('Email is required').email('Invalid email'),
        message: yup.string().required('Message is required'),
      })}
    >
      <TextInput id="name" label="Name" />
      <TextInput id="email" label="Email" />
      <TextInput id="phone" label="Phone" />
      <TextInput id="message" label="Message" />
      <StyledButton type="submit">Enviar</StyledButton>
    </Form>
  );
}
