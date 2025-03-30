import Image from "next/image";

const Reviews = async ({ productId }: { productId: string }) => {
  try {
    const reviewRes = await fetch(
      `https://api.fera.ai/v3/public/reviews?product.id=${productId}&public_key=${process.env.NEXT_PUBLIC_FERA_ID}`
    );

    if (!reviewRes.ok) {
      throw new Error(`Failed to fetch reviews: ${reviewRes.statusText}`);
    }

    const reviews = await reviewRes.json();

    // Ensure `data` exists and is an array before mapping
    if (!reviews.data || !Array.isArray(reviews.data)) {
      return <p>No reviews available.</p>;
    }

    return reviews.data.map((review: any) => (
      <div className="flex flex-col gap-4" key={review.id}>
        {/* USER */}
        <div className="flex items-center gap-4 font-medium">
          {review.customer?.avatar_url && (
            <Image
              src={review.customer.avatar_url}
              alt=""
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span>{review.customer?.display_name || "Anonymous"}</span>
        </div>
        
        {/* STARS */}
        <div className="flex gap-2">
          {Array.from({ length: review.rating || 0 }).map((_, index) => (
            <Image src="/star.png" alt="" key={index} width={16} height={16} />
          ))}
        </div>

        {/* DESC */}
        {review.heading && <p>{review.heading}</p>}
        {review.body && <p>{review.body}</p>}

        {/* MEDIA */}
        {review.media && Array.isArray(review.media) && (
          <div className="">
            {review.media.map((media: any) => (
              <Image
                src={media.url}
                key={media.id}
                alt=""
                width={100}
                height={50}
                className="object-cover"
              />
            ))}
          </div>
        )}
      </div>
    ));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return <p>No reviews yet.</p>;
  }
};

export default Reviews;
