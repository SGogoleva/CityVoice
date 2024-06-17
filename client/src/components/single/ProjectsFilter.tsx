import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { previewProjectThunk } from "../../store/thunks/project.thunk";
import { setPage, setSelectedCityId } from "../../store/slices/project.slice";

const CityFilter = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state: RootState) => state.projects.cities);
  const cityId = useAppSelector(
    (state: RootState) => state.projects.selectedCityId
  );
  const sortBy = useAppSelector((state: RootState) => state.projects.sortBy);
  const sortOrder = useAppSelector(
    (state: RootState) => state.projects.sortOrder
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value || "";
    dispatch(setSelectedCityId(value));
    dispatch(setPage(1));
    dispatch(
      previewProjectThunk({
        limit: 9,
        page: 1,
        sortBy,
        sortOrder,
        cityId: value,
      })
    );
  };

  return (
    <div className="filter items-center">
      <label htmlFor="cityFilter" className="mb-1 mr-4 text-sm font-semibold text-gray-700">Filter by City:</label>
      <select
        id="cityFilter"
        onChange={handleFilterChange}
        value={cityId || ""}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
      >
        <option value="">All Cities</option>
        {cities.map((city) => (
          <option key={city.cityId} value={city.cityId}>
            {city.cityName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityFilter;
