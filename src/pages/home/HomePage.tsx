import Footer from "./footer/Footer.tsx";
import Header from "./header/Header.tsx";
import AboutUs from "./aboutUs/AboutUs.tsx";
import Banner from "./banner/Banner.tsx";
import FirstRateOut from "./firstRateOut/FirstRateOut.tsx";
import FormFeed from "./form/FormFeed.tsx";
import HowItWorks from "./howItWorks/HowItWorks.tsx";
import Plans from "./plans/Plans.tsx";
import WhyItsImportant from "./whyItsImportant/WhyItsImportant.tsx";


const HomePage = () => {
    return (
        <>
            <Header />
            <Banner />
            <div id="howItWorks">
                <HowItWorks />
            </div>
            <WhyItsImportant />
            <Plans />
            <FirstRateOut />
            <AboutUs />
            <FormFeed />
            <Footer />
        </>
    );
}

export default HomePage;