export default function StarRating({ rating, reviewCount, onRate, interactive = false }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRate && onRate(star)}
          className={`text-sm ${
            star <= rating ? 'text-amber-400' : 'text-gray-300'
          } ${interactive ? 'hover:scale-125 transition cursor-pointer' : 'cursor-default'}`}
        >
          ★
        </button>
      ))}
      {rating > 0 && !interactive && (
        <span className="text-xs font-semibold text-gray-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-gray-400">({reviewCount})</span>
      )}
    </div>
  );
}