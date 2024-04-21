import { useState } from 'react';
import { myStore } from '../../store';
import { Provider } from 'react-redux';

import Products from './Products';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={myStore}>
      <Products />
    </Provider>
  )
}

export default App
