import Modal from "react-modal";
import PropTypes from "prop-types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
};

const RulesComponent = () => {
  return (
    <>
      <div style={{ color: "black" }}>
        <h2>Doddlly-Boodly</h2>
        <span>
          Be the first to align four of your colored chips in a row —
          horizontally, vertically, or diagonally.
        </span>
        <ul style={{ textAlign: "left" }}>
          <li>
            Players take turns dropping one of their colored discs into a column
            of their choice.
          </li>
          <li>
            A disc can be dropped into any column that is not already full.
          </li>
          <li>
            The disc will occupy the lowest available space within the column.
          </li>
          <li>
            The game continues back and forth until one player reaches more
            collected lines of four discs or there are no more moves available.
          </li>
        </ul>
      </div>
    </>
  );
};

// const WinComponent = (winner, winnerResult, loser, loserResult) => {
//   return (
//     <>
//       <div>
//         {winner} reach {winnerResult}
//         {loser} reach {loserResult}
//       </div>
//     </>
//   );
// };

export const IModal = ({
  isOpen,
  onClose,
  rulesContent,
  winContent,
  buttonContent,
  winner,
  winnerResult,
  loser,
  loserResult,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div style={{ display: "flex" }}>
        {rulesContent && <RulesComponent />}
        {winContent && (
          <span style={{ color: "black" }}>
            {winner} reach {winnerResult}
            <br />
            {loser} reach {loserResult}
          </span>
        )}

        <button onClick={onClose}>{buttonContent}</button>
      </div>
    </Modal>
  );
};

IModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  buttonContent: PropTypes.node.isRequired,
  rulesContent: PropTypes.bool,
  winContent: PropTypes.bool,
  winner: PropTypes.number,
  winnerResult: PropTypes.number,
  loser: PropTypes.number,
  loserResult: PropTypes.number,
};

IModal.defaultProps = {
  rulesContent: null,
  winContent: null,
};
