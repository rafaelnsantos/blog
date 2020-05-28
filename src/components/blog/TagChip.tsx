interface TagChipProps {
  tag: string;
}

export function TagChip({ tag }: TagChipProps) {
  return <div className="rounded mr-2 px-1 bg-green-500 text-xs">{tag}</div>;
}
