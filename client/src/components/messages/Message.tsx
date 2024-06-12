import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { sendMessageThunk } from "../../store/thunks/message.thunk";
import { SubmitHandler, useForm } from "react-hook-form";
import { message } from "../../types/messages";
import { Authority, Service } from "../../types/authorities";
import { useEffect, useState } from "react";
import { getAuthorities } from "../../http";

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
        console.error('There was an error fetching the authorities!', error);
      }
    };

    fetchAuthorities();
  }, []);

  const handleAuthorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAuthorityId = event.target.value;
    const selectedAuthority = authorities.find(auth => auth._id === selectedAuthorityId);
    if (selectedAuthority) {
      setValue('authorityId', selectedAuthority._id);
      setValue('authorityName', selectedAuthority.authorityName);
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
      <div>
        <label>Authority</label>
        <select {...register("authorityId", { required: true })} onChange={handleAuthorityChange}>
          <option value="">Select an Authority</option>
          {authorities.map(authority => (
            <option key={authority._id} value={authority._id}>
              {authority.authorityName}
            </option>
          ))}
        </select>
        {errors.authorityId && <p>{errors.authorityId.message}</p>}
      </div>
      <div>
        <label>Message Theme</label>
        <select {...register("messageTheme", { required: true })}>
          <option value="">Select a Theme</option>
          {services.map(service => (
            <option key={service._id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
        {errors.messageTheme && <p>{errors.messageTheme.message}</p>}
      </div>
      <div>
        <label>Message Body</label>
        <input
          type="text"
          placeholder="Write your message here"
          {...register("messageBody", { required: true, minLength: 5, maxLength: 250 })}
        />
        {errors.messageBody && <p>{errors.messageBody.message}</p>}
      </div>
      <button>Send Message</button>
    </form>
  );
};
export default Message;
