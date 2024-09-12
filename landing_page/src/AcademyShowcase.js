import React from 'react';

const academies = [
  {
    name: 'Tech with Stephen',
    description: 'Tech Academy is a cutting-edge institution dedicated to equipping individuals with the skills and knowledge needed to excel in the rapidly evolving world of technology. Our programs are designed to meet the demands of the tech industry, offering comprehensive training in software development, data science, cybersecurity, and more. We are committed to fostering innovation and preparing our students for successful careers in technology.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1664300900349-afd61c20f8b8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: 'https://techwithstephen.veryown.in/',
  },
  {
    name: 'Yoga with Jane',
    description: 'Yoga Academy is a holistic center dedicated to promoting physical, mental, and spiritual well-being through the practice of yoga. Our academy offers a wide range of programs designed to cater to all levels, from beginners to advanced practitioners. Our mission is to foster a deep connection between body, mind, and spirit while supporting personal growth and wellness.',
    imageUrl: 'https://images.unsplash.com/photo-1602192446604-8ba7ee80d252?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: 'https://yogawithjane.veryown.in/',
  },
  {
    name: 'Business mindset',
    description: 'Business mindset is a premier institution dedicated to cultivating future leaders and entrepreneurs. We offer a diverse range of programs designed to equip individuals with the skills, knowledge, and practical experience needed to thrive in today’s competitive business environment. Our commitment is to foster innovation, strategic thinking, and ethical leadership in business.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1691873264230-0ff72300185a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: 'https://businessmindset.veryown.in/',
  },
  {
    name: 'Agriculture 101',
    description: 'Agriculture 101 Academy is dedicated to advancing agricultural knowledge and practices. We provide comprehensive courses designed for both aspiring and seasoned agricultural professionals. Our mission is to foster innovation and sustainability in agriculture through quality education and hands-on training.',
    imageUrl: 'https://images.unsplash.com/photo-1617676144530-034c4cc9d79a?q=80&w=1994&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: 'https://agriculture101.veryown.in/',
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
              <div key={academy.name} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
                <div className="relative h-48">
                  <img
                    src={academy.imageUrl}
                    alt={academy.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow items-center">
                  <h3 className="text-2xl font-bold mb-4 truncate">{academy.name}</h3>
                  <p className="text-gray-700 mb-4 flex-grow overflow-hidden" style={{ maxHeight: '6rem', WebkitLineClamp: 4, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                    {academy.description}
                  </p>

                  <a  href={academy.link} className="text-indigo-600 hover:text-indigo-400 font-semibold mt-4">
                    View store
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

