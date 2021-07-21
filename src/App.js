/** @format */
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notification from "./components/ui/Notification";
import CustomerLayout from "./layout/customerLayout";
import ManagerLayout from "./layout/managerLayout";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import UnAuthLayout from "./layout/unAuthLayout";
import AuthLayout from "./layout/authLayout";
import PublicLayout from "./layout/publicLayout";
import AdminLayout from "./layout/adminLayout";
import StaffLayout from "./layout/staffLayout";
import { useSelector } from "react-redux";

const HomePage = lazy(() => import("./pages/global/HomePage"));
const CurrentFilm = lazy(() => import("./pages/global/CurrentFilm"));
const ComingFilm = lazy(() => import("./pages/global/ComingFilm"));
const PricingPage = lazy(() => import("./pages/global/PricingPlan"));
const About = lazy(() => import("./pages/global/About"));
const Contact = lazy(() => import("./pages/global/Contact"));
const SignUp = lazy(() => import("./pages/global/SignUp"));
const NotFound = lazy(() => import("./pages/global/NotFound"));
const MovieDetail = lazy(() => import("./pages/global/MovieDetail"));
const SelectSeat = lazy(() => import("./pages/global/SelectSeat"));
const CustomerProfile = lazy(() => import("./pages/main/CustomerProfile"));
const ForgotPassword = lazy(() => import("./pages/global/ForgotPassword"));
const FAQ = lazy(() => import("./pages/global/FAQ"));
const Privacy = lazy(() => import("./pages/global/Privacy"));
const ConfirmOTP = lazy(() => import("./pages/global/ConfirmOTP"));
const Login = lazy(() => import("./pages/global/Login"));

function App() {
  const { sidebar } = useSelector((state) => state.ui);

  useEffect(() => {
    if (!sidebar.show) {
      document.querySelector("body").className = "body";
    }
  }, [sidebar]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signin">
            <Suspense fallback={<LoadingSpinner />}>
              <UnAuthLayout>
                <Login />
              </UnAuthLayout>
            </Suspense>
          </Route>
          <Route path="/confirm-otp">
            <Suspense fallback={<LoadingSpinner />}>
              <UnAuthLayout>
                <ConfirmOTP />
              </UnAuthLayout>
            </Suspense>
          </Route>
          <Route path="/signup">
            <Suspense fallback={<LoadingSpinner />}>
              <UnAuthLayout>
                <SignUp />
              </UnAuthLayout>
            </Suspense>
          </Route>
          <Route path="/pricing">
            <Suspense fallback={<LoadingSpinner />}>
              <PublicLayout>
                <PricingPage />
              </PublicLayout>
            </Suspense>
          </Route>
          <Route path="/privacy">
            <Suspense fallback={<LoadingSpinner />}>
              <PublicLayout>
                <Privacy />
              </PublicLayout>
            </Suspense>
          </Route>
          <Route path="/about">
            <Suspense fallback={<LoadingSpinner />}>
              <PublicLayout>
                <About />
              </PublicLayout>
            </Suspense>
          </Route>
          <Route path="/contacts">
            <Suspense fallback={<LoadingSpinner />}>
              <PublicLayout>
                <Contact />
              </PublicLayout>
            </Suspense>
          </Route>
          <Route path="/details/:id">
            <Suspense fallback={<LoadingSpinner />}>
              <PublicLayout>
                <MovieDetail />
              </PublicLayout>
            </Suspense>
          </Route>
          <Route path="/select-seat/:id">
            <Suspense fallback={<LoadingSpinner />}>
              <PublicLayout>
                <SelectSeat />
              </PublicLayout>
            </Suspense>
          </Route>
          <Route path="/current-film">
            <Suspense fallback={<LoadingSpinner />}>
              <PublicLayout>
                <CurrentFilm />
              </PublicLayout>
            </Suspense>
          </Route>
          <Route path="/coming-film">
            <Suspense fallback={<LoadingSpinner />}>
              <PublicLayout>
                <ComingFilm />
              </PublicLayout>
            </Suspense>
          </Route>
          <Route path="/faq">
            <Suspense fallback={<LoadingSpinner />}>
              <PublicLayout>
                <FAQ />
              </PublicLayout>
            </Suspense>
          </Route>
          <Route path="/profile">
            <Suspense fallback={<LoadingSpinner />}>
              <AuthLayout>
                <CustomerProfile />
              </AuthLayout>
            </Suspense>
          </Route>
          <Route path="/forgot">
            <Suspense fallback={<LoadingSpinner />}>
              <AuthLayout>
                <ForgotPassword />
              </AuthLayout>
            </Suspense>
          </Route>
          <Route path="/admin">
            <AdminLayout />
          </Route>
          <Route path="/customer">
            <CustomerLayout />
          </Route>
          <Route path="/manager">
            <ManagerLayout />
          </Route>
          <Route path="/staff">
            <StaffLayout />
          </Route>
          <Route exact path="/">
            <Suspense fallback={<LoadingSpinner />}>
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            </Suspense>
          </Route>
          <Route path="*">
            <Suspense fallback={<LoadingSpinner />}>
              <NotFound />
            </Suspense>
          </Route>
        </Switch>
      </Router>
      <Notification />
    </div>
  );
}

export default App;
