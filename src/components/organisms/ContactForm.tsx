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
        }
      }}
    >
      <TextInput id="name" label="Name" />
      <TextInput id="email" label="Email" />
      <TextInput id="phone" label="Phone" />
      <TextInput id="message" label="Message" />
      <button type="submit">Enviar</button>
    </Form>
  );
}
