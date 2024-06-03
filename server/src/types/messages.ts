export enum MessageStatus {
  sent = "message is sent",
  read = "message is read",
  replied = "message is replied",
}

export interface Messages {
  dateCreated: string;
  messageTitle: string;
  messageBody: string;
  authorityId: string;
  status: MessageStatus;
}
