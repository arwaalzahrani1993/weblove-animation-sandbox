import { ArrowLeft, Check, LayoutTemplate, Smartphone } from 'lucide-react'
import '../styles/level-one.css'

const servicePoints = [
  'قسم رئيسي واضح ومقنع',
  'ترتيب محتوى يقود للطلب',
  'تجربة متجاوبة مع الجوال',
  'نسخة جاهزة للنشر',
]

export function LevelOneLanding() {
  return (
    <main className="level-one" dir="rtl">
      <div className="scroll-progress" aria-hidden="true" />

      <nav className="site-nav" aria-label="التنقل الرئيسي">
        <a className="wordmark" href="#top" aria-label="أروى، الرئيسية">
          ARWA<span>.</span>
        </a>
        <div className="nav-links">
          <a className="text-link" href="#services">الخدمة</a>
          <a className="text-link" href="#result">النتيجة</a>
          <a className="text-link" href="#pricing">السعر</a>
        </div>
        <a className="button button-small" href="#pricing">
          اطلبي صفحتك
          <ArrowLeft size={17} strokeWidth={1.8} aria-hidden="true" />
        </a>
      </nav>

      <header className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow load-in load-delay-1">صفحات هبوط عربية للمشاريع الجادة</p>
          <h1 className="load-in load-delay-2">عرضك واضح. وقرار الشراء أسهل.</h1>
          <p className="hero-intro load-in load-delay-3">
            أصمم صفحة سريعة لمشروعك، ترتّب الفكرة وتقود الزائر إلى خطوة واحدة واضحة.
          </p>
          <div className="hero-actions load-in load-delay-4">
            <a className="button button-primary" href="#pricing">
              اطلبي صفحتك
              <ArrowLeft size={19} strokeWidth={1.8} aria-hidden="true" />
            </a>
            <a className="text-link secondary-link" href="#services">شاهدي التفاصيل</a>
          </div>
        </div>

        <figure className="hero-visual load-in load-delay-3">
          <img
            src="/images/landing-hero.jpg"
            alt="جهاز لابتوب وجوال يعرضان تصميماً عصرياً لصفحة هبوط"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <figcaption>تصميم واحد، متناسق على كل شاشة.</figcaption>
        </figure>
      </header>

      <section className="features section-shell" id="services" aria-labelledby="services-title">
        <div className="section-heading">
          <h2 id="services-title">الصفحة الجميلة ما تكفي.</h2>
          <p>كل جزء له دور: يشرح، يطمئن، ثم يقرّب الزائر من الطلب.</p>
        </div>

        <div className="feature-grid">
          <article className="feature-card feature-card-image motion-card">
            <img
              src="/images/boutique-owner.jpg"
              alt="صاحبة متجر تراجع عرض منتجاتها على جهاز لوحي"
              width="1122"
              height="1402"
              loading="lazy"
            />
            <div className="image-card-copy">
              <p>رسالة مفهومة</p>
              <h3>الزائر يعرف فوراً ماذا تقدمين ولماذا يهمه.</h3>
            </div>
          </article>

          <article className="feature-card feature-card-cobalt motion-card">
            <LayoutTemplate size={30} strokeWidth={1.6} aria-hidden="true" />
            <div>
              <p>مسار مدروس</p>
              <h3>المحتوى يمشي بترتيب طبيعي من الفضول إلى القرار.</h3>
            </div>
            <a className="text-link card-link" href="#result">كيف نرتّبها؟</a>
          </article>

          <article className="feature-card feature-card-paper motion-card">
            <Smartphone size={30} strokeWidth={1.6} aria-hidden="true" />
            <div>
              <p>جوال أولاً</p>
              <h3>لأن أغلب عملائك يصلون من إعلان أو فيديو قصير.</h3>
            </div>
            <span className="device-note">سريعة، واضحة، وسهلة اللمس</span>
          </article>
        </div>
      </section>

      <section className="testimonial section-shell" id="result" aria-labelledby="result-title">
        <div className="testimonial-image">
          <img
            src="/images/wireframe-review.jpg"
            alt="مراجعة مخطط صفحة هبوط مطبوع على طاولة عمل"
            width="1448"
            height="1086"
            loading="lazy"
          />
        </div>
        <div className="testimonial-copy">
          <p className="testimonial-label">مساحة لتقييم حقيقي</p>
          <h2 id="result-title">“صار عرضنا أوضح، وصار العميل يعرف الخطوة التالية بدون ما نسهب في الشرح.”</h2>
          <p className="testimonial-meta">نموذج توضيحي، يستبدل بتقييم عميلة قبل النشر</p>
        </div>
      </section>

      <section className="pricing section-shell" id="pricing" aria-labelledby="pricing-title">
        <div className="price-intro">
          <h2 id="pricing-title">ابدئي بصفحة واحدة محسوبة.</h2>
          <p>خيار واضح للمشاريع التي تحتاج عرضاً مركزاً قبل التوسع إلى موقع كامل.</p>
        </div>

        <article className="price-card motion-card">
          <div className="price-card-top">
            <div>
              <p className="price-name">صفحة هبوط أساسية</p>
              <p className="price">900 <span>ر.س</span></p>
            </div>
            <p className="delivery">تسليم متوقع خلال 5-7 أيام عمل</p>
          </div>
          <ul aria-label="محتويات الباقة">
            {servicePoints.map((point) => (
              <li key={point}>
                <Check size={18} strokeWidth={1.8} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <a className="button button-primary price-button" href="mailto:hello@example.com">
            اطلبي صفحتك
            <ArrowLeft size={19} strokeWidth={1.8} aria-hidden="true" />
          </a>
          <p className="price-note">البريد مؤقت للمعاينة، ونربطه بوسيلة التواصل التي تختارينها قبل النشر.</p>
        </article>
      </section>

      <footer className="site-footer section-shell">
        <a className="wordmark footer-wordmark" href="#top">ARWA<span>.</span></a>
        <p>صفحات هبوط عربية، مصممة للوضوح والطلب.</p>
        <a className="text-link" href="#top">العودة للأعلى</a>
      </footer>
    </main>
  )
}
