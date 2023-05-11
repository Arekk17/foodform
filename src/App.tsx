// App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import DishForm from './components/DishForm/DishForm';
import './App.css'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='form'>
        <DishForm />
      </div>
    </Provider>
  );
};

export default App;
