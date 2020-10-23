import styled from 'styled-components';
import { Form } from '../Form';
import { TextInput } from '../molecules/TextInput';

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
        } catch (err) {
          console.log(err);
        } finally {
          bag.setSubmitting(false);
          bag.setFieldError('name', 'error');
        }
      }}
    >
      <TextInput id="name" label="Name" />
      <TextInput id="email" label="Email" />
      <TextInput id="phone" label="Phone" />
      <TextInput id="message" label="Message" />
      <StyledButton type="submit">Enviar</StyledButton>
    </Form>
  );
}
