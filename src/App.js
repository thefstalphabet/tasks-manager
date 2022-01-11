import { React, useState, useEffect } from "react";
import styled from "styled-components";
import AddModal from "./Components/AddModal";
import Task from "./Components/Task";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export default function App() {
  // States
  // State to close or display the Add model
  const [addModalPresence, setAddModalPresence] = useState(false);
  // State for database tasks collection
  const [tasks, setTasks] = useState([]);

  // Functions
  // Function which open and close add modal
  const addHandleClick = () => {
    if (addModalPresence) {
      setAddModalPresence(false);
    } else {
      setAddModalPresence(true);
    }
  };
  // Function which take snapshot to the data base
  useEffect(() => {
    const ref = query(collection(db, "tasks"), orderBy("created", "desc"));
    onSnapshot(ref, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <Container>
      {addModalPresence && <AddModal function={addHandleClick} />}
      <Header>
        <h2>Task Manager</h2>
      </Header>
      <Body>
        <AddTaskBtn onClick={addHandleClick}>Add Task</AddTaskBtn>
        <Tasks>
          <Task content={tasks} />
        </Tasks>
      </Body>
    </Container>
  );
}
// Styling
const Container = styled.div``;
const Header = styled.div`
  background-color: #262626;
  padding: 20px 10px;
  h2 {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }
`;
const Body = styled.div`
  margin-top: 30px;
  padding: 10px;
`;
const AddTaskBtn = styled.button`
  padding: 10px;
  background-color: #ffc312;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
`;
const Tasks = styled.div`
  margin-top: 30px;
`;
