export function useFests() {
  const fests = [
    {
      id: 1,
      name: "ATMOS 2024",
      college: "BITS Pilani, Hyderabad",
      description: "Technical fest with amazing workshops and competitions.",
      date: "October 18-20, 2024",
      imageUrl: "https://images.unsplash.com/photo-1540575861501-7ad0582371f3?w=800",
      contactPerson: "Student Council"
    }
  ];

  return { data: fests, isLoading: false };
}
