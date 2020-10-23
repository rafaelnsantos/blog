import { ComponentProps } from 'react';
import { Text } from '../atoms/Text';
import { ContactForm } from '../organisms/ContactForm';

interface ContactTemplateProps {
  onSend: ComponentProps<typeof ContactForm>['onSubmit'];
}

export function ContactTemplate({ onSend }: ContactTemplateProps) {
  return (
    <div className="max-w-screen-sm mx-auto">
      <Text variant="h1" size={3} lineHeight={5} align="center">
        Contact Page
      </Text>
      <ContactForm onSubmit={onSend} />
    </div>
  );
}
