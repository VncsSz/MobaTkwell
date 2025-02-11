import { Edit, NumberInput, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

export const UnitEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="title" label="Title" validate={[required()]}/>
                <TextInput source="id" label="Id" validate={[required()]}/>
                <TextInput source="description" label="Description" validate={[required()]}/>
                <ReferenceInput source="courseId" reference="courses"/>
                <NumberInput source="order" label="Order" validate={[required()]}/>
            </SimpleForm>
        </Edit>
    )
}