import { Toaster } from "@/components/ui/sonner";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { AdminAuthProvider, useAdminAuth } from "./contexts/AdminAuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ADN from "./pages/ADN";
import Missions from "./pages/Missions";
import Expertises from "./pages/Expertises";
import FabrikRH from "./pages/FabrikRH";
import Blog from "./pages/Blog";
import ExpertiseDetail from "./pages/ExpertiseDetail";
import Programmes from "./pages/Programmes";
import BlogDetail from "./pages/BlogDetail";
import ActualiteDetail from "./pages/ActualiteDetail";
import Actualites from "./pages/Actualites";
import Layout from "./components/Layout";


function LayoutPage({ component: Component }: { component: React.ComponentType }) {
  return (
    <Layout>
      <Component />
    </Layout>
  );
}
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/notre-adn"}>{() => <LayoutPage component={ADN} />}</Route>
      <Route path={"/missions"}>{() => <LayoutPage component={Missions} />}</Route>
      <Route path={"/expertises"}>{() => <LayoutPage component={Expertises} />}</Route>
      <Route path={"/expertises/:slug"}>{() => <LayoutPage component={ExpertiseDetail} />}</Route>
      <Route path={"/programmes-sur-mesure"}>{() => <LayoutPage component={Programmes} />}</Route>
      <Route path={"/fabrik-rh"}>{() => <LayoutPage component={FabrikRH} />}</Route>
      <Route path={"/blog"}>{() => <LayoutPage component={Blog} />}</Route>
      <Route path={"/blog/:slug"}>{() => <Layout><BlogDetail /></Layout>}</Route>
      <Route path={"/actualites"}>{() => <LayoutPage component={Actualites} />}</Route>
      <Route path={"/actualites/:slug"}>{() => <Layout><ActualiteDetail /></Layout>}</Route>
      <Route path={"/admin/login"} component={AdminLogin} />
      <Route path={"/admin"}>{() => <AdminGuard />}</Route>
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AdminGuard() {
  const { isAuthenticated } = useAdminAuth();
  const [, setLocation] = useLocation();
  if (!isAuthenticated) {
    setLocation('/admin/login');
    return null;
  }
  return <AdminDashboard />;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AdminAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AdminAuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
