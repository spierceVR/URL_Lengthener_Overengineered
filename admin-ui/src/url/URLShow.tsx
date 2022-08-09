import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
} from "react-admin";

export const URLShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="lengthened_url" source="lengthenedUrl" />
        <TextField label="original_url" source="originalUrl" />
      </SimpleShowLayout>
    </Show>
  );
};
