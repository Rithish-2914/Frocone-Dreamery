import { MENU_DATA } from "@shared/menu-data";

export default function About() {
  const { about } = MENU_DATA;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[hsl(var(--background))]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6 text-[hsl(var(--primary))]">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed italic">
            "Crafted for True Dessert Lovers"
          </p>
        </div>

        <div className="grid gap-12">
          <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
            <div className="h-64 sm:h-96 relative">
              <img
                src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=1200"
                alt="Frocone Creamery"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 sm:p-12">
              <h2 className="font-display text-3xl font-bold mb-6">{about.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {about.content}
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-[hsl(var(--primary))]/5 p-6 rounded-2xl">
                  <h3 className="font-bold text-lg mb-4 text-[hsl(var(--primary))]">Our Philosophy</h3>
                  <ul className="space-y-3">
                    {about.values.map((value, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]" />
                        <span className="text-gray-700">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center p-6 italic text-gray-600 text-center">
                  "{about.closing}"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
