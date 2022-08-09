import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const URLCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="lengthened_url" source="lengthenedUrl" />
        <TextInput label="original_url" source="originalUrl" />
      </SimpleForm>
    </Create>
  );
};
