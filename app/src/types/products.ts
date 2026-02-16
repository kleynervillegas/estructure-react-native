export type Product = {
  id_product: number;
  description: string;
  title: string;
  price: number;
  image: string;
  category: string,
  inCart?: boolean,
  quantity?: number
};

const DummyComponent = () => null;
export default DummyComponent;