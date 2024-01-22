import { Route, Routes } from 'react-router-dom';
import { LayOut } from './pages/LayOut';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { Private } from './assets/hocs/Private';
import { Todos } from './pages/Todos';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          {/* <Route index element={<HomePage />} />*/}
          <Route
            path="/todos"
            element={
              <Private>
                <Todos />
              </Private>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
