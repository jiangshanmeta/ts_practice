class RequestBuilder{
    private data:object|null = null;
    private method: 'get'|'post'|null = null;
    private url:string | null = null;

    setData(data:object):this{
        this.data = data;
        return this;
    }
    
    setMethod(method:'get'|'post'):this{
        this.method = method;
        return this;
    }

    setUrl(url:string):this{
        this.url = url;
        return this;
    }
    send(){
        
    }
    
}