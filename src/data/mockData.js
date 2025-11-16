export const teamMembers = [
  {
    id: 1,
    name: "Souvick Kumar Halder",
    role: "Founder & Admin",
    description: "Responsible for overall planning, management, and maintaining the academic direction of the channel.",
    avatar: "/api/placeholder/150/150"
  },
  {
    id: 2,
    name: "Surajit Ghosh",
    role: "Tutor",
    description: "Creates high-quality, easy-to-follow lectures and academic content.",
    avatar: "/api/placeholder/150/150"
  },
  {
    id: 3,
    name: "Tanmay Maity",
    role: "Tutor",
    description: "Handles semester-wise explanations, problem solutions, and core subject videos.",
    avatar: "/api/placeholder/150/150"
  },
  {
    id: 4,
    name: "Sribash Adak",
    role: "Graphics Designer",
    description: "Designs thumbnails, visuals, and branding elements to keep the channel professional and appealing.",
    avatar: "/api/placeholder/150/150"
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
    thumbnail: "/api/placeholder/400/250",
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
    thumbnail: "/api/placeholder/400/250",
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
    thumbnail: "/api/placeholder/400/250",
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
    thumbnail: "/api/placeholder/400/250",
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
    thumbnail: "/api/placeholder/400/250",
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
    thumbnail: "/api/placeholder/400/250",
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
    downloads: 2100
  },
  {
    id: 2,
    title: "Previous Year Question Papers - 2023",
    type: "papers",
    branch: "all",
    semester: "all",
    format: "PDF",
    pages: 12,
    downloads: 1800
  },
  {
    id: 3,
    title: "ECE Semester 4 Roadmap",
    type: "roadmap",
    branch: "ece",
    semester: 4,
    format: "PDF",
    pages: 8,
    downloads: 1500
  },
  {
    id: 4,
    title: "Important Formulas Handbook",
    type: "formulas",
    branch: "all",
    semester: "all",
    format: "PDF",
    pages: 35,
    downloads: 3200
  }
];