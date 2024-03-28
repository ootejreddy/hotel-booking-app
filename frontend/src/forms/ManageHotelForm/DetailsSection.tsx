import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <>
      <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
        <div className="mb-4">
          <label className="block uppercase tracking-wide text-xs font-bold">
            Name
          </label>
          <input
            className="w-full shadow-inner p-4 border-2  border-gray-100"
            type="text"
            placeholder="Acme Mfg. Co."
            {...register("name", {
              required: "This field is required",
            })}
          />
          {errors.name && (
            <span className="text-red-600 px-1">{errors.name.message}</span>
          )}
        </div>
        <div className="md:flex mb-4">
          <div className="md:flex-1 md:pr-3">
            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
              CITY
            </label>
            <input
              className="w-full shadow-inner p-4 border-2  border-gray-100"
              type="text"
              placeholder="New York"
              {...register("city", {
                required: "This field is required",
              })}
            />
            {errors.city && (
              <span className="text-red-600 px-1">{errors.city.message}</span>
            )}
          </div>
          <div className="md:flex-1 md:pl-3">
            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
              COUNTRY
            </label>
            <input
              className="w-full shadow-inner p-4  border-2  border-gray-100"
              type="text"
              placeholder="United States"
              {...register("country", {
                required: "This field is required",
              })}
            />
            {errors.country && (
              <span className="text-red-600 px-1">
                {errors.country.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block uppercase tracking-wide text-xs font-bold">
            Description
          </label>
          <textarea
            className="w-full shadow-inner p-4 border-2  border-gray-100"
            rows={10}
            {...register("description", {
              required: "This field is required",
            })}
          ></textarea>
          {errors.description && (
            <span className="text-red-600 px-1">
              {errors.description.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block uppercase tracking-wide text-xs font-bold">
            PRICE PER NIGHT
          </label>
          <input
            className="w-full shadow-inner p-4 border-2  border-gray-100 max-w-[50%]"
            type="number"
            placeholder="10"
            {...register("pricePerNight", {
              required: "This field is required",
            })}
            min={10}
          />
          {errors.pricePerNight && (
            <span className="text-red-600 px-1">
              {errors.pricePerNight.message}
            </span>
          )}
        </div>
        <div className="mb-4 max-w-[50%]">
          <label className="block uppercase tracking-wide text-xs font-bold">
            STAR RATING
          </label>
          <select
            {...register("starRating", {
              required: "This field is required",
            })}
            className="border rounded w-full p-2 text-gray-700 font-normal"
          >
            <option value="" className="text-sm font-bold">
              Select as Rating
            </option>
            {[1, 2, 3, 4, 5].map((number) => (
              <option value={number}>{number}</option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-600 px-1">
              {errors.starRating.message}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailsSection;
