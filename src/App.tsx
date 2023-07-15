import { Route, Routes } from 'react-router-dom';

/* Pages */
import Search from './pages/search/Search';
import Login from './pages/user/Login';
import Join from './pages/user/Join';

function App() {
  return (
    <Routes>
      <Route element={<Search />} path='/search' />
    </Routes>
  );
}

export default App;
