import { format, formatDistanceToNow } from 'date-fns';

export const formatTimestamp = (timestamp: number): string =>
  `${format(timestamp, 'EEEE, MMMM do yyyy')}`;
