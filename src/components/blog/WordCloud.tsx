import { CloudTag } from '~/utils/blogUtils';
import { TagCloud } from 'react-tagcloud';

interface WordCloudProps {
  tags: CloudTag[];
  onSelectTag: (tag: CloudTag) => void;
}

export function WorldCloud(props: WordCloudProps) {
  return (
    <div className="h-10">
      <TagCloud minSize={12} maxSize={24} tags={props.tags} onClick={props.onSelectTag} />
    </div>
  );
}
