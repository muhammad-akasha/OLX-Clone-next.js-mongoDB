import Carousel from "../components/Carousel";
import Categories from "../components/CategoriesArray";
import HomeCategoryAd from "../components/HomeCategoryAd";
import TryMobileApp from "../components/TryMobileApp";

export default function Home() {
  return (
    <>
      <Carousel />
      <section className="px-8 mt-4 mb-4">
        <h2 className="font-semibold text-2xl">All categories</h2>
        <Categories />
      </section>
      <HomeCategoryAd />
      <section>
        <TryMobileApp />
      </section>
    </>
  );
}
