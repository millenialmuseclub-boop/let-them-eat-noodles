import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TopNavBar } from './components/TopNavBar';
import { BottomTabBar } from './components/BottomTabBar';

/* Route-level code splitting from the start, per Cookies' documented bundle-size lesson — this
   avoids retrofitting it later once the 50-60 dish saturation pass adds significantly more data
   and pages. */
const MainPage = lazy(() => import('./pages/MainPage').then((m) => ({ default: m.MainPage })));
const EncyclopediaIndexPage = lazy(() => import('./pages/EncyclopediaIndexPage').then((m) => ({ default: m.EncyclopediaIndexPage })));
const NoodleTypeIndexPage = lazy(() => import('./pages/NoodleTypeIndexPage').then((m) => ({ default: m.NoodleTypeIndexPage })));
const NoodleTypeDetailPage = lazy(() => import('./pages/NoodleTypeDetailPage').then((m) => ({ default: m.NoodleTypeDetailPage })));
const DishDetailPage = lazy(() => import('./pages/DishDetailPage').then((m) => ({ default: m.DishDetailPage })));
const AtlasPage = lazy(() => import('./pages/AtlasPage').then((m) => ({ default: m.AtlasPage })));
const WorkshopPage = lazy(() => import('./pages/WorkshopPage').then((m) => ({ default: m.WorkshopPage })));
const LabPage = lazy(() => import('./pages/LabPage').then((m) => ({ default: m.LabPage })));
const TroubleshooterPage = lazy(() => import('./pages/TroubleshooterPage').then((m) => ({ default: m.TroubleshooterPage })));
const SommelierFindPage = lazy(() => import('./pages/SommelierFindPage').then((m) => ({ default: m.SommelierFindPage })));
const TwirlPage = lazy(() => import('./pages/TwirlPage').then((m) => ({ default: m.TwirlPage })));
const TwirlStoryPage = lazy(() => import('./pages/TwirlStoryPage').then((m) => ({ default: m.TwirlStoryPage })));
const MyNoodlesPage = lazy(() => import('./pages/MyNoodlesPage').then((m) => ({ default: m.MyNoodlesPage })));
const CuratedKitchenPage = lazy(() => import('./pages/CuratedKitchenPage').then((m) => ({ default: m.CuratedKitchenPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

function App() {
  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="app-shell">
        <TopNavBar />
        <main id="main-content" className="app-content">
          <Suspense fallback={<div className="page-container">Loading…</div>}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/encyclopedia" element={<EncyclopediaIndexPage />} />
              <Route path="/encyclopedia/noodle-types" element={<NoodleTypeIndexPage />} />
              <Route path="/encyclopedia/type/:id" element={<NoodleTypeDetailPage />} />
              <Route path="/encyclopedia/:id" element={<DishDetailPage />} />
              <Route path="/atlas" element={<AtlasPage />} />
              <Route path="/workshop" element={<WorkshopPage />} />
              <Route path="/workshop/lab/:slug" element={<LabPage />} />
              <Route path="/workshop/troubleshooter" element={<TroubleshooterPage />} />
              <Route path="/sommelier" element={<SommelierFindPage />} />
              <Route path="/twirl" element={<TwirlPage />} />
              <Route path="/twirl/:slug" element={<TwirlStoryPage />} />
              <Route path="/my-noodles" element={<MyNoodlesPage />} />
              <Route path="/curated-kitchen" element={<CuratedKitchenPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <BottomTabBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
