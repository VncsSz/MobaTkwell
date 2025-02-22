import { BooleanInput, Edit, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

export const ChallengeOptionEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="game" label="Game URL" validate={[required()]} />
                <BooleanInput source="correct" label="Game finish" />
                <ReferenceInput source="challengeId" reference="challenges"/>
                <TextInput source="imageSrc" label="Image URL"/>
                <TextInput source="audioSrc" label="Audio URL"/>
            </SimpleForm>
        </Edit>
    )
}