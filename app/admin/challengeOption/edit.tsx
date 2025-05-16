import { BooleanInput, Edit, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

export const ChallengeOptionEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="gameSrc" label="Game URL" validate={[required()]} />
                <BooleanInput source="friendly" label="Game friendly" />
                <ReferenceInput source="challengeId" reference="challenges"/>
                <TextInput source="imageSrc" label="Image URL"/>
                <TextInput source="audioSrc" label="Audio URL"/>
            </SimpleForm>
        </Edit>
    )
}