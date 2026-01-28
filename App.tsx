
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { Admin } from './pages/Admin';
import { Events } from './pages/Events';
import { Artists } from './pages/Artists';
import { Technicians } from './pages/Technicians';
import { Venues } from './pages/Venues';
import { Agencies } from './pages/Agencies';
import { ServiceProviders } from './pages/ServiceProviders';
import { Opportunities } from './pages/Opportunities';
import { Studio } from './pages/Studio';
import { Content } from './pages/Content';
import { Messages } from './pages/Messages';
import { QuickStart } from './pages/QuickStart';
import { BookingWizard } from './pages/BookingWizard'; 
import { Modal } from './components/Modal';
import { CheckoutModal } from './components/CheckoutModal';
import { CreateEventWizard } from './pages/CreateEvent';
import { EventDetails } from './pages/EventDetails';
import { ArtistDetails } from './pages/ArtistDetails';
import { TechnicianDetails } from './pages/TechnicianDetails';
import { VenueDetails } from './pages/VenueDetails';
import { AgencyDetails } from './pages/AgencyDetails';
import { ProviderDetails } from './pages/ProviderDetails';
import { PublicEvent } from './pages/PublicEvent';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';
import { BasketProvider, useBasket } from './contexts/BasketContext';
import { TourProvider } from './contexts/TourContext';
import { ToastProvider } from './contexts/ToastContext';
import { SpotlightTour } from './components/SpotlightTour';
import { MobileNav } from './components/MobileNav';
import { Trash2, ArrowRight, ShoppingBag, ShieldAlert, ArrowLeft, Sparkles, Scale, Star, MapPin, List } from 'lucide-react';
import { mockArtists } from './services/api'; 

const Router: React.FC<{ 
  currentRoute: string; 
  routeParams?: any;
  onNavigate: (route: string, params?: any) => void;
  onOpenQuickStart?: () => void;
  onBack: () => void;
}> = ({ currentRoute, routeParams, onNavigate, onOpenQuickStart, onBack }) => {
  switch (currentRoute) {
    case 'home': return <Home onNavigate={onNavigate} />;
    case 'quick-start': return <QuickStart onNavigate={onNavigate} />;
    case 'booking-wizard': return <BookingWizard onNavigate={onNavigate} />;
    case 'messages': return <Messages onNavigate={onNavigate} />;
    case 'profile': return <Profile onNavigate={onNavigate} />;
    case 'admin': return <Admin onNavigate={onNavigate} />;
    case 'events': return <Events onNavigate={onNavigate} />;
    case 'event-details': return <EventDetails id={routeParams?.id} onNavigate={onNavigate} onBack={onBack} />;
    case 'artist-details': return <ArtistDetails id={routeParams?.id} onNavigate={onNavigate} onBack={onBack} />;
    case 'technician-details': return <TechnicianDetails id={routeParams?.id} onNavigate={onNavigate} onBack={onBack} />;
    case 'venue-details': return <VenueDetails id={routeParams?.id} onNavigate={onNavigate} onBack={onBack} />;
    case 'agency-details': return <AgencyDetails id={routeParams?.id} onNavigate={onNavigate} onBack={onBack} />;
    case 'provider-details': return <ProviderDetails id={routeParams?.id} onNavigate={onNavigate} onBack={onBack} />;
    case 'public-event': return <PublicEvent id={routeParams?.id} onNavigate={onNavigate} />;
    case 'artists': return <Artists onNavigate={onNavigate} />;
    case 'technicians': return <Technicians onNavigate={onNavigate} />;
    case 'venues': return <Venues onNavigate={onNavigate} />;
    case 'agencies': return <Agencies onNavigate={onNavigate} />;
    case 'providers': return <ServiceProviders onNavigate={onNavigate} />;
    case 'opportunities': return <Opportunities onNavigate={onNavigate} />;
    case 'studio': return <Studio />;
    case 'content': return <Content />;
    case 'about': return <About onNavigate={onNavigate} />;
    case 'create-event': return <CreateEventWizard onNavigate={onNavigate} onOpenQuickStart={onOpenQuickStart} />;
    default: return <Home onNavigate={onNavigate} />;
  }
};

const BasketModalContent: React.FC<{ onClose: () => void; onCheckout: () => void }> = ({ onClose, onCheckout }) => {
    const { items, removeFromBasket, clearBasket, addToBasket } = useBasket();
    const [compareMode, setCompareMode] = useState(false);

    // Mock recommendations when empty
    const recommended = mockArtists.slice(0, 2); 

    const handleAddRec = (item: any) => {
        addToBasket(item);
    };

    if (compareMode && items.length > 1) {
        return (
            <div className="animate-cinematic-fade p-2 h-[60vh] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-tiempos text-slate-900 dark:text-white">Talent Comparison</h3>
                    <button onClick={() => setCompareMode(false)} className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-mid-primary">Exit Comparison</button>
                </div>
                <div className="flex-1 overflow-x-auto">
                    <div className="flex gap-4 min-w-max">
                        {items.map(item => (
                            <div key={item.id} className="w-64 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                                <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-200">
                                    <img src={item.imageUrl} className="w-full h-full object-cover" />
                                </div>
                                <div className="text-center">
                                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                    <span className="text-[10px] text-slate-500 uppercase">{item.category}</span>
                                </div>
                                <div className="space-y-3 text-xs">
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-slate-500">Rating</span>
                                        <span className="font-bold flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-500 text-yellow-500"/> {item.rating}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-slate-500">Location</span>
                                        <span className="font-bold">{item.location || 'Tunis'}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-slate-500">Price Est.</span>
                                        <span className="font-bold">{item.price || 'Ask'}</span>
                                    </div>
                                </div>
                                <button onClick={() => removeFromBasket(item.id)} className="w-full py-2 rounded-lg bg-red-500/10 text-red-500 text-[10px] font-bold uppercase hover:bg-red-500 hover:text-white transition-all">Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-cinematic-fade space-y-6 p-2">
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-dashed border-slate-300 dark:border-white/10">
                        <List className="w-8 h-8 text-slate-400 dark:text-mid-text-muted" />
                    </div>
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-tiempos text-xl">Shortlist Empty</h3>
                        <p className="text-slate-500 dark:text-mid-text-subtle text-sm mt-1 max-w-xs mx-auto">Start exploring to add professionals. Here are some top picks for you:</p>
                    </div>
                    
                    {/* Smart Recommendations */}
                    <div className="grid grid-cols-2 gap-4 w-full pt-4">
                        {recommended.map(rec => (
                            <div key={rec.id} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 flex flex-col gap-3 group hover:border-mid-primary/30 transition-all cursor-pointer" onClick={() => handleAddRec(rec)}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-200"><img src={rec.imageUrl} className="w-full h-full object-cover" /></div>
                                    <div className="text-left min-w-0">
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{rec.title}</h4>
                                        <p className="text-[10px] text-slate-500 uppercase">{rec.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-[10px] font-bold text-mid-primary flex items-center gap-1"><Sparkles className="w-3 h-3" /> Recommended</span>
                                    <div className="w-6 h-6 rounded-full bg-white dark:bg-white/10 flex items-center justify-center group-hover:bg-mid-primary group-hover:text-white transition-colors"><ArrowRight className="w-3 h-3" /></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={onClose} className="mt-4 px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest transition-all hover:scale-105">
                        Browse Directory
                    </button>
                </div>
            ) : (
                <>
                    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 group hover:border-mid-primary/30 transition-all">
                                <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-mid-surface overflow-hidden shrink-0">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-slate-900 dark:text-white font-tiempos font-medium truncate">{item.title}</h4>
                                    <p className="text-slate-500 dark:text-mid-text-subtle text-xs truncate">{item.category} • {item.location}</p>
                                </div>
                                <button 
                                    onClick={() => removeFromBasket(item.id)}
                                    className="p-2 text-slate-400 dark:text-mid-text-muted hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className="pt-6 border-t border-slate-200 dark:border-white/10 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 dark:text-mid-text-muted">Shortlist Count</span>
                            <span className="text-slate-900 dark:text-white font-bold">{items.length} Candidates</span>
                        </div>
                        
                        {items.length > 1 && (
                            <button 
                                onClick={() => setCompareMode(true)}
                                className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                            >
                                <Scale className="w-4 h-4" /> Compare Talent
                            </button>
                        )}
                        
                        <div className="flex gap-3 pt-2">
                            <button 
                                onClick={clearBasket}
                                className="px-5 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-mid-text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-xs font-bold uppercase tracking-widest transition-all"
                            >
                                Clear
                            </button>
                            <button 
                                onClick={onCheckout}
                                className="flex-1 flex items-center justify-center gap-3 bg-mid-primary hover:bg-mid-primary/90 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-glow-blue transition-all active:scale-[0.98]"
                            >
                                Create Request <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const AppContent: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('route') || 'home';
  });
  
  const [routeParams, setRouteParams] = useState<any>(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id ? { id } : null;
  });

  const [history, setHistory] = useState<{route: string, params: any}[]>([]);
  
  const [isBasketModalOpen, setBasketModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [bumpAnimation, setBumpAnimation] = useState(false);
  
  const { requireAuth } = useAuth();
  const { totalItems, items } = useBasket();

  // Define routes where mobile nav should be hidden (detail pages & wizards)
  const isDetailView = [
    'event-details', 
    'artist-details', 
    'technician-details', 
    'venue-details', 
    'agency-details', 
    'provider-details', 
    'booking-wizard', 
    'create-event'
  ].includes(currentRoute);

  useEffect(() => {
    if (totalItems > 0) {
        setBumpAnimation(true);
        const timer = setTimeout(() => setBumpAnimation(false), 300);
        return () => clearTimeout(timer);
    }
  }, [totalItems]);

  const handleOpenCreateEvent = () => {
    requireAuth(() => handleNavigate('create-event'));
  };

  const handleBasketClick = () => {
    // Soft auth: allow view but maybe restrict checkout inside modal
    setBasketModalOpen(true);
  };

  const handleCheckout = () => {
      setBasketModalOpen(false);
      handleNavigate('booking-wizard');
  };

  const handleNavigate = (route: string, params?: any) => {
    if (route === currentRoute) return;
    setHistory(prev => [...prev, { route: currentRoute, params: routeParams }]);
    setCurrentRoute(route);
    setRouteParams(params);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    const newHistory = [...history];
    const prev = newHistory.pop();
    if (prev) {
        setHistory(newHistory);
        setCurrentRoute(prev.route);
        setRouteParams(prev.params);
    } else {
        setCurrentRoute('home');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => !prev);
  };

  if (currentRoute === 'admin') {
      return <Admin onNavigate={handleNavigate} />;
  }

  const isWizardRoute = currentRoute === 'create-event' || currentRoute === 'booking-wizard';
  const isPublicRoute = currentRoute === 'public-event';

  if (isPublicRoute) {
      return (
        <div className="relative min-h-screen text-slate-900 dark:text-mid-text-main font-sans overflow-x-hidden">
            <Router 
                currentRoute={currentRoute} 
                routeParams={routeParams} 
                onNavigate={handleNavigate} 
                onOpenQuickStart={() => handleNavigate('quick-start')}
                onBack={handleBack}
            />
            <AuthModal />
        </div>
      );
  }

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-mid-text-main font-sans selection:bg-mid-primary/30 selection:text-white overflow-x-hidden">
      <div className="bg-grain"></div>

      <Sidebar 
        currentRoute={currentRoute} 
        onNavigate={handleNavigate}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
        isExpanded={isSidebarExpanded}
        onToggle={toggleSidebar}
        onQuickStart={() => handleNavigate('quick-start')}
      />

      <TopBar 
        onCreateEvent={handleOpenCreateEvent} 
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onNavigate={handleNavigate}
        sidebarExpanded={isSidebarExpanded}
      />

      <div 
        className={`
          main-content
          transition-[margin] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-16'}
          ml-0
          pt-20
          pb-20 md:pb-0
        `}
      >
        <main className={`flex-1 w-full max-w-[1800px] mx-auto relative z-20 ${isWizardRoute ? 'p-0 md:p-2 lg:p-4' : 'p-4 md:p-6 lg:p-6'}`}>
          <Router 
              currentRoute={currentRoute} 
              routeParams={routeParams} 
              onNavigate={handleNavigate} 
              onOpenQuickStart={() => handleNavigate('quick-start')}
              onBack={handleBack}
          />
        </main>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isBasketModalOpen}
        onClose={() => setBasketModalOpen(false)}
        title="Your Selection"
      >
        <BasketModalContent onClose={() => setBasketModalOpen(false)} onCheckout={handleCheckout} />
      </Modal>

      <AuthModal />
      
      <SpotlightTour />

      {/* Mobile Navigation Bar - Hidden on Detail Pages */}
      {!isDetailView && (
        <MobileNav 
          currentRoute={currentRoute} 
          onNavigate={handleNavigate} 
          onOpenBasket={handleBasketClick}
        />
      )}

      {/* Floating Admin Button */}
      <div className="fixed bottom-24 md:bottom-6 left-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-500 hidden md:block">
        <button
          onClick={() => handleNavigate('admin')}
          className="group flex items-center justify-center w-12 h-12 md:w-auto md:h-auto md:px-5 md:py-3 bg-black/60 dark:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all duration-500 overflow-hidden"
          title="Admin Mission Control"
        >
            <div className="relative z-10 flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-white md:text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-cyan-300">Mission Control</span>
            </div>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
        </button>
      </div>

      {/* Cinematic Basket Dock (Desktop Only) */}
      {totalItems > 0 && !isWizardRoute && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden md:flex flex-col items-center animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className="bg-white/60 dark:bg-black/60 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-full p-2 pl-6 pr-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] flex items-center gap-6 ring-1 ring-black/5 dark:ring-white/5 hover:scale-[1.02] transition-transform duration-300">
                
                {/* 1. Visual Context (Facepile) */}
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-4 pl-1">
                        {items.slice(0, 4).map((item) => (
                            <div key={item.id} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#191919] overflow-hidden bg-slate-200 dark:bg-slate-800 relative z-0 hover:z-10 hover:scale-110 transition-transform shadow-sm">
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                        ))}
                        {totalItems > 4 && (
                            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#191919] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-white z-0 shadow-sm">
                                +{totalItems - 4}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">{totalItems} {totalItems === 1 ? 'Pro' : 'Pros'} Selected</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Ready for booking</span>
                    </div>
                </div>

                {/* 2. Divider */}
                <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10"></div>

                {/* 3. Action */}
                <button 
                    onClick={handleBasketClick}
                    className="flex items-center gap-3 bg-mid-primary hover:bg-mid-primary/90 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-glow-blue transition-all active:scale-95 group"
                >
                    Finalize <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BasketProvider>
        <TourProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </TourProvider>
      </BasketProvider>
    </AuthProvider>
  );
};

export default App;
