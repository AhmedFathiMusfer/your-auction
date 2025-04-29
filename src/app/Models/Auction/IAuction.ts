interface IAuction {
  id: number;
  productName: string;
  numberOfBidders: number;
  price: number;
  salleName: string;
  description: string;
  quantity: number;
  startDate: Date;
  endDate: Date;
  state: string;
  imagesUrl: string[];
}
export default IAuction;
