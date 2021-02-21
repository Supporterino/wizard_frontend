import { removeElement } from './arrayLogic';
import { Card } from './card';

export class Player {
    private hand: Array<Card>;
    private id: string;
    private hit: number;

    constructor(inID: string) {
        this.id = inID;
        this.hand = new Array<Card>();
        this.hit = 0;
    }

    addHit(): void {
        this.hit++;
    }

    pullHit(): number {
        const temp = this.hit;
        this.hit = 0;
        return temp;
    }

    getHitCounter(): number {
        return this.hit;
    }

    getHand(): Array<Card> {
        return this.hand;
    }

    receiveCard(card: Card): void {
        this.hand.push(card);
    }

    playCard(card: Card): Card {
        return removeElement(this.hand, card);
    }

    getID(): string {
        return this.id;
    }

    toString(): string {
        let output = `Player{id: ${this.id}, hit: ${this.hit}, hand:[ \n`;
        for (const card of this.hand) {
            output += `\t ${card.toString()} \n`;
        }
        output += ']}';
        return output;
    }
}
