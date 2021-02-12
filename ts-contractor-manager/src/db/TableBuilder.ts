import { StringOrNull } from "src/types";

export interface ITableBuilder{
    WithDatabase(databaseName:string):ITableBuilder;
    WithVersion(version:number):ITableBuilder;
    WithTableName(tableName:string):ITableBuilder;
    WithPrimaryField(primaryField:string):ITableBuilder;
    WithIndexName(indexName:string):ITableBuilder;
}

export interface ITable{
    Database():string;
    Version():number;
    TableName():string;
    IndexName():string;
    Build(database:IDBDatabase):void;
}

export class TableBuilder implements ITableBuilder,ITable{
    private database:StringOrNull = null;
    private tableName:StringOrNull = null;
    private primaryField:StringOrNull = null;
    private indexName:StringOrNull = null;
    private version:number = 1;
    public WithDatabase(databaseName:string){
        this.database = databaseName;
        return this;
    }

    public WithVersion(version:number){
        this.version = version;
        return this;
    }
    public WithTableName(tableName:string){
        this.tableName = tableName;
        return this;
    }

    public WithPrimaryField(primaryField:string){
        this.primaryField = primaryField;
        return this;
    }

    public WithIndexName(indexName:string){
        this.indexName = indexName;
        return this;
    }

    public Database(){
        return this.database!;
    }

    public Version(){
        return this.version!;
    }

    public TableName(){
        return this.tableName!;
    }

    public IndexName(){
        return this.indexName!;
    }

    public Build(database:IDBDatabase):void{
        const parameters:IDBObjectStoreParameters = {
            keyPath:this.primaryField,
        }

        const objectStore = database.createObjectStore(this.tableName!,parameters);
        objectStore.createIndex(this.indexName!,this.primaryField!);
        
    }


}