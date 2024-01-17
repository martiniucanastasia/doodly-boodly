import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const emptyGrid = Array(7)
    .fill("")
    .map(() => Array(6).fill("E"));

  // TODO: move the state into the localStorage
  const [grid, setGrid] = useState(emptyGrid);
  const [currentPlayer, setCurrentPlayer] = useState("R");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Check for win or draw conditions
    // Update gameOver state if necessary
    // Check for the current player's turn
    const isFull = grid.every((row) => row.every((cell) => cell !== "E"));
    if (isFull) {
      setGameOver(true);
      // TODO: add modal instead of alert
      setTimeout(() => {
        resetGame();
      }, 1000);
    }
  }, [grid]);

  // Function to place a disc in a column
  function placeDisc(row) {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];

      // Magic function
      const suitableCell = newGrid[row].reduceRight((acc, cell, index) => {
        if (cell === "E" && acc === -1) {
          return index;
        }
        return acc;
      }, -1);

      if (suitableCell === -1) {
        return newGrid;
      }

      console.log("rendered", suitableCell);

      newGrid[row][suitableCell] = currentPlayer;

      setCurrentPlayer(currentPlayer === "R" ? "Y" : "R");
      return newGrid;
    });
  }

  // Reset the game
  function resetGame() {
    setGrid(emptyGrid);
    setCurrentPlayer("R");
    setGameOver(false);
  }

  return (
    <>
      <div>
        <h1>doddly-boodly</h1>
        <div>
          <div
            style={{
              display: "flex",
              border: "1px solid royalblue",
              padding: "0.5rem",
              backgroundColor: "royalblue",
            }}
          >
            {grid.map((row, rowIndex) => {
              return (
                <div key={`row${rowIndex}`}>
                  <button
                    onClick={() => placeDisc(rowIndex)}
                    style={{
                      fontSize: "10px",
                      padding: "0.25rem 0.5rem",
                      border: "0.5px solid purple",
                    }}
                  >
                    row:{rowIndex}
                  </button>
                  <br />
                  <br />
                  {row.map((cell, cellIndex) => {
                    return (
                      <div
                        key={`cell${cellIndex}`}
                        style={{
                          width: "25px",
                          height: "25px",
                          padding: "0.25rem 0.5rem",
                          border: "3px solid royalblue",
                          backgroundColor:
                            cell === "R" && cell !== "E"
                              ? "red"
                              : cell === "Y" && cell !== "E"
                              ? "yellow"
                              : "white",
                          borderRadius: "50%",
                        }}
                      >
                        {cell !== "E" ? cell : null}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div>
            <h3
              style={{
                color:
                  currentPlayer === "R" && currentPlayer !== "E"
                    ? "red"
                    : currentPlayer === "Y" && currentPlayer !== "E"
                    ? "yellow"
                    : null,
              }}
            >
              Current Player: {currentPlayer}
            </h3>
          </div>
        </div>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </>
  );
}

export default App;
