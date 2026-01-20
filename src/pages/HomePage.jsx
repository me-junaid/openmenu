import { Header } from "../components/Header"
import { CategoryFeed } from "../components/HomePage/CategoryFeed"
import { ItemFeed } from "../components/HomePage/ItemFeed"
import { OrderSelection } from "../components/HomePage/OrderSelection"
import { PromoBanner } from "../components/HomePage/PromoBanner"
import { SelectedItems } from "../components/HomePage/SelectedItems"
import { ItemsProvider } from "../contexts/ItemsContext"


export const HomePage = () => {
  return (
    <ItemsProvider>
      <Header />
      <div className="fixed top-[50px] bottom-0 left-0 right-0">
        <div className="overflow-y-scroll h-full hide-scrollbar">
          <PromoBanner />
          <ItemFeed />
        </div>
        <CategoryFeed />
        <SelectedItems />
        <OrderSelection />
      </div>
    </ItemsProvider>
  )
}
