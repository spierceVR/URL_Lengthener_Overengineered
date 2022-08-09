import { SortOrder } from "../../util/SortOrder";

export type URLOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  lengthenedUrl?: SortOrder;
  originalUrl?: SortOrder;
};
