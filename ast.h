enum NodeType {
    NODE_PROGRAM,      // root: list of statements
    NODE_LET,          // let x = expr;
    NODE_RETURN,       // return expr;
    NODE_EXPR_STMT,    // expr;
    NODE_INT_LIT,      // 5
    NODE_IDENT,        // x
};