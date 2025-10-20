import { useState } from "react";

import { Header } from "@inewlegend/website/src/components/header";
import { Hero } from "@inewlegend/website/src/components/hero";
import { About } from "@inewlegend/website/src/components/about";
import { Experience } from "@inewlegend/website/src/components/experience";
import { Projects } from "@inewlegend/website/src/components/projects";
import { Contact } from "@inewlegend/website/src/components/contact";
import { Footer } from "@inewlegend/website/src/components/footer";
import { Resume } from "@inewlegend/website/src/components/resume";

function App() {
    const [ activeSection, setActiveSection ] = useState( "home" );

    return (
        <div className="min-h-screen bg-background">
            <Header activeSection={ activeSection } setActiveSection={ setActiveSection } />
            <main>
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Contact />
            </main>
            <Footer />

            { /* Hidden resume component for PDF generation */ }
            <div style={ { position: "absolute", left: "-9999px", top: "-9999px" } }>
                <Resume />
            </div>
        </div>
    );
}

export default App;
