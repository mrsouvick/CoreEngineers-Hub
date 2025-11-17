import React from 'react';
import { FaUsers, FaRocket, FaGraduationCap, FaHeart, FaAward, FaLightbulb, FaCode, FaBook, FaChalkboardTeacher, FaHandsHelping } from 'react-icons/fa';
import TeamMemberCard from '../components/TeamMemberCard';
import { teamMembers } from '../data/mockData';

const About = () => {
  const stats = [
    { icon: <FaUsers className="text-4xl" />, number: '10,000+', label: 'Students Helped', color: 'text-blue-500' },
    { icon: <FaBook className="text-4xl" />, number: '500+', label: 'Resources Created', color: 'text-green-500' },
    { icon: <FaChalkboardTeacher className="text-4xl" />, number: '50+', label: 'Expert Tutors', color: 'text-purple-500' },
    { icon: <FaAward className="text-4xl" />, number: '4.9/5', label: 'Student Rating', color: 'text-yellow-500' },
  ];

  const values = [
    {
      icon: <FaGraduationCap className="text-3xl" />,
      title: 'Quality Education',
      description: 'Providing high-quality, accurate, and up-to-date engineering education materials for MAKAUT students.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FaHandsHelping className="text-3xl" />,
      title: 'Community Support',
      description: 'Building a strong community where students can help each other and learn collaboratively.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: 'Innovation',
      description: 'Continuously innovating to make engineering education more accessible and engaging.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: <FaHeart className="text-3xl" />,
      title: 'Student First',
      description: 'Everything we do is focused on helping students succeed in their engineering journey.',
      color: 'from-red-500 to-red-600'
    }
  ];

  const features = [
    {
      title: 'Complete Semester Coverage',
      description: 'Structured materials for all 8 semesters across core engineering branches',
      items: ['ECE', 'EE', 'ME', 'CE', 'CSE']
    },
    {
      title: 'Interactive Learning',
      description: 'Engage with fellow students through our discussion platform',
      items: ['Real-time Chat', 'Study Groups', 'Q&A Sessions', 'Project Collaboration']
    },
    {
      title: 'Comprehensive Resources',
      description: 'Everything you need in one place for your engineering studies',
      items: ['Video Lectures', 'Study Notes', 'Question Papers', 'Formula Sheets', 'Roadmaps']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="container-responsive py-16 sm:py-20 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-secondary-400">CoreEngineers Hub</span>
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 mb-8 leading-relaxed">
              Empowering MAKAUT engineering students with comprehensive learning resources, 
              collaborative tools, and a supportive community to excel in their academic journey.
            </p>
            <div className="flex items-center justify-center space-x-4 text-primary-200">
              <FaRocket className="text-2xl" />
              <span className="text-lg">Founded with a vision to transform engineering education</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-primary-600">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To democratize quality engineering education by providing free, accessible, 
                and comprehensive learning resources to every MAKAUT student, regardless of 
                their background or resources.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that every engineering student deserves access to high-quality 
                study materials, expert guidance, and a supportive community to help them 
                succeed in their academic and professional journey.
              </p>
              <div className="flex items-center space-x-4 text-gray-700">
                <FaHeart className="text-red-500 text-xl" />
                <span className="text-lg font-semibold">Built by students, for students</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg leading-relaxed mb-6">
                  To become the most trusted and comprehensive learning platform for 
                  engineering students across India, revolutionizing how engineering 
                  education is delivered and experienced.
                </p>
                <div className="flex items-center space-x-3">
                  <FaCode className="text-2xl" />
                  <span className="text-lg font-semibold">Innovating Engineering Education</span>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary-600">Impact</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Making a real difference in the lives of engineering students every day
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at CoreEngineers Hub
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We <span className="text-primary-600">Offer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and resources designed specifically for engineering students
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-primary-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals working tirelessly to make engineering education accessible and effective
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
          
          {/* Join Team CTA */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Want to Join Our Team?</h3>
              <p className="text-lg mb-6 opacity-90">
                We're always looking for passionate educators, content creators, and developers 
                who want to make a difference in engineering education.
              </p>
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl transition-colors duration-200">
                Contact Us to Collaborate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our <span className="text-primary-600">Story</span>
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    CoreEngineers Hub was born from a simple observation: engineering students 
                    across MAKAUT were struggling to find quality, organized study materials 
                    that matched their curriculum.
                  </p>
                  <p>
                    What started as a small initiative to share notes among friends has grown 
                    into a comprehensive platform serving thousands of students across multiple 
                    engineering branches.
                  </p>
                  <p>
                    Today, we're proud to be the go-to resource for MAKAUT students, providing 
                    everything from semester-wise notes to real-time discussion platforms and 
                    expert tutoring.
                  </p>
                </div>
              </div>
              {/* Timeline dots */}
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <div className="space-y-8">
                  <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-secondary-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">2022</div>
                <div className="text-gray-600">Started as a notes sharing platform</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="text-3xl font-bold text-secondary-600 mb-2">5K+</div>
                <div className="text-gray-600">Students in first year</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">2023</div>
                <div className="text-gray-600">Launched discussion platform</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-gray-600">Active community members</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container-responsive text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Thousands of MAKAUT students are already transforming their engineering journey with our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-2xl transition-colors duration-200 text-lg">
              Get Started Free
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-2xl transition-colors duration-200 text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;