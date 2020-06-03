import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid red;
`;

const Title = styled.h1`
  color: gray;
`;

const Button = styled.button`
  background-color: ${(props) => (props.success ? "green" : "red")};
`;

const App = () => {
  const [isActive, toggleActive] = useState(false);
  const [initialTime, setInitialTime] = useState(0);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setInitialTime((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && initialTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, initialTime]);

  const handleReset = () => {
    toggleActive(false);
    setInitialTime(0);
  };
  const handleRecord = () => {
    setTimes((prev) => [...prev, initialTime]);
  };

  return (
    <Container>
      <Title>Timer: {initialTime}</Title>
      <Button success onClick={() => toggleActive((prev) => !prev)}>
        {isActive ? "Pause" : "Start"}
      </Button>
      <Button danger onClick={handleReset}>
        Reset
      </Button>
      {isActive && initialTime !== 0 ? (
        <Button onClick={handleRecord} success>
          Record
        </Button>
      ) : null}
      {times.length > 0 ? (
        <ul>{times.map((time) => <li>{time}</li>)}</ul>
      ) : null}
    </Container>
  );
};

export default App;
