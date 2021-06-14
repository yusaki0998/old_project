import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UnAuthLayout from "./layout/unAuthLayout";
import AuthLayout from "./layout/authLayout";
import PublicLayout from "./layout/publicLayout";
import AdminLayout from "./layout/adminLayout";
import HomePage from "./pages/global/HomePage";
import PricingPage from "./pages/global/PricingPlan";
import Login from "./pages/global/Login";
import About from "./pages/global/About";
import Contact from "./pages/global/Contact";
import Catalog from "./pages/global/Catalog";
import SignUp from "./pages/global/SignUp";
import NotFound from "./pages/global/NotFound";
import MovieDetail from "./pages/global/MovieDetail";
import CustomerProfile from "./pages/main/CustomerProfile";
import ForgotPassword from "./pages/global/ForgotPassword";
import FAQ from "./pages/global/FAQ";
import Privacy from "./pages/global/Privacy";
import ConfirmOTP from "./pages/global/ConfirmOTP";
import Notification from "./components/ui/Notification";
import CustomerLayout from "./layout/customerLayout";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signin">
            <UnAuthLayout>
              <Login />
            </UnAuthLayout>
          </Route>
          <Route path="/confirm-otp">
            <UnAuthLayout>
              <ConfirmOTP />
            </UnAuthLayout>
          </Route>
          <Route path="/signup">
            <UnAuthLayout>
              <SignUp />
            </UnAuthLayout>
          </Route>
          <Route path="/pricing">
            <PublicLayout>
              <PricingPage />
            </PublicLayout>
          </Route>
          <Route path="/privacy">
            <PublicLayout>
              <Privacy />
            </PublicLayout>
          </Route>
          <Route path="/about">
            <PublicLayout>
              <About />
            </PublicLayout>w
          </Route>
          <Route path="/contacts">
            <PublicLayout>
              <Contact />
            </PublicLayout>
          </Route>
          <Route path="/details/:id">
            <PublicLayout>
              <MovieDetail />
            </PublicLayout>
          </Route>
          <Route path="/catalog">
            <PublicLayout>
              <Catalog />
            </PublicLayout>
          </Route>
          <Route path="/faq">
            <PublicLayout>
              <FAQ />
            </PublicLayout>
          </Route>
          <Route path="/profile">
            <AuthLayout>
              <CustomerProfile />
            </AuthLayout>
          </Route>
          <Route path="/forgot">
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          </Route>
          <Route path="/admin">
            <AdminLayout />
          </Route>
          <Route path="/customer">
            <CustomerLayout />
          </Route>
          <Route exact path="/">
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
      <Notification />
    </div>
  );
}

export default App;
