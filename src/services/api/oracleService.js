import oracleCardsData from "@/services/mockData/oracleCards.json";

class OracleService {
  constructor() {
    this.cards = [...oracleCardsData];
  }

  async getRandomCard() {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    return { ...this.cards[randomIndex] };
  }

  async getAllCards() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.cards.map(card => ({ ...card }));
  }

  async getCardsByArchetype(archetype) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.cards
      .filter(card => card.archetype.toLowerCase().includes(archetype.toLowerCase()))
      .map(card => ({ ...card }));
  }
}

export default new OracleService();