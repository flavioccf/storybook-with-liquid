import engine from "../engine/liquidEngine";

export let dataHolder: { str: string; }[] = [];
engine.registerTag("schema", {
  parse(tagToken, remainTokens) {
    this.tpls = [];
    let closed = false;
    while (remainTokens.length) {
      let token = remainTokens.shift();

      if (token && "name" in token && token.name === "endschema") {
        closed = true;
        break;
      }
      if (token) {
        let tpl = this.liquid.parser.parseToken(token, remainTokens);
        this.tpls.push(tpl);
      }
    }
    if (!closed) throw new Error(`tag ${tagToken.getText()} not closed`);
  },
  *render(context, emitter) {
    dataHolder = this.tpls;
  },
});