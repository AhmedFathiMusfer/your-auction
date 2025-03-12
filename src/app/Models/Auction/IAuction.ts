interface IAuction {
  id: number;
  name: string;
  numperOfBidders: number;
  price: number;
  description: string;
  quantity: number;
  createdAt: Date;
  endtedAt: Date;
  status: string;
}
export default IAuction;
