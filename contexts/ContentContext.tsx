import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ContentState, Track, Speaker, DateItem, FeeStructure, CommitteeMember } from '../types';
import {
    CONFERENCE_NAME, CONFERENCE_FULL_NAME, CONFERENCE_DATE, CONFERENCE_VENUE,
    IMPORTANT_DATES, TRACKS, KEYNOTE_SPEAKERS, SCIENTIFIC_COMMITTEE, ORGANIZING_COMMITTEE, FEES
} from '../constants';

const DEFAULT_PUBLICATION = {
    title: "Publication & Indexing",
    subtitle: "Conference Proceedings",
    intro: `All the ${CONFERENCE_NAME} and its Special Sessions presented papers will be published in any one of the following conference proceedings.`,
    note: `All the ${CONFERENCE_NAME} and its Special Sessions presented papers will be published in any one of the following conference proceedings, based on the decision of Editorial Committee after seeing the review comments and the quality of the submitted paper. The committee decision will be final and no change of publication from springer CCIS to MDPI or vice-versa will be entertained under any circumstances.`,
    proceedings: [
        {
            title: "Publication in Springer Proceedings in Information and Communication Technologies",
            description: `Springer "Communications in Computer and Information Science (CCIS), Series", Electronic ISSN: 1865-0937, Print ISSN1865-0929. The CCIS series are indexed in Scopus, EI Compendex, DBLP, SCImago, zbMATH, INSPEC, Japanese Science and Technology Agency (JST), and Norwegian Register for Scientific Journals and Series.`,
            image: "/images/springer_logos.png",
            link: {
                text: "Communications in Computer and Information Science (CCIS), Series",
                url: "#"
            }
        }
    ]
};


const defaultContent: ContentState = {
    conference: {
        name: CONFERENCE_NAME,
        fullName: CONFERENCE_FULL_NAME,
        date: CONFERENCE_DATE,
        venue: CONFERENCE_VENUE
    },
    hero: {
        images: [
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1920&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1920&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1920&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1475721027767-4d529c14654f?q=80&w=1920&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1920&auto=format&fit=crop"
        ],
        marquee: {
            text: "Accepted papers will be published in Taylor and Francis Proceedings • Submission Deadline: April 30, 2026",
            show: true
        }
    },
    about: {
        title: "Welcome to AICNS 2026",
        subtitle: "About The Conference",
        paragraphs: [
            "The First International Conference on Artificial Intelligences, Computation and Network Security (AICNS 2026) is a premier global forum for the presentation of innovative research findings, technological advancements, and practical development experiences across the expansive domains of Artificial Intelligence, Computational Sciences, Communication Technologies, and Network Security. AICNS 2026 brings together leading researchers, industry experts, academicians, and practitioners from diverse engineering and technology disciplines to exchange insights and foster meaningful collaboration.",
            "AICNS 2026 aims to advance the frontier of knowledge by encouraging high-quality contributions that explore both foundational theories and cutting-edge applications. The conference particularly welcomes works addressing emerging challenges in intelligent systems, scalable computation, cyber-physical security, machine learning infrastructures, data-driven automation, and secure communication frameworks.",
            "To nurture research excellence and broaden the scope of discourse, the conference will feature expert keynote lectures, invited talks, and dedicated sessions for early-career researchers. These sessions will spotlight original ideas, contemporary innovations, and interdisciplinary approaches that push the boundaries of AI-driven computation and security technologies.",
            "Researchers, academicians, and professionals worldwide are invited to submit original, unpublished manuscripts encompassing theoretical models, algorithmic developments, experimental studies, system implementations, case studies, and review papers emphasizing significant trends within the domains of Artificial Intelligences, Computation, and Network Security.",
            "AICNS 2026 will serve as a cross-disciplinary knowledge convergence platform, bridging gaps between academic institutions, industry partners, research laboratories, governmental bodies, and private technology organizations. This collaboration-centric environment ensures the integration of research and education, enabling participants to collectively explore the future of intelligent computing and secure digital ecosystems."
        ],
        images: [
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1920&auto=format&fit=crop", // AI Brain
            "/images/ai_network_hero.png", // AI Network
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1920&auto=format&fit=crop", // Cyber Security / Lock
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop"  // Tech/Circuit
        ]
    },
    dates: {
        title: "Important Dates",
        subtitle: "Mark Your Calendar",
        items: IMPORTANT_DATES
    },
    tracks: {
        title: "Call For Papers",
        subtitle: "Conference Tracks",
        description: "We invite original research papers on the following tracks:",
        items: TRACKS
    },
    peerReview: {
        title: "Peer Review Process",
        description: "AICNS 2026 follows a rigorous peer review process to ensure the quality, originality, and relevance of all accepted papers.",
        steps: [
            "All submissions are first screened using plagiarism detection software (e.g., Turnitin). Manuscripts must have a similarity index within 10–15%, excluding references and bibliography, with a minimum word match setting of three. Papers exceeding this limit will be rejected without review. Any instance of plagiarism identified at any stage will result in immediate rejection or retraction.",
            "Manuscripts passing the initial screening are reviewed by at least three experts selected from the Technical Program Committee and external reviewers. A double-blind peer review process is followed, evaluating originality, technical soundness, relevance to conference themes, clarity, and contribution to the field.",
            "Based on reviewer recommendations, the Program Chairs make the final decision (accept, revise, or reject). Authors of papers requiring revisions must resubmit within the specified timeframe. Accepted papers must comply with formatting and copyright requirements before inclusion in the conference proceedings."
        ]
    },
    speakers: {
        title: "Keynote Speakers",
        subtitle: "Distinguished Guests",
        items: KEYNOTE_SPEAKERS as Speaker[]
    },
    committee: {
        scientific: SCIENTIFIC_COMMITTEE,
        organizing: ORGANIZING_COMMITTEE
    },
    fees: {
        title: "Registration Fees",
        subtitle: "Join The Conference",
        columnHeaders: ["Category", "Indian Delegates (INR)", "International Delegates (USD)"],
        items: FEES,
        inclusionsTitle: "Registration Includes",
        inclusions: [
            "Welcome reception, Conference Badge",
            "Conference Kit.",
            "Presentation certificate.",
            "Access to all technical sessions and Keynotes.",
            "Snacks, Tea/Coffee breaks and Lunch"
        ],
        importantPointsTitle: "Important Points",
        importantPoints: [
            "To be eligible for student registration, the presenting author should be a student.",
            "Once the paper is registered, withdrawal is not allowed under any circumstances.",
            "The conference is non-residential and delegates are kindly requested to make their own arrangement for accommodation."
        ],
        qrCode: "",
        paymentLink: ""
    },
    publication: DEFAULT_PUBLICATION,
    programSchedule: {
        title: "Program Schedule",
        documents: [
            { id: 1, title: "Day 1 Schedule", fileUrl: "#" },
            { id: 2, title: "Day 2 Schedule", fileUrl: "#" },
            { id: 3, title: "Day 3 Schedule", fileUrl: "#" }
        ]
    },
    contact: {
        email: "info@aicns2026.org",
        secondaryEmails: [],
        phone: "+91 123 456 7890"
    },
    submissionGuidance: {
        title: "Submission Guidelines",
        guidelines: [
            "Authors are invited to submit their manuscripts electronically in English. Submissions may include full papers—up to 10 pages. Manuscripts must be prepared strictly according to the conference template.",
            "All papers must be submitted electronically via the designated Submission Management System (Microsoft CMT). Accepted papers will be forwarded to Taylor and Francis Proceedings.",
            "All manuscripts will be subjected to a rigorous double-blind peer-review process."
        ],
        plagiarismPolicy: {
            title: "Plagiarism Policy",
            content: "Manuscripts must be screened using authorized tools like Turnitin (similarity below 10%). Self-plagiarism and uncredited use of others' work are strictly prohibited."
        },
        templateUrl: "#"
    },
    refundPolicy: "Cancellations made 30 days before the conference will receive a 75% refund. No refunds will be provided after this date.",
    publicationPolicy: "All accepted and registered papers will be published in the conference proceedings.",
    paymentPolicy: "No registration will be confirmed until payment is received. Once the registration is received paper status in CMT will be marked as “Registered”. No separate confirmation mail will be sent in this regard. Authors are suggested to check their paper status regularly after payment. Payment can be made by: Credit Card/Debit card, PhonePe, Googlepay, Paytm etc. Credit card details will not be accepted via email.",
    termsPolicy: "Registration must be paid & confirmed before the deadline. We may revise our terms and conditions as per the government norms, for example to reflect changes in relevant laws or regulatory requirements or improvements.",
    privacyPolicy: "Filming and photography may take place at the conference. You consent to your image and likeness being used in marketing and films without any payment to you. By attending the conference, you hereby grant the absolute right and permission to use your photograph or video image in promotional materials and publicity. In addition, you hereby consent to waive any and all future claims, causes of action, and/or demands against the conference committee.",
    glimpse: {
        show: true,
        slides: [
            {
                title: "Mystic Mountains",
                button: "View Gallery",
                src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop"
            },
            {
                title: "Urban Dreams",
                button: "View Gallery",
                src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop"
            },
            {
                title: "Neon Nights",
                button: "View Gallery",
                src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop"
            },
            {
                title: "Desert Whispers",
                button: "View Gallery",
                src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop"
            }
        ]
    },
    floatingNotes: []
};

interface ContentContextType {
    content: ContentState;
    updateContent: (section: keyof ContentState, data: any) => void;
    saveChanges: () => void;
    hasUnsavedChanges: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<ContentState>(defaultContent);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    useEffect(() => {
        let initialData: ContentState = defaultContent;
        const saved = localStorage.getItem('aicns_content_v1');
        if (saved) {
            try {
                initialData = JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved content", e);
            }
        }

        // Migration: Ensure stable IDs exist for all editable arrays to prevent React rendering bugs
        const genId = () => Math.random().toString(36).substring(2, 9);
        const ensureIds = (arr: any[]) => arr?.map(item => item.id ? item : { ...item, id: genId() }) || [];
        
        if (initialData.committee?.scientific) {
            initialData.committee.scientific = ensureIds(initialData.committee.scientific);
        }
        if (initialData.speakers?.items) {
            initialData.speakers.items = ensureIds(initialData.speakers.items);
        }
        if (initialData.dates?.items) {
            initialData.dates.items = ensureIds(initialData.dates.items);
        }
        if (initialData.tracks?.items) {
            initialData.tracks.items = ensureIds(initialData.tracks.items);
        }

        setContent(initialData);
    }, []);

    const updateContent = (section: keyof ContentState, data: any) => {
        setContent(prev => {
            const prevSection = prev[section];
            // If the existing section value OR incoming data is an array, replace directly
            const merged = Array.isArray(prevSection) || Array.isArray(data)
                ? data
                : { ...prevSection, ...data };
            return { ...prev, [section]: merged };
        });
        setHasUnsavedChanges(true);
    };

    // Helper for deep updates if needed, but simple section replacement works for now

    const saveChanges = () => {
        localStorage.setItem('aicns_content_v1', JSON.stringify(content));
        setHasUnsavedChanges(false);
        alert("Changes saved successfully!");
    };

    return (
        <ContentContext.Provider value={{ content, updateContent, saveChanges, hasUnsavedChanges }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) throw new Error("useContent must be used within ContentProvider");
    return context;
};