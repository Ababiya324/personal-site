#include <stdlib.h>   
#include <string.h>   
#include <stdio.h>   
#include <stdbool.h>  

enum tokentype {
    TOK_LET, TOK_FUNCTION,
    TOK_IF, TOK_ELSE, TOK_WHILE, TOK_RETURN, TOK_INT, TOK_STRING,
    TOK_IDENT, TOK_INT_LIT, TOK_STRING_LIT,
    TOK_PLUS, TOK_MINUS, TOK_STAR, TOK_SLASH,
    TOK_EQUAL, TOK_EQEQUAL, TOK_NOTEQUAL, TOK_LT, TOK_LTE, TOK_GT, TOK_GTE,
    TOK_LPAREN, TOK_RPAREN, TOK_LBRACE, TOK_RBRACE,
    TOK_SEMICOLON, TOK_COMMA,
    TOK_EOF, TOK_ERROR
};

struct token {
    enum tokentype type;
    char* literal;
    struct token* next;
};

struct lexer {
    char* input;
    int position;
    int readPosition;
    char ch;
    int line;
    int cols;
};

// forward declarations
bool isLetter(char ch);
bool isDigit(char ch);
void readChar(struct lexer* lex);
char peekChar(struct lexer* lex);
char readEscape(struct lexer* lex);

struct lexer* new(char* input){
    struct lexer* lex = malloc(sizeof(struct lexer));
    lex->input = input;
    lex->position = 0;
    lex->readPosition = 0;
    lex->line = 0;
    lex->cols = 0;
    readChar(lex);   // loads ch=input[0], sets position=0, readPosition=1
    return lex;
}

void readChar(struct lexer* lex){
    if (lex->input[lex->readPosition] == 0) {
        lex->ch = 0;
        lex->position = lex->readPosition;   // advance position even at EOF
        return;
    }
    lex->ch = lex->input[lex->readPosition];
    lex->position = lex->readPosition;
    lex->readPosition += 1;
}

char peekChar(struct lexer* lex){
    return lex->input[lex->readPosition];   // null byte at EOF is fine
}

bool isLetter(char ch) {
    return ('a' <= ch && ch <= 'z') || 
           ('A' <= ch && ch <= 'Z') || 
           (ch == '_');
}

bool isDigit(char ch) {
    return '0' <= ch && ch <= '9';
}

char* readIdentifier(struct lexer* lex) {
    int start = lex->position;
    while (isLetter(lex->ch)) {
        readChar(lex);
    }
    int len = lex->position - start;
    char* ident = malloc(len + 1);
    strncpy(ident, &lex->input[start], len);
    ident[len] = '\0';
    return ident;
}

char* readNumber(struct lexer* lex) {
    int start = lex->position;
    while (isDigit(lex->ch)) {
        readChar(lex);
    }
    int len = lex->position - start;
    char* num = malloc(len + 1);
    strncpy(num, &lex->input[start], len);
    num[len] = '\0';
    return num;
}

enum tokentype lookupKeyword(char* word) {
    if (strcmp(word, "let") == 0) return TOK_LET;
    if (strcmp(word, "fn") == 0) return TOK_FUNCTION;
    if (strcmp(word, "if") == 0) return TOK_IF;
    if (strcmp(word, "else") == 0) return TOK_ELSE;
    if (strcmp(word, "while") == 0) return TOK_WHILE;
    if (strcmp(word, "return") == 0) return TOK_RETURN;
    if (strcmp(word, "int") == 0) return TOK_INT;
    if (strcmp(word, "string") == 0) return TOK_STRING;
    return TOK_IDENT;
}

void skipWhitespace(struct lexer* lex) {
    while (lex->ch == ' ' || lex->ch == '\t' || lex->ch == '\n' || lex->ch == '\r') {
        readChar(lex);
    }
}

char readEscape(struct lexer* lex) {
    readChar(lex);   // consume the backslash, now ch is the char after it
    switch (lex->ch) {
        case 'n':  return '\n';
        case 't':  return '\t';
        case 'r':  return '\r';
        case '\\': return '\\';
        case '"':  return '"';
        default:   return lex->ch;
    }
}

char* readString(struct lexer* lex) {
    readChar(lex);   // consume opening "
    
    int cap = 16;
    int len = 0;
    char* buf = malloc(cap);
    
    while (lex->ch != '"' && lex->ch != 0) {
        char c;
        if (lex->ch == '\\') {
            c = readEscape(lex);   // lex->ch now points at the escape char (e.g. 'n')
        } else {
            c = lex->ch;
        }
        
        if (len + 1 >= cap) {
            cap *= 2;
            buf = realloc(buf, cap);
        }
        buf[len++] = c;
        readChar(lex);
    }
    
    buf[len] = '\0';
    
    if (lex->ch == '"') {
        readChar(lex);   // consume closing "
    }
    
    return buf;
}

struct token next(struct lexer* lex){
    struct token tok;
    tok.next = NULL;
    skipWhitespace(lex);
    
    switch (lex->ch) {
        case '=':
            if (peekChar(lex) == '=') {
                readChar(lex);
                tok.type = TOK_EQEQUAL;
                tok.literal = strdup("==");
            } else {
                tok.type = TOK_EQUAL;
                tok.literal = strdup("=");
            }
            break;
        case '!':
            if (peekChar(lex) == '=') {
                readChar(lex);
                tok.type = TOK_NOTEQUAL;
                tok.literal = strdup("!=");
            } else {
                tok.type = TOK_ERROR;
                tok.literal = strdup("!");
            }
            break;
        case '<':
            if (peekChar(lex) == '=') {
                readChar(lex);
                tok.type = TOK_LTE;
                tok.literal = strdup("<=");
            } else {
                tok.type = TOK_LT;
                tok.literal = strdup("<");
            }
            break;
        case '>':
            if (peekChar(lex) == '=') {
                readChar(lex);
                tok.type = TOK_GTE;
                tok.literal = strdup(">=");
            } else {
                tok.type = TOK_GT;
                tok.literal = strdup(">");
            }
            break;
        case '#':
            while (lex->ch != '\n' && lex->ch != 0) {
                readChar(lex);
            }
            return next(lex);
        case '+': tok.type = TOK_PLUS;      tok.literal = strdup("+"); break;
        case '-': tok.type = TOK_MINUS;     tok.literal = strdup("-"); break;
        case '*': tok.type = TOK_STAR;      tok.literal = strdup("*"); break;
        case '/': tok.type = TOK_SLASH;     tok.literal = strdup("/"); break;
        case '(': tok.type = TOK_LPAREN;    tok.literal = strdup("("); break;
        case ')': tok.type = TOK_RPAREN;    tok.literal = strdup(")"); break;
        case '{': tok.type = TOK_LBRACE;    tok.literal = strdup("{"); break;
        case '}': tok.type = TOK_RBRACE;    tok.literal = strdup("}"); break;
        case ';': tok.type = TOK_SEMICOLON; tok.literal = strdup(";"); break;
        case ',': tok.type = TOK_COMMA;     tok.literal = strdup(","); break;
        case 0:
            tok.type = TOK_EOF;
            tok.literal = strdup("");
            break;
        case '"':
            tok.type = TOK_STRING_LIT;
            tok.literal = readString(lex);
            return tok;   // readString already advanced past closing "
        default:
            if (isLetter(lex->ch)) {
                tok.literal = readIdentifier(lex);
                tok.type = lookupKeyword(tok.literal);
            } else if (isDigit(lex->ch)) {
                tok.literal = readNumber(lex);
                tok.type = TOK_INT_LIT;
            } else {
                tok.type = TOK_ERROR;
                tok.literal = strdup("");
                readChar(lex);
            }
            return tok;
    }
    
    readChar(lex);
    return tok;
}