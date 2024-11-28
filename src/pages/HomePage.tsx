import SearchComponent from "../components/search/SearchComponent";
import ViviendaSection from "../components/vivienda/ViviendaSection";

export default function HomePage () {
    return (
        <div className="flex flex-col justify-center items-center">
            <SearchComponent/>
            <ViviendaSection/>
        </div>
    );
}