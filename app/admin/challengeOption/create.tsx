import { BooleanInput, Create, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

export const ChallengeOptionCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="game" label="Game URL" validate={[required()]} 
                //TROCAR GAME POR gameSrc
                />
                <BooleanInput source="correct" label="Game finish" />
                <ReferenceInput source="challengeId" reference="challenges"/>
                <TextInput source="imageSrc" label="Image URL"/>
                <TextInput source="audioSrc" label="Audio URL"/>
            </SimpleForm>
        </Create>
    )
}