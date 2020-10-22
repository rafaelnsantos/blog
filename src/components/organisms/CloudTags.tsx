import { useEffect, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import styled from 'styled-components';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { useThemeMode } from '~/hooks/useThemeMode';
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
  position: relative;
`;

const CloseTagButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--accent-red);
  border-radius: 20px;
  padding: 5px;
  margin-left: 10px;
  margin-top: -30px;
`;

interface CloudTagsProps {
  onSelectTag: (tag: string | null) => void;
  tags: CloudTag[];
}

export function CloudTags(props: CloudTagsProps) {
  const [selectedTag, setSelectedTag] = useLocalStorage<string | null>('selectedTag', null);
  const [luminosity, setLuminosity] = useState('');

  useThemeMode((darkMode) => setLuminosity(darkMode.value ? 'light' : 'dark'));

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
