import Link from "next/link";

export default function ProductsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center p-20">
        <h2 className="text-4xl font-bold mb-4">
          Bem-vindo à Linha Orthopedic
        </h2>
        <p className="text-lg mb-6">
          Prevenção, Conforto e Recuperação para uma vida melhor.
        </p>
        <Link href="/products/orthopedic">Explorar Linha Orthopedic</Link>
      </section>

      {/* Highlights Section */}
      <section className="container mx-auto my-12 p-4">
        <h3 className="text-2xl font-bold text-center mb-6">
          Por que escolher a Linha Orthopedic?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-bold mb-2">Prevenção</h4>
            <p>
              Produtos que ajudam a prevenir lesões e cuidar do seu bem-estar.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-bold mb-2">Recuperação</h4>
            <p>
              Soluções para acelerar a recuperação e melhorar sua qualidade de
              vida.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-bold mb-2">Conforto</h4>
            <p>
              Design ergonômico e materiais de alta qualidade para o seu
              conforto.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
