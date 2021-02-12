enum TagType {
    Paragraph,
    Header1,
    Header2,
    Header3,
    HorizontalRule,
}

class TagTypeToHtml {
    private readonly tagType:Map<TagType,string> = new Map<TagType,string>();
    constructor(){
        this.tagType.set(TagType.Header1,'h1');
        this.tagType.set(TagType.Header2,'h2');
        this.tagType.set(TagType.Header3,'h3');
        this.tagType.set(TagType.Paragraph,'p');
        this.tagType.set(TagType.HorizontalRule,'hr');
    }

    public OpeningTag(tagType:TagType):string{
        return this.GetTag(tagType,'<');
    }

    public ClosingTag(tagType:TagType):string{
        return this.GetTag(tagType,'</');
    }

    private GetTag(tagType:TagType,openingTagPattern:string):string{
        const tag = this.tagType.get(tagType)
        if(tag !== null){
            return `${openingTagPattern}${tag}>`
        }
        return `${openingTagPattern}p>`;
    }

}

interface IMarkdownDocument {
    Add(...content:string[]):void;
    Get():void;
}

class MarkdownDocument implements IMarkdownDocument{
    private content:string = '';
    Add(...content:string[]):void{
        content.forEach((e)=>{
            this.content += e;
        });
    }

    Get():string{
        return this.content;
    }

}

class ParseElement{
    CurrentLine:string = '';
}

interface IVisitor {
    Visit(token:ParseElement,markdownDocument:IMarkdownDocument):void;
}

interface IVisitable {
    Accept(
        visitor:IVisitor,
        token:ParseElement,
        markdownDocument:IMarkdownDocument
    ):void;
}

abstract class VisitorBase implements IVisitor{
    constructor(
        private readonly tagType:TagType,
        private readonly TagTypeToHtml:TagTypeToHtml
    ){

    }

    Visit(
        token:ParseElement,
        markdownDocument:IMarkdownDocument,
    ):void{
        markdownDocument.Add(
            this.TagTypeToHtml.OpeningTag(this.tagType),
            token.CurrentLine,
            this.TagTypeToHtml.ClosingTag(this.tagType)
        );
    }
}

class Header1Visitor extends VisitorBase{
    constructor(){
        super(TagType.Header1,new TagTypeToHtml())
    }
}

class Header2Visitor extends VisitorBase{
    constructor() {
        super(TagType.Header2,new TagTypeToHtml());
    }
}

class Header3Visitor extends VisitorBase{
    constructor() {
        super(TagType.Header3,new TagTypeToHtml());
        
    }
}

class ParagraphVisitor extends VisitorBase{
    constructor(){
        super(TagType.Paragraph,new TagTypeToHtml())
    }
}

class HorizontalRuleVisitor extends VisitorBase{
    constructor() {
        super(TagType.HorizontalRule,new TagTypeToHtml());
        
    }
    
}

class Visitable implements IVisitable{
    Accept(
        visitor:IVisitor,
        token:ParseElement,
        markdownDocument:IMarkdownDocument,
    ):void{
        visitor.Visit(token,markdownDocument)
    }
}

abstract class Handler<T>{
    protected next:Handler<T>|null = null;
    public SetNext(next:Handler<T>){
        this.next = next;
    }
    protected abstract CanHandle(request:T):boolean;
    public HandleRequest(request:T){
        if(!this.CanHandle(request)){
            if(this.next !== null){
                this.next.HandleRequest(request);
            }
            return
        }
    }
}

class ParseChainHandler extends Handler<ParseElement>{
    private readonly visitable:IVisitable = new Visitable();
    constructor(
        private readonly document:IMarkdownDocument,
        private readonly tagType:string,
        private readonly visitor:IVisitor,
    ){
        super();
    }

    protected CanHandle(request:ParseElement):boolean{
        let split = new LineParser().Parse(request.CurrentLine,this.tagType);

        if(split[0]){
            request.CurrentLine = split[1];
            this.visitable.Accept(this.visitor,request,this.document);
        }
        return split[0];
    }

}

class ParagraphHandler extends Handler<ParseElement>{
    private readonly visitable:IVisitable = new Visitable();
    private readonly visitor:IVisitor = new ParagraphVisitor();
    protected CanHandle(request:ParseElement):boolean{
        this.visitable.Accept(this.visitor,request,this.document);
        return true;
    }
    constructor(private readonly document:IMarkdownDocument){
        super();
    }

}

class Header1ChainHandler extends ParseChainHandler{
    constructor(document:IMarkdownDocument){
        super(document,'#',new Header1Visitor())
    }
}

class Header2ChainHandler extends ParseChainHandler{
    constructor(document:IMarkdownDocument) {
        super(document,'##',new Header2Visitor());
        
    }
}

class Header3ChainHandler extends ParseChainHandler{
    constructor(document:IMarkdownDocument){
        super(document,'###',new Header3Visitor());
    }
}

class HorizontalRuleHandler extends ParseChainHandler{
    constructor(document:IMarkdownDocument){
        super(document,'---',new HorizontalRuleVisitor())
    }
}

class ChainOfResponsibilityFactory{
    Build(document:IMarkdownDocument):ParseChainHandler{
        const h1 = new Header1ChainHandler(document);
        const h2 = new Header2ChainHandler(document);
        const h3 = new Header3ChainHandler(document);
        const horizontalRule = new HorizontalRuleHandler(document);
        const p = new ParagraphHandler(document);
        h1.SetNext(h2);
        h2.SetNext(h3);
        h3.SetNext(horizontalRule);
        horizontalRule.SetNext(p);
        return h1;
    }
}

class Markdown{
    public ToHtml(text:string):string{
        const document = new MarkdownDocument();
        const h = new ChainOfResponsibilityFactory().Build(document);
        const lines = text.split('\n');
        for(let i=0;i<lines.length;i++){
            const parseElement = new ParseElement();
            parseElement.CurrentLine = lines[i];
            h.HandleRequest(parseElement);
        }
        return document.Get();
    }
}


class LineParser{
    public Parse(value:string,tag:string):[boolean,string]{
        const output:[boolean,string] = [false,value];
        if(value === ''){
            return output;
        }
        if(value.startsWith(`${tag} `)){
            output[0] = true;
            output[1] = value.substr(tag.length);
        }
        return output;
    }
}

class HtmlHandler{
    private markdownChange:Markdown = new Markdown();

    public TextChangeHandler(id:string,output:string):void{
        let markdown = <HTMLTextAreaElement>document.getElementById(id);
        let markdownOutput = <HTMLLabelElement>document.getElementById(output);
        if(markdown !== null){
            markdown.onkeyup = ()=>{
                this.RenderHtmlContent(markdown,markdownOutput);
            }
            window.onload = ()=>{
                this.RenderHtmlContent(markdown,markdownOutput)
            }
        }
    }

    private RenderHtmlContent(
        markdown:HTMLTextAreaElement,
        markdownOutput:HTMLLabelElement,
    ){
        if(markdown.value){
            markdownOutput.innerHTML = this.markdownChange.ToHtml(markdown.value);
        }else{
            markdownOutput.innerHTML = '<p></p>'
        }
    }
}