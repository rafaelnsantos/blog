import { InitOptions } from 'netlify-identity-widget';
import { CmsConfigFixed } from '~/config/admin';
import { CMS } from '../organisms/NetlifyCMS';
import { IdentityWidget } from '../organisms/IdentityWidget';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { RingLoader } from 'react-spinners';

interface AdminTemplateProps {
  cmsConfig: CmsConfigFixed;
  identityConfig?: InitOptions;
}

const PostPreview = dynamic(
  async () => (await import('~/components/admin/previews/PostPreview')).PostPreview
);

const ColorPreview = dynamic(
  async () => (await import('~/components/admin/previews/ColorPreview')).ColorPreview
);

const ColorWidget = dynamic(
  async () => (await import('~/components/admin/widgets/ColorWidget')).ColorWidget
);

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
        onInit={(identity, logged) => !logged && setTimeout(() => identity.open('login'), 100)}
        onLogin={(identity, logged) => (logged ? identity.close() : identity.open('login'))}
        onClose={(identity, logged) => !logged && identity.open('login')}
        onLogout={(identity) => identity.open('login')}
        Loading={
          <Loading index={9999}>
            <RingLoader size="35vh" color="var(--text-primary)" />
          </Loading>
        }
      />
      <CMS
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
