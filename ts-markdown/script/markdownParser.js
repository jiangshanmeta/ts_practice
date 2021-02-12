"use strict";
var TagType;
(function (TagType) {
    TagType[TagType["Paragraph"] = 0] = "Paragraph";
    TagType[TagType["Header1"] = 1] = "Header1";
    TagType[TagType["Header2"] = 2] = "Header2";
    TagType[TagType["Header3"] = 3] = "Header3";
    TagType[TagType["HorizontalRule"] = 4] = "HorizontalRule";
})(TagType || (TagType = {}));
class TagTypeToHtml {
    constructor() {
        this.tagType = new Map();
        this.tagType.set(TagType.Header1, 'h1');
        this.tagType.set(TagType.Header2, 'h2');
        this.tagType.set(TagType.Header3, 'h3');
        this.tagType.set(TagType.Paragraph, 'p');
        this.tagType.set(TagType.HorizontalRule, 'hr');
    }
    OpeningTag(tagType) {
        return this.GetTag(tagType, '<');
    }
    ClosingTag(tagType) {
        return this.GetTag(tagType, '</');
    }
    GetTag(tagType, openingTagPattern) {
        const tag = this.tagType.get(tagType);
        if (tag !== null) {
            return `${openingTagPattern}${tag}>`;
        }
        return `${openingTagPattern}p>`;
    }
}
class MarkdownDocument {
    constructor() {
        this.content = '';
    }
    Add(...content) {
        content.forEach((e) => {
            this.content += e;
        });
    }
    Get() {
        return this.content;
    }
}
class ParseElement {
    constructor() {
        this.CurrentLine = '';
    }
}
class VisitorBase {
    constructor(tagType, TagTypeToHtml) {
        this.tagType = tagType;
        this.TagTypeToHtml = TagTypeToHtml;
    }
    Visit(token, markdownDocument) {
        markdownDocument.Add(this.TagTypeToHtml.OpeningTag(this.tagType), token.CurrentLine, this.TagTypeToHtml.ClosingTag(this.tagType));
    }
}
class Header1Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header1, new TagTypeToHtml());
    }
}
class Header2Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header2, new TagTypeToHtml());
    }
}
class Header3Visitor extends VisitorBase {
    constructor() {
        super(TagType.Header3, new TagTypeToHtml());
    }
}
class ParagraphVisitor extends VisitorBase {
    constructor() {
        super(TagType.Paragraph, new TagTypeToHtml());
    }
}
class HorizontalRuleVisitor extends VisitorBase {
    constructor() {
        super(TagType.HorizontalRule, new TagTypeToHtml());
    }
}
class Visitable {
    Accept(visitor, token, markdownDocument) {
        visitor.Visit(token, markdownDocument);
    }
}
class Handler {
    constructor() {
        this.next = null;
    }
    SetNext(next) {
        this.next = next;
    }
    HandleRequest(request) {
        if (!this.CanHandle(request)) {
            if (this.next !== null) {
                this.next.HandleRequest(request);
            }
            return;
        }
    }
}
class ParseChainHandler extends Handler {
    constructor(document, tagType, visitor) {
        super();
        this.document = document;
        this.tagType = tagType;
        this.visitor = visitor;
        this.visitable = new Visitable();
    }
    CanHandle(request) {
        let split = new LineParser().Parse(request.CurrentLine, this.tagType);
        if (split[0]) {
            request.CurrentLine = split[1];
            this.visitable.Accept(this.visitor, request, this.document);
        }
        return split[0];
    }
}
class ParagraphHandler extends Handler {
    constructor(document) {
        super();
        this.document = document;
        this.visitable = new Visitable();
        this.visitor = new ParagraphVisitor();
    }
    CanHandle(request) {
        this.visitable.Accept(this.visitor, request, this.document);
        return true;
    }
}
class Header1ChainHandler extends ParseChainHandler {
    constructor(document) {
        super(document, '#', new Header1Visitor());
    }
}
class Header2ChainHandler extends ParseChainHandler {
    constructor(document) {
        super(document, '##', new Header2Visitor());
    }
}
class Header3ChainHandler extends ParseChainHandler {
    constructor(document) {
        super(document, '###', new Header3Visitor());
    }
}
class HorizontalRuleHandler extends ParseChainHandler {
    constructor(document) {
        super(document, '---', new HorizontalRuleVisitor());
    }
}
class ChainOfResponsibilityFactory {
    Build(document) {
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
class Markdown {
    ToHtml(text) {
        const document = new MarkdownDocument();
        const h = new ChainOfResponsibilityFactory().Build(document);
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const parseElement = new ParseElement();
            parseElement.CurrentLine = lines[i];
            h.HandleRequest(parseElement);
        }
        return document.Get();
    }
}
class LineParser {
    Parse(value, tag) {
        const output = [false, value];
        if (value === '') {
            return output;
        }
        if (value.startsWith(`${tag} `)) {
            output[0] = true;
            output[1] = value.substr(tag.length);
        }
        return output;
    }
}
class HtmlHandler {
    constructor() {
        this.markdownChange = new Markdown();
    }
    TextChangeHandler(id, output) {
        let markdown = document.getElementById(id);
        let markdownOutput = document.getElementById(output);
        if (markdown !== null) {
            markdown.onkeyup = () => {
                this.RenderHtmlContent(markdown, markdownOutput);
            };
            window.onload = () => {
                this.RenderHtmlContent(markdown, markdownOutput);
            };
        }
    }
    RenderHtmlContent(markdown, markdownOutput) {
        if (markdown.value) {
            markdownOutput.innerHTML = this.markdownChange.ToHtml(markdown.value);
        }
        else {
            markdownOutput.innerHTML = '<p></p>';
        }
    }
}
//# sourceMappingURL=markdownParser.js.map