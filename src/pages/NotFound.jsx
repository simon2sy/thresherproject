import { ArrowRight } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import Button from '../components/ui/Button'

/**
 * NotFound
 * ---------------------------------------------------------------------------
 * 404 page. Marked noindex so unknown URLs never enter the search index, and
 * offers the two routes a lost visitor actually needs: the thresher range and
 * the contact page.
 */
export default function NotFound() {
  useSeo({
    title: 'Page not found',
    description:
      'The page you were looking for does not exist. Browse the thresher range or contact Daju Bhai Grill Udyog in Jhapa Gaupalika, Jhapa.',
    path: '/404',
    robots: 'noindex, nofollow',
  })

  return (
    <section className="bg-sand-50 pb-24 pt-32 sm:pt-36">
      <div className="shell max-w-2xl">
        <p className="tech-label text-agri-600">Error 404</p>
        <h1 className="h-display mt-5 text-ink">This page is not in the workshop</h1>
        <p className="lede mt-5">
          The link may be out of date. The thresher lineup and our contact details are always one
          click away.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button to="/threshers" variant="primary" size="lg">
            View threshers
            <ArrowRight size={15} aria-hidden="true" />
          </Button>
          <Button to="/" variant="outline" size="lg">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  )
}
