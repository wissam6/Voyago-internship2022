import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { TopPicks } from "./TopPicks/TopPicks";
import { HomeScrollView } from "./HomeScrollView/HomeScrollView";
import { Categories } from './Categories/Categories'

export const HomePage = () => {
    return (
        <div>
            <Header />
            <HomeScrollView />
            <TopPicks />
            <Categories />
            <Footer />
            <style>
                {`
                body,html {
                    margin: auto;
                    max-width: 1920px;
                }
                `}
            </style>
        </div>
    )
}