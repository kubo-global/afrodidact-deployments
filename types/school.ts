export interface School {
    name: string;
    schoolName: string;
    country?: string;
    longitude: number;
    latitude: number;
    zoom: number;
    zoomMobile: number;
    numberOfStudents?: number;
    numberOfClients?: number;
    numberOfStaff?: number;
    schoolDescription?: string;
    images?: string[];
  }
