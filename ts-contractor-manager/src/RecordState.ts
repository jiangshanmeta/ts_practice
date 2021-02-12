import { IPersonState } from "./Stats";

export interface IRecordState{
    IsActive:boolean;
}

export class RecordState implements IRecordState{
    public IsActive:boolean = false;
}

export type PersonRecord = RecordState & IPersonState;