interface Image {
    filename: string;
    mimetype: "image/png" | "image/jpeg" | "image/jpg";
    size: number;
  }
  
export type message = {
    // messageTitle: string;
    _id: string;
    userId: string;
    isVisible: boolean;
    messageBody: string;
    messageTheme: string;
    authority: {
      authorityId: string
      authorityName: string;
    }
    images?: Image[];
    status: string;
    dateCreated: string;
}
