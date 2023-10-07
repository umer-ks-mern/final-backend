// Client-side code (e.g., in a web browser)

const ws = new WebSocket('ws://localhost:3000'); // Connect to the WebSocket server

ws.onopen = (event) => {
  // WebSocket connection is open
  console.log('WebSocket connection opened:', event);
};

ws.onmessage = (event) => {
  // Handle incoming WebSocket messages
  const data = JSON.parse(event.data);
  console.log('Received WebSocket message:', data);
};

ws.onclose = (event) => {
  // WebSocket connection is closed
  console.log('WebSocket connection closed:', event);
};

// Sending a message to the server
ws.send(JSON.stringify({ type: 'chat', content: 'Hello, server!' }));


