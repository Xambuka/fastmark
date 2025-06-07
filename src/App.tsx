
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Plans from "./pages/admin/Plans";
import Categories from "./pages/admin/Categories";
import AdminUsers from "./pages/admin/AdminUsers";
import Companies from "./pages/admin/Companies";
import Layout from "./pages/admin/Layout";
import Reports from "./pages/admin/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/*" element={
            <Routes>
              <Route path="/" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="companies" element={<Companies />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="categories" element={<Categories />} />
                <Route path="plans" element={<Plans />} />
                <Route path="layout" element={<Layout />} />
                <Route path="reports" element={<Reports />} />
              </Route>
            </Routes>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
