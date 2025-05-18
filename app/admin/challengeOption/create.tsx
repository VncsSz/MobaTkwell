import { BooleanInput, Create, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

export const ChallengeOptionCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="gameSrc" label="Game URL" validate={[required()]} />
                <BooleanInput source="friendly" label="Game friendly" />
                <ReferenceInput source="challengeId" reference="challenges"/>
                <TextInput source="imageSrc" label="Image URL"/>
                <TextInput source="audioSrc" label="Audio URL"/>
            </SimpleForm>
        </Create>
    )
}