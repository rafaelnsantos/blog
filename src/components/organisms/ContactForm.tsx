import styled from 'styled-components';
import { Form, FormProps } from '../Form';
import { TextInput } from '../molecules/TextInput';
import * as yup from 'yup';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export type ContactFormProps = FormProps<ContactFormData>;

const StyledButton = styled.button`
  background: var(--accent-green);
  padding: 10px;
  margin-right: 30px;
  border-radius: 10px;
  float: right;
  box-shadow: 3px 5px 6px var(--shadow-bg-inset);
  color: black;
`;

export function ContactForm(props: ContactFormProps) {
  return (
    <Form<ContactFormData>
      {...props}
      initialValues={{
        name: '',
        email: '',
        phone: '',
        message: '',
      }}
      validationSchema={yup.object().shape<ContactFormData>({
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
