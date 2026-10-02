import Image from "next/image";
import Link from "next/link";
import { formatPrice, menuItems } from "./menu-data";

export default function Home() {
  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> A taste of home, in the heart of Addis</p>
          <h1>Gather around.<br />Eat with <em>heart.</em></h1>
          <p className="hero-description">
            Rich, slow-cooked Ethiopian favourites, fresh injera and a table
            made for sharing. There&apos;s always room for one more.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/menu">Explore the menu <span aria-hidden="true">↗</span></Link>
            <a className="text-link" href="#visit">Come dine with us <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-note">
            <span className="mini-stars" aria-label="Five stars">★★★★★</span>
            <span>Made from scratch. Shared with love.</span>
          </div>
        </div>
        <div className="hero-art" role="img" aria-label="A colourful Ethiopian-inspired shared meal">
          <div className="hero-image">
            <Image
              src="/A colourful Ethiopian-inspired shared meal.jfif"
              alt="A vibrant, generously shared meal"
              fill
              priority
              unoptimized
              sizes="(max-width: 800px) 90vw, 46vw"
            />
          </div>
          <div className="hero-sticker"><span>Made for</span><strong>sharing</strong><span className="sticker-spark">✳</span></div>
          <span className="hero-caption">A little spice. A lot of soul.</span>
        </div>
      </section>

      <section className="welcome-strip">
        <div className="shell welcome-inner">
          <span className="strip-icon">✳</span>
          <p>Good food brings us closer. <span>We saved you a seat.</span></p>
          <Link href="/menu">See what&apos;s cooking <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="section shell" id="menu">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Made to be passed around</p>
            <h2>A few house <em>favourites</em></h2>
          </div>
          <Link className="text-link" href="/menu">See the full menu <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="featured-grid">
          {menuItems.slice(0, 3).map((item, index) => (
            <Link className="featured-card" href={`/menu/${item.id}`} key={item.id}>
              <div className={`food-image food-image-${index + 1}`}>
                <Image src={item.image} alt={item.name} fill unoptimized sizes="(max-width: 700px) 90vw, 30vw" />
                {item.tag && <span className="food-tag">{item.tag}</span>}
              </div>
              <div className="featured-info">
                <div><h3>{item.name}</h3><p>{item.serves}</p></div>
                <strong>{formatPrice(item.price)}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="shell story-layout">
          <div className="story-art" aria-hidden="true"><span>ቤት</span><i>✳</i></div>
          <div className="story-copy">
            <p className="eyebrow">Welcome to our table</p>
            <h2>More than a meal.<br /><em>A way to be together.</em></h2>
            <p>
              In Ethiopia, the best meals are the ones shared. We bring that
              feeling to every table—with recipes passed down, spices toasted
              by hand, and injera made fresh each day.
            </p>
            <Link className="text-link" href="/menu">Come hungry, leave happy <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="visit-section shell" id="visit">
        <div>
          <p className="eyebrow">Your table is waiting</p>
          <h2>Let&apos;s make a<br /><em>meal of it.</em></h2>
        </div>
        <div className="visit-details">
          <p>Join us for a long lunch, a cosy dinner, or order your favourites to share at home.</p>
          <div className="visit-actions">
            <a className="button button-dark" href="tel:+251911000000">Call to reserve <span aria-hidden="true">↗</span></a>
            <Link className="text-link" href="/menu">Order from our menu <span aria-hidden="true">→</span></Link>
          </div>
          <small>Open daily · 11:00 – 22:00 · Addis Ababa</small>
        </div>
      </section>
    </main>
  );
}
