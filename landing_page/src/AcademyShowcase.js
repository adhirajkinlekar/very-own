import React from 'react';

const academies = [
 
  {
    name: 'Tech with Stephen',
    description: 'A leading research university located in Stanford, California, known for its cutting-edge research and innovation.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1664300900349-afd61c20f8b8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: 'https://www.stanford.edu',
  },
  {
    name: 'Jane teaches yoga',
    description: 'Prominent influencer and a yoga teacher.',
    imageUrl: 'https://images.unsplash.com/photo-1602192446604-8ba7ee80d252?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: 'https://www.harvard.edu',
  },
  {
    name: 'Business mindset with Vishal',
    description: 'The Massachusetts Institute of Technology, located in Cambridge, Massachusetts, known for its emphasis on scientific and technological research.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1691873264230-0ff72300185a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: 'https://www.mit.edu',
  },
  {
    name: 'Agriculture 101',
    description: 'The Massachusetts Institute of Technology, located in Cambridge, Massachusetts, known for its emphasis on scientific and technological research.',
    imageUrl: 'https://images.unsplash.com/photo-1617676144530-034c4cc9d79a?q=80&w=1994&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: 'https://www.mit.edu',
  } 
];

function AcademyShowcase() {
  return (
   <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-semibold text-center mb-12 text-indigo-800">Famous Academies</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {academies.map((academy) => (
              <div key={academy.name} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={academy.imageUrl}
                    alt={academy.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{academy.name}</h3>
                  <p className="text-gray-700 mb-4">{academy.description}</p>
                  <a
                    href={academy.link}
                    className="text-indigo-600 hover:text-indigo-400 font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademyShowcase;
