import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { MotionShowcase } from '../components/MotionShowcase'
import { SignatureLogo } from '../components/SignatureLogo'
import '../styles/level-five-signature.css'

export function LevelFiveSignature() {
  const [replayKey, setReplayKey] = useState(0)

  return (
    <main className="signature-page" dir="rtl">
      <nav className="signature-nav" aria-label="التنقل الرئيسي">
        <a className="signature-wordmark" href="#cinema" aria-label="أروى، بداية العرض">أروى</a>
        <span>دراسة في الحركة النظيفة</span>
        <a href="#signature-stage">التوقيع</a>
      </nav>

      <div id="cinema">
        <MotionShowcase />
      </div>

      <section className="signature-stage" id="signature-stage" aria-labelledby="signature-heading">
        <div className="stage-copy">
          <p>SVG SIGNATURE</p>
          <h2 id="signature-heading">الاسم أولًا.<br />ثم تأتي اللمسة.</h2>
        </div>

        <div className="arabic-signature">
          <div className="arabic-name-mask">
            <span>أروى</span>
          </div>
          <SignatureLogo key={replayKey} replayKey={replayKey} />
        </div>

        <div className="stage-footer">
          <p>اسم صحيح، مسار واحد، وحركة واضحة عند الوصول.</p>
          <button type="button" onClick={() => setReplayKey((value) => value + 1)}>
            <RotateCcw size={17} strokeWidth={1.7} aria-hidden="true" />
            أعيدي الرسم
          </button>
        </div>
      </section>

      <section className="signature-proof" aria-labelledby="proof-heading">
        <p>النتيجة</p>
        <h2 id="proof-heading">حركة تشاهدينها.<br />لا حركة نكتب عنها فقط.</h2>
        <div className="proof-details" aria-label="مواصفات التجربة">
          <span><strong>6</strong> مشاهد متعاقبة</span>
          <span><strong>1</strong> مؤثر رئيسي</span>
          <span><strong>0</strong> زحمة بصرية</span>
        </div>
      </section>

      <footer className="signature-footer">
        <span>أروى</span>
        <p>حركة واضحة، ثم هدوء.</p>
        <a href="#cinema">إعادة المشاهدة</a>
      </footer>
    </main>
  )
}
