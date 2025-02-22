import { Datagrid, List, NumberField, ReferenceField, SelectField, TextField } from "react-admin";

export const ChallengeList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <NumberField source="id" />
                <TextField source="question" 
                //Trocar question por title no schema e aqui
                />
                <SelectField 
                    source="type" 
                    choices={[
                        { id: 'SELECT', name: 'SELECT' },
                        { id: 'ASSIST', name: 'ASSIST' },
                    ]} 
                />
                <ReferenceField source="lessonId" reference="lessons" />
                <NumberField source="order" />
            </Datagrid>
        </List>
    )
}