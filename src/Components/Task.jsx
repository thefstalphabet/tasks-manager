import React from "react";
import styled from "styled-components";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import {db} from '../firebase';

export default function Task(props) {
  // Function to upadte progress about task
  const handleProgressChange = async (id, progress) => {
    const taskDocRef = doc(db, 'tasks', id)
    const value = (progress) ? false : true
    try{
      await updateDoc(taskDocRef, {
        progress: value
      })
    } catch (err) {
      alert(err)
    }
  }
  // Function to delete the task
  const handleDelete = async (id) => {
    const taskDocRef = doc(db, "tasks", id)
    try{
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }
  return (
    <>
      {props.content.map((ele) => {
        return (
          <Container>
            <h2>{ele.data.title}</h2>
            <p>{ele.data.description}</p>
            <span>
              {new Date(ele.data.created.seconds * 1000).toLocaleDateString(
                "en-US"
              )}
            </span>
            <div>
              <DeleteBtn onClick={() => handleDelete(ele.id)}>Delete</DeleteBtn>
              <input 
              type="checkbox" 
              name="checkbox"
              checked={ele.data.progress}
              onChange={() => handleProgressChange(ele.id, ele.data.progress)}
              />
            </div>
          </Container>
        );
      })}
    </>
  );
}
// Styling
const Container = styled.div`
  margin-bottom: 10px;
  h2 {
    font-size: 18px;
    font-weight: 600;
  }
  p {
    font-size: 14px;
  }
  span {
    font-size: 14px;
    color: #7e7e7e;
  }
`;
const DeleteBtn = styled.button`
  padding: 5px;
  background-color: #ffc312;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 5px 10px 5px 0;
`;