import { Datagrid, List, NumberField, ReferenceField, SelectField, TextField } from "react-admin";

export const ChallengeList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <NumberField source="id" />
                <TextField source="gameTitle"/>
                <SelectField 
                    source="type" 
                    choices={[
                        { id: 'GAME', name: 'GAME' },
                        { id: 'EXTRA', name: 'EXTRA' },
                    ]} 
                />
                <ReferenceField source="lessonId" reference="lessons" />
                <NumberField source="order" />
            </Datagrid>
        </List>
    )
}