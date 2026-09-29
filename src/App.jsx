import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import About from './pages/About'
import WhyUsPage from './pages/WhyUsPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'

/**
 * App
 * ---------------------------------------------------------------------------
 * Route table. Every page renders inside Layout (navbar, footer, smooth scroll,
 * sticky mobile contact bar). Unknown paths fall through to NotFound, which is
 * marked noindex.
 */
export default function App() {
  return (
    <ErrorBoundary
      fallback={({ site }) => (
        <div className="shell py-32">
          <p className="eyebrow text-agri-600">Something went wrong</p>
          <h1 className="h-display mt-4 text-ink">The page could not be displayed</h1>
          <p className="lede mt-5">
            Please reload the page, or contact {site.name} on {site.phone.display}.
          </p>
          <a href="/" className="btn btn-primary mt-8">
            Back to home
          </a>
        </div>
      )}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/threshers" element={<Products />} />
          <Route path="/threshers/:slug" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}
