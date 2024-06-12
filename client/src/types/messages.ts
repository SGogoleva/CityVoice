interface Image {
    filename: string;
    mimetype: "image/png" | "image/jpeg" | "image/jpg";
    size: number;
  }
  
export type message = {
    // messageTitle: string;
    messageBody: string;
    messageTheme: string;
    authority: {
      authorityId: string
      authorityName: string;
    }
    images?: Image[];
}