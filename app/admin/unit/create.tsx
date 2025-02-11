import { Create, NumberInput, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

export const UnitCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="title" label="Title" validate={[required()]}/>
                <TextInput source="description" label="Description" validate={[required()]}/>
                <ReferenceInput source="courseId" reference="courses"/>
                <NumberInput source="order" label="Order" validate={[required()]}/>
            </SimpleForm>
        </Create>
    )
}