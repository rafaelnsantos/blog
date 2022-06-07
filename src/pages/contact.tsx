import { Page } from '~/components/Page';
import { ContactTemplate } from '~/components/templates/Contact';
import { useDiscord } from '~/hooks/useDiscord';
import contact from 'content/contact.json';
import { ReactElement } from 'react';
import { Seo } from '~/components/organisms/SEO';

export default function ContactPage() {
  const sendMessage = useDiscord(contact.discord);

  return (
    <ContactTemplate
      onSubmit={(values) =>
        sendMessage({
          message: values.message,
          username: `${values.name} - ${values.email} - ${values.phone}`,
        })
      }
      onSuccess={(res: Response) => alert('success')}
      onError={(err) => alert('oh no ' + err.message)}
    />
  );
}

ContactPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Page>
      <Seo description="Contact form" title="Contact" />
      {page}
    </Page>
  );
};
