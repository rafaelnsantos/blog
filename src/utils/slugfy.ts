export const slugfy = (text: string) => text.replace(/ /g, '-').toLowerCase();

export const deslugfy = (text: string) => text.replace(/-/g, ' ');
