export interface NavItem {
    label: string;
    href: string;
    isButton?: boolean;
    children?: NavItem[];
}

export interface Track {
    id: string | number;
    title: string;
    topics: string[];
    image?: string;
}

export interface SlideData {
    title: string;
    button: string;
    src: string;
}

export interface MarqueeSettings {
    text: string;
    show: boolean;
}

export interface FeeStructure {
    category: string;
    prices: string[]; // Values for dynamic columns after Category
}

export interface FloatingNote {
    id: string;
    content: string;
    x: number;
    y: number;
    show: boolean;
}

export interface PublicationLink {
    text: string;
    url: string;
}

export interface PublicationProceeding {
    title: string;
    description: string;
    image: string; // For logos
    link?: PublicationLink;
}

export interface PublicationSection {
    title: string;
    subtitle: string;
    intro: string;
    note: string;
    proceedings: PublicationProceeding[];
}

export interface ProgramDocument {
    id: number;
    title: string;
    fileUrl: string;
}


export interface PeerReviewSection {
    title: string;
    description: string;
    steps: string[];
}

export interface SubmissionGuidanceState {
    title: string;
    guidelines: string[];
    plagiarismPolicy: {
        title: string;
        content: string;
    };
    templateUrl: string;
}

export interface Speaker {
    id?: string;
    name: string;
    designation: string;
    quote: string;
    src: string;
    bio?: string;
}

export interface CommitteeMember {
    id?: string;
    name: string;
    role?: string;
    affiliation?: string;
    department?: string;
    education?: string;
}

export interface DateItem {
    id?: string;
    label: string;
    date: string;
}

export interface ContentState {
    conference: {
        name: string;
        fullName: string;
        date: string;
        venue: string;
    };
    hero: {
        images: string[];
        marquee: MarqueeSettings;
    };
    about: {
        title: string;
        subtitle: string;
        paragraphs: string[];
        images: string[];
    };
    dates: {
        title: string;
        subtitle: string;
        items: DateItem[];
    };
    tracks: {
        title: string;
        subtitle: string;
        description: string;
        items: Track[];
    };
    peerReview: PeerReviewSection;
    speakers: {
        title: string;
        subtitle: string;
        items: Speaker[];
    };

    committee: {
        scientific: CommitteeMember[];
        organizing: {
            chiefPatrons: CommitteeMember[];
            patrons: CommitteeMember[];
            conferenceChairs: CommitteeMember[];
            technicalChairs: CommitteeMember[];
            conveners: CommitteeMember[];
            committeeMembers: string[];
            publicationCoordinators: CommitteeMember[];
            publicationChairs: CommitteeMember[];
            nationalAdvisoryCommittee: string[];
            internationalAdvisoryCommittee: string[];
            localArrangementChairs: CommitteeMember[];
        };
    };
    fees: {
        title: string;
        subtitle: string;
        columnHeaders: string[];
        items: FeeStructure[];
        inclusionsTitle: string;
        inclusions: string[];
        importantPointsTitle: string;
        importantPoints: string[];
        qrCode?: string;
        paymentLink?: string;
    };
    publication: PublicationSection;
    programSchedule: {
        title: string;
        documents: ProgramDocument[];
    };
    contact: {
        email: string;
        secondaryEmails: string[];
        phone: string;
    };
    submissionGuidance: SubmissionGuidanceState;
    refundPolicy: string;
    publicationPolicy: string;
    paymentPolicy: string;
    termsPolicy: string;
    privacyPolicy: string;
    glimpse: {
        show: boolean;
        slides: SlideData[];
    };
    floatingNotes: FloatingNote[];
}

