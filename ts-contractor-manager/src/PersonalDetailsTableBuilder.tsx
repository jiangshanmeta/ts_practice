import { TableBuilder } from "./db/TableBuilder";

export class PersonalDetailsTableBuilder{
    public Build():TableBuilder{
        const tableBuilder = new TableBuilder();
        tableBuilder
            .WithDatabase('packt-advanced-typescript')
            .WithTableName('People')
            .WithPrimaryField('PersonId')
            .WithIndexName('personId')
            .WithVersion(1);
        return tableBuilder;
    }
}