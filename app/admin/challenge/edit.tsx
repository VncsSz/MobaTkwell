import { Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin";

export const ChallengeEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="question" label="Question" validate={[required()]} 
                //Question por title
                />
                <SelectInput
                    source="type" 
                    choices={[
                        { id: 'SELECT', name: 'SELECT' },
                        { id: 'ASSIST', name: 'ASSIST' },
                    ]}
                    validate={[required()]}
                />
                <ReferenceInput source="lessonId" reference="lessons"/>
                <NumberInput source="order" label="Order" validate={[required()]}/>
            </SimpleForm>
        </Edit>
    )
}