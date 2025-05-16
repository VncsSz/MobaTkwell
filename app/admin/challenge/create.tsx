import { Create, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin";

export const ChallengeCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="gameTitle" label="GameTitle" validate={[required()]} 
                //Question por title
                />
                <SelectInput 
                    source="type" 
                    choices={[
                        { id: 'GAME', name: 'GAME' },
                        { id: 'EXTRA', name: 'EXTRA' },
                    ]}
                    validate={[required()]}
                />
                <ReferenceInput source="lessonId" reference="lessons"/>
                <NumberInput source="order" label="Order" validate={[required()]}/>
            </SimpleForm>
        </Create>
    )
}