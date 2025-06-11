export interface TeamMember{
    id: number;
    name: string;
    role: string;
    image: string;
    linkedin: string;
    github: string;
    email: string;
    bio: string;
    color: string
}

export const engineeringTeam: TeamMember[] = [
    {
        id: 1,
        name: "Dominic Damoah",
        role: "Project Lead",
        image: "/team/dominic.png",
        linkedin: "https://www.linkedin.com/in/dominic-damoah/",
        github: "https://github.com/damoahdominic",
        email: "otiekudamoah@gmail.com",
        bio: "From flop to funded — Dom and Larry turn startup chaos into gold.",
        color: "#E1AE9B",
    },
    {
        id: 2,
        name: "Daniel Otoo",
        role: "Lead Developer",
        image: "/team/daniel.png",
        linkedin: "https://www.linkedin.com/in/daniel-otoo-bb6370160/",
        github: "https://github.com/blak-code-tech/",
        email: "otoodaniel56@gmail.com",
        bio: "From flop to funded — Dom and Larry turn startup chaos into gold.",
        color:"#1AC5DF",
    },
    {
        id: 3,
        name: "Andy Ofori",
        role: "Lead 3D Artist",
        image: "/team/andy.png",
        linkedin: "https://gh.linkedin.com/in/andy-ofori-33a138134",
        github: "https://github.com/andyofori",
        email: "andyoforimail@gmail.com",
        bio: "From flop to funded — Dom and Larry turn startup chaos into gold.",
        color:"#C4F7EC",
    },
]

export const designTeam: TeamMember[] = [
    {
        id: 4,
        name: "Michael Damoah",
        role: "Creative Director - Design",
        image: "/team/michael.png",
        linkedin: "https://www.linkedin.com/in/fernandocarvalhoo/",
        github: "https://github.com/fernandocarvalho",
        email: "mK6Mw@example.com",
        bio: "From flop to funded — Dom and Larry turn startup chaos into gold.",
        color:"#1E5C83",
    },
    {
        id: 5,
        name: "Ohene Gyan",
        role: "Product Designer",
        image: "/team/ohene.png",
        linkedin: "https://www.linkedin.com/in/ohenegyankatakyie/",
        github: "https://github.com/ohenegyan12",
        email: "ohenegyan159@gmail.com",
        bio: "From flop to funded — Dom and Larry turn startup chaos into gold.",
        color:"#FFCC73",
    },
    {
        id: 6,
        name: "Luigi Aldo",
        role: "Visual Artist",
        image: "/team/aldo.png",
        linkedin: "https://www.linkedin.com/in/fernandocarvalhoo/",
        github: "https://github.com/fernandocarvalho",
        email: "mK6Mw@example.com",
        bio: "From flop to funded — Dom and Larry turn startup chaos into gold.",
        color:"#76B161",
    },
]