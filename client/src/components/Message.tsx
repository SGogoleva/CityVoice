import { useAppDispatch, useAppSelector } from "../store/hooks";
import { sendMessageThunk } from "../store/thunks/message.thunk";
import { SubmitHandler, useForm } from "react-hook-form";
import { message } from "../types/messages";
import { Authority, Service } from "../types/authorities";
import { useEffect, useState } from "react";
import { getAuthorities } from "../http";
import LoginDialog from "../components/single/LoginDialog";
import Button from "./single/button";
import { RootState } from "../store/store";

interface formMessage {
  // messageTitle: string;
  isVisible: boolean;
  messageBody: string;
  messageTheme: string;
  authorityId: string;
  authorityName: string;
  images?: { filename: string; mimetype: string; size: number }[];
  status: string;
  dateCreated: string;
}

const Message = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<formMessage>();
  const [authorities, setAuthorities] = useState<Authority[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const isAuthenticated = useAppSelector(
    (state) => state.isAuth.isAuthenticated
  );
  const userId = useAppSelector((state: RootState) => state.isAuth.user?.id);

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const [isMessageSent, setIsMessageSent] = useState(false);

  const onSubmit: SubmitHandler<formMessage> = async (data) => {
    if (!isAuthenticated) {
      openDialog();
      return;
    }
    const messageData: Omit<message, 'userId'> & { userId: string }  = {
      // messageTitle: data.messageTitle,
      userId: userId as string,
      isVisible: data.isVisible,
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
        status: data.status,
        dateCreated: data.dateCreated,
    
    };

    console.log('Sending message data:', JSON.stringify(messageData, null, 2));

    try {
      await dispatch(sendMessageThunk(messageData)).unwrap();
      setIsMessageSent(true);
      reset();
    } catch (error) {
      console.error("Failed to send message", error);
      
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-white shadow-md rounded-lg">
      {isMessageSent ? (
        <div className="flex flex-col justify-center items-center text-[#50B04C] h-80">
          <h2 className="text-xl font-semibold">Thank you for your message!</h2>
          <Button
            className="mt-4"
            variant="primary"
            onClick={() => setIsMessageSent(false)}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div>
          <label>Message Title</label>
          <input
          type="text"
          placeholder="Message Title"
          {...register("messageTitle", { required: true, minLength: 5, maxLength: 80 })}
          />
          {errors.messageTitle && <p>{errors.messageTitle.message}</p>}
          </div> */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="authority"
              className="mb-1 text-sm font-semibold text-gray-700"
            >
              Authority
            </label>
            <select
              {...register("authorityId", {
                required: "Please select an authority",
              })}
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
          <div className="flex flex-col mb-4">
            <label
              htmlFor="messageTheme"
              className="mb-1 text-sm font-semibold text-gray-700"
            >
              Message Theme
            </label>
            <select
              {...register("messageTheme", {
                required: "Please select a theme",
              })}
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
          <div className="flex flex-col mb-4">
            <label
              htmlFor="messageBody"
              className="mb-1 text-sm font-semibold text-gray-700"
            >
              Describe your problem
            </label>
            <textarea
              placeholder="Write your message here"
              {...register("messageBody", {
                required: "Please describe your problem",
                minLength: {
                  value: 5,
                  message: "Minimum length is 5 characters",
                },
                maxLength: {
                  value: 250,
                  message: "Maximum length is 250 characters",
                },
              })}
              className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
            />
            {errors.messageBody && (
              <p className="mt-1 text-sm text-red-600">
                {errors.messageBody.message}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <label
              htmlFor="isVisible"
              className="text-sm font-semibold text-gray-700"
            >
              Make message visible on public map
            </label>
            <input
              type="checkbox"
              defaultChecked={true}
              {...register("isVisible")}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
            />
          </div>

          <Button type="submit" variant="primary" className="mt-4">
            Send Message
          </Button>
        </form>
      )}

      <LoginDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
};

export default Message;
