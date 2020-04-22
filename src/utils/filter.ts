export const paginationList = (currPage: number, maxPage: number) => {
  if (maxPage <= 10) {
    return Array.from(Array(maxPage), (v, k) => k + 1);
  }
  let pages: number[] = [];
  if (currPage !== 1 && currPage !== maxPage) pages.push(currPage);

  let cur = currPage - 1;
  let p = 2;
  while (cur > 1) {
    pages.push(cur);
    cur -= p;
    p *= 2;
  }
  pages.push(1);

  pages = pages.reverse();

  cur = currPage + 1;
  p = 2;
  while (cur < maxPage) {
    pages.push(cur);
    cur += p;
    p *= 2;
  }
  pages.push(maxPage);

  return pages;
};

const specialCharRegExp = new RegExp(/[\\^$.*+?()[\]{}|]/, "g");

export const escapedText = (text: string) => {
  return text.replace(specialCharRegExp, "\\$&");
};
