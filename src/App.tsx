import { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthLayout, ProtectedLayout } from './components';
import Home from './pages/dashboard/home';

const SignIn = lazy(() => import('@/pages/auth/signin'));
const SignUp = lazy(() => import('@/pages/auth/signup'));

const App = () => {
  return (
    <>
      <Suspense fallback={<div></div>}>
        <BrowserRouter>
          <Suspense fallback={<div></div>}>
            <Routes>
              <Route path='/auth/*' element={<AuthLayout />}>
                <Route path='sign-in' element={<SignIn />} />
                <Route path='sign-up' element={<SignUp />} />
              </Route>
              <Route path='/' element={<ProtectedLayout />}>
                <Route index element={<Home />} />
              </Route>
              <Route path='*' element={<div>Page not found</div>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Suspense>
    </>
  );
};

export default App;
