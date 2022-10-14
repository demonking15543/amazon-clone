import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
export default function Home({products}) {
  return (
    <div className="bg-gray-100">

      <Header/>


 <main className="max-w-screen-2xl mx-auto">
  {/* Banner */}
  <Banner/>
  {/* ProductFeed */}
  <ProductFeed products={products} />
 </main>

     
    </div>
  );
}


export async function getServerSideProps(context){
  const products  = await fetch('https://fakestoreapi.com/products').then(
    (resp)=>resp.json()
  );
  return {
    props: {
      products,
    }

  }
}