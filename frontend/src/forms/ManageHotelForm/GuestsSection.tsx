import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="md:flex  p-6 gap-5 bg-gray-300">
        <div className="md:flex-1 md:pr-3">
          <label className="block uppercase tracking-wide text-charcoal-darker text-xs text-gray-700 font-bold">
            Adults
          </label>
          <input
            className="w-full shadow-inner p-4 border-2  border-gray-100"
            type="number"
            {...register("adultCount", {
              required: "This field is required",
            })}
            min={1}
          />
          {errors.adultCount?.message && (
            <span className="text-red-600 px-1">
              {errors.adultCount?.message}
            </span>
          )}
        </div>
        <div className="md:flex-1 md:pl-3">
          <label className="block uppercase tracking-wide text-charcoal-darker text-gray-700 text-xs font-bold">
            CHILDREN
          </label>
          <input
            className="w-full shadow-inner p-4  border-2  border-gray-100"
            type="number"
            {...register("childCount", {
              required: "This field is required",
            })}
            min={0}
          />
          {errors.childCount?.message && (
            <span className="text-red-600 px-1">
              {errors.childCount?.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestsSection;
