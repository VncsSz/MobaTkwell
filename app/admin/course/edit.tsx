import { Edit, NumberInput, SimpleForm, TextInput, required } from "react-admin";

export const CourseEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput source="id" label="id" validate={[required()]}/>
                <TextInput source="title" label="Title" validate={[required()]}/>
                <TextInput source="imageSrc" label="Image" validate={[required()]}/>
            </SimpleForm>
        </Edit>
    )
}