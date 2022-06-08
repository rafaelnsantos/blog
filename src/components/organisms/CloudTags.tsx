import { useEffect, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import styled from 'styled-components';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { useTheme } from 'next-themes';
import { useGoogleAnalytics } from '~/providers/GoogleAnalytics';
import { CloudTag } from '~/utils/blogUtils';

const StyledTagClod = styled(TagCloud)`
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const SelectedTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: var(--accent-purple);
  height: 30px;
  align-self: center;
  padding-left: 20px;
  border-radius: 10px;
  transition: opacity 150ms ease;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const CloseTagButton = styled.button`
  margin-top: -30px;
  background-color: var(--accent-red);
  border-radius: 20px;
  opacity: 0.7;
  width: 20px;
  height: 20px;
  font-size: 13px;
`;

interface CloudTagsProps {
  onSelectTag: (tag: string | null) => void;
  tags: CloudTag[];
}

export function CloudTags(props: CloudTagsProps) {
  const [selectedTag, setSelectedTag] = useLocalStorage<string | null>('selectedTag', null);
  const [luminosity, setLuminosity] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    setLuminosity(theme === 'dark' ? 'light' : 'dark');
  }, [theme]);

  useEffect(() => {
    props.onSelectTag(selectedTag);
  }, [selectedTag]);

  const ga = useGoogleAnalytics();

  return (
    <div className="flex justify-center md:max-w-screen-md m-auto px-10 h-40">
      {selectedTag ? (
        <SelectedTagContainer onClick={() => setSelectedTag(null)}>
          <div>{selectedTag}</div>
          <CloseTagButton>X</CloseTagButton>
        </SelectedTagContainer>
      ) : (
        <StyledTagClod
          colorOptions={{ luminosity }}
          minSize={12}
          maxSize={24}
          tags={props.tags}
          onClick={(tag: CloudTag) => {
            ga.event({
              action: tag.value,
              category: 'TagCloud',
            });
            setSelectedTag(tag.value);
          }}
        />
      )}
    </div>
  );
}
