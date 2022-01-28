import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div>
    <div className="container-fluid p-2 bg-primary text-white text-center">
      <h1>Start New Coding again</h1>
      <p>Resize this responsive page to see the effect!</p>
    </div>
    <div class="container mt-5">
      <Button variant="primary">Primary</Button>{' '}
      <Button variant="secondary">Secondary</Button>{' '}
      <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
      <Button variant="link">Link</Button>
    </div>
  </div>
  );
}

export default App;
