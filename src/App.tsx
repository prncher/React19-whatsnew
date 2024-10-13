/**
 * Copyright (C) 2024-present Prince Cheruvathur
 * 
 * This program is free software: you can redistribute it 
 * and/or modify it under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 
 * of the License, or (at your option) any later version. 
 *
 */
import React from 'react';
import CheckVersion from './Actions';
import CheckVersionWithForm from './FormAction';
import { CommentsSection } from './CommentsContext';
import Suspensed from './Suspensed';

function App() {
  return (
    <div className="App-header">
      <Suspensed />
      <CheckVersion />
      <CheckVersionWithForm />
      <CommentsSection />
    </div>
  );
}

export default App;
