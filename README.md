# Museo

An interactive art gallery built with React, powered by the Art Institute of Chicago's public API.
Browse thousands of artworks, search by artist, and save your favorites.

**Live demo** → [museo-app-zeta.vercel.app](https://museo-app-zeta.vercel.app)

---

## Screenshots

[![Accueil](https://raw.githubusercontent.com/MTDev2024/Museo/main/public/screenshots/museo_home.png)](https://museo-app-zeta.vercel.app)
[![Galerie](https://raw.githubusercontent.com/MTDev2024/Museo/main/public/screenshots/museo_gallery.png)](https://museo-app-zeta.vercel.app)
[![Détail d'une oeuvre](https://raw.githubusercontent.com/MTDev2024/Museo/main/public/screenshots/museo_artwork.png)](https://museo-app-zeta.vercel.app)
[![Favoris](https://raw.githubusercontent.com/MTDev2024/Museo/main/public/screenshots/museo_favorites.png)](https://museo-app-zeta.vercel.app)

---

## Lighthouse

<p align="center">
  <img src="https://raw.githubusercontent.com/MTDev2024/Museo/main/public/screenshots/Lighthouse.png" width="450" />
</p>

---

## Features

- Artist search (Van Gogh, Monet, Caravaggio...)
- Gallery with load-more pagination
- Artwork detail page with parallax and fullscreen zoom
- Favorites system (localStorage)
- Dark / light theme
- Particle background (React Three Fiber)
- Page transitions and scroll animations (Framer Motion)

---

## Tech Stack

| Layer       | Technology                                  |
|-------------|---------------------------------------------|
| Framework   | React + Vite                                |
| Styling     | Tailwind CSS v4                             |
| Routing     | React Router DOM                            |
| Animations  | Framer Motion                               |
| 3D / FX     | React Three Fiber (particles)               |
| API         | Art Institute of Chicago (free, no API key) |

---

## Getting Started

### Installation

```bash
git clone https://github.com/MTDev2024/Museo.git
cd Museo
npm install
```

### Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
```

---

## API

This project uses the [Art Institute of Chicago API](https://api.artic.edu/docs/) -
completely free - no API key required.

---

## Author

Michael Takbou · [LinkedIn](https://www.linkedin.com/in/michael-takbou/) · [Malt](https://www.malt.fr/profile/michaeltakbou)
