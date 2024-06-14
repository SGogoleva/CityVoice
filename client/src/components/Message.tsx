import { useAppDispatch, useAppSelector } from "../store/hooks";
import { sendMessageThunk } from "../store/thunks/message.thunk";
import { SubmitHandler, useForm } from "react-hook-form";
import { message } from "../types/messages";
import { Authority, Service } from "../types/authorities";
import { useEffect, useState } from "react";
import { getAuthorities } from "../http";

interface formMessage {
  // messageTitle: string;
  messageBody: string;
  messageTheme: string;
  authorityId: string;
  authorityName: string;
  images?: { filename: string; mimetype: string; size: number }[];
}

const Message = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formMessage>();
  const [authorities, setAuthorities] = useState<Authority[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchAuthorities = async () => {
      try {
        const authoritiesData = await getAuthorities();
        setAuthorities(authoritiesData);
      } catch (error) {
        console.error("There was an error fetching the authorities!", error);
      }
    };

    fetchAuthorities();
  }, []);

  const handleAuthorityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedAuthorityId = event.target.value;
    const selectedAuthority = authorities.find(
      (auth) => auth._id === selectedAuthorityId
    );
    if (selectedAuthority) {
      setValue("authorityId", selectedAuthority._id);
      setValue("authorityName", selectedAuthority.authorityName);
      setServices(selectedAuthority.services);
    }
  };

  const onSubmit: SubmitHandler<formMessage> = (data) => {
    const messageData: message = {
      // messageTitle: data.messageTitle,
      messageBody: data.messageBody,
      messageTheme: data.messageTheme,
      authority: {
        authorityId: data.authorityId,
        authorityName: data.authorityName,
      },
      images:
        data.images?.map((image) => ({
          filename: image.filename,
          mimetype: image.mimetype as "image/png" | "image/jpeg" | "image/jpg",
          size: image.size,
        })) || [],
    };

    dispatch(sendMessageThunk(messageData));
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
        {/* <div>
        <label>Message Title</label>
        <input
        type="text"
        placeholder="Message Title"
        {...register("messageTitle", { required: true, minLength: 5, maxLength: 80 })}
        />
        {errors.messageTitle && <p>{errors.messageTitle.message}</p>}
        </div> */}
        <div className="flex flex-col">
          <label
            htmlFor="authority"
            className="mb-1 text-sm font-semibold text-gray-700"
          >
            Authority
          </label>
          <select
            {...register("authorityId", { required: true })}
            onChange={handleAuthorityChange}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
          >
            <option value="">Select an Authority</option>
            {authorities.map((authority) => (
              <option key={authority._id} value={authority._id}>
                {authority.authorityName}
              </option>
            ))}
          </select>
          {errors.authorityId && (
            <p className="mt-1 text-sm text-red-600">
              {errors.authorityId.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="messageTheme"
            className="mb-1 text-sm font-semibold text-gray-700"
          >
            Message Theme
          </label>
          <select
            {...register("messageTheme", { required: true })}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
          >
            <option value="">Select a Theme</option>
            {services.map((service) => (
              <option key={service._id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
          {errors.messageTheme && (
            <p className="mt-1 text-sm text-red-600">
              {errors.messageTheme.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="messageBody"
            className="mb-1 text-sm font-semibold text-gray-700"
          >
            Describe your problem
          </label>
          <textarea
            placeholder="Write your message here"
            {...register("messageBody", {
              required: true,
              minLength: 5,
              maxLength: 250,
            })}
            className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
          />
          {errors.messageBody && <p>{errors.messageBody.message}</p>}
        </div>
        <button className="mt-6 mb-6 bg-[#1F3E52] text-white py-2 px-4 rounded hover:bg-opacity-90 disabled:bg-gray-300">
          Send Message
        </button>
      </form>
    </div>
  );
};
export default Message;
