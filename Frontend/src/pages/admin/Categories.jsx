import { useState, useEffect } from 'react';
import { getCategories, createCategory, toggleCategoryStatus } from '../../api/adminApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FolderPlus, Tags, CheckCircle2, XCircle, Power, Layers } from 'lucide-react';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    type: 'technical'
  });

  const fetchCats = () => {
    getCategories()
      .then((res) => {
        const data = res.data.data || res.data;
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('Error fetching categories:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setIsSubmitting(true);
    try {
      await createCategory(form);
      setForm({ name: '', description: '', type: 'technical' });
      fetchCats();
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleCategoryStatus(id);
      fetchCats();
    } catch (error) {
      alert(error.response?.data?.message || 'Error toggling status');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Tags className="text-blue-800" size={28} />
            Category Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Organize assessment topics and skills for the question bank.
          </p>
        </div>
      </div>

      {/* Add New Category Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 max-w-3xl">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5">
          <FolderPlus size={20} className="text-blue-800" />
          <h2 className="font-bold text-slate-800 text-base">Add New Category</h2>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Category Name
              </label>
              <input
                type="text"
                placeholder="e.g. JavaScript, System Design"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Category Type
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200 font-medium text-slate-700"
              >
                <option value="technical">Technical</option>
                <option value="aptitude">Aptitude</option>
                <option value="soft-skill">Soft Skill</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Description (Optional)
            </label>
            <input
              type="text"
              placeholder="Brief description about this category..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-900/20 active:scale-95 disabled:opacity-60 transition-all duration-200"
            >
              <FolderPlus size={16} className="text-cyan-400" />
              <span>{isSubmitting ? 'Saving...' : 'Add Category'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-blue-800" />
            <h3 className="font-bold text-slate-800">All Categories</h3>
          </div>
          <span className="text-xs font-bold bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-100">
            Total: {categories.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase tracking-wider font-bold text-slate-500">
                <th className="p-4 pl-6">Category Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-400 font-medium">
                    No categories found. Create your first one above!
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-slate-50/50 transition-colors duration-150">
                    <td className="p-4 pl-6 font-semibold text-slate-800">
                      <div>{cat.name}</div>
                      {cat.description && (
                        <div className="text-xs font-normal text-slate-400 mt-0.5">{cat.description}</div>
                      )}
                    </td>
                    <td className="p-4 capitalize">
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 text-slate-600">
                        {cat.type}
                      </span>
                    </td>
                    <td className="p-4">
                      {cat.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                          <CheckCircle2 size={13} className="text-emerald-600" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                          <XCircle size={13} className="text-slate-400" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => handleToggle(cat._id)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 active:scale-95 transition-all duration-200"
                      >
                        <Power size={13} className={cat.status === 'active' ? 'text-rose-500' : 'text-emerald-500'} />
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}