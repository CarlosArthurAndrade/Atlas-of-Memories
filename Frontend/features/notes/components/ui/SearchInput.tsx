import { SearchCardInputProps } from "@/interfaces/ui/TagItemsProps";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchInput({ placeholder, onChange }: SearchCardInputProps) { 
  return (
    <div className="flex box-border">
        <button className="bg-light-fuchsia rounded-l-xl" disabled>
            <IoSearchOutline className="ml-2"/>
        </button>
        <input className="w-full p-2 bg-light-fuchsia rounded-r-xl outline-none" placeholder={placeholder} onChange={onChange}/>
    </div>
  );
}