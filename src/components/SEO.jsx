import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component for managing page-specific meta tags
 * Use this component in each page to set appropriate meta tags
 */
export default function SEO({
    title = "Versiful - Scripture Guidance via Text",
    description = "Share what you're facing and receive personalized Bible verses with gentle reflections delivered to your phone via text or web chat.",
    keywords = "Bible, Scripture, SMS, text messages, spiritual guidance, faith, devotional, Bible verses, Christian app, scripture text",
    ogImage = "https://versiful.com/hero-image.jpg",
    ogType = "website",
    canonical = null,
}) {
    const location = useLocation();
    const baseUrl = "https://versiful.com";
    const currentUrl = canonical || `${baseUrl}${location.pathname}`;

    useEffect(() => {
        // Update document title
        document.title = title;

        // Helper function to update or create meta tags
        const updateMetaTag = (property, content, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            let element = document.querySelector(`meta[${attribute}="${property}"]`);
            
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Standard meta tags
        updateMetaTag('description', description);
        updateMetaTag('keywords', keywords);

        // Open Graph tags
        updateMetaTag('og:title', title, true);
        updateMetaTag('og:description', description, true);
        updateMetaTag('og:type', ogType, true);
        updateMetaTag('og:url', currentUrl, true);
        updateMetaTag('og:image', ogImage, true);
        updateMetaTag('og:site_name', 'Versiful', true);

        // Twitter Card tags
        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:title', title);
        updateMetaTag('twitter:description', description);
        updateMetaTag('twitter:image', ogImage);

        // Canonical URL
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', currentUrl);

        // Add JSON-LD structured data
        let jsonLd = document.querySelector('script[type="application/ld+json"]');
        if (!jsonLd) {
            jsonLd = document.createElement('script');
            jsonLd.setAttribute('type', 'application/ld+json');
            document.head.appendChild(jsonLd);
        }

        // Create structured data based on page type
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Versiful",
            "url": baseUrl,
            "description": description,
            "applicationCategory": "LifestyleApplication",
            "operatingSystem": "Any",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "1"
            }
        };

        jsonLd.textContent = JSON.stringify(structuredData);
    }, [title, description, keywords, ogImage, ogType, currentUrl]);

    return null; // This component doesn't render anything
}

/**
 * Page-specific SEO configurations
 */
export const seoConfig = {
    home: {
        title: "Versiful - Scripture Guidance via Text",
        description: "Share what you're facing and receive personalized Bible verses with gentle reflections delivered to your phone via text or web chat.",
        keywords: "Bible, Scripture, SMS, text messages, spiritual guidance, faith, devotional, Bible verses, Christian app",
    },
    features: {
        title: "Features - Versiful Scripture Guidance",
        description: "Discover how Versiful provides unlimited Bible verse guidance via text or web chat. Simple, private, and accessible spiritual support whenever you need it.",
        keywords: "Bible app features, scripture text service, SMS Bible verses, spiritual guidance features, Christian text messages",
    },
    howItWorks: {
        title: "How It Works - Versiful Scripture Guidance",
        description: "Learn how to receive personalized Bible verses and reflections. Simply text your concerns and get scripture-based guidance delivered to your phone.",
        keywords: "how to get Bible verses, scripture text service, SMS Bible guidance, Christian text support",
    },
    privacy: {
        title: "Privacy Policy - Versiful",
        description: "Read about how Versiful protects your privacy and handles your personal information when providing scripture guidance via text.",
        keywords: "privacy policy, data protection, Bible app privacy, text message privacy",
    },
    terms: {
        title: "Terms of Service - Versiful",
        description: "Terms and conditions for using Versiful's scripture guidance service via text and web chat.",
        keywords: "terms of service, user agreement, Bible app terms",
    },
};

