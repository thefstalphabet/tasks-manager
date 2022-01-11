import { React, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function AddModal(props) {
  // State for task data
  const [title, setTitle] = useState("");
  const [description, setDescriptin] = useState("");
  // Function which create a task on database
  const createTask = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        title: title,
        description: description,
        created: Timestamp.now(),
        progress: false,
      });
      props.function(); // Closing the Add modal
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Container>
      <Popup>
        <Header>
          <h2>Add Task</h2>
          <img
            src="/Assets/close-icon.svg"
            onClick={() => props.function()}
            alt="close-icon"
          />
        </Header>
        <Body onSubmit={createTask}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescriptin(e.target.value)}
          />
          <br />
          <Button type="submit">Done</Button>
        </Body>
      </Popup>
    </Container>
  );
}
// Styling
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  color: black;
  background-color: rgba(0, 0, 0, 0.5);
  animation: 1s;
`;
const Popup = styled.div`
  width: 100%;
  max-width: 522px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 20%;
  margin: 0 auto;
  padding: 20px;
  img {
    width: 24px;
    cursor: pointer;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Body = styled.form`
  text-align: center;
  margin-top: 20px;
  input {
    padding: 10px;
    width: 100%;
    outline: none;
    font-size: 14px;
  }
  textarea {
    font-size: 14px;
    width: 100%;
    margin-top: 10px;
    height: 200px;
    resize: none;
    padding: 10px;
    outline: none;
  }
`;
const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #ffc312;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  width: 100%;
  cursor: pointer;
`;
