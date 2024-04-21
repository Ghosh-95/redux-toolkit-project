import { useState } from 'react';
import { myStore } from '../../store';
import { Provider } from 'react-redux';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={myStore}>

    </Provider>
  )
}

export default App
