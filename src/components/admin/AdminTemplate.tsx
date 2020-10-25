import { NetlifyCMS, NetlifyCMSProps } from './NetlifyCMS';
import { IdentityProps, IdentityWidget } from './IdentityWidget';

interface AdminTemplateProps {
  cms: NetlifyCMSProps;
  identity: IdentityProps;
}

export function AdminTemplate(props: AdminTemplateProps) {
  return (
    <>
      <IdentityWidget
        config={props.identity.config}
        onLoad={(identity) => {
          if (props.identity.onLoad) props.identity.onLoad(identity);

          identity.on('init', (user) => {
            if (!user) {
              identity.open('login');
            }
          });

          return () => {
            identity.off('init');
          };
        }}
      />
      <NetlifyCMS {...props.cms} />
    </>
  );
}
