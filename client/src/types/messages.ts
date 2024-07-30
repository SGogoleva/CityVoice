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
    images?: string[];
    status: string;
    dateCreated: string;
}
