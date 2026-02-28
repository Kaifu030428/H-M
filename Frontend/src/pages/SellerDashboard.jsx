import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";

// ─── Icons ───────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const PlusIcon = () => <Icon d="M12 5v14M5 12h14" />;
const TrashIcon = () => <Icon d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />;
const EditIcon = () => <Icon d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />;
const LogoutIcon = () => <Icon d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />;
const PackageIcon = () => <Icon d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />;
const ImageIcon = () => <Icon d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14l4-4h12zM8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />;
const XIcon = () => <Icon d="M18 6L6 18M6 6l12 12" />;

// ─── Category options ─────────────────────────────────────────────────────────
const CATEGORIES = ["ladies", "men", "kids", "beauty"];
const CURRENCIES = ["INR", "USD", "EUR"];

// ─── Empty form state ─────────────────────────────────────────────────────────
const emptyForm = {
  productName: "", amount: "", currency: "INR",
  description: "", category: "ladies",
  size: "", color: "",
};

// ─── Product Form Modal ───────────────────────────────────────────────────────
const ProductModal = ({ onClose, onSave, editProduct }) => {
  const [form, setForm] = useState(editProduct ? {
    productName: editProduct.productName,
    amount: editProduct.price?.amount || "",
    currency: editProduct.price?.currency || "INR",
    description: editProduct.description || "",
    category: editProduct.category || "ladies",
    size: (editProduct.sizes || []).join(", "),
    color: (editProduct.colors || []).join(", "),
  } : emptyForm);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState(editProduct?.images || []);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const handleFile = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setPreviews(selected.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editProduct && files.length === 0) {
      toast.error("Please select at least one image");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("productName", form.productName);
      fd.append("amount", form.amount);
      fd.append("currency", form.currency);
      fd.append("description", form.description);
      fd.append("category", form.category);
      fd.append("size", form.size);
      fd.append("color", form.color);
      files.forEach(f => fd.append("images", f));

      if (editProduct) {
        await axiosInstance.put(`/products/update/${editProduct._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Product updated!");
      } else {
        await axiosInstance.post("/products/create", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Product created!");
      }
      onSave();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.modalHeader}>
          <span style={styles.modalTitle}>{editProduct ? "Edit Product" : "Add New Product"}</span>
          <button onClick={onClose} style={styles.iconBtn}><XIcon /></button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Image Upload */}
          <div
            style={styles.uploadArea}
            onClick={() => fileRef.current.click()}
          >
            {previews.length > 0 ? (
              <div style={styles.previewGrid}>
                {previews.map((src, i) => (
                  <img key={i} src={src} alt="" style={styles.previewImg} />
                ))}
              </div>
            ) : (
              <div style={styles.uploadPlaceholder}>
                <ImageIcon />
                <span style={{ marginTop: 8, fontSize: 13, color: "#888" }}>Click to upload images</span>
              </div>
            )}
            <input ref={fileRef} type="file" multiple accept="image/*"
              onChange={handleFile} style={{ display: "none" }} />
          </div>

          {/* Fields */}
          <div style={styles.grid2}>
            <div style={styles.field}>
              <label style={styles.label}>Product Name *</label>
              <input style={styles.input} value={form.productName} required
                onChange={e => setForm({ ...form, productName: e.target.value })}
                placeholder="e.g. Floral Summer Dress" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Category *</label>
              <select style={styles.input} value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Price *</label>
              <input style={styles.input} type="number" value={form.amount} required
                onChange={e => setForm({ ...form, amount: e.target.value })}
                placeholder="e.g. 1499" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Currency</label>
              <select style={styles.input} value={form.currency}
                onChange={e => setForm({ ...form, currency: e.target.value })}>
                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Sizes (comma separated)</label>
              <input style={styles.input} value={form.size}
                onChange={e => setForm({ ...form, size: e.target.value })}
                placeholder="e.g. S, M, L, XL" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Colors (comma separated)</label>
              <input style={styles.input} value={form.color}
                onChange={e => setForm({ ...form, color: e.target.value })}
                placeholder="e.g. Red, Blue, Black" />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description *</label>
            <textarea style={{ ...styles.input, height: 80, resize: "vertical" }}
              value={form.description} required
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the product..." />
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Saving..." : editProduct ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [filterCat, setFilterCat] = useState("all");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Fetch products that belong to the logged-in seller
      const res = await axiosInstance.get(`/products/seller`);
      const list = res?.data?.productsData || [];
      setProducts(list);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axiosInstance.delete(`/products/delete/${id}`);
      toast.success("Product deleted!");
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/seller/logout");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
    navigate("/seller/login");
  };

  const filtered = filterCat === "all" ? products : products.filter(p => p.category === filterCat);

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          <span style={styles.logoText}>H&M</span>
          <span style={styles.logoSub}>Seller Panel</span>
        </div>

        <nav style={styles.nav}>
          <div style={styles.navItem}>
            <PackageIcon />
            <span>Products</span>
          </div>
        </nav>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        {/* Top bar */}
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.pageTitle}>My Products</h1>
            <p style={styles.pageSubtitle}>{products.length} products total</p>
          </div>
          <button onClick={() => { setEditProduct(null); setShowModal(true); }} style={styles.addBtn}>
            <PlusIcon />
            <span>Add Product</span>
          </button>
        </div>

        {/* Category filter */}
        <div style={styles.filterRow}>
          {["all", ...CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)}
              style={{ ...styles.filterBtn, ...(filterCat === cat ? styles.filterBtnActive : {}) }}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div style={styles.center}>
            <div style={styles.spinner} />
            <p style={{ marginTop: 16, color: "#888" }}>Loading products...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.empty}>
            <PackageIcon />
            <p style={{ marginTop: 12, color: "#888" }}>No products found.</p>
            <button onClick={() => { setEditProduct(null); setShowModal(true); }} style={styles.addBtn}>
              <PlusIcon /> Add First Product
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map(product => (
              <div key={product._id} style={styles.card}>
                <div style={styles.cardImg}>
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.productName} style={styles.img} />
                  ) : (
                    <div style={styles.noImg}><ImageIcon /></div>
                  )}
                  <span style={styles.categoryBadge}>{product.category}</span>
                </div>
                <div style={styles.cardBody}>
                  <h3 style={styles.productName}>{product.productName}</h3>
                  <p style={styles.productPrice}>
                    {product.price?.currency} {product.price?.amount?.toLocaleString()}
                  </p>
                  <p style={styles.productDesc}>
                    {product.description?.slice(0, 70)}{product.description?.length > 70 ? "..." : ""}
                  </p>
                  <div style={styles.tags}>
                    {(product.sizes || []).slice(0, 4).map(s => (
                      <span key={s} style={styles.tag}>{s}</span>
                    ))}
                  </div>
                </div>
                <div style={styles.cardActions}>
                  <button onClick={() => { setEditProduct(product); setShowModal(true); }} style={styles.editBtn}>
                    <EditIcon /> Edit
                  </button>
                  <button onClick={() => handleDelete(product._id)} style={styles.deleteBtn}>
                    <TrashIcon /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <ProductModal
          onClose={() => { setShowModal(false); setEditProduct(null); }}
          onSave={fetchProducts}
          editProduct={editProduct}
        />
      )}
    </div>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  page: { display: "flex", minHeight: "100vh", background: "#f5f5f5", fontFamily: "'Helvetica Neue', Arial, sans-serif" },
  sidebar: { width: 220, background: "#111", color: "#fff", display: "flex", flexDirection: "column", padding: "24px 16px", position: "sticky", top: 0, height: "100vh" },
  logo: { display: "flex", flexDirection: "column", marginBottom: 40, paddingBottom: 20, borderBottom: "1px solid #333" },
  logoText: { fontSize: 28, fontWeight: 900, letterSpacing: 2, color: "#fff" },
  logoSub: { fontSize: 11, color: "#888", letterSpacing: 3, marginTop: 2, textTransform: "uppercase" },
  nav: { flex: 1 },
  navItem: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: "#222", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer" },
  logoutBtn: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: "transparent", color: "#888", border: "1px solid #333", cursor: "pointer", fontSize: 14, transition: "all .2s" },
  main: { flex: 1, padding: "32px 40px", overflowY: "auto" },
  topbar: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 },
  pageTitle: { fontSize: 26, fontWeight: 800, color: "#111", margin: 0 },
  pageSubtitle: { fontSize: 13, color: "#888", marginTop: 4 },
  addBtn: { display: "flex", alignItems: "center", gap: 8, background: "#111", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  filterRow: { display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" },
  filterBtn: { padding: "6px 16px", borderRadius: 20, border: "1px solid #ddd", background: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 500, color: "#555" },
  filterBtnActive: { background: "#111", color: "#fff", borderColor: "#111" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 },
  card: { background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column" },
  cardImg: { position: "relative", height: 200, background: "#f0f0f0" },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  noImg: { display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#ccc" },
  categoryBadge: { position: "absolute", top: 10, left: 10, background: "#111", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4, textTransform: "uppercase", letterSpacing: 1 },
  cardBody: { padding: "14px 16px", flex: 1 },
  productName: { fontSize: 15, fontWeight: 700, color: "#111", margin: "0 0 4px" },
  productPrice: { fontSize: 14, fontWeight: 600, color: "#e00", margin: "0 0 8px" },
  productDesc: { fontSize: 12, color: "#777", lineHeight: 1.5, margin: "0 0 10px" },
  tags: { display: "flex", gap: 4, flexWrap: "wrap" },
  tag: { background: "#f0f0f0", padding: "2px 8px", borderRadius: 4, fontSize: 11, color: "#555" },
  cardActions: { display: "flex", gap: 8, padding: "12px 16px", borderTop: "1px solid #f0f0f0" },
  editBtn: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px", borderRadius: 6, border: "1px solid #ddd", background: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 500 },
  deleteBtn: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px", borderRadius: 6, border: "1px solid #fee", background: "#fff5f5", color: "#e00", fontSize: 13, cursor: "pointer", fontWeight: 500 },
  center: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 300 },
  empty: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 300, gap: 12, color: "#ccc" },
  spinner: { width: 36, height: 36, border: "3px solid #eee", borderTop: "3px solid #111", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  // Modal
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 },
  modal: { background: "#fff", borderRadius: 16, width: "100%", maxWidth: 620, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #f0f0f0" },
  modalTitle: { fontSize: 18, fontWeight: 700, color: "#111" },
  iconBtn: { background: "none", border: "none", cursor: "pointer", color: "#888", display: "flex" },
  form: { padding: 24, display: "flex", flexDirection: "column", gap: 16 },
  uploadArea: { border: "2px dashed #ddd", borderRadius: 10, minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", background: "#fafafa" },
  uploadPlaceholder: { display: "flex", flexDirection: "column", alignItems: "center", color: "#ccc" },
  previewGrid: { display: "flex", gap: 8, padding: 8, flexWrap: "wrap" },
  previewImg: { width: 80, height: 80, objectFit: "cover", borderRadius: 6 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  field: { display: "flex", flexDirection: "column", gap: 4 },
  label: { fontSize: 12, fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: 0.5 },
  input: { padding: "10px 12px", border: "1.5px solid #e0e0e0", borderRadius: 8, fontSize: 14, outline: "none", color: "#111", background: "#fff", fontFamily: "inherit" },
  submitBtn: { background: "#111", color: "#fff", border: "none", borderRadius: 8, padding: "12px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4 },
};

export default SellerDashboard;