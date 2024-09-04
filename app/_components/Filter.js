"use client"

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";



export default function Filter() {

    const searchParams =   useSearchParams();
    const router = useRouter()
    const pathname = usePathname();

    const activefilter = searchParams.get('capacity') ?? 'all';

    function handleFilter(filter) {

        const params = new URLSearchParams();
        params.set("capacity", filter);
        router.replace(` ${pathname}?${params.toString()}`, {scroll: false});

    }
  return (
    <div className=" border border-primary-800 flex">
      <FilterButton
        filter="all"
        handleFilter={handleFilter}
        activefilter={activefilter}
      >
    All Cabins
      </FilterButton>

      <FilterButton
        filter="small"
        handleFilter={handleFilter}
        activefilter={activefilter}
      >
        1&mdash;3 Guests
      </FilterButton>

      <FilterButton
        filter="medium"
        handleFilter={handleFilter}
        activefilter={activefilter}
      >
        4&mdash;7 Guests
      </FilterButton>

      <FilterButton
        filter="large"
        handleFilter={handleFilter}
        activefilter={activefilter}
      >
        8&mdash;12 Guests
      </FilterButton>
    </div>
  );
}


function FilterButton({filter, handleFilter, activefilter, children} ) {
   return <button
  className={`px-5 py-2 hover:bg-primary-700 ${filter === activefilter ? "bg-primary-700 text-primary-50" : ' '}`}
     onClick={() => handleFilter(filter)}
   >
    {children}
   </button>;

}