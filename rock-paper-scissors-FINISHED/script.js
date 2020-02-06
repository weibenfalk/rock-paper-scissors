// Immediately invoked function expression
// to not pollute the global scope
(function() {
  const buttons = document.querySelectorAll('.button');
  const computer = document.querySelector('.computer');
  const output = document.querySelector('.output');

  // The keys contains what the key wins over
  const combinations = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };
  // Get keys of object to be able to randomly select one
  const keys = Object.keys(combinations);
  const waitTime = 50; //ms
  const scrambleCount = 20;

  // Use promise to wait
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  const calculateWinner = (playerPick, computerPick) => {
    if (combinations[playerPick] === computerPick) {
      output.innerHTML = 'Player wins!';
    } else if (playerPick === computerPick) {
      output.innerHTML = 'Draw!';
    } else {
      output.innerHTML = 'Computer wins!';
    }
  };

  const compMove = async playerPick => {
    let computerPick = null;
    for (let i = 0; i < scrambleCount; i++) {
      await wait(waitTime);
      computerPick = keys[Math.floor(Math.random() * keys.length)];
      computer.src = `${computerPick}.png`;
    }
    calculateWinner(playerPick, computerPick);
  };

  // If we have an arrow function we can't access the button with "this".
  // But with a regular function we can. Show the difference!
  const handleClick = e => {
    // Reset all buttons
    buttons.forEach(button => (button.classList = 'button'));
    // Set class on selected button
    e.target.classList = 'button selected';
    const playerPick = e.target.dataset.type; // rock, paper or scissors from the data attribute
    compMove(playerPick);
  };

  // Add eventlisteners
  buttons.forEach(button => {
    button.addEventListener('click', handleClick);
  });
})();
