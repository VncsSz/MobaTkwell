import { Edit, NumberInput, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

export const LessonEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="title" label="Title" validate={[required()]}/>
                <NumberInput source="id" label="Id" validate={[required()]}/>
                <ReferenceInput source="unitId" reference="units"/>
                <NumberInput source="order" label="Order" validate={[required()]}/>
            </SimpleForm>
        </Edit>
    )
}