import React from 'react';
import { Github } from 'lucide-react';
import monil from './photo/monil.jpg';
import mitansh from './photo/mitansh.jpg';
import milan from './photo/milan.jpg';
import param from './photo/param.jpg';

const TeamMember = ({ name, role, image, description, github }) => (
  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="w-32 h-32 overflow-hidden rounded-full mb-4">
      <img 
        src={image || "/api/placeholder/128/128"} 
        alt={name} 
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
    <p className="text-sm text-gray-600 mb-2">{role}</p>
    <p className="text-center text-gray-700 text-sm mb-4">{description}</p>
    <a 
      href={github} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
    >
      <Github size={24} />
    </a>
  </div>
);

const Team = () => {
  const teamMembers = [
    {
      name: "Monil Mehta",
      role: "Team Lead",
      description: "2+ years of experience in project management and team leadership.",
      image: monil,
      github: "https://github.com/MonilMehta" // Replace with actual GitHub URL
    },
    {
      name: "Mitansh Kanani",
      role: "Frontend Developer",
      description: "Specialized in Frontend development with expertise in React and three js.",
      image: mitansh,
      github: "https://github.com/mitanshkanani" // Replace with actual GitHub URL
    },
    {
      name: "Milan Haria",
      role: "Full Stack Developer",
      description: "Creating intuitive and beautiful for over 1.5 years.",
      image: milan,
      github: "https://github.com/milanh34" // Replace with actual GitHub URL
    },
    {
      name: "Param Shukla",
      role: "Backend Developer",
      description: "Expert in creating Backend and Data entry.",
      image: param,
      github: "https://github.com/ParamShukla007" // Replace with actual GitHub URL
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Team</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Meet our talented team of professionals who are dedicated to bringing you the best experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;