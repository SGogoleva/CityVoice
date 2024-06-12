export interface Service {
  _id: string;
  name: string;
}

export interface Authority {
  _id: string;
  authorityName: string;
  services: Service[];
}
