import { myStore } from '../../store';
import { Provider } from 'react-redux';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from './Header';
import Cart from './Cart';

import Products from './Products';

function App() {

  return (
    <Provider store={myStore}>
      <Header />
      <Outlet />
    </Provider>
  )
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Products />
      },
      {
        path: '/cart',
        element: <Cart />
      }
    ]
  }
])


export default router;
