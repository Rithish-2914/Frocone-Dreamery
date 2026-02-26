import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Fests() {
  const { data: fests, isLoading } = useQuery({
    queryKey: ["/api/fests"],
  });

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Fests & Colleges</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We love being part of vibrant campus life. Check out the upcoming fests we're participating in!
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(Array.isArray(fests) ? fests : [])?.map((fest: any) => (
              <motion.div
                key={fest.id}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Card className="overflow-hidden border-none shadow-soft flex flex-col md:flex-row h-full">
                  <div className="w-full md:w-48 h-48 md:h-auto relative overflow-hidden shrink-0">
                    <img
                      src={fest.imageUrl}
                      alt={fest.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-primary">{fest.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{fest.college}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-gray-600 text-sm mb-4">
                        {fest.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{fest.date}</span>
                        </div>
                        {fest.contactPerson && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <User className="w-4 h-4" />
                            <span>Contact: {fest.contactPerson}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}