import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  // Ensure categoryId is provided
  if (!categoryId) {
    console.error("Error: categoryId is missing.");
    return <p className="text-red-500"> No New categories selected.</p>;
  }

  const wixClient = await wixClientServer();

  let productQuery = wixClient.products.queryProducts();

  // Apply filters only if values are provided
  if (searchParams?.name) {
    productQuery = productQuery.startsWith("name", searchParams.name);
  }

  productQuery = productQuery.eq("collectionIds", categoryId);

  productQuery = productQuery.hasSome(
    "productType",
    searchParams?.type ? [searchParams.type] : ["physical", "digital"]
  );

  productQuery = productQuery
    .gt("priceData.price", searchParams?.min ?? 0)
    .lt("priceData.price", searchParams?.max ?? 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );

  // Apply sorting if applicable
  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc" && sortBy) {
      productQuery = productQuery.ascending(sortBy);
    } else if (sortType === "desc" && sortBy) {
      productQuery = productQuery.descending(sortBy);
    }
  }

  // Fetch products
  let res;
  try {
    res = await productQuery.find();
  } catch (error) {
    console.error("Product query failed:", error);
    return <p className="text-red-500">Error loading products.</p>;
  }

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {res.items?.length > 0 ? (
        res.items.map((product: products.Product) => (
          <Link
            href={"/" + product.slug}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
            key={product._id}
          >
            <div className="relative w-full h-80">
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                alt={product.name || "Product"}
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-in-out duration-500"
              />
              {product.media?.items?.[1]?.image?.url && (
                <Image
                  src={product.media.items[1].image.url}
                  alt={product.name || "Product"}
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-medium w-full break-words">
                {product.name}
              </span>
              <span className="font-semibold">
                GH₵{product.price?.price ?? "N/A"}
              </span>
            </div>
            {product.additionalInfoSections && (
              <div
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    product.additionalInfoSections.find(
                      (section: any) => section.title === "shortDesc"
                    )?.description || ""
                  ),
                }}
              ></div>
            )}
            <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
              Add to Cart
            </button>
          </Link>
        ))
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}

      {(searchParams?.cat || searchParams?.name) && res.items?.length > 0 ? (
        <Pagination
          currentPage={res.currentPage ?? 0}
          hasPrev={res.hasPrev?.() ?? false}
          hasNext={res.hasNext?.() ?? false}
        />
      ) : null}
    </div>
  );
};

export default ProductList;
