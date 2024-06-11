import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { sendMessageThunk } from "../../store/thunks/message.thunk";
import { SubmitHandler, useForm } from 'react-hook-form';
import { message } from "../../types/messages";

interface formMessage {
    messageTitle: string;
    messageBody: string;
    messageTheme: string;
    authorityId: string;
    authorityName: string;
    images?: { filename: string; mimetype: string; size: number }[];
  }

const Message = () => {
    const dispatch = useAppDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm<formMessage>();
    const onSubmit: SubmitHandler<formMessage> = (data) => {
        const messageData: message = {
          messageTitle: data.messageTitle,
          messageBody: data.messageBody,
          messageTheme: data.messageTheme,
          authority: {
            authorityId: data.authorityId,
            authorityName: data.authorityName
          },
          images: data.images?.map(image => ({
            filename: image.filename,
            mimetype: image.mimetype as "image/png" | "image/jpeg" | "image/jpg",
            size: image.size,
          })) || [], 
        };
    
        dispatch(sendMessageThunk(messageData));
      };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="messageTitle" {...register("messageTitle", {required: true, min: 5, maxLength: 80})} />
          <input type="text" placeholder="messageBody" {...register("messageBody", {required: true, min: 5, maxLength: 250})} />
          <input type="text" placeholder="messageTheme" {...register("messageTheme", {required: true})} />
          <input type="text" placeholder="authorityId" {...register("authorityId", {required: true})} />
          <input type="text" placeholder="authorityName" {...register("authorityName", {})} />
    
          <input type="submit" />
        </form>
      );
}
export default Message

  
