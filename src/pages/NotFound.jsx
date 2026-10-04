import { ArrowRight } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { useLanguage } from '../i18n'
import Button from '../components/ui/Button'

/**
 * NotFound
 * ---------------------------------------------------------------------------
 * 404 page. Marked noindex so unknown URLs never enter the search index, and
 * offers the two routes a lost visitor actually needs: the thresher range and
 * the contact page.
 */
export default function NotFound() {
  const { t } = useLanguage()

  useSeo({
    title: t('meta.notFound.title'),
    description: t('meta.notFound.description'),
    path: '/404',
    robots: 'noindex, nofollow',
  })

  return (
    <section className="bg-sand-50 pb-24 pt-32 sm:pt-36">
      <div className="shell max-w-2xl">
        <p className="tech-label text-agri-600">{t('notFound.eyebrow')}</p>
        <h1 className="h-display mt-5 text-ink">{t('notFound.title')}</h1>
        <p className="lede mt-5">{t('notFound.text')}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button to="/threshers" variant="primary" size="lg">
            {t('notFound.viewThreshers')}
            <ArrowRight size={15} aria-hidden="true" />
          </Button>
          <Button to="/" variant="outline" size="lg">
            {t('common.backToHome')}
          </Button>
        </div>
      </div>
    </section>
  )
}
