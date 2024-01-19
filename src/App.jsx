import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./App.css";
import {
  BoxForScore,
  ScoreDot,
  GridBox,
  GridCell,
  CurrentPlayerText,
  ButtonsBox,
  Button,
  RowButton,
} from "./styles/MainStyles";

import {
  countHorizontalLines,
  countVerticalLines,
  countDiagonalLines,
} from "./utils/utils";
import { IModal } from "./components/Modal";

Modal.setAppElement("#root");

function App() {
  const emptyGrid = Array(7)
    .fill("")
    .map(() => Array(6).fill("E"));

  const [playerLines, setPlayerLines] = useState({ R: 0, Y: 0 });
  const [currentPlayer, setCurrentPlayer] = useState("R");
  const [grid, setGrid] = useState(emptyGrid);
  const [gameOver, setGameOver] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);

  useEffect(() => {
    const redLines =
      countHorizontalLines(grid, "R") +
      countVerticalLines(grid, "R") +
      countDiagonalLines(grid, "R");

    const yellowLines =
      countHorizontalLines(grid, "Y") +
      countVerticalLines(grid, "Y") +
      countDiagonalLines(grid, "Y");

    setPlayerLines({ R: redLines, Y: yellowLines });

    if (gameOver) {
      setIsGameOverModalOpen(true);
    }

    const isFull = grid.every((row) => row.every((cell) => cell !== "E"));
    if (isFull) {
      setGameOver(true);
    }
  }, [grid, gameOver]);

  const placeChips = (row) => {
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

      newGrid[row][suitableCell] = currentPlayer;

      setCurrentPlayer(currentPlayer === "R" ? "Y" : "R");
      return newGrid;
    });
  };

  const handleClose = () => {
    setIsRulesModalOpen(false);
  };

  const resetGame = () => {
    setGrid(emptyGrid.map((row) => [...row]));

    // setGrid(emptyGrid);
    setCurrentPlayer("R");
    setGameOver(false);
    setIsGameOverModalOpen(false);
  };

  return (
    <>
      <div>
        <h1>doddly-boodly</h1>
        <BoxForScore>
          <ScoreDot color="#EB5353">{playerLines.R}</ScoreDot>
          <ScoreDot color="#F9D923">{playerLines.Y}</ScoreDot>
        </BoxForScore>
        <div>
          <GridBox>
            {grid.map((row, rowIndex) => {
              return (
                <div key={`row${rowIndex}`}>
                  <RowButton onClick={() => placeChips(rowIndex)}>
                    row: {rowIndex + 1}
                  </RowButton>
                  <br />
                  <br />
                  {row.map((cell, cellIndex) => {
                    return (
                      <GridCell
                        onClick={() => placeChips(rowIndex)}
                        key={`cell${cellIndex}`}
                        cell={cell}
                      >
                        {cell !== "E" ? " " : null}
                      </GridCell>
                    );
                  })}
                </div>
              );
            })}
          </GridBox>
          <div>
            <CurrentPlayerText player={currentPlayer}>
              Current Player: {currentPlayer}
            </CurrentPlayerText>
          </div>
        </div>
        <ButtonsBox>
          <Button onClick={resetGame}>Reset Game</Button>
          <Button onClick={() => setIsRulesModalOpen(true)}>Game Rules</Button>
          <IModal
            isOpen={isRulesModalOpen}
            onClose={handleClose}
            buttonContent={"Close"}
            rulesContent={true}
          />
          <IModal
            isOpen={isGameOverModalOpen}
            onClose={resetGame}
            buttonContent={"Play Again"}
            winContent={true}
            playerLines={playerLines}
          />
        </ButtonsBox>
      </div>
    </>
  );
}

export default App;
