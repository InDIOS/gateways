export interface Gateway {
  _id: string;
  serial: string;
  name: string;
  address: string;
  devices: Device[];
}

export interface Device {
  _id: string;
  uid: number;
  vendor: string;
  date?: Date;
  status: 'online' | 'offline';
}

export interface Breadcrumb {
  path?: string;
  icon: string;
  text: string;
}

export interface Notification {
  type: string;
  title: string;
  description: string;
}
