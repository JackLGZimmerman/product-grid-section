import { Container, Grid } from "../../layout";
import { Spinner } from "../../ui/Spinner";
import { ErrorAlert } from "../../ui/ErrorAlert";
import { ProductCard } from "../products/ProductCard";
import { useECommerceProducts } from "../../../hooks";

export default function Products() {
  const { data, loading, error } = useECommerceProducts({ collection: ["latest"] });

  if (loading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorAlert message={error.message} />
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Latest Arrivals</h1>
        <button className="text-sm p-2 shadow rounded-md cursor-pointer">View all</button>
      </div>

      <Grid>
        <ProductCard></ProductCard>
      </Grid>
    </Container>
  );
}
