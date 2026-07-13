import Head from 'next/head';
import styles from '../styles/call.module.css';

export default function CallPage() {
  const scrollToBooking = (e) => {
    e.preventDefault();
    const element = document.getElementById('booking-calendar');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>Todd Pritch | Finish Your Songs | Strategy Call</title>
        <meta
          name="description"
          content="Watch Todd Pritch's guitar training and book a strategy call to get a simple plan for finishing and releasing your songs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Todd Pritch | Finish Your Songs" />
        <meta
          property="og:description"
          content="Watch Todd Pritch's guitar training and book a strategy call to get a simple plan for finishing and releasing your songs."
        />
        <meta property="og:type" content="website" />
      </Head>

      <main className={styles.callPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.announcement}>
            No More Random YouTube Tutorials. No More Complicated Scales. No More Theory Overwhelm. Just One System.
          </div>
          <div className={styles.heroContainer}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true"></span>
              <span>For Performers and Guitarists</span>
            </div>
            <h1 className={styles.title}>
              We Will Help You Install Our
              <br />
              <span className={styles.accent}>1.17B+ Stream Guitar Method</span>
            </h1>
            <p className={styles.subheadline}>So you can finish your songs and put them out</p>
          </div>
        </section>

        <div className={styles.callFlow}>
          {/* VSL Section */}
          <section className={styles.vslSection}>
            <p className={styles.step}>Step 1: Watch this video</p>
            <div className={styles.videoContainer}>
              <video
                className={styles.videoPlayer}
                controls
                playsInline
                preload="metadata"
                poster="https://video.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/200c517f-78d8-498f-8cdd-81737ca92f7c/thumbnail"
              >
                <source
                  src="https://video.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/200c517f-78d8-498f-8cdd-81737ca92f7c/VSL+-+Todd+Pritch+%281%29.mp4"
                  type="video/mp4"
                />
                Your browser does not support this video.
              </video>
            </div>
            <div className={styles.vslCta}>
              <button className={styles.ctaButton} onClick={scrollToBooking}>
                Book Your Guitar Strategy Session
              </button>
            </div>
          </section>

          {/* Album Marquee */}
          <section className={styles.marquee}>
            <div className={styles.marqueeHeader}>
              <p className={styles.marqueeEyebrow}>Selected credits from Todd&apos;s Spotify playlist</p>
              <h2 className={styles.marqueeTitle}>1,168,355,355+ streams across 60 tracks</h2>
              <p className={styles.marqueeNote}>
                Lifetime Spotify totals for each full song. Stream counts reflect each track&apos;s total plays, not streams
                attributed only to Todd&apos;s individual contribution.
              </p>
            </div>
            <div className={styles.marqueeViewport}>
              <div className={styles.marqueeTrack}>
                <AlbumCard
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/0ceef519-db00-4d7d-b31a-6e2c4a9cc39b/Screen+Shot+2023-10-31+at+8.50.38+AM.png"
                  title="You Never Visit Me"
                  artist="Masego"
                  role="Composer / Producer"
                  streams="9,015,361"
                />
                <AlbumCard
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/1653670684147-9YQ3M1OYWDHHCVIF2UWN/Self+Control+%2C+YoungBoy+Never+Broke+Again.jpeg"
                  title="Self Control"
                  artist="YoungBoy Never Broke Again"
                  role="Composer"
                  streams="190,546,358"
                />
                <AlbumCard
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/1653670981085-ZF5348R40AOO9S7U5KON/And+This+Is+Just+The+Intro+%28Live%29+Tory+Lanez.jpeg"
                  title="And This Is Just The Intro (Live)"
                  artist="Tory Lanez"
                  role="Guitar / Producer"
                  streams="11,685,152"
                />
                <AlbumCard
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/1653671043164-JHFD1ZPD7OWDKACDY07A/Real+Feel+Trippie+Redd.jpeg"
                  title="Real Feel"
                  artist="Trippie Redd"
                  role="Composer / Producer"
                  streams="38,192,153"
                />
                <AlbumCard
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/1653671361372-IU2WVN9AZXB5XI9ZWK5T/role-model-blind-interscope.jpeg"
                  title="blind"
                  artist="ROLE MODEL"
                  role="Composer / Guitar / Producer"
                  streams="144,399,337"
                />
                <AlbumCard
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/1653752930529-0UZGSYXM5ZUNT1ML7EWG/Pasadena+Tinashe%2C+Buddy.jpeg"
                  title="Pasadena"
                  artist="Tinashe / Buddy"
                  role="Composer"
                  streams="14,474,754"
                />
              </div>
            </div>
          </section>

          {/* Booking Section */}
          <section id="booking" className={styles.booking}>
            <div className={styles.bookingLayout}>
              <div className={styles.bookingStrategy}>
                <p className={styles.step}>Step 2: Book Your Session</p>
                <h2 className={styles.bookingTitle}>
                  Book Your Strategy Session
                  <br />
                  <span className={styles.accent}>With Todd</span>
                </h2>
                <p className={styles.bookingCopy}>
                  Choose a time on the calendar and book your embedded 1:1 guitar strategy session.
                </p>
                <div className={styles.bookingCta}>
                  <button className={styles.ctaButton} onClick={scrollToBooking}>
                    Choose Your Time
                  </button>
                </div>
              </div>
              <div id="booking-calendar" className={styles.bookingCalendar}>
                <iframe
                  className={styles.calendlyFrame}
                  src="https://calendly.com/todd-pritch/1on1withtoddpritch?hide_gdpr_banner=1&background_color=ffffff&text_color=000000&primary_color=a1854b"
                  title="Book a call with Todd"
                ></iframe>
              </div>
            </div>
          </section>

          {/* Strategy Session */}
          <section className={styles.strategySession}>
            <div className={styles.strategyContainer}>
              <div className={styles.strategyHeader}>
                <p className={styles.kicker}>What You&apos;ll Get On This Strategy Session</p>
                <h2 className={styles.strategyTitle}>What You&apos;re Gonna Get On This Call With Todd</h2>
              </div>
              <div className={styles.strategyGrid}>
                <StrategyCard
                  image="https://storage.googleapis.com/ployai/f2d044ac-086d-4245-9fc0-362ae1b2f109/user/44191b2b-todd-system-breakdown.webp"
                  title="A Personalized Breakdown"
                  description="Todd will review your playing and songs to pinpoint exactly what is keeping you stuck."
                />
                <StrategyCard
                  image="https://storage.googleapis.com/ployai/f2d044ac-086d-4245-9fc0-362ae1b2f109/user/0b47757e-todd-cgm-walkthrough.jpg"
                  title="The Billion-Play System"
                  description="Get a full walkthrough of the same music system behind records with more than a billion Spotify plays."
                />
                <StrategyCard
                  image="https://storage.googleapis.com/ployai/f2d044ac-086d-4245-9fc0-362ae1b2f109/user/df5ee954-todd-system-roadmap.jpg"
                  title="Your 45-Minute Roadmap"
                  description="Leave with a personalized roadmap showing how to finish and release songs in 45 minutes a day."
                />
              </div>
            </div>
          </section>

          {/* Tory Lanez Proof */}
          <section className={styles.toryProof}>
            <h2 className={styles.toryTitle}>
              Tory Lanez <span className={styles.accent}>PLAYBOY Live</span>
            </h2>
            <p className={styles.toryPosition}>(I&apos;m on the far right)</p>
            <div className={styles.toryVideo}>
              <iframe
                className={styles.youtubeFrame}
                src="https://www.youtube.com/embed/zig6qByF9bg?rel=0"
                title="Tory Lanez PLAYBOY Live featuring Todd Pritch on guitar"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className={styles.toryStats}>
              <div className={styles.stat}>
                <strong>24M</strong>
                <span>Views</span>
              </div>
              <div className={styles.stat}>
                <strong>1K</strong>
                <span>Comments</span>
              </div>
              <div className={styles.stat}>
                <strong>Guitar</strong>
                <span>Todd Pritch</span>
              </div>
            </div>
          </section>

          {/* People Proof */}
          <section className={styles.peopleProof}>
            <div className={styles.peopleContainer}>
              <h2 className={styles.peopleTitle}>
                They Were Exactly Where
                <br />
                You Are Right Now
              </h2>
              <p className={styles.stars}>★★★★★</p>
              <p className={styles.subhead}>Students Speak Real Results</p>
              <div className={styles.videoGrid}>
                <VideoTestimonial
                  src="https://assets.cdn.filesafe.space/yGBfnGqCAN92y74WUVAE/media/6a4c10292e40aeae0197f9ee.mov#t=0.1"
                  name="DAC"
                />
                <VideoTestimonial
                  src="https://assets.cdn.filesafe.space/yGBfnGqCAN92y74WUVAE/media/6a4c11bf9ec92688b5f2d558.mov#t=0.1"
                  name="Saagar"
                />
                <VideoTestimonial
                  src="https://assets.cdn.filesafe.space/yGBfnGqCAN92y74WUVAE/media/6a4c117a9ec92688b5f2ce4d.mov#t=0.1"
                  name="Garrett"
                />
              </div>
              <div className={styles.imageGrid}>
                <ImageTestimonial
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/065ac1e0-ab3e-4964-9689-a98071c59d0e/Stu+P.jpg"
                  name="Stu Partridge"
                  quote="Todd&apos;s fresh approach pushed my playing into another dimension. I&apos;ve never had this much fun learning guitar."
                />
                <ImageTestimonial
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/5dd09ff9-a7ed-48a9-a446-8fa60cf2f351/Alex+Pic.PNG?format=500w"
                  name="Alex Moses"
                  quote="Todd balances technique, soul, and creativity while helping players refine their own style."
                />
                <ImageTestimonial
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/63397fcc-80d5-4830-83ba-d932b9c1a220/Maxwell+B.jpg"
                  name="MXWLL"
                  quote="The way Todd strings together chords and progressions has been super inspiring for my playing and music."
                />
                <ImageTestimonial
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/5be3be89-22f5-4a2e-ac5d-6b7e66d21fa9/Andy+M.png?format=500w"
                  name="Andrew M."
                  quote="Todd helps us discover the awakened feeling of making music and a creative wellspring that makes life feel more alive."
                />
                <ImageTestimonial
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/3f2327a1-92cb-4105-af3c-bb6673f52ad5/Mark+Pic.jpg"
                  name="Mark Lettieri"
                  quote="Todd has a unique, refreshing sound and breaks down his style in a slow, methodical way that&apos;s easy to follow."
                  link="https://www.marklettieri.com/"
                />
              </div>
            </div>
          </section>

          {/* Credits */}
          <section className={styles.creditsProof}>
            <div className={styles.creditsContainer}>
              <h2 className={styles.creditsTitle}>More Music. More Proof.</h2>
              <p className={styles.earthgang}>Featuring EARTHGANG</p>
              <div className={styles.creditsGrid}>
                <CreditCard
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/1653671387629-ZRBRSVWBS2KA2L3JXAID/I+Could+Imagine+Alina+Baraz.jpeg"
                  title="I Could Imagine"
                  artist="Alina Baraz"
                />
                <CreditCard
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/1653671467039-KFY0Z6IAVV80V7MFQ7BA/VICES+Josh+Levi.jpeg"
                  title="VICES"
                  artist="Josh Levi"
                />
                <CreditCard
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/1653752836836-YGA5B2N9FC9AA18VD1JG/Take+Me+Away+%28feat.+EARTHGANG%29+Sin%C3%A9ad+Harnett%2C+EARTHGANG.jpeg"
                  title="Take Me Away"
                  artist="Sinéad Harnett / EARTHGANG"
                />
                <CreditCard
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/1653753019191-Z5D5DZOIYRZW7EBU3ZP3/Hands+On+Trey+Songz.jpeg"
                  title="Hands On"
                  artist="Trey Songz"
                />
                <CreditCard
                  image="https://images.squarespace-cdn.com/content/v1/628fb7e1b67a95179742993c/1653753080652-K7IDDXUHYZPVLU1AYHBZ/Mcgregor+Anuel+AA.jpeg"
                  title="Mcgregor"
                  artist="Anuel AA"
                />
              </div>
              <div className={styles.creditsCta}>
                <button className={styles.ctaButton} onClick={scrollToBooking}>
                  Book Your Guitar Strategy Session
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <p className={styles.disclaimer}>
              <span>This website is not part of the YouTube, Google, or Facebook website; Google Inc or Facebook Inc. Also, this website is</span>
              <span>NOT endorsed by YouTube, Google or Facebook in any way. FACEBOOK is a trademark of FACEBOOK Inc. YOUTUBE is a trademark of GOOGLE Inc.</span>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

function AlbumCard({ image, title, artist, role, streams }) {
  return (
    <article className={styles.albumCard}>
      <img className={styles.albumImage} src={image} alt={`${title} by ${artist} album art`} />
      <div className={styles.albumBody}>
        <p className={styles.albumRole}>{role}</p>
        <h3 className={styles.albumTitle}>{title}</h3>
        <p className={styles.albumArtist}>{artist}</p>
        <p className={styles.albumStreams}>{streams} Spotify streams</p>
      </div>
    </article>
  );
}

function StrategyCard({ image, title, description }) {
  return (
    <article className={styles.strategyCard}>
      <div className={styles.strategyMedia}>
        <img className={styles.strategyImage} src={image} alt={title} />
        <span className={styles.playIcon} aria-hidden="true">
          ▶
        </span>
      </div>
      <div className={styles.strategyBody}>
        <h3 className={styles.strategyCardTitle}>{title}</h3>
        <p className={styles.strategyDescription}>{description}</p>
      </div>
    </article>
  );
}

function VideoTestimonial({ src, name }) {
  return (
    <article className={styles.videoCard}>
      <video className={styles.testimonialVideo} src={src} controls playsInline preload="metadata" />
      <div className={styles.videoBody}>
        <h3 className={styles.videoName}>{name}</h3>
      </div>
    </article>
  );
}

function ImageTestimonial({ image, name, quote, link }) {
  return (
    <article className={styles.imageCard}>
      <img className={styles.testimonialImage} src={image} alt={name} />
      <div className={styles.testimonialBody}>
        <h3 className={styles.testimonialName}>{name}</h3>
        <p className={styles.testimonialQuote}>&quot;{quote}&quot;</p>
        {link && (
          <a className={styles.profileLink} href={link} target="_blank" rel="noreferrer">
            Official profile
          </a>
        )}
      </div>
    </article>
  );
}

function CreditCard({ image, title, artist }) {
  return (
    <article className={styles.creditCard}>
      <img className={styles.creditImage} src={image} alt={`${title} by ${artist} album art`} />
      <div className={styles.creditBody}>
        <h3 className={styles.creditName}>{title}</h3>
        <p className={styles.creditArtist}>{artist}</p>
      </div>
    </article>
  );
}
