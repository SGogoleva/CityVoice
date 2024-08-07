import { useAppDispatch, useAppSelector } from "../store/hooks";
import { sendMessageThunk } from "../store/thunks/message.thunk";
import { SubmitHandler, useForm } from "react-hook-form";
import { Authority, Service } from "../types/authorities";
import { useEffect, useState } from "react";
import { getAuthorities } from "../http";
import LoginDialog from "../components/single/LoginDialog";
import Button from "./single/button";
import { RootState } from "../store/store";
import {
  CloudArrowUpIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import MapWithAddress from "./single/GetCoordinates";

interface formMessage {
  isVisible: boolean;
  messageBody: string;
  messageTheme: string;
  authorityId: string;
  authorityName: string;
  image1?: File;
  image2?: File;
  image3?: File;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

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
  const userId = useAppSelector(
    (state: RootState) => state.isAuth.user?.id
  ) as string;

  const [fileNames, setFileNames] = useState<string[]>(["", "", ""]);
  const [fileErrors, setFileErrors] = useState<string[]>(["", "", ""]);
  const [isSending, setIsSending] = useState(false);
  const [imageError, setImageError] = useState<string>("");
  const [location, setLocation] = useState();

  const handleLocationSelected = (locationResponse: any) => {
    setLocation(locationResponse);
  };

  useEffect(() => {
    console.log(location);
  }, [location]);

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

    const images = [data.image1, data.image2, data.image3].filter(
      Boolean
    ) as File[];
    if (images.length === 0) {
      setImageError("At least one image is required");
      return;
    } else {
      setImageError("");
    }

    setIsSending(true);

    const messageData = new FormData();

    messageData.append("userId", userId);
    messageData.append("isVisible", data.isVisible ? "true" : "false");
    messageData.append("messageBody", data.messageBody);
    messageData.append("messageTheme", data.messageTheme);
    messageData.append("authority[authorityId]", data.authorityId);
    messageData.append("authority[authorityName]", data.authorityName);

    images.forEach((file) => {
      messageData.append("images", file, file.name);
    });

    try {
      await dispatch(sendMessageThunk(messageData)).unwrap();
      setIsMessageSent(true);
      reset();
      setFileNames(["", "", ""]);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleFileChange = (
    index: 0 | 1 | 2,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileError = validateFile(file);
      if (fileError) {
        setFileErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[index] = fileError;
          return newErrors;
        });
        setValue(
          `image${index + 1}` as "image1" | "image2" | "image3",
          undefined
        );
      } else {
        setFileNames((prevFileNames) => {
          const newFileNames = [...prevFileNames];
          newFileNames[index] = file.name;
          return newFileNames;
        });
        setFileErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[index] = "";
          return newErrors;
        });
        setValue(`image${index + 1}` as "image1" | "image2" | "image3", file);
      }
    }
  };

  const validateFile = (file: File) => {
    if (!validImageTypes.includes(file.type)) {
      return "File must be an image (PNG, JPEG, JPG)";
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
    }
    return "";
  };

  const handleFileInputClick = (fileInputId: string) => {
    document.getElementById(fileInputId)?.click();
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
              <p className="mt-1 text-xs text-red-600">
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
              <p className="mt-1 text-xs text-red-600">
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
              <p className="mt-1 text-xs text-red-600">
                {errors.messageBody.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <div className="flex flex-row justify-between space-x-2">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center w-1/3 p-2 border rounded-md"
                >
                  <button
                    type="button"
                    className="flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
                    onClick={() => handleFileInputClick(`image${index + 1}`)}
                  >
                    {fileNames[index] ? (
                      <DocumentCheckIcon className="h-10 w-10 text-[#50B04C]" />
                    ) : (
                      <CloudArrowUpIcon className="h-10 w-10 text-[#1F3E52]" />
                    )}
                    <span className="mt-2 text-xs">
                      {fileNames[index] || `Upload Image ${index + 1}`}
                    </span>
                  </button>
                  {fileErrors[index] && (
                    <p className="mt-1 text-xs text-red-600">
                      {fileErrors[index]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {imageError && (
              <p className="mt-1 text-xs text-red-600">{imageError}</p>
            )}
          </div>
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              type="file"
              id={`image${index + 1}`}
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: "none" }}
              onChange={(event) => handleFileChange(index as 0 | 1 | 2, event)}
            />
          ))}
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

          <Button
            type="submit"
            variant="primary"
            className="mt-4"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      )}
      <MapWithAddress onLocationSelected={handleLocationSelected} />
      <LoginDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
};

export default Message;
