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
import FormStatus from './FormStatus';
import { DemoButton } from './StylesComps';
import OptimisticState from './OptimisticState';

type types = 'useFormStatus'|'useActionState'|
              'useTransition'|'Suspense'| 'use' | 'useOptimistic'

function App() {
  const [type, setType] = React.useState<types>('useTransition')
  return (
    <div className="App-header">
      <DemoButton onClick={() => setType('useTransition')}>useTransition Demo</DemoButton>
      <DemoButton onClick={() => setType('useActionState')}>useActionState Demo</DemoButton>
      <DemoButton onClick={() => setType('use')}>use Demo</DemoButton>
      <DemoButton onClick={() => setType('useFormStatus')}>useFormStatus Demo</DemoButton>
      <DemoButton onClick={() => setType('useOptimistic')}>useOptimistic Demo</DemoButton>
      <DemoButton onClick={() => setType('Suspense')}>Suspense Loading Demo</DemoButton>
      {type === 'useTransition' && <CheckVersion />}
      {type === 'useActionState' && <CheckVersionWithForm />}
      {type === 'use' && <CommentsSection />}
      {type === 'useFormStatus' && <FormStatus />}
      {type === 'useOptimistic' && <OptimisticState />}
      {type === 'Suspense' && <Suspensed />}
    </div>
  );
}

export default App;
