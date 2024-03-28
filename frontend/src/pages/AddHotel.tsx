import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { showToast } = useAppContext();
  const mutation = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      showToast({ message: "Hotel Saved", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const saveMyForm = (hotelFormData: FormData) => {
    mutation.mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={saveMyForm} isPending={mutation.isPending} />;
};

export default AddHotel;
