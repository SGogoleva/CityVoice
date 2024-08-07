export type message = {
    // messageTitle: string;
    id: string;
    userId: string;
    isVisible: string;
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