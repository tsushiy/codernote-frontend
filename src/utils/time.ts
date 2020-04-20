export const timePassageString = (time: number | undefined) => {
  if (time === undefined || time === 0) {
    return "";
  }
  const now = Math.floor(new Date().getTime() / 1000);
  const elapsed = now - time;
  if (elapsed >= 24 * 60 * 60) {
    if (elapsed < 2 * 24 * 60 * 60) {
      return `1 day ago`;
    }
    return `${String(Math.floor(elapsed / (24 * 60 * 60)))} days ago`;
  }
  if (elapsed >= 60 * 60) {
    if (elapsed < 2 * 60 * 60) {
      return `1 hour ago`;
    }
    return `${String(Math.floor(elapsed / (60 * 60)))} hours ago`;
  }
  if (elapsed >= 60) {
    if (elapsed < 2 * 60) {
      return `1 minute ago`;
    }
    return `${String(Math.floor(elapsed / 60))} minutes ago`;
  }
  return "Recent";
};
