import { ComponentProps } from 'react';
import { ContactForm } from '../organisms/ContactForm';

interface ContactTemplateProps {
  onSend: ComponentProps<typeof ContactForm>['onSubmit'];
}

export function ContactTemplate({ onSend }: ContactTemplateProps) {
  return (
    <div className="max-w-screen-sm mx-auto">
      <h1>Contact Page</h1>
      <ContactForm onSubmit={onSend} />
    </div>
  );
}
