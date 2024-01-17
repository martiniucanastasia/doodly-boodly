import { useEffect, useState } from "react";
import {
  countHorizontalLines,
  countVerticalLines,
  countDiagonalLines,
} from "./utils/utils";
import "./App.css";

function App() {
  const emptyGrid = Array(7)
    .fill("")
    .map(() => Array(6).fill("E"));

  // TODO: move the state into the localStorage
  const [playerLines, setPlayerLines] = useState({ R: 0, Y: 0 });
  const [grid, setGrid] = useState(emptyGrid);
  const [currentPlayer, setCurrentPlayer] = useState("R");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Check for win or draw conditions
    // Update gameOver state if necessary
    // Check for the current player's turn

    const redLines =
      countHorizontalLines(grid, "R", 4) +
      countVerticalLines(grid, "R", 4) +
      countDiagonalLines(grid, "R", 4);

    const yellowLines =
      countHorizontalLines(grid, "Y", 4) +
      countVerticalLines(grid, "Y", 4) +
      countDiagonalLines(grid, "Y", 4);

    console.log("check");
    setPlayerLines({ R: redLines, Y: yellowLines });

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
        <h1 style={{ margin: 0 }}>doddly-boodly</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "120px",
            padding: "20px 0",
          }}
        >
          <span
            style={{
              backgroundColor: "#EB5353",
              width: "100px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              fontWeight: "700",
            }}
          >
            {playerLines.R}
          </span>
          <span
            style={{
              backgroundColor: "#F9D923",
              width: "100px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              fontWeight: "700",
            }}
          >
            {playerLines.Y}
          </span>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              border: "1px solid #187498",
              padding: "0.5rem",
              backgroundColor: "#187498",
              borderRadius: "5%",
            }}
          >
            {grid.map((row, rowIndex) => {
              return (
                <div key={`row${rowIndex}`}>
                  <button
                    onClick={() => placeDisc(rowIndex)}
                    style={{
                      fontSize: "12px",
                      padding: "0.25rem 0.5rem",
                    }}
                  >
                    row: {rowIndex + 1}
                  </button>
                  <br />
                  <br />
                  {row.map((cell, cellIndex) => {
                    return (
                      <div
                        onClick={() => placeDisc(rowIndex)}
                        key={`cell${cellIndex}`}
                        style={{
                          cursor: "pointer",
                          width: "70px",
                          height: "70px",
                          padding: "0.25rem 0.5rem",
                          border: "3px solid #187498",
                          backgroundColor:
                            cell === "R" && cell !== "E"
                              ? "#EB5353"
                              : cell === "Y" && cell !== "E"
                              ? "#F9D923"
                              : "white",
                          borderRadius: "50%",
                        }}
                      >
                        {/* cel */}
                        {cell !== "E" ? " " : null}
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
                    ? "#EB5353"
                    : currentPlayer === "Y" && currentPlayer !== "E"
                    ? "#F9D923"
                    : null,
              }}
            >
              Current Player: {currentPlayer}
            </h3>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button onClick={resetGame} style={{ color: "#36AE7C" }}>
            Reset Game
          </button>
          <button
            onClick={() => console.log("Modal")}
            style={{ color: "#36AE7C" }}
          >
            Game Rules
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
