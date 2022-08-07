import { Fragment } from 'react';
import AuthContentProvider from '~/components/contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from '~/routes';
import DefaultLayout from './LayOut/DefaultLayout';
import ProtectedRoutes from './routes/ProtectedRoutes';
import AdminLayout from './LayOut/LayoutAdmin';
import Login from './pages/Login';

function App() {
    return (
        <AuthContentProvider>
            <Router>
                <div>
                    <Routes>
                        {PublicRoutes.map((route, index) => {
                            const Layout =
                                route.layout === null
                                    ? Fragment
                                    : DefaultLayout;
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        <Route
                            element={
                                <ProtectedRoutes allowedRoles={['admin']} />
                            }
                        >
                            <Route
                                path="/adminlayout"
                                element={
                                    <Fragment>
                                        <AdminLayout />
                                    </Fragment>
                                }
                            />
                        </Route>
                        <Route
                            path="/login"
                            element={
                                <Fragment>
                                    <Login />
                                </Fragment>
                            }
                        />
                        {/* <Route path="register" element={<Register />} /> */}
                    </Routes>
                </div>
            </Router>
        </AuthContentProvider>
    );
}

export default App;
