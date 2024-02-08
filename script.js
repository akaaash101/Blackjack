$(document).ready(function() {
    let deck = [];
    let playerHand = [];
    let dealerHand = [];
    let playerScore = 0;
    let dealerScore = 0;
    let gameOver = false; 
  
    function createDeck() {
      let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
      let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      for (let suit of suits) {
        for (let value of values) {
          deck.push({suit, value});
        }
      }
    }
  
    function shuffleDeck() {
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
    }
  
    function dealInitialCards() {
      playerHand.push(drawCard());
      dealerHand.push(drawCard());
      playerHand.push(drawCard());
      dealerHand.push(drawCard());
    }
  
    function drawCard() {
      return deck.pop();
    }
  
    function calculateHandValue(hand) {
      let value = 0;
      let hasAce = false;
      for (let card of hand) {
        if (card.value === 'A') {
          hasAce = true;
        }
        if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
          value += 10;
        } else if (card.value === 'A') {
          value += 11;
        } else {
          value += parseInt(card.value);
        }
      }
      if (hasAce && value > 21) {
        value -= 10;
      }
      return { total: value, outOf21: value <= 21 ? value : 0 };
    }
  
    function displayCards(hand, element, scoreElement) {
      $(element).empty();
      for (let card of hand) {
        $(element).append(`<div class="card">${card.value} of ${card.suit}</div>`);
      }
      $(scoreElement).text(`Total: ${calculateHandValue(hand).outOf21}`);
    }
  
    function displayResult() {
      let resultText;
      if (playerScore > 21) {
        resultText = 'Player busts! Dealer wins.';
      } else if (dealerScore > 21) {
        resultText = 'Dealer busts! Player wins.';
      } else if (playerScore === 21 && dealerScore === 21) {
        resultText = 'It\'s a tie!';
      } else if (playerScore === dealerScore) {
        resultText = 'It\'s a tie!';
      } else if (playerScore > dealerScore) {
        resultText = 'Player wins!';
      } else {
        resultText = 'Dealer wins!';
      }
      $('#result').text(resultText);
      gameOver = true;
      $('#hit-button, #stand-button').prop('disabled', true);
      $('#start-button').show();
    }
  
    function resetGame() {
      deck = [];
      playerHand = [];
      dealerHand = [];
      playerScore = 0;
      dealerScore = 0;
      gameOver = false;
      $('#result').empty();
      $('#player-cards, #dealer-cards').empty();
      $('#player-score').text('Total: 0');
      $('#dealer-score').text('Total: 0');
      $('#start-button').hide();
      $('#hit-button, #stand-button').prop('disabled', false);
      startGame();
    }
  
    function startGame() {
      createDeck();
      shuffleDeck();
      dealInitialCards();
      displayCards(playerHand, '#player-cards', '#player-score');
      displayCards(dealerHand, '#dealer-cards', '#dealer-score');
      playerScore = calculateHandValue(playerHand).total;
      dealerScore = calculateHandValue(dealerHand).total;
    }
  
    $('#start-button').click(function() {
      resetGame();
    });
  
    $('#hit-button').click(function() {
      if (!gameOver) {
        playerHand.push(drawCard());
        displayCards(playerHand, '#player-cards', '#player-score');
        playerScore = calculateHandValue(playerHand).total;
        if (playerScore > 21) {
          displayResult();
        }
      }
    });
  
    $('#stand-button').click(function() {
      if (!gameOver) {
        while (dealerScore < 17) {
          dealerHand.push(drawCard());
          dealerScore = calculateHandValue(dealerHand).total;
          displayCards(dealerHand, '#dealer-cards', '#dealer-score');
        }
        displayResult();
      }
    });
  
    startGame();
  });
  
