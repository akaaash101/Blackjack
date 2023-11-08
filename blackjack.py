import random

class Card:
    def __init__(self, suit, rank):
        self.suit = suit
        self.rank = rank

    def __str__(self):
        return f"{self.rank} of {self.suit}"

class Deck:
    def __init__(self):
        suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
        ranks = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"]
        self.cards = [Card(suit, rank) for suit in suits for rank in ranks]
        random.shuffle(self.cards)

    def deal_card(self):
        return self.cards.pop()

class Hand:
    def __init__(self):
        self.cards = []
        self.value = 0

    def add_card(self, card):
        self.cards.append(card)

    def calculate_value(self):
        self.value = sum(self.get_card_value(card) for card in self.cards)

    def get_card_value(self, card):
        if card.rank in ["King", "Queen", "Jack"]:
            return 10
        elif card.rank == "Ace":
            return 11 if self.value + 11 <= 21 else 1
        else:
            return int(card.rank)

def blackjack_game():
    deck = Deck()
    player_hand = Hand()
    dealer_hand = Hand()

    for _ in range(2):
        player_hand.add_card(deck.deal_card())
        dealer_hand.add_card(deck.deal_card())

    player_hand.calculate_value()
    dealer_hand.calculate_value()

    print(f"Player's hand: {', '.join(str(card) for card in player_hand.cards)}")
    print(f"Dealer's hand: {dealer_hand.cards[0]} and an unknown card")

    # Implement the game logic for player's and dealer's turns here

if __name__ == "__main__":
    blackjack_game()
