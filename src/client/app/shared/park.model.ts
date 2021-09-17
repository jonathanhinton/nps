interface Image {
  credit: string;
  title: string;
  altText: string;
  caption: string;
  url: string;
}
export interface Park {
    _id: string;
    fullName: string;
    parkCode: string;
    url: string;
    description: string;
    latitude: string;
    longitude: string;
    latLong: string;
    states: string;
    images: Image[],
    weatherInfo: string;
    name: string;
    designation: string;
}