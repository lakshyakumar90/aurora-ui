"use client";

import { Sandpack } from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

// Default React component code
const defaultCode = `export default function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com' }
  ]);
  
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const addUser = useCallback(() => {
    if (newUser.name && newUser.email) {
      console.log('Adding new user:', newUser);
      setUsers(prev => [...prev, {
        id: Date.now(),
        name: newUser.name,
        email: newUser.email
      }]);
      setNewUser({ name: '', email: '' });
    }
  }, [newUser]);

  const removeUser = useCallback((id) => {
    console.log('Removing user:', id);
    setUsers(prev => prev.filter(user => user.id !== id));
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: 0, color: '#333', fontSize: '2rem' }}>
            User Management App
          </h1>
        </div>

        {/* Counter Example */}
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '30px'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Counter Example</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button
              onClick={() => setCount(count - 1)}
              style={{
                padding: '8px 16px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              -
            </button>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
              {count}
            </span>
            <button
              onClick={() => setCount(count + 1)}
              style={{
                padding: '8px 16px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '20px',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e1e5e9',
              borderRadius: '10px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>

        {/* Add User Form */}
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '30px'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Add New User</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <button
              onClick={addUser}
              disabled={!newUser.name || !newUser.email}
              style={{
                padding: '10px 20px',
                background: (!newUser.name || !newUser.email) ? '#ccc' : '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: (!newUser.name || !newUser.email) ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >
              Add User
            </button>
          </div>
        </div>

        {/* Users List */}
        <div>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>
            Users ({filteredUsers.length})
          </h3>
          {filteredUsers.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#666'
            }}>
              {searchTerm ? 'No users found matching your search.' : 'No users yet.'}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredUsers.map(user => (
                <div
                  key={user.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px',
                    background: 'white',
                    borderRadius: '10px',
                    border: '1px solid #e1e5e9',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      marginRight: '15px'
                    }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#333' }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeUser(user.id)}
                    style={{
                      padding: '8px',
                      background: '#ff4757',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}`;

export function SandpackPlayground() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Playground...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <Sandpack
        template="react"
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        options={{
          showNavigator: false,
          showRefreshButton: true,
          showTabs: true,
          showLineNumbers: true,
          editorHeight: '100vh',
          editorWidthPercentage: 50,
          wrapContent: true,
          resizablePanels: true,
          closableTabs: false,
          initMode: 'lazy',
          autorun: true,
          autoReload: true,
          showConsole: true,
          showConsoleButton: true,
          showInlineErrors: true,
          showReadOnly: false,
        }}
        files={{
          "/App.js": {
            code: defaultCode,
            active: true,
          },
          "/components/UserCard.js": {
            code: `import React from 'react';

export function UserCard({ user, onDelete }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px',
      background: 'white',
      borderRadius: '10px',
      border: '1px solid #e1e5e9',
      transition: 'transform 0.2s, box-shadow 0.2s',
      marginBottom: '10px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          marginRight: '15px'
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: '600', color: '#333' }}>
            {user.name}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            {user.email}
          </div>
        </div>
      </div>
      <button
        onClick={() => onDelete(user.id)}
        style={{
          padding: '8px',
          background: '#ff4757',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </div>
  );
}`,
          },
          "/hooks/useUsers.js": {
            code: `import { useState, useCallback, useMemo } from 'react';

export function useUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com' }
  ]);

  const addUser = useCallback((userData) => {
    const newUser = {
      id: Date.now(),
      ...userData
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  }, []);

  const removeUser = useCallback((id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  }, []);

  const searchUsers = useCallback((searchTerm) => {
    return useMemo(() => {
      return users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [users, searchTerm]);
  }, [users]);

  return {
    users,
    addUser,
    removeUser,
    searchUsers
  };
}`,
          },
          "/index.js": {
            code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
            hidden: true,
          },
          "/public/index.html": {
            code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Playground</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
            hidden: true,
          },
        }}
        customSetup={{
          dependencies: {
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "lucide-react": "^0.263.1",
            "date-fns": "^2.30.0",
            "lodash": "^4.17.21",
            "uuid": "^9.0.0",
          },
        }}
      />
    </div>
  );
}
