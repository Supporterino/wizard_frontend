export class Card {
    private color: string;
    private char: string;

    constructor(col: string, cha: string) {
        this.color = col;
        this.char = cha;
    }

    getColor(): string {
        return this.color;
    }

    getChar(): string {
        return this.char;
    }

    toString(): string {
        return `Card{color:"${this.color}", char:"${this.char}"}`;
    }
}
