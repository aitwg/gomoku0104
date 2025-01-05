const boardSize = 15;
    const board = [];
    let currentPlayer = 'black';
    let gameOver = false;

    const statusElement = document.getElementById('status');
    const resetButton = document.getElementById('reset');

    function createBoard() {
      const boardElement = document.getElementById('board');
      for (let row = 0; row < boardSize; row++) {
        board[row] = [];
        for (let col = 0; col < boardSize; col++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.row = row;
          cell.dataset.col = col;
          cell.addEventListener('click', handleCellClick);
          boardElement.appendChild(cell);
          board[row][col] = '';
        }
      }
    }

    function handleCellClick(event) {
      if (gameOver) return;

      const cell = event.target;
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);

      if (board[row][col] !== '') return;

      board[row][col] = currentPlayer;
      cell.classList.add(currentPlayer);

      if (checkWin(row, col)) {
        statusElement.textContent = `${currentPlayer.toUpperCase()} wins!`;
        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
      statusElement.textContent = `${currentPlayer.toUpperCase()}'s turn`;
    }

    function checkWin(row, col) {
      const directions = [
        [1, 0], // vertical
        [0, 1], // horizontal
        [1, 1], // diagonal down-right
        [1, -1] // diagonal down-left
      ];

      for (const [dx, dy] of directions) {
        let count = 1;

        // Check in positive direction
        let x = row + dx;
        let y = col + dy;
        while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === currentPlayer) {
          count++;
          x += dx;
          y += dy;
        }

        // Check in negative direction
        x = row - dx;
        y = col - dy;
        while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === currentPlayer) {
          count++;
          x -= dx;
          y -= dy;
        }

        if (count >= 5) return true;
      }

      return false;
    }

    function resetGame() {
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
        cell.className = 'cell';
      });
      board.forEach(row => row.fill(''));
      currentPlayer = 'black';
      gameOver = false;
      statusElement.textContent = "BLACK's turn";
    }

    resetButton.addEventListener('click', resetGame);

    createBoard();
    statusElement.textContent = "BLACK's turn";
