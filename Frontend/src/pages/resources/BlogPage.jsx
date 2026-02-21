import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../InfoPages.css';

const BlogPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const posts = [
        {
            title: "How Algorithmic Dispatching is Reducing Fuel Costs by 15%",
            category: "Engineering",
            date: "October 12, 2023",
            excerpt: "We broke down the last 10,000 trips on our platform to analyze how strict route adherence and idling prevention mathematically impacts the bottom line of a 50-truck fleet."
        },
        {
            title: "The Death of the Whiteboard: Why Spreadsheets are Killing Your Fleet",
            category: "Operations",
            date: "September 28, 2023",
            excerpt: "If your dispatcher is spending 3 hours a day cross-referencing driver shifts against vehicle maintenance schedules, you are bleeding capital. Here is how modern safety managers are automating compliance."
        },
        {
            title: "Announcing: Real-Time ERP Sync for Expense Tracking",
            category: "Product Update",
            date: "September 14, 2023",
            excerpt: "Our newest integration allows financial analysts to automatically push fuel and toll expenses directly to QuickBooks and Xero without a single keystroke."
        }
    ];

    return (
        <>
            <Navbar />
            <div className="info-page-container">
                <div className="container">
                    <div className="info-header">
                        <h1>The Fleet Flow Engineering Blog</h1>
                        <p>Insights on logistics architecture, operational efficiency, and system updates straight from our team.</p>
                    </div>

                    <div className="info-content" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
                        {posts.map((post, idx) => (
                            <div key={idx} style={{ background: 'var(--bg-surface)', padding: 32, borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24, transition: 'var(--transition)' }} className="pricing-card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: 1 }}>{post.category}</span>
                                    <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{post.date}</span>
                                </div>
                                <h2 style={{ fontSize: 22, color: 'var(--text-main)', marginBottom: 12 }}>{post.title}</h2>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.6, marginBottom: 20 }}>{post.excerpt}</p>
                                <a href="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Read Full Article &rarr;</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogPage;
