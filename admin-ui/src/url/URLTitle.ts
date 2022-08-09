import { URL as TURL } from "../api/url/URL";

export const URL_TITLE_FIELD = "lengthenedUrl";

export const URLTitle = (record: TURL): string => {
  return record.lengthenedUrl || record.id;
};
