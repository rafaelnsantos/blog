import { Text } from '../atoms/Text';
import { ContactForm, ContactFormProps } from '../organisms/ContactForm';

type ContactTemplateProps = ContactFormProps;

export function ContactTemplate(props: ContactTemplateProps) {
  return (
    <div className="max-w-screen-sm mx-auto">
      <Text variant="h1" size={3} lineHeight={5} align="center">
        Contact Page
      </Text>
      <ContactForm {...props} />
    </div>
  );
}
