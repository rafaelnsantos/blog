import { Form, FormProps } from '../Form';
import { TextInput } from '../molecules/TextInput';
import * as yup from 'yup';
import { SubmitButton } from '../molecules/SubmitButton';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export type ContactFormProps = FormProps<ContactFormData>;

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
      <SubmitButton>Enviar</SubmitButton>
    </Form>
  );
}
