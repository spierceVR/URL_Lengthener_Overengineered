import { URLWhereInput } from "./URLWhereInput";
import { URLOrderByInput } from "./URLOrderByInput";

export type URLFindManyArgs = {
  where?: URLWhereInput;
  orderBy?: Array<URLOrderByInput>;
  skip?: number;
  take?: number;
};
