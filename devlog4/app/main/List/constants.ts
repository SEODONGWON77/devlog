export const BASE_URL = (queryString?: string): string => {
  return `https://fakestoreapi.com${queryString || ""}`;
};

export const IMG_URL = (queryString?: string): string => {
  const ACCESS_KEY = "T3sLTB3G47UuyREXMlsQeVPnfUqV7hp47FbcHdUF5NU";
  return `https://api.unsplash.com/search/photos?page=1&query=${
    queryString || ""
  }&client_id=${ACCESS_KEY}&orientation=landscape&per_page=20`;
};

export const ALL = "all" as const;
export const ALL_LABEL = "전체" as const;

export const TILTE = "title" as const;
export const TILTE_LABEL = "제목" as const;

export const CONTENTS = "contents" as const;
export const CONTENTS_LABEL = "내용" as const;

export const AUTHOR = "author" as const;
export const AUTHOR_LABEL = "작성자" as const;

export const searchDropDownType = {
  [ALL]: ALL_LABEL,
  [TILTE]: TILTE_LABEL,
  [CONTENTS]: CONTENTS_LABEL,
  [AUTHOR]: AUTHOR_LABEL,
};

export const searchDropDownList = Object.entries(searchDropDownType).map(
  ([key, name]) => ({
    key,
    name,
  })
);
