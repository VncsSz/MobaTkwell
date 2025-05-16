import { BooleanField, Datagrid, List, NumberField, ReferenceField, TextField } from "react-admin";

export const ChallengeOptionList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <NumberField source="id" />
                <TextField source="gameSrc" />
                <BooleanField source="friendly" />
                <ReferenceField source="challengeId" reference="challenges" />
                <TextField source="imageSrc" />
                <TextField source="audioSrc" />
            </Datagrid>
        </List>
    )
}