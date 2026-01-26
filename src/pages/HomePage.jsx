import { Header } from "../components/Header"
import { CategoryFeed } from "../components/HomePage/CategoryFeed"
import { ItemFeed } from "../components/HomePage/ItemFeed"
import { NavForCatergory } from "../components/Utilis/NavForCatergory"
import { OrderSelection } from "../components/HomePage/OrderSelection"
import { PromoBanner } from "../components/HomePage/PromoBanner"
import { ItemsProvider } from "../contexts/ItemsContext"
import { useEffect } from "react"


export const HomePage = () => {

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const systemDefault = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme === "dark" || theme !== "light" && systemDefault) {
      document.documentElement.classList.add("dark");
    }

  }, []);


  return (
    <ItemsProvider>
      <Header />
      <div className="fixed top-[50px] bottom-0 left-0 right-0">
        <div className="overflow-y-scroll h-full hide-scrollbar">
          <PromoBanner />
          <ItemFeed />
        </div>
        <NavForCatergory />
        <OrderSelection />
      </div>
      <CategoryFeed />
    </ItemsProvider>
  )
}