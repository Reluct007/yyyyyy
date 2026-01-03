"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Mail, 
  Globe, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Save, 
  CheckCircle, 
  AlertCircle,
  User,
  Clock,
  Search,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [activeTab, setActiveTab] = useState('seo');
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yooyooy.com';

  const [formData, setFormData] = useState({
    contactEmail: '',
    fromEmail: '',
    fromName: '',
    siteName: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }
    loadData(token);
  }, [router]);

  const loadData = async (token) => {
    try {
      const configRes = await fetch(`${API_URL}/api/admin/config`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const configData = await configRes.json();

      if (!configRes.ok && configRes.status === 401) {
        localStorage.removeItem('admin_token');
        router.push('/admin');
        return;
      }

      if (configData.success) {
        setConfig(configData.config);
        setFormData({
          contactEmail: configData.config.contactEmail || '',
          fromEmail: configData.config.fromEmail || '',
          fromName: configData.config.fromName || 'Labubu Wholesale',
          siteName: configData.config.siteName || 'Labubu Wholesale',
          seoTitle: configData.config.seoTitle || '',
          seoDescription: configData.config.seoDescription || '',
          seoKeywords: configData.config.seoKeywords || '',
        });
      }
    } catch (err) {
      console.error('Load error:', err);
      setMessage({ type: 'error', text: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (triggerDeploy = false) => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }

    setSaving(true);
    if (triggerDeploy) setDeploying(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch(`${API_URL}/api/admin/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, triggerDeploy }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.deploy?.triggered) {
          setMessage({ type: 'success', text: 'Settings saved! Site rebuild started. Changes will be live in 1-2 minutes.' });
        } else {
          setMessage({ type: 'success', text: 'Settings saved successfully!' });
        }
        setConfig(data.config);
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      } else {
        setMessage({ type: 'error', text: data.msg || 'Failed to save' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection error' });
    } finally {
      setSaving(false);
      setDeploying(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'seo', label: 'SEO Settings', icon: Search },
    { id: 'site', label: 'Site Info', icon: Globe },
    { id: 'email', label: 'Email Settings', icon: Mail },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Manage your website settings</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                href="/" 
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">View Site</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Message Toast */}
        {message.text && (
          <div className={`fixed top-20 right-6 z-20 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg transition-all max-w-md ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="font-medium text-sm">{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sticky top-24">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-orange-50 text-orange-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Last Updated Info */}
            {config?.updatedAt && (
              <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Last Updated</span>
                </div>
                <p className="text-gray-700 text-sm font-medium">
                  {new Date(config.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                {config.updatedBy && (
                  <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                    <User className="w-4 h-4" />
                    <span>{config.updatedBy}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* SEO Settings Tab */}
            {activeTab === 'seo' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Search className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">SEO Settings</h2>
                      <p className="text-sm text-gray-500">Configure search engine optimization</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* SEO Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Page Title (Title Tag)
                    </label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      placeholder="Labubu Wholesale - Premium Designer Collectibles & Custom Toys"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-gray-500">Recommended: 50-60 characters</span>
                      <span className={`${formData.seoTitle.length > 60 ? 'text-amber-600' : 'text-gray-400'}`}>
                        {formData.seoTitle.length}/60
                      </span>
                    </div>
                  </div>

                  {/* SEO Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      rows={3}
                      placeholder="Premium Labubu wholesale collectibles for distributors & retailers. Custom designer toys, vinyl figures, and plush collectibles."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                    />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-gray-500">Recommended: 150-160 characters</span>
                      <span className={`${formData.seoDescription.length > 160 ? 'text-amber-600' : 'text-gray-400'}`}>
                        {formData.seoDescription.length}/160
                      </span>
                    </div>
                  </div>

                  {/* SEO Keywords */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      value={formData.seoKeywords}
                      onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                      placeholder="labubu, wholesale, designer toys, collectibles, vinyl figures"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Separate keywords with commas
                    </p>
                  </div>

                  {/* Info Notice */}
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-green-700">
                      <p className="font-medium mb-1">Live Updates</p>
                      <p>SEO changes take effect immediately. The site will use the new settings on the next page load (within 1 minute due to caching).</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Site Settings Tab */}
            {activeTab === 'site' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Site Information</h2>
                      <p className="text-sm text-gray-500">Configure your website branding</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Site Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Site Name / Brand
                    </label>
                    <input
                      type="text"
                      value={formData.siteName}
                      onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                      placeholder="Your Website Name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Displayed in navbar and footer (updates immediately)
                    </p>
                  </div>

                  {/* Info Notice */}
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-green-700">
                      <p className="font-medium mb-1">Live Updates</p>
                      <p>Site Name changes are reflected immediately in the navbar and footer after saving. Just refresh the page.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Email Settings Tab */}
            {activeTab === 'email' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Email Settings</h2>
                      <p className="text-sm text-gray-500">Configure email notifications</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Contact Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Receives contact form and quote request submissions
                    </p>
                    {config?._effectiveContactEmail && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Active: {config._effectiveContactEmail}</span>
                      </div>
                    )}
                  </div>

                  {/* From Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      From Email
                    </label>
                    <input
                      type="email"
                      value={formData.fromEmail}
                      onChange={(e) => setFormData({ ...formData, fromEmail: e.target.value })}
                      placeholder="noreply@yourdomain.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Sender address for outgoing emails
                    </p>
                    {config?._effectiveFromEmail && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Active: {config._effectiveFromEmail}</span>
                      </div>
                    )}
                    <div className="mt-2 flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-amber-700">
                        Domain must be verified in Resend dashboard
                      </span>
                    </div>
                  </div>

                  {/* From Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      From Name
                    </label>
                    <input
                      type="text"
                      value={formData.fromName}
                      onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
                      placeholder="Your Company Name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Display name shown in recipients' inbox
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-500/25"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
