"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { MapComponent } from "@/components/map/map";
import { getServerSideProps } from "next/dist/build/templates/pages";

Amplify.configure(outputs);

const client = generateClient<Schema>();

import "@/styles.scss";

function deleteToDo(id: string) {
  client.models.Todo.delete({ id });
}

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [locations, setLocations] = useState<Array<Schema["Location"]["type"]>>(
    []
  );

  const [filteredLocation, setFilteredLocations] = useState<
    Array<Schema["Location"]["type"]>
  >([]);

  function listLocations() {
    client.models.Location.observeQuery().subscribe({
      next: (data) => {
        console.log(data);
        setLocations([...data.items]);
      },
    });
  }

  useEffect(() => {
    listLocations();
  }, []);

  // function createTodo() {
  //   client.models.Todo.create({
  //     content: window.prompt("Todo content"),
  //   });
  // }

  const { signOut, user } = useAuthenticator();

  return (
    <main>
      {locations && locations.length}
      <MapComponent locations={locations} />
    </main>
  );
}
