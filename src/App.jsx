
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper
} from "@mui/material";

function App() {
  const [board, setBoard] = useState([
    "", "", "",
    "", "", "",
    "", "", ""
  ]);

  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWinner = (newBoard) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;

      if (
        newBoard[a] !== "" &&
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }

    return null;
  };

  const handleClick = (index) => {
    // Don't allow moves after the game ends
    if (winner || board[index] !== "") {
      return;
    }

    const newBoard = [...board];

    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    // winner
    const gameWinner = checkWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      return;
    }

    //  draw
    if (newBoard.every((square) => square !== "")) {
      setWinner("Draw");
      return;
    }

    // Switch players
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  // Restart
  const restartGame = () => {
    setBoard([
      "", "", "",
      "", "", "",
      "", "", ""
    ]);

    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <Container maxWidth="sm">

      <Paper
        elevation={4}
        sx={{
          mt: 5,
          p: 4,
          borderRadius: 4,
          textAlign: "center"
        }}
      >

        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2
          }}
        >
          Tic-Tac-Toe
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: 3 }}
        >
          {winner
            ? winner === "Draw"
              ? "It's a Draw!"
              : `Player ${winner} Wins!`
            : `Player ${currentPlayer}'s Turn`}
        </Typography>

        {/* Game Board */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 100px)",
            justifyContent: "center",
            gap: 1,
            mb: 3
          }}
        >

          {board.map((value, index) => (

            <Button
              key={index}
              variant="outlined"
              onClick={() => handleClick(index)}
              sx={{
                width: 100,
                height: 100,
                fontSize: 36,
                fontWeight: "bold",
                borderWidth: 2,
                color:
                  value === "X"
                    ? "#1976d2"
                    : "#e91e63",
                borderColor: "#bdbdbd",
                "&:hover": {
                  borderWidth: 2,
                  backgroundColor: "#f5f5f5"
                }
              }}
            >
              {value}
            </Button>

          ))}

        </Box>

        {/* Restart Button */}

        <Button
          variant="contained"
          onClick={restartGame}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: 16
          }}
        >
          Restart Game
        </Button>

      </Paper>

    </Container>
  );
}

export default App;
