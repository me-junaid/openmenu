import { Header } from "../components/Header"
import { CategoryFeed } from "../components/HomePage/CategoryFeed"
import { ItemFeed } from "../components/HomePage/ItemFeed"
import { PromoBanner } from "../components/HomePage/PromoBanner"
import { SelectedItems } from "../components/HomePage/SelectedItems"
import { ItemsProvider } from "../contexts/ItemsContext"


export const HomePage = () => {
  return (
    <ItemsProvider>
      <Header />
        <PromoBanner />
        <ItemFeed />
      <CategoryFeed />
      <SelectedItems/>
    </ItemsProvider>
  )
}
