export function setThemeColor(color: string) {
  const meta = document.querySelector('meta[name=theme-color]');

  meta && meta.setAttribute('content', color);
}
