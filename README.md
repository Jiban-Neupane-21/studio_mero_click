# 📸 Studio Mero Click

A modern photography studio website for **Studio Mero Click**, located at Rudramati Chowk, Kathmandu. The project is a full-featured public website (portfolio, services, booking, video showreel, learning resources) plus a password-protected admin portal for managing all content.

Built with **React 19 + TypeScript + Vite + Material UI (MUI) + Supabase**.

---

## ✨ Features

### Public Website
- **Home** – Hero, featured services, portraits grid, offers, restoration showcase, and more.
- **Services** – Service categories, sub-categories, detailed service pages with pricing/specs/FAQs, and online booking.
- **Products** – Product showcase with detail pages and product booking.
- **Portfolio Gallery** – Filterable grid by category (`?category=` query param) with a zoomable lightbox, prev/next navigation, and detail pages.
- **Videos** – Masterclass cinematic showreel (YouTube / Facebook / TikTok embeds), search + category filter, and a theater-style player (portrait TikTok view).
- **Learn From Us** – Tutorial videos and educational articles/handbooks.
- **Photo Restoration** – Dedicated restoration showcase and details.
- **Booking & Contact** – Booking flow and contact page.
- **Dark / Light mode** – Persisted to `localStorage` (`appMode`).

### Admin Portal (`/admin`)
Protected by Supabase authentication (`/login`). Includes dashboards to manage:

| Area | Description |
| --- | --- |
| Dashboard | Overview of the studio |
| Services | Service categories, sub-categories, features, FAQs |
| Products | Product catalog + booking info |
| Portfolio | Portfolio items with drag-and-drop ordering |
| Videos | Showcase video items (YouTube ID auto-extracted from links) |
| Tutorials | Tutorial videos |
| Learning | Learning articles & handbooks |
| Offer Ads | Homepage offer adverts |
| Restorations | Restoration showcase items |

> Content is stored in Supabase (PostgreSQL + Storage for images) and consumed through a central `DataContext` preloader.

---

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Vite 8
- **UI:** Material UI (MUI), Emotion, Lucide icons, React Icons, Framer Motion (`motion`)
- **Rich text:** react-quill-new (admin editors)
- **Backend:** Supabase (Auth, PostgreSQL database, Storage for image uploads)
- **Routing:** React Router v7 (`createBrowserRouter`)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- A [Supabase](https://supabase.com/) project (or the existing one, if you have access)

### 1. Clone the repository

```bash
git clone https://github.com/Jiban-Neupane-21/studio_mero_click.git
cd studio_mero_click
```

### 2. Install dependencies

```bash
npm install
```

> On Windows you can alternatively run `.\setup.ps1` to check Node, install dependencies, and verify the `.env` file.

### 3. Configure environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

- `VITE_SUPABASE_URL` – your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` – the project's **anon/publishable** key (safe for the browser)

> **Never** commit real credentials. `.env` is git-ignored; only `.env.example` is tracked.

### 4. Set up the database

Run the schema against your Supabase SQL editor (or via a migration tool):

- `supabase/schema.sql` – full database schema (all tables: services, products, portfolio_items, video_items, tutorial_videos, learning_articles, offer_ads, home_items, restoration_images, etc.)
- `migrations/*.sql` – incremental migrations (service categories, product/portfolio sort order)

Example tables created in the schema:

```
offer_ads            video_items          tutorial_videos
learning_articles    portfolio_items      service_categories
services             service_images       service_specifications
service_features     service_faqs         products
product_images       product_specifications  product_features
product_faqs         home_items           restoration_images
```

> The app reads data via Supabase REST (see `src/api/`), and images are uploaded to the **`images`** storage bucket.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (Vite runs with `--host 0.0.0.0 --port 3000`).

### 6. Log in to the admin portal

1. Visit [http://localhost:3000/login](http://localhost:3000/login)
2. Sign in with a Supabase Auth user created in your Supabase dashboard (**Authentication → Users → Add user**).
3. You'll be redirected to [http://localhost:3000/admin](http://localhost:3000/admin). Access is enforced by `ProtectedRoute`, which redirects unauthenticated visitors back to `/login`.

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Type-check (`tsc -b`) and build the production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the project |

---

## 📁 Project Structure

```
studio_mero_click/
├── src/
│   ├── Admin/              # Admin portal (layout, login, protected route, pages)
│   ├── api/                # Supabase data-access layer (one module per table)
│   ├── components/         # Shared & layout components (Navbar, Footer, grids, common)
│   ├── context/            # DataContext (preloads all content from Supabase)
│   ├── data/               # Static site data (nav items, services, portfolio categories, socials)
│   ├── hooks/              # Custom hooks (e.g. useMinDelay)
│   ├── pages/              # Public page routes (Home, Services, Portfolio, Videos, Learn, About...)
│   ├── routes/             # AppRoutes (React Router configuration)
│   ├── types/              # TypeScript interfaces (portfolio, video, tutorial, article...)
│   ├── utils/              # Supabase client, image upload, YouTube ID extractor
│   ├── App.tsx             # Theme provider + DataProvider + router
│   └── main.tsx            # App entry point
├── supabase/schema.sql     # Full database schema
├── migrations/             # Incremental SQL migrations
├── public/                 # Static assets (Logo.png)
├── .env.example            # Environment variable template
└── package.json
```

---

## 🔐 Security Notes

- Supabase anon key is public by design — enable **Row Level Security (RLS)** on your tables and lock write access to authenticated users only.
- Admin routes (`/admin/*`) are guarded client-side by `ProtectedRoute`; also enforce authorization in Supabase policies.
- Never commit `.env` or any real secrets.

---

## 🌍 Deployment

The repo includes cPanel deployment config (`.cpanel.yml`), which runs `npm install --omit=dev`, `npm run build`, and copies `dist/*` to the site directory (`studiomeroclick.com.np`). The `dist/` folder can also be served directly.

- **Build:** `npm run build`
- **Output:** `dist/`
- The `.htaccess` file is included for proper SPA (client-side routing) handling on Apache-based hosts.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes.
4. Push and open a pull request.

---

## 📄 License

Licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) license.
