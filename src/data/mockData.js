export const teamMembers = [
  {
    id: 1,
    name: "Souvick Kumar Halder",
    role: "Founder & Admin",
    description: "Responsible for overall planning, management, and maintaining the academic direction of the platform. Ensures quality content delivery.",
    avatar: "https://scontent.fccu3-1.fna.fbcdn.net/v/t39.30808-6/544989577_1788689405065662_8868460709953778179_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=f1oomo6UqgUQ7kNvwHEhDLW&_nc_oc=AdkO9wA6P0vTyPsVdtS9nEONOiDW7WtPdKI64XjnI-uxVjFTnp3Rtf-GMe-jlxTJVlI&_nc_zt=23&_nc_ht=scontent.fccu3-1.fna&_nc_gid=sbIrNQ8DBZqRLUmRHdXwOQ&oh=00_Afjd43s2Uol1zInUeyK3juJ4PBxTtZbnfZzSwJLyHDWWyQ&oe=691EDB50",
    expertise: ["Platform Management", "Content Strategy", "Student Engagement"],
    social: {
      linkedin: "https://www.linkedin.com/in/souvick-kumar-halder-752508292/",
      twitter: "#",
      email: "mailto:reach.souvick@gmail.com"
    }
  },
  {
    id: 2,
    name: "Surajit Ghosh",
    role: "Senior Tutor & Content Creator",
    description: "Creates high-quality, easy-to-follow lectures and academic content for Electronics and Communication Engineering subjects.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    expertise: ["Electronics", "Signal Processing", "Digital Systems"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    id: 3,
    name: "Tanmay Maity",
    role: "Mechanical Engineering Tutor",
    description: "Handles semester-wise explanations, problem solutions, and core subject videos for Mechanical Engineering students.",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face",
    expertise: ["Thermodynamics", "Mechanics", "Machine Design"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    id: 4,
    name: "Sribash Adak",
    role: "Graphics & UI Designer",
    description: "Designs thumbnails, visuals, and branding elements to keep the platform professional, appealing and user-friendly.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    expertise: ["UI/UX Design", "Branding", "Visual Content"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  }
];

export const branches = [
  { id: 'ece', name: 'Electronics & Communication Engineering', color: 'blue' },
  { id: 'ee', name: 'Electrical Engineering', color: 'green' },
  { id: 'me', name: 'Mechanical Engineering', color: 'red' },
  { id: 'ce', name: 'Civil Engineering', color: 'yellow' }
];

export const courses = [
  {
    id: 1,
    title: "Digital Electronics",
    branch: "ece",
    semester: 3,
    instructor: "Surajit Ghosh",
    instructorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
    videos: 24,
    resources: 15,
    duration: "18 hours",
    rating: 4.8,
    students: 1250
  },
  {
    id: 2,
    title: "Signals and Systems",
    branch: "ece",
    semester: 4,
    instructor: "Tanmay Maity",
    instructorPhoto: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop",
    videos: 30,
    resources: 20,
    duration: "22 hours",
    rating: 4.7,
    students: 980
  },
  {
    id: 3,
    title: "Power Systems",
    branch: "ee",
    semester: 5,
    instructor: "Surajit Ghosh",
    instructorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop",
    videos: 28,
    resources: 18,
    duration: "20 hours",
    rating: 4.9,
    students: 850
  },
  {
    id: 4,
    title: "Thermodynamics",
    branch: "me",
    semester: 3,
    instructor: "Tanmay Maity",
    instructorPhoto: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1581093588401-7b7b8c9bd0fb?w=400&h=250&fit=crop",
    videos: 26,
    resources: 16,
    duration: "19 hours",
    rating: 4.6,
    students: 1100
  },
  {
    id: 5,
    title: "Structural Analysis",
    branch: "ce",
    semester: 4,
    instructor: "Surajit Ghosh",
    instructorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=250&fit=crop",
    videos: 32,
    resources: 22,
    duration: "24 hours",
    rating: 4.8,
    students: 750
  },
  {
    id: 6,
    title: "Control Systems",
    branch: "ece",
    semester: 5,
    instructor: "Tanmay Maity",
    instructorPhoto: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=250&fit=crop",
    videos: 29,
    resources: 19,
    duration: "21 hours",
    rating: 4.7,
    students: 920
  }
];

export const resources = [
  {
    id: 1,
    title: "Digital Electronics Complete Notes",
    type: "notes",
    branch: "ece",
    semester: 3,
    format: "PDF",
    pages: 45,
    downloads: 2100,
    author: "Surajit Ghosh",
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
  },
  {
    id: 2,
    title: "Previous Year Question Papers - 2023",
    type: "papers",
    branch: "all",
    semester: "all",
    format: "PDF",
    pages: 12,
    downloads: 1800,
    author: "CoreEngineers Team",
    authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
  },
  {
    id: 3,
    title: "ECE Semester 4 Roadmap",
    type: "roadmap",
    branch: "ece",
    semester: 4,
    format: "PDF",
    pages: 8,
    downloads: 1500,
    author: "Souvick Kumar Halder",
    authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
  },
  {
    id: 4,
    title: "Important Formulas Handbook",
    type: "formulas",
    branch: "all",
    semester: "all",
    format: "PDF",
    pages: 35,
    downloads: 3200,
    author: "Tanmay Maity",
    authorPhoto: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=50&h=50&fit=crop&crop=face"
  }
];