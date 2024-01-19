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

const WinComponent = ({ playerLines }) => {
  let winner = null;
  let maxScore = Math.max(...Object.values(playerLines));

  Object.keys(playerLines).forEach((key) => {
    if (playerLines[key] === maxScore) winner = key;
  });

  return (
    <>
      <div style={{ color: "black" }}>
        Congratulations, <b>{winner}</b>!
        <p>
          You won with score <b>{maxScore}</b>
        </p>
      </div>
    </>
  );
};

export const IModal = ({
  isOpen,
  onClose,
  rulesContent,
  winContent,
  buttonContent,
  playerLines,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {rulesContent && <RulesComponent />}
        {winContent && <WinComponent playerLines={playerLines} />}
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
  playerLines: PropTypes.object,
};

IModal.defaultProps = {
  rulesContent: null,
  winContent: null,
};

WinComponent.propTypes = {
  playerLines: PropTypes.object,
};
