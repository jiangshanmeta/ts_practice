type Events = {
    ready:void,
    error:Error,
    reconnecting:{
        attempt:number,
        delay:number,
    }
}
// 注意keyof的用法
type RedisClient = {
    on<E extends keyof Events>(
        event:E,
        f:(arg:Events[E])=>void
    ):void;

    emit<E extends keyof Events>(
        event:E,
        arg:Events[E]
    ):void;

}