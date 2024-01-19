import styled from "styled-components";

export const BoxForScore = styled.div`
  display: flex;
  justify-content: center;
  gap: 120px;
  padding: 20px 0;
`;

export const ScoreDot = styled.span`
  background-color: ${(props) => props.color};
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-weight: 700;
`;

export const GridBox = styled.div`
  display: flex;
  border: 1px solid #187498;
  padding: 8px;
  background-color: #187498;
  border-radius: 5%;
`;

export const GridCell = styled.div`
  cursor: pointer;
  width: 70px;
  height: 70px;
  padding: 5px 8px;
  border: 3px solid #187498;
  border-radius: 50%;
  background-color: ${({ cell }) =>
    cell === "R" ? "#EB5353" : cell === "Y" ? "#F9D923" : "white"};
`;

export const CurrentPlayerText = styled.h3`
  padding: 10px 0;
  color: ${(props) =>
    props.player === "R"
      ? "#EB5353"
      : props.player === "Y"
      ? "#F9D923"
      : "inherit"};
`;

export const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Button = styled.button`
  color: #36ae7c;
`;

export const RowButton = styled.button`
  font-size: 14px;
  padding: 5px 8px;
`;
