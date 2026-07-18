import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { homeItemsApi } from "../api/homeItems";
import { servicesApi } from "../api/services";
import { serviceSubCategoriesApi } from "../api/serviceSubCategories";
import { productsApi } from "../api/products";
import { portfolioApi } from "../api/portfolio";
import { restorationApi } from "../api/restoration";
import { offerAdsApi } from "../api/offerAds";
import { videoItemsApi } from "../api/videoItems";
import { tutorialVideosApi } from "../api/tutorialVideos";
import { learningArticlesApi } from "../api/learningArticles";

interface DataContextType {
  homeItems: any[];
  services: any[];
  products: any[];
  portfolioItems: any[];
  restorations: any[];
  offerAds: any[];
  videoItems: any[];
  tutorialVideos: any[];
  learningArticles: any[];
  subCategories: any[];
  subCategoriesById: Record<string, any>;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType>({
  homeItems: [],
  services: [],
  products: [],
  portfolioItems: [],
  restorations: [],
  offerAds: [],
  videoItems: [],
  tutorialVideos: [],
  learningArticles: [],
  subCategories: [],
  subCategoriesById: {},
  loading: true,
  error: null,
});

export const useData = () => useContext(DataContext);

export function DataProvider({ children }: { children: ReactNode }) {
  const [homeItems, setHomeItems] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [restorations, setRestorations] = useState<any[]>([]);
  const [offerAds, setOfferAds] = useState<any[]>([]);
  const [videoItems, setVideoItems] = useState<any[]>([]);
  const [tutorialVideos, setTutorialVideos] = useState<any[]>([]);
  const [learningArticles, setLearningArticles] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [subCategoriesById, setSubCategoriesById] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          homeItemsData,
          servicesData,
          productsData,
          portfolioData,
          restorationsData,
          offerAdsData,
          videoItemsData,
          tutorialVideosData,
          learningArticlesData,
          subCategoriesData,
        ] = await Promise.all([
          homeItemsApi.getHomeItems().catch(() => []),
          servicesApi.getServices().catch(() => []),
          productsApi.getProducts().catch(() => []),
          portfolioApi.getPortfolioItems().catch(() => []),
          restorationApi.getRestorations().catch(() => []),
          offerAdsApi.getOfferAds().catch(() => []),
          videoItemsApi.getVideoItems().catch(() => []),
          tutorialVideosApi.getTutorialVideos().catch(() => []),
          learningArticlesApi.getLearningArticles().catch(() => []),
          serviceSubCategoriesApi.getSubCategories().catch(() => []),
        ]);

        setHomeItems(homeItemsData);
        setServices(servicesData);
        setProducts(productsData);
        setPortfolioItems(portfolioData);
        setRestorations(restorationsData);
        setOfferAds(offerAdsData);
        setVideoItems(videoItemsData);
        setTutorialVideos(tutorialVideosData);
        setLearningArticles(learningArticlesData);

        const byId: Record<string, any> = {};
        (subCategoriesData as any[]).forEach((sc) => { byId[sc.id] = sc; });
        setSubCategories(subCategoriesData);
        setSubCategoriesById(byId);
      } catch (err: any) {
        console.error("Failed to preload data:", err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        homeItems,
        services,
        products,
        portfolioItems,
        restorations,
        offerAds,
        videoItems,
        tutorialVideos,
        learningArticles,
        subCategories,
        subCategoriesById,
        loading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
