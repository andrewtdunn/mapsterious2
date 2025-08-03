"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

function deleteToDo(id: string) {
  client.models.Todo.delete({ id });
}

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [locations, setLocations] = useState<Array<Schema["Location"]["type"]>>(
    []
  );

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  function listLocations() {
    client.models.Location.observeQuery().subscribe({
      next: (data) => setLocations([...data.items]),
    });
  }

  useEffect(() => {
    //listTodos();
    listLocations();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  const { signOut, user } = useAuthenticator();

  return (
    <main>
      <h1>{user.signInDetails?.loginId}'s todos and all Locations</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteToDo(todo.id)} key={todo.id}>
            {todo.content}
          </li>
        ))}
      </ul>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}
