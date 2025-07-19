import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    text: "NextForm made creating forms so simple! The interface is clean and intuitive.",
  },
  {
    id: 2,
    name: "Mark Thompson",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    rating: 4,
    text: "Great templates and very customizable. Helped me save tons of time!",
  },
  {
    id: 3,
    name: "Sophia Lee",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    rating: 5,
    text: "Excellent support and easy to use. Highly recommend for all form needs.",
  },
  {
    id: 4,
    name: "Sophia Lee",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    text: "Excellent support and easy to use. Highly recommend for all form needs.",
  },
  {
    id: 5,
    name: "Sophia Lee",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    text: "Excellent support and easy to use. Highly recommend for all form needs.",
  },
  {
    id: 6,
    name: "Sophia Lee",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    text: "Excellent support and easy to use. Highly recommend for all form needs.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1  text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 fill-current ${
            i < rating ? "text-purple-400" : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.956c.3.92-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.54-1.118l1.286-3.956a1 1 0 00-.364-1.118L2.035 9.382c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.955z" />
        </svg>
      ))}
    </div>
  );
}

export default function Review() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold tracking-tight text-center mb-10">
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map(({ id, name, avatar, rating, text }) => (
          <Card
            key={id}
            className="shadow-md hover:shadow-lg transition rounded-lg"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="mb-4">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold mb-1">{name}</h3>
              <Stars rating={rating} />
              <p className="mt-4 text-gray-700">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
