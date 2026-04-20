import { useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useLocation } from "wouter";
import AdminContacts from "@/components/admin/AdminContacts";
import AdminFabrikRH from "@/components/admin/AdminFabrikRH";
import AdminCatalogue from "@/components/admin/AdminCatalogue";
import AdminNewsletter from "@/components/admin/AdminNewsletter";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminActualites from "@/components/admin/AdminActualites";
import AdminReferences from "@/components/admin/AdminReferences";

type Tab = "contacts" | "fabrik" | "catalogue" | "newsletter" | "blog" | "actualites" | "references";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "contacts",    label: "Contacts",       icon: "📋" },
  { id: "fabrik",      label: "Fabrik RH",      icon: "🏭" },
  { id: "catalogue",   label: "Catalogue",      icon: "📚" },
  { id: "newsletter",  label: "Newsletter",     icon: "📧" },
  { id: "blog",        label: "Blog",           icon: "✍️" },
  { id: "actualites",  label: "Actualités",     icon: "📰" },
  { id: "references",  label: "Références",     icon: "🏢" },
];

export default function AdminDashboard() {
  const { logout } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("contacts");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    setLocation("/admin/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "contacts":    return <AdminContacts />;
      case "fabrik":      return <AdminFabrikRH />;
      case "catalogue":   return <AdminCatalogue />;
      case "newsletter":  return <AdminNewsletter />;
      case "blog":        return <AdminBlog />;
      case "actualites":  return <AdminActualites />;
      case "references":  return <AdminReferences />;
    }
  };

  return (
    <div className="admin-layout">
      {/* ── Sidebar ── */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="admin-sidebar__header">
          <img
            src="https://deoconseil.com/wp-content/uploads/elementor/thumbs/logo-footer-polc7w0k54rgr9jtz50itm1m0b0eowuwjefg79qsoa.png"
            alt="DEO Conseil"
            className="admin-sidebar__logo"
          />
          <button
            className="admin-sidebar__toggle"
            onClick={() => setSidebarOpen(o => !o)}
            title={sidebarOpen ? "Réduire" : "Agrandir"}
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="admin-sidebar__nav">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`admin-nav-item ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="admin-nav-icon">{tab.icon}</span>
              {sidebarOpen && <span className="admin-nav-label">{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <span>🚪</span>
            {sidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar__title">
            <span className="admin-topbar__icon">
              {TABS.find(t => t.id === activeTab)?.icon}
            </span>
            <h1>{TABS.find(t => t.id === activeTab)?.label}</h1>
          </div>
          <div className="admin-topbar__right">
            <span className="admin-topbar__user">deoconseilrh@gmail.com</span>
          </div>
        </header>

        <div className="admin-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
