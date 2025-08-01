import {BaseLayout} from "@/Layouts/BaseLayout.jsx";
import Header from "@/Components/Header.jsx";
import Hero from "@/Components/Hero.jsx";
import Footer from "@/Components/Footer.jsx";

export function SiteLayout({
                               title,
                               description,
                               robots,
                               children,
                               canonical,
                               heroTitle,
                               heroSubtitle,
                               heroSrc,
                           }) {
    return (
        <BaseLayout
            title={title}
            robots={robots}
            description={description}
            canonical={canonical}
        >
            <Header/>
            <Hero
                title={heroTitle}
                subtitle={heroSubtitle}
                src={heroSrc}
            />
            <div className="min-h-screen flex flex-col">
                {children}
            </div>
            <Footer/>
        </BaseLayout>
    );
}
