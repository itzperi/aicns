import { NavItem, Track, FeeStructure, CommitteeMember } from './types';

export const CONFERENCE_NAME = "AICNS 2026";
export const CONFERENCE_FULL_NAME = "First International Conference on Artificial Intelligence, Computation and Network Security";
export const CONFERENCE_DATE = "8th - 10th May 2026";
export const CONFERENCE_VENUE = "DEPARTMENT OF ELECTRONICS AND COMMUNICATION ENGINEERING, FRANCIS XAVIER ENGINEERING COLLEGE– TIRUNELVELI, INDIA";

export const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "/#home" },
    { label: "Call for Papers", href: "/#cfp" },
    { label: "Important Dates", href: "/#dates" },
    { label: "Committee", href: "/#committee" },
    { label: "Speakers", href: "/#speakers" },
    { label: "Submission", href: "/#submission" },
    { label: "Publication", href: "/#publication" },
    { label: "Contact", href: "/#contact" },
];

// Removed icons from here to avoid top-level JSX execution issues
export const IMPORTANT_DATES = [
    { label: "Paper Submission Hard Deadline", date: "April 30, 2026" },
    { label: "Acceptance Notification Date", date: "May 1, 2026" },
    { label: "Conference Registration Deadline", date: "May 1, 2026" },
    { label: "Camera Ready Manuscript Date", date: "May 5, 2026" },
    { label: "Conference Date", date: "May 8 - 10, 2026" },
];

export const TRACKS: Track[] = [
    {
        id: 1,
        title: "Artificial Intelligences & Machine Learning",
        topics: [
            "Deep learning, neural networks, and representation learning",
            "Reinforcement learning and autonomous decision-making",
            "Explainable AI (XAI) and trustworthy AI",
            "Evolutionary computation, swarm intelligence, and hybrid AI models",
            "Multimodal AI, generative models, and large model architectures",
            "AI for robotics, vision, speech, and natural language processing"
        ]
    },
    {
        id: 2,
        title: "Computational Intelligence & High-Performance Computing",
        topics: [
            "Distributed and cloud computing architectures",
            "Quantum computation, quantum machine learning",
            "Edge, fog, and green computing models",
            "GPU/TPU-accelerated computation frameworks",
            "Mathematical modeling, optimization, and simulation",
            "Complex systems, graph computation, and algorithm engineering"
        ]
    },
    {
        id: 3,
        title: "Data Engineering, Big Data Analytics & Knowledge Systems",
        topics: [
            "Data mining, data warehousing, and data pipelines",
            "Big data frameworks (Hadoop, Spark, Flink, etc.)",
            "Knowledge graphs, semantic web, and ontologies",
            "Time-series modeling, predictive analytics, and forecasting",
            "Data governance, data quality, and responsible data engineering",
            "Computational social science, bioinformatics, and geospatial data systems"
        ]
    },
    {
        id: 4,
        title: "Network Security, Cybersecurity & Privacy Technologies",
        topics: [
            "Network intrusion detection & prevention systems",
            "Cryptography, blockchain, and distributed ledger technologies",
            "Secure communication protocols and cyber-physical systems",
            "Cloud/IoT security, 5G/6G network vulnerabilities",
            "Malware detection, threat intelligence, and incident response",
            "Digital forensics, security analytics & privacy-preserving computation"
        ]
    },
    {
        id: 5,
        title: "Intelligent Communication Systems & Emerging Technologies",
        image: "/images/track_5.png",
        topics: [
            "AI-enabled communication networks",
            "5G/6G wireless systems, MIMO, mmWave & THz communication",
            "Software-defined networks (SDN) and network function virtualization (NFV)",
            "Intelligent IoT systems and smart industrial automation",
            "UAV communication, satellite systems, and smart sensing",
            "Smart cities, autonomous systems, and cyber-physical integration"
        ]
    }
];

export const FEES: FeeStructure[] = [
    { category: "Regular Author", prices: ["11500", "350"] },
    { category: "Students Author", prices: ["11000", "300"] },
    { category: "Industry Professional", prices: ["12500", "-"] },
    { category: "2nd paper, Regular Author", prices: ["11000", "250"] },
    { category: "Listener (Non-Author)", prices: ["5000 (per person)", "150"] },
];

export const SCIENTIFIC_COMMITTEE: CommitteeMember[] = [
    {
        name: "Prof. Mojtaba Ahmadieh Khanesar, PhD",
        role: "Scientific Committee",
        affiliation: "Research Fellow, Manufacturing Metrology Team, Nottingham"
    },
    {
        name: "Prof. Alain Bretto, PhD",
        role: "Scientific Committee",
        affiliation: "Professor, Universite de Caen, France"
    },
    {
        name: "Prof. Xiao-Zhi Gao",
        role: "Scientific Committee",
        affiliation: "School of Computing, University of Eastern Finland"
    },
    {
        name: "Prof. Valentina Emilia Balas",
        role: "Scientific Committee",
        affiliation: "Aurel Vlaicu University of Arad, Romania"
    }
];

export const ORGANIZING_COMMITTEE = {
    chiefPatrons: [
        { name: "Dr. S. Cletus Babu", role: "Founder & Chairman", affiliation: "SCAD Group of Institutions, India" },
        { name: "Dr. X. Amali Cletus", role: "Vice Chairperson", affiliation: "SCAD Group of Institutions, India" },
        { name: "Er. C. Arun Babu", role: "Managing Director", affiliation: "SCAD Group of Institutions, India" }
    ],
    patrons: [
        { name: "Dr. V. Velmurugan", role: "Principal", affiliation: "Francis Xavier Engineering College, Tirunelveli" }
    ],
    conferenceChairs: [
        { name: "Dr. S. Allwin Devaraj", role: "Associate Professor", department: "Department of ECE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. P. Kannan", role: "Associate Professor", department: "Department of ECE", affiliation: "Francis Xavier Engineering College, Tirunelveli" }
    ],
    technicalChairs: [
        { name: "Dr. Y. Harold Robinson", role: "Professor", department: "Department of CSE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. A. Anitha", role: "Professor", department: "Department of AI & DS", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. S. Gomathi", role: "Professor", department: "Department of CSBS", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. G. Aravind Swamynathan", role: "Professor", department: "Department of CSE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. A. Jainul Fathima", role: "Associate Professor", department: "Department of CSE (AI&ML)", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. A. Ravi", role: "Professor", department: "Department of EEE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. M. Caroline Viola Stella Mary", role: "Professor", department: "Department of IT", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. J.B. Shajilin Loret", role: "Professor", department: "Department of IT", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. T.C. Subbulakshmi", role: "Professor", department: "Department of IT", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. R. Ravi", role: "Professor", department: "Department of CSE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. E. Manohar", role: "Associate Professor", department: "Department of CSE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. R. Rajagopal", role: "Associate Professor", department: "Department of EEE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. P. Annapandi", role: "Professor", department: "Department of EEE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. U. Muthuraman", role: "Associate Professor", department: "Department of EEE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. N. Hemalatha", role: "Associate Professor", department: "Department of EEE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. R. Tino Merlin", role: "Associate Professor", department: "Department of CSE", affiliation: "Francis Xavier Engineering College, Tirunelveli" }
    ],
    conveners: [
        { name: "Dr. L. R. Priya", role: "Professor", department: "Department of ECE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. G. Rajakumar", role: "Professor & COE", department: "Department of ECE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Mrs. J. Friska", role: "Professor", department: "Department of ECE", affiliation: "Francis Xavier Engineering College, Tirunelveli" }
    ],
    committeeMembers: [
        "Mr. C. Amarsingh Feroz, Department of ECE, FXEC, Tirunelveli",
        "Mrs. E. Francy Irudaya Rani, Department of ECE, FXEC, Tirunelveli",
        "Mr. B. Pradheep T Rajan, Department of ECE, FXEC, Tirunelveli",
        "Mrs. M. Radha, Department of ECE, FXEC, Tirunelveli",
        "Mrs. T. Ramya, Department of ECE, FXEC, Tirunelveli",
        "Mrs. P. Bhuvana, Department of ECE, FXEC, Tirunelveli",
        "Mrs. R. Valli Suseela, Department of ECE, FXEC, Tirunelveli",
        "Mrs. U. Lenin Marksia, Department of ECE, FXEC, Tirunelveli",
        "Mrs. J. Vanitha, Department of ECE, FXEC, Tirunelveli",
        "Mrs. M.J. Amala, Department of ECE, FXEC, Tirunelveli",
        "Mrs. S. Selva Kani, Department of ECE, FXEC, Tirunelveli",
        "Ms. M. Aarthy, Department of ECE, FXEC, Tirunelveli"
    ],
    publicationCoordinators: [
        { name: "Dr. R. Prem Ananth", role: "Associate Professor", department: "Department of ECE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. Balammal@Geetha", role: "Assistant Professor", department: "Department of ECE", affiliation: "Francis Xavier Engineering College, Tirunelveli" }
    ],
    publicationChairs: [
        { name: "Dr. K. Lakshmi Narayanan", role: "Professor", department: "Department of ECE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. M. V. Rajee", role: "Associate Professor", department: "Department of ECE", affiliation: "Francis Xavier Engineering College, Tirunelveli" }
    ],
    nationalAdvisoryCommittee: [
        "Dr. N.A. Natraj, Symbiosis Institute of Digital and Telecom Management, Pune",
        "Dr. Nitin Muchhal, Jaypee Institute of Information Technology, Noida",
        "Dr. B.V.Santhosh Krishna, New Horizon College of Engineering, Bangalore",
        "Dr. N. Muthukumaran, Sri Eshwar College of Engineering, Coimbatore",
        "Dr. K. Praghash, Christ University, Bangalore",
        "Dr. R. Michael Raj Kingston, Sri Eshwar College of Engineering, Coimbatore",
        "Dr. K.B. Gurumoorthy, KPR Institute of Engineering and Technology, Coimbatore",
        "Dr. S. Esakki Rajavel, Karpagam Academy of Higher Education, Coimbatore",
        "Dr. S. Gopinath, Karpagam Institute of Technology, Coimbatore",
        "Dr. T. Cynthia Anbuselvi, SEA College of Engineering and Technology, Bangalore",
        "Dr. S. Maria Celestin Vigila, Noorul Islam Center for Higher Education",
        "Dr. R. Dhanapal, Karpagam Academy of Higher Education, Coimbatore",
        "Dr. E. Golden Julie, Regional Campus, Anna University, Tirunelveli",
        "Dr. M.S. Sumi, Rohini College of Engineering and Technology, Kanyakumari",
        "Dr. D. Magdalin Mary, Sri Krishna College of Technology, Coimbatore",
        "Dr. S. Kannadhasan, Study World College of Engineering, Coimbatore",
        "Dr. J.V. Anand, Sri Ramachandra Faculty of Engineering and Technology, Chennai",
        "Dr. K. Manikandan, Vellore Institute of Technology, Vellore",
        "Dr. M. Suresh Chinnathampy, Vel Tech High Tech, Chennai",
        "Dr. J. Silamboli, CSI College of Engineering, Ooty",
        "Dr. K.A. Ansal, KMEA Engineering College, Aluva",
        "Dr. D. Sugumar, Karunya Institute of Technology and Sciences, Coimbatore",
        "Dr. P. Rajasekaran, SRM Institute of Science and Technology, Chennai",
        "Dr. Josephine Selle Jeyanathan, Kalasalingam Academy of Research and Education",
        "Dr. K. Annaram, Avinashilingam Institute for Home Science, Coimbatore",
        "Dr. J. Briso Becky Bell, Karunya Institute of Technology and Sciences, Coimbatore"
    ],
    internationalAdvisoryCommittee: [
        "Dr. Xiao-Zhi Gao, University of Eastern Finland, Finland",
        "Dr. Abdel-Badeeh M. Salem, Ain Shams University, Egypt",
        "Dr. Valentina Emilia Balas, Aurel Vlaicu University of Arad, Romania",
        "Dr. Cheng Siong Lee, Monash University, Australia",
        "Stalin Jacob, University of Wales Trinity Saint David, UK",
        "Christo Ananth, Samarkand State University, Uzbekistan"
    ],
    localArrangementChairs: [
        { name: "Dr. V.R.S. Mani", role: "Professor", department: "Department of ECE", affiliation: "Francis Xavier Engineering College, Tirunelveli" },
        { name: "Dr. Kabilan", role: "Associate Professor", department: "Department of ECE", affiliation: "Francis Xavier Engineering College, Tirunelveli" }
    ]
};

export const KEYNOTE_SPEAKERS = [
    {
        name: "Dr. Abhishek Kumar Kashyap",
        designation: "Assistant Professor, Birla Institute of Technology, Mesra, Ranchi",
        quote: "Expert in Artificial Intelligence and Machine Learning applications.",
        src: "/assets/abhishek_kumar_kashyap.png",
        bio: "Dr. Abhishek Kumar Kashyap is an Assistant Professor at the Birla Institute of Technology, Mesra, Ranchi. With a strong background in academic research and teaching, he contributes significantly to the field of computer science and technology."
    },
    {
        name: "Dr. Pawan Kumar Singh",
        designation: "Assistant Professor, IIIT-DM, Kurnool",
        quote: "Dr. Kumar’s impact extends to industrial applications, with active contributions to collaborative research projects.",
        src: "/assets/pawan_kumar_singh.jpg",
        bio: "Dr. Pawan Kumar is an Assistant Professor in the Department of Mechanical Engineering at the Indian Institute of Information Technology, Design and Manufacturing (IIIT-DM), Kurnool, Andhra Pradesh, India. Dr. Kumar holds a Ph.D. in Mechanical Engineering from the esteemed Indian Institute of Technology (IIT-R) Roorkee and earned his Master's degree from IIT (BHU) Varanasi. His extensive international research pedigree includes significant appointments as a Senior Researcher at the Huanjiang Aerospace Laboratory, Zhejiang University (China), as well as research positions at Hanyang University (South Korea), the National University of Singapore (NUS), Singapore, NYCU Taiwan and Chulalongkorn University (Thailand). A prolific researcher, Dr. Kumar has authored over 32+ publications indexed in SCI international journals, including high-impact venues such as Materials & Design, Composite Structures, Frontiers, and Structures. His research is interdisciplinary, focusing on nonlinear dynamics and vibrations, smart and soft material structures, metamaterials and metastructures, Robot kinematics, bioinspired and soft robotics, and energy harvesting systems. He possesses strong expertise in computational methods, including Finite Element Methods (FEM), CAD modeling, and advanced simulation tools such as ANSYS, COMSOL Multiphysics, Abaqus, SolidWorks, and MATLAB. Dr. Kumar’s impact extends to industrial applications, with active contributions to collaborative research projects for major organizations like Indian Railways and Bharat Heavy Electricals Limited (BHEL), alongside numerous international collaborations across South Korea, Taiwan, Thailand, Singapore, and China."
    },
    {
        name: "Dr. Benson Edwin Raj",
        designation: "Assistant Professor at Higher Colleges of Technology, UAE",
        quote: "Specialization in Information Security, and has authored numerous research publications in cybersecurity.",
        src: "/images/speakers/speaker3.jpg",
        bio: "Dr. Benson Edwin Raj is an Assistant Professor in the Department of Information Technology at the Higher Colleges of Technology (HCT), UAE, where he teaches and conducts research in areas such as information security, network security, ethical hacking, artificial intelligence, and computer vision. He holds a Ph.D. in Information and Communication Engineering with a specialization in Information Security, and has authored numerous research publications in cybersecurity, AI, and related fields. Dr. Raj’s work includes practical and theoretical contributions to security systems, IoT, augmented reality applications, and machine learning-based solutions. He actively engages in interdisciplinary research and academic mentorship at HCT."
    },
    {
        name: "Dr. Jino Ramson",
        designation: "Principal Engineer, IoT and RF System Design, Vermont, United States",
        quote: "Strong expertise in RF/mmWave SoC testing, IoT systems, embedded design, and wireless networks.",
        src: "/images/speakers/speaker4.jpg",
        bio: "Dr. Jino Ramson is a Principal Engineer specializing in IoT and RF/mmWave System Design based in Vermont, United States, currently associated with GlobalFoundries US-2 LLC. He holds a Ph.D. in Wireless Sensor Networks from Karunya University, along with a Master’s degree in Networks and Internet Engineering and a Bachelor’s degree in Electronics and Communication Engineering from Anna University. He also completed postdoctoral research at Purdue University, USA. Dr. Ramson has strong expertise in RF/mmWave SoC testing, IoT systems, embedded design, and wireless networks, and has contributed extensively to industry-driven research and publications."
    },
    {
        name: "Ms. Rose Rani John",
        designation: "Lecturer at Baylor University, Waco, Texas, USA",
        quote: "Primary interests are in Cloud Computing, and she is passionate about teaching programming.",
        src: "/images/speakers/speaker5.jpg",
        bio: "Rose Rani John is a Lecturer in the Department of Computer Science at Baylor University’s School of Engineering and Computer Science in Waco, Texas. She holds a Master’s degree in Computer Science and Engineering from Karunya Institute of Technology and Sciences and a B.Tech in Computer Science and Engineering from Cochin University of Science and Technology in India. Before joining Baylor, she spent over 10 years as an Assistant Professor in the Department of Computer Science and Engineering at Karunya Institute of Technology and Sciences. Her primary interests are in Cloud Computing, and she is passionate about teaching programming and related subjects. She is part of Baylor’s faculty, supporting undergraduate and graduate education in computer science."
    }
];