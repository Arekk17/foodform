// App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import MyForm from './components/DishForm/DishForm';
import './App.css'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='form'>
        <MyForm />
      </div>
    </Provider>
  );
};

export default App;
