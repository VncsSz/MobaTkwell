import { Create, NumberInput, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

export const LessonCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="title" label="Title" validate={[required()]}/>
                <ReferenceInput source="unitId" reference="units"/>
                <NumberInput source="order" label="Order" validate={[required()]}/>
            </SimpleForm>
        </Create>
    )
}