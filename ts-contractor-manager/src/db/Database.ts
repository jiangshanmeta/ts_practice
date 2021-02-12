import { RecordState } from "src/RecordState";
import { ITable } from "./TableBuilder";

export class Database<T extends RecordState>{
    private readonly indexDb:IDBFactory;
    private database:IDBDatabase|null = null;
    private readonly table:ITable;
    constructor(table:ITable){
        this.indexDb = window.indexedDB;
        this.table = table;
        this.OpenDatabase();
    }

    private OpenDatabase(){
        const open = this.indexDb.open(this.table.Database(),this.table.Version());
        open.onupgradeneeded = (e:any)=>{
            this.UpgradeDatabase(e.target.result);
        }
        open.onsuccess = (e:any)=>{
            this.UpgradeDatabase(e.target.result);
        }
    }

    private UpgradeDatabase(database:IDBDatabase){
        this.database = database;
        this.table.Build(this.database);
    }

    private GetObjectStore():IDBObjectStore|null{
        try{
            const transaction:IDBTransaction = this.database!.transaction(this.table.TableName(),'readwrite');
            const dbStore:IDBObjectStore = transaction.objectStore(this.table.TableName());
            return dbStore;
        }catch(e){
            return null;
        }
    }

    public Create(state:T):void{
        const dbStore = this.GetObjectStore();
        dbStore!.add(state);
    }

    public Read():Promise<T[]>{
        return new Promise((response)=>{
            const dbStore = this.GetObjectStore();
            const items:T[] = [];
            const request:IDBRequest = dbStore!.openCursor();
            request.onsuccess = (e:any)=>{
                const cursor:IDBCursorWithValue = e.target.value;
                if(cursor){
                    const result:T = cursor.value;
                    if(result.IsActive){
                        items.push(result);
                    }
                    cursor.continue();
                }else{
                    response(items)
                }

            }
        })
    }

}