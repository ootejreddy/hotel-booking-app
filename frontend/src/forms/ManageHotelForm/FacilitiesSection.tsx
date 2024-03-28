import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";

const FacilitiesSection = () => {
  const {
    register,

    formState: { errors },
  } = useFormContext<HotelFormData>();
  //   const typeWatch = watch("type");
  return (
    <div className="mb-4">
      <h2 className="text=2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label className="text-sm flex gap-1">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-600 px-1">{errors.facilities.message}</span>
      )}
    </div>
  );
};

export default FacilitiesSection;
