import { wordsPerMinute as WORDS_PER_MINUTE } from 'content/pagination.json';

export function getReadingTime(post: string): number {
  // Matches words
  // See
  // https://regex101.com/r/q2Kqjg/6
  const regex = post.match(/\w+/g);

  if (!regex) return 0;

  const wordCount = regex.length;

  const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return readingTime;
}
