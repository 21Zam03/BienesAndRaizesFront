import { Input } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";

export default function SearchComponent() {
    return(
        <div className="w-full flex justify-center items-center p-5 border-b">
            <Input className="w-1/2" size="lg" placeholder="Busca viviendas" endContent={<div className="rounded-full p-2 bg-red-500"><IoSearch color="white"/></div>}/>
        </div>
    );
}