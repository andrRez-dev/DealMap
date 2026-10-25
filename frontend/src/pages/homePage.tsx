import '../components/home.css'

export default function Home() {
  return (

<div className="phone">
  <div className="status">
    <span>9:41</span>
    <div className="status-icons"><span className="signal">▂▄▆</span><span>Wi-Fi</span><span className="battery"></span></div>
  </div>

  <header>
    <div>
      <div className="brand">
        <div className="logo">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
            <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" stroke="white" strokeWidth="1.8"/>
            <circle cx="12" cy="9" r="2.5" stroke="white" strokeWidth="1.8"/>
            <path d="m15.7 16.4 4.4.1-1.8 3.1" stroke="#d8f36b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="brandname">Deal<span>Map</span></div>
      </div>
      <div className="location">⌖ <span><strong>Klaipėda</strong> · near me</span>⌄</div>
    </div>
    <div className="profile">🙂</div>
  </header>

  <main>
    <div className="greeting">Saturday, October 24<b>What’s a good deal today?</b></div>

    <label className="search">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#77847b" strokeWidth="2">
        <circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>
      </svg>
      <input placeholder="Search products or stores" />
      <span className="shortcut">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#17865a" strokeWidth="1.8">
          <path d="M12 3v18M3 12h18"/>
        </svg>
      </span>
    </label>

    <section className="nearby-section">
      <div className="section-head"><h2>Deals nearby</h2><a href="#offers">All deals&nbsp; ↗</a></div>
      <div className="filters">
        <span className="chip active">All deals</span>
        <span className="chip">Groceries</span>
        <span className="chip">Within 1 km</span>
        <span className="chip">20% off or more</span>
      </div>

      <div className="map">
        <svg viewBox="0 0 360 190" preserveAspectRatio="none">
          <rect width="360" height="190" fill="#e7efe3"/>
          <path d="M-10 42 370 118M-10 160 370 26M72-10 158 205M265-10 196 205" stroke="#fff" strokeWidth="13"/>
          <path d="M-10 42 370 118M-10 160 370 26M72-10 158 205M265-10 196 205" stroke="#d4dfd1" strokeWidth="1.2"/>
          <path d="M0 94 360 161M119 0 52 190M309 0 350 190" stroke="#fff" strokeWidth="7"/>
          <path d="M0 94 360 161M119 0 52 190M309 0 350 190" stroke="#d4dfd1" strokeWidth=".8"/>
          <path d="M0 0h46v22H0zm293 28h48v25h-48zm-12 137h68v25h-68zM12 128h32v32H12zm101-99h37v20h-37zm118 40h26v25h-26z" fill="#dbe8d6"/>
          <path d="M0 176c55-13 77-3 116 5s81-2 117-17 78-6 127 2" stroke="#b8dce5" strokeWidth="7" fill="none"/>
        </svg>
        <div className="map-top"><div className="map-label">⌖ &nbsp;Deals map</div><div className="map-zoom">⌗</div></div>
        <div className="pin p1"><b>€3,99</b></div>
        <div className="pin p2"><b>−20%</b></div>
        <div className="pin p3"><b>−15%</b></div>
        <div className="you"></div>
        <div className="map-caption">12 deals within 2 km</div>
      </div>
    </section>

    <section className="best-section">
      <div className="section-head"><h2>Best deals</h2><a href="#offers">View all</a></div>
      <div className="offers" id="offers">
      <article className="offer">
        <div className="product">🍗<span className="discount">−25%</span></div>
        <div className="offer-info">
          <div className="offer-title">Chicken breast</div>
          <div className="store">Lidl · Taikos Ave. · 0.8 km</div>
          <div className="fresh"><i></i>Recently verified</div>
        </div>
        <div className="price"><strong>€3.99</strong><del>€5.29</del><div className="distance">until Oct 27</div></div>
      </article>

      <article className="offer">
        <div className="product milk">🥛<span className="discount">−20%</span></div>
        <div className="offer-info">
          <div className="offer-title">Milk 2.5%, 1 L</div>
          <div className="store">Rimi · Liepų St. · 1.4 km</div>
          <div className="fresh"><i></i>Confirmed by 8 people</div>
        </div>
        <div className="price"><strong>€0.95</strong><del>€1.19</del><div className="distance">until Oct 26</div></div>
      </article>

      <article className="offer">
        <div className="product pasta">🍝<span className="discount">−15%</span></div>
        <div className="offer-info">
          <div className="offer-title">Spaghetti</div>
          <div className="store">Maxima · H. Manto St. · 0.6 km</div>
          <div className="fresh"><i></i>Added 1 hour ago</div>
        </div>
        <div className="price"><strong>€1.69</strong><del>€1.99</del><div className="distance">until Oct 29</div></div>
      </article>
      </div>
    </section>
  </main>

  <button className="add"><span>＋</span> Add a deal</button>

  <nav>
    <div className="navitem active">
      <div className="navicon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5z"/><path d="M9 21v-7h6v7"/></svg></div>
      Home
    </div>
    <div className="navitem">
      <div className="navicon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><circle cx="10.8" cy="10.8" r="7.1"/><path d="m16 16 5 5M7.5 10.8h6.6M10.8 7.5v6.6"/></svg></div>
      Search
    </div>
    <div className="navitem">
      <div className="navicon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg></div>
      Map
    </div>
    <div className="navitem">
      <div className="navicon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M20.8 8.6c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11a4.7 4.7 0 0 1 8.8-2.5 4.7 4.7 0 0 1 8.8 2.5Z"/></svg></div>
      Favorites
    </div>
  </nav>
</div>

  );
}
