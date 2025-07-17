import Footer from '../sections/Footer';
import Hero from '../sections/Hero';
import HowToUse from '../sections/HowToUse';
import Navbar from '../sections/Navbar';
import Recording from '../sections/Recording';
import Tips from '../sections/Tips';

export default function Home({ session }) {
    return (
        <div>
            <Navbar session={session} />
            <Hero />
            <HowToUse />
            <Recording />
            <Tips />
            <Footer />
        </div>
    );
}