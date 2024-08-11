import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import { Amplify } from 'aws-amplify';

// Configure Amplify with your AWS exports
Amplify.configure(awsExports);

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    // Subscribe to changes in the Todo data
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });

    // Clean up subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      client.models.Todo.create({ content });
    }
  }

  return (
    <AmplifyProvider>
      <Authenticator>
        {({ signOut }) => (
          <main>
            <h1>My todos</h1>
            <button onClick={createTodo}>+ new</button>
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>{todo.content}</li>
              ))}
            </ul>
            <button onClick={signOut}>Sign out</button>
            <div>
              🥳 App successfully hosted. Try creating a new todo.
              <br />
              <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
                Review next step of this tutorial.
              </a>
            </div>
          </main>
        )}
      </Authenticator>
    </AmplifyProvider>
  );
}

export default App;
