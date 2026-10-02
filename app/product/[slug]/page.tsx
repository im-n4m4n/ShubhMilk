import { notFound } from "next/navigation";
import Image from "next/image";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import AddToCart from "@/components/AddToCart";
import MobileStickyBar from "@/components/MobileStickyBar";
import { Overline } from "@/components/ui";
import { getProduct, products, inr } from "@/lib/products";
import KenBurns from "@/components/motion/KenBurns";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <Nav />
      <main className="pt-40">
        <section className="bg-bone py-20 lg:py-28">
          <div className="mx-auto max-w-site px-6 lg:px-12">
            <div className="grid gap-16 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border shadow-sm" style={{ borderColor: "var(--hairline)" }}>
                  <KenBurns className="relative h-full w-full">
                    <Image
                      src={product.photo}
                      alt={product.name}
                      fill
                      sizes="(min-width:1024px) 50vw, 100vw"
                      className="object-cover"
                      priority
                    />
                  </KenBurns>
                </div>
              </div>
              <div className="lg:col-span-6">
                <Overline>{product.category.replace(/-/g, " ").toUpperCase()}</Overline>
                <h1 className="display mt-4 text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[1.08] text-ink">
                  {product.name}
                </h1>
                <p className="mt-2 font-mono text-xs tracking-[0.2em] text-muted">{product.spec}</p>
                <p className="mt-8 max-w-md text-[17px] leading-[1.7] text-muted">{product.blurb}</p>

                <div className="mt-10 flex items-baseline gap-4">
                  <span className="display text-4xl text-ink">{inr(product.price)}</span>
                  <span className="font-mono text-sm text-muted line-through">{inr(product.mrp)}</span>
                  <span className="font-mono text-xs text-kesar">
                    {Math.round((1 - product.price / product.mrp) * 100)}% OFF
                  </span>
                </div>
                <p className="mt-2 font-mono text-xs text-fresh">
                  Subscribe &amp; save — {inr(product.subscriptionPrice)} per delivery
                </p>

                <div className="mt-10">
                  <AddToCart productId={product.id} />
                </div>

                <hr className="kantha-rule my-10" />
                <ul className="space-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  <li>FSSAI Certified · Lab tested daily</li>
                  <li>Delivered before 7 AM in returnable glass</li>
                  <li>₹15 glass deposit, refunded on return</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyBar productId={slug} />
    </>
  );
}
