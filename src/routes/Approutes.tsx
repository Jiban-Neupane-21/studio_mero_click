import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "../components/layout/Layout";
import MainLayout from "../components/layout/MainLayout";

import HomePage from "../pages/HomePage";
import ContactPage from "../pages/ContactPage";
import ServicePage from "../pages/ServicePage";
import AboutPage from "../pages/AboutPage";
import ServiceDetails from "../components/ServiceDetails";
import ProductDetails from "../components/ProductDetails";
import PortfolioPage from "../pages/PortfolioPage";
import PortfolioDetail from "../components/PortfolioDetails";
import VideoSection from "../pages/VideoPage";
import LearnFromUs from "../pages/LearnPage";
import ClaimOffer from "../components/ClaimOffer";
import OfferDetailsPage from "../pages/OfferDetailsPage";

import AdminLayout from "../Admin/AdminLayout";
import AdminDashboard from "../Admin/pages/AdminDashboard";
import AdminServices from "../Admin/pages/AdminServices";
import AdminProducts from "../Admin/pages/AdminProducts";
import AdminPortfolio from "../Admin/pages/AdminPortfolio";
import AdminVideos from "../Admin/pages/AdminVideos";
import AdminTutorials from "../Admin/pages/AdminTutorials";
import AdminLearning from "../Admin/pages/AdminLearning";
import AdminOfferAds from "../Admin/pages/AdminOfferAds";
import Login from "../Admin/Login";
import ProtectedRoute from "../Admin/ProtectedRoute";


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "services/",
            element: <ServicePage />,
          },
          {
            path: "services/:id",
            element: <ServiceDetails />,
          },
          {
            path: "products/:id",
            element: <ProductDetails />,
          },
          {
            path: "portfolio",
            element: <PortfolioPage />,
          },
          {
            path: "portfolio/:id",
            element: <PortfolioDetail />,
          },
          {
            path: "videos",
            element: <VideoSection />,
          },
          {
            path: "learn",
            element: <LearnFromUs />,
          },
          {
            path: "claim-offer",
            element: <ClaimOffer />,
          },
          {
            path: "offers/:id",
            element: <OfferDetailsPage />,
          },
          {
            path: "book",
            element: <ContactPage />,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
          {
            path: "contact",
            element: <ContactPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "services", element: <AdminServices /> },
          { path: "products", element: <AdminProducts /> },
          { path: "portfolio", element: <AdminPortfolio /> },
          { path: "videos", element: <AdminVideos /> },
          { path: "tutorials", element: <AdminTutorials /> },
          { path: "learning", element: <AdminLearning /> },
          { path: "offer-ads", element: <AdminOfferAds /> },
        ],
      }
    ]
  },
  {
    path: "*",
    element: <div>Page Not Found</div>,
  },
]);

export function Approutes() {
  return <RouterProvider router={router} />;
}
