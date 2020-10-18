import styled from 'styled-components';

interface TagChipProps {
  tag: string;
}

const Tag = styled.div`
  background: var(--accent-green);
  color: #050505;
`;

export function TagChip({ tag }: TagChipProps) {
  return <Tag className="rounded mr-2 px-1 text-xs">{tag}</Tag>;
}
