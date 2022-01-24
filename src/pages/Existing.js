import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

import { listTodos } from "../graphql/queries";

const Existing = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  return (
    <>
      {todos.map((todo, index) => (
        <div key={todo.id ? todo.id : index}>
          <p>{todo.headline}</p>
          <p>{todo.category}</p>
          <p>{todo.date}</p>
          <p>{todo.article}</p>
        </div>
      ))}
    </>
  );
};

export default Existing;
