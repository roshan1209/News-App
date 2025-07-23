import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full overflow-hidden bg-neutral-50 text-black p-4 rounded-b-lg sticky shadow-md top-0 z-50">
            <div className="mx-auto px-4 py-4 flex gap-4 md:flex-row md:items-center justify-between">
                <Link
                    href={'/'}
                    className="text-2xl font-bold text-blue-600 cursor-pointer"
                >
                    NewsHub
                </Link>
                <div className="hidden sm:hidden md:hidden lg:block">
                    <CategoryFilter/>
                </div>
                <SearchBar/>
            </div>
            <div className='lg:hidden'>
                <CategoryFilter/>
            </div>
        </header>
    );
}