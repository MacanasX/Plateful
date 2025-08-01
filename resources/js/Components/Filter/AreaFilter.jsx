import {router, usePage} from "@inertiajs/react";

export function AreaFilter() {
    const {filterOptions, filters} = usePage().props;
    const selectedArea = filters.area;
    const handleChange = (e) => {
        const selected = e.target.value;
        const isSame = selected === selectedArea;

        router.get("/meals", isSame ? {} : {area: selected}, {
            preserveState: true,
            only: ["meals", "filters"],
        });
    };

    return filterOptions?.areas?.length ? (
        <div>
            <h3 className="font-heading mb-2">Areas</h3>
            <select
                name="area"
                value={filters.area || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
            >
                <option value="">– Select Area –</option>
                {filterOptions.areas.map((area) => (
                    <option key={area.name} value={area.name}>
                        {area.name}
                    </option>
                ))}
            </select>
        </div>
    ) : null;
}
