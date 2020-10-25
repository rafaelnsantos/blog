import { Page } from '~/components/Page';
import { ContactTemplate } from '~/components/templates/Contact';
import { useDiscord } from '~/hooks/useDiscord';
import contact from 'content/contact.json';

export default function ContactPage() {
  const sendMessage = useDiscord(contact.discord);

  return (
    <Page description="Contact form" title="Contact">
      <ContactTemplate
        onSubmit={(values) =>
          sendMessage({
            message: values.message,
            username: `${values.name} - ${values.email} - ${values.phone}`,
          })
        }
        onSuccess={(res: Response) => alert('success' + res.json())}
        onError={(err) => alert('oh no ' + err.message)}
      />
    </Page>
  );
}
