import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const URLEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="lengthened_url" source="lengthenedUrl" />
        <TextInput label="original_url" source="originalUrl" />
      </SimpleForm>
    </Edit>
  );
};
