import { NetlifyCMS, NetlifyCMSProps } from './NetlifyCMS';
import { IdentityProps, IdentityWidget } from './IdentityWidget';
import styled from 'styled-components';
import { RingLoader } from 'react-spinners';

import { PostPreview } from './previews/PostPreview';
import { ColorPreview } from './previews/ColorPreview';
import { ColorWidget } from './widgets/ColorWidget';

interface AdminTemplateProps {
  cmsConfig: NetlifyCMSProps['config'];
  identityConfig?: IdentityProps['config'];
}

const Loading = styled.div<{ index: number }>`
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: var(--bg-primary);
  z-index: ${(props) => props.index};
`;

export function AdminTemplate(props: AdminTemplateProps) {
  return (
    <>
      <IdentityWidget
        config={props.identityConfig}
        onInit={(identity, user) => !user && identity.open('login')}
        onLogin={(identity, user) => (user ? identity.close() : identity.open('login'))}
        onClose={(identity, user) => !user && identity.open('login')}
        onLogout={(identity) => identity.open('login')}
        Loading={
          <Loading index={9999}>
            <RingLoader size="35vh" color="var(--text-primary)" />
          </Loading>
        }
      />
      <NetlifyCMS
        config={props.cmsConfig}
        onLoad={(cms) => {
          cms.registerPreviewStyle('/style/preview/preview.css');
          cms.registerPreviewStyle('/style/preview/global.css');
          cms.registerPreviewStyle('/style/preview/markdown.css');
          cms.registerPreviewTemplate('blog', PostPreview);
          cms.registerPreviewTemplate('colors', ColorPreview);
          cms.registerWidget('color', ColorWidget);
        }}
      />
    </>
  );
}
