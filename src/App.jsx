import { useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import CustomCursor from './components/CustomCursor';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import NetworkSection from './components/NetworkSection';
import EventsSection from './components/EventsSection';
import Footer from './components/Footer';
import { AuthProvider } from './admin/AuthContext';
import ProtectedRoute from './admin/ProtectedRoute';
import './styles/global.css';

// Heavy pages & 3D — lazy loaded so Three.js doesn't block initial paint
const Hero3D    = lazy(() => import('./components/Hero3D'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const Team      = lazy(() => import('./pages/Team'));
const Department = lazy(() => import('./pages/Department'));
const GalleryPage = lazy(() => import('./pages/Gallery'));
const EventDetails = lazy(() => import('./pages/EventDetails'));

// Admin pages — lazy loaded
const AdminLogin  = lazy(() => import('./admin/AdminLogin'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const Dashboard   = lazy(() => import('./admin/pages/Dashboard'));
const HomeEvents  = lazy(() => import('./admin/pages/HomeEvents'));
const Achievements = lazy(() => import('./admin/pages/DepartmentAchievements'));
const Gallery     = lazy(() => import('./admin/pages/EventGallery'));
const TeamMgmt    = lazy(() => import('./admin/pages/TeamManagement'));
const DeptMgmt    = lazy(() => import('./admin/pages/DepartmentManagement'));
const Settings    = lazy(() => import('./admin/pages/GeneralSettings'));

function HomePage({ centerCardRef, networkHubRef }) {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <>
      <NetworkSection ref={networkHubRef} />
      <EventsSection ref={centerCardRef} />
    </>
  );
}

function App() {
  const footerLogoRef = useRef(null);
  const centerCardRef = useRef(null);
  const networkHubRef = useRef(null);

  return (
    <BrowserRouter basename="/IETE">
      <AuthProvider>
        <Routes>
          {/* ── Admin routes (no Navbar/Cursor) ── */}
          <Route path="/admin/login" element={<Suspense fallback={<AdminLoader />}><AdminLogin /></Suspense>} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Suspense fallback={<AdminLoader />}>
                  <AdminLayout />
                </Suspense>
              </ProtectedRoute>
            }
          >
            <Route index element={<Suspense fallback={null}><Dashboard /></Suspense>} />
            <Route path="home-events" element={<Suspense fallback={null}><HomeEvents /></Suspense>} />
            <Route path="achievements" element={<Suspense fallback={null}><Achievements /></Suspense>} />
            <Route path="gallery" element={<Suspense fallback={null}><Gallery /></Suspense>} />
            <Route path="departments" element={<Suspense fallback={null}><DeptMgmt /></Suspense>} />
            <Route path="team" element={<Suspense fallback={null}><TeamMgmt /></Suspense>} />
            <Route path="settings" element={<Suspense fallback={null}><Settings /></Suspense>} />
          </Route>

          {/* ── Public routes (with Navbar/Cursor) ── */}
          <Route
            path="/*"
            element={
              <>
                {/* <CursorRouterWrapper /> */}
                <Navbar />
                
                <Suspense fallback={
                  <div style={{ 
                    minHeight: '100vh', 
                    background: '#0a0a0a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-green)',
                    fontSize: '1.2rem',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-[var(--accent-green)] border-t-transparent rounded-full animate-spin" />
                      <span>Initializing Experience...</span>
                    </div>
                  </div>
                }>
                  <Hero3D 
                    centerCardRef={centerCardRef} 
                    networkHubRef={networkHubRef}
                    footerLogoRef={footerLogoRef} 
                  />
                  
                  <Routes>
                    <Route path="/" element={<HomePage 
                      centerCardRef={centerCardRef} 
                      networkHubRef={networkHubRef} 
                    />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/events/:id" element={<EventDetails />} /> {/* New dynamic route */}
                    <Route path="/gallery/:eventId" element={<GalleryPage />} /> {/* New dynamic route */}
                    <Route path="/team" element={<Team />} />
                    <Route path="/department" element={<Department />} />
                  </Routes>
                </Suspense>
                
                <Footer logoRef={footerLogoRef} />
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

function AdminLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="w-10 h-10 border-4 border-[var(--accent-green)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function CursorRouterWrapper() {
  const location = useLocation();
  const cursorColor = 'green';
  return <CustomCursor color={cursorColor} />;
}

export default App;
