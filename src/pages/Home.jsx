import ProudProducts from '../components/ProudProducts'
import Banner1 from '../img/banner/banner1.jpg'
import Banner from '../components/Banner'
import TrendingSlider from '../components/TrendingSlider'
import Banner2 from '../img/banner/banner2.jpg'
import BannerReverse from '../components/BannerReverse'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

export function Home() {
  return (
    <main>
      <Hero />
      <ProudProducts />
      <Banner
        title='Creative harmonious living'
        text=' RAOUF Products are all made to standard sizes so that you can mix and match them freely.'
        img={Banner1}
      />
      <TrendingSlider />
      <BannerReverse
        title='Comfortable & Elegante Living'
        text=' RAOUF Products are all made to standard sizes so that you can mix and match them freely.'
        img={Banner2}
      />
      <Newsletter />
      <Footer />
    </main>
  )
}
