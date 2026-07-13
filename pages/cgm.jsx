import Head from 'next/head';
import styles from '../styles/cgm.module.css';
import { useState } from 'react';

export default function CGMPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const handleKajabiClick = (e) => {
    e.preventDefault();
    window.location.href = 'https://www.soulfulguitarmastery.com/offers/zBsWi8UB';
  };

  const faqs = [
    {
      question: 'What exactly is inside the Creative Guitar Mastery community?',
      answer:
        'You get access to our 3-month structured cohort with weekly group coaching calls, a complete resource library, live feedback sessions on your playing, and a private community of musicians committed to finishing and releasing music.',
    },
    {
      question: 'How much time do I need to commit per week?',
      answer:
        'We recommend 3-5 hours per week including the weekly group call. But the whole system is designed around the 45-minute daily habit. Even if you only have that, you will make progress.',
    },
    {
      question: 'What if I miss a group call?',
      answer:
        'All group calls are recorded and posted in the community immediately. You can watch them anytime. You also get office hours and 1:1 support if you need personalized help.',
    },
    {
      question: 'Can I do the payment plan?',
      answer:
        'Yes. You can pay $3,000 upfront or split it into 3 monthly payments of $1,000. Both options give you full access to everything right away.',
    },
    {
      question: 'Is this for beginners or advanced players?',
      answer:
        'This is for anyone who wants to finish and release music. We meet you where you are. Whether you have been playing for 6 months or 20 years, this system works.',
    },
    {
      question: 'What if I don\'t think it\'s right for me?',
      answer:
        'We offer a 30-day money-back guarantee. If you don\'t feel like this is the right fit, you can get a full refund. No questions asked.',
    },
  ];

  return (
    <>
      <Head>
        <title>Creative Guitar Mastery Community | 3-Month Cohort</title>
        <meta
          name="description"
          content="Join the Creative Guitar Mastery community. A 3-month cohort with group coaching, live feedback, and a private community of musicians finishing and releasing music."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Creative Guitar Mastery Community | 3-Month Cohort" />
        <meta
          property="og:description"
          content="Join the Creative Guitar Mastery community and finish your songs in 45 minutes a day."
        />
        <meta property="og:type" content="website" />
      </Head>

      <main className={styles.cgmPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.badge}>🎵 Creative Guitar Mastery Community</div>
            <h1 className={styles.title}>
              The 3-Month Cohort
              <br />
              <span className={styles.accent}>Where Unfinished Songs Get Released</span>
            </h1>
            <p className={styles.subtitle}>
              Join a community of musicians who are done waiting. In 12 weeks, you'll have a system, accountability, and the confidence to finish and release your music.
            </p>
            <div className={styles.heroCtaGroup}>
              <button className={styles.primaryCta} onClick={handleKajabiClick}>
                Join the Cohort — $3,000
              </button>
              <p className={styles.ctaNotes}>Payment plans available • Starts next cohort</p>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className={styles.included}>
          <div className={styles.includedContainer}>
            <h2 className={styles.sectionTitle}>What You Get Inside</h2>
            <p className={styles.sectionSubtitle}>Everything designed to get your songs done</p>

            <div className={styles.includedGrid}>
              <IncludedCard
                icon="📅"
                title="Weekly Group Coaching Calls"
                description="Live sessions every week where Todd breaks down the exact system behind songs with 1B+ Spotify streams. You get real-time feedback on your playing and songwriting."
              />
              <IncludedCard
                icon="📚"
                title="Complete Resource Library"
                description="Access to video modules, chord charts, arrangement templates, and the full Creative Guitar Method coursework. Everything organized and ready to use."
              />
              <IncludedCard
                icon="🎯"
                title="Live Feedback Sessions"
                description="Record your guitar playing, arrangements, or demos. Get direct feedback from Todd and the community. See exactly what's working and what to adjust."
              />
              <IncludedCard
                icon="👥"
                title="Private Community Access"
                description="Join 50+ musicians in our Skool community. Share ideas, ask questions, celebrate wins. You're never alone in this process."
              />
              <IncludedCard
                icon="🛠️"
                title="Do-With-You Option"
                description="For select participants, we can jump on calls and work through your specific songs together. Real implementation support, not theory."
              />
              <IncludedCard
                icon="📧"
                title="Email & Support Access"
                description="Direct access to Todd and the team via community chat and email. Your questions get answered. Fast."
              />
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className={styles.forWho}>
          <div className={styles.forWhoContainer}>
            <h2 className={styles.sectionTitle}>Who This Is For</h2>
            <div className={styles.forWhoGrid}>
              <div className={styles.forWhoCard}>
                <h3>You have unfinished songs</h3>
                <p>Fragments, voice memos, sketches. Nothing polished. This cohort teaches you the system to take any idea to completion.</p>
              </div>
              <div className={styles.forWhoCard}>
                <h3>You want accountability</h3>
                <p>Working alone isn't working. You need people who understand your struggle and are committed to finishing their own music too.</p>
              </div>
              <div className={styles.forWhoCard}>
                <h3>You're not sure what comes next</h3>
                <p>You know how to play. You just don't know the exact steps to go from playing to finishing to releasing. This gives you the map.</p>
              </div>
              <div className={styles.forWhoCard}>
                <h3>You want to sound better</h3>
                <p>Not through endless scales and exercises. Through a system that teaches you harmony, arrangements, and groove through finishing real songs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className={styles.pricing}>
          <div className={styles.pricingContainer}>
            <h2 className={styles.sectionTitle}>Simple Pricing</h2>
            <p className={styles.pricingSubtitle}>One offer. Two payment options. Full access to everything.</p>

            <div className={styles.priceCard}>
              <h3 className={styles.priceTitle}>3-Month Cohort</h3>
              <div className={styles.priceAmount}>$3,000</div>
              <p className={styles.priceNote}>Full access to all 12 weeks of coaching, resources, and community</p>

              <div className={styles.paymentOptions}>
                <div className={styles.paymentOption}>
                  <span className={styles.paymentLabel}>Option 1: Pay in full</span>
                  <span className={styles.paymentPrice}>$3,000 today</span>
                </div>
                <div className={styles.paymentDivider}>or</div>
                <div className={styles.paymentOption}>
                  <span className={styles.paymentLabel}>Option 2: Payment plan</span>
                  <span className={styles.paymentPrice}>3 × $1,000</span>
                </div>
              </div>

              <button className={styles.primaryCta} onClick={handleKajabiClick}>
                Join Now
              </button>

              <div className={styles.guarantee}>
                <span className={styles.guaranteeIcon}>✓</span>
                30-Day Money-Back Guarantee. If this isn't right for you, full refund, no questions.
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faq}>
          <div className={styles.faqContainer}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className={styles.finalCta}>
          <div className={styles.finalCtaContainer}>
            <h2 className={styles.finalCtaTitle}>Ready to Finish Your Songs?</h2>
            <p className={styles.finalCtaSubtitle}>
              The next cohort starts soon. Spots are limited to 50 musicians so we can give real attention to everyone.
            </p>
            <button className={styles.primaryCta} onClick={handleKajabiClick}>
              Join the Creative Guitar Mastery Community
            </button>
            <p className={styles.finalCtaNote}>Next cohort starts in: Check availability on the funnel page</p>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <p>© 2024 Creative Guitar Mastery. All rights reserved.</p>
            <p>
              Questions? Email{' '}
              <a href="mailto:support@soulfulguitarmastery.com">support@soulfulguitarmastery.com</a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

function IncludedCard({ icon, title, description }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
}

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={styles.faqItem}>
      <button className={styles.faqQuestion} onClick={onToggle}>
        <span>{question}</span>
        <span className={styles.faqToggle}>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className={styles.faqAnswer}>{answer}</div>}
    </div>
  );
}
