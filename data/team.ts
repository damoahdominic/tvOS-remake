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
        bio: "Dominic is a seasoned full-stack engineer with years of hands-on experience architecting and building robust digital products from the ground up. With a passion for clean code and seamless user experiences, he bridges the gap between design and development—turning complex challenges into intuitive, scalable solutions. As the project lead for the tvOS initiative, Dominic guided the team with technical excellence and vision, helping bring this groundbreaking platform to life.",
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
        bio: "Daniel is a sharp and forward-thinking lead developer who thrives at the intersection of logic and innovation. With a deep understanding of full-stack systems and software architecture, he played a pivotal role in shaping the technical backbone of the tvOS project. Daniel brings clarity to complexity, building scalable solutions that are as solid under the hood as they are smooth on the surface. His commitment to clean engineering and collaborative development is what sets the foundation for product excellence.",
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
        bio: "Andy is a dynamic 3D web developer with a keen eye for visual storytelling and immersive interaction. Specializing in WebGL and interactive 3D experiences, he brings digital interfaces to life with fluid motion and spatial depth. As the creative force behind the visual layer of the tvOS project, Andy blended technical precision with artistic vision to deliver experiences that feel both futuristic and intuitive. His work turns code into canvas—and browsers into experiences.",
        color:"#C4F7EC",
    },
]

export const designTeam: TeamMember[] = [
    {
        id: 4,
        name: "Michael Damoah",
        role: "Creative Director - Design",
        image: "/team/michael.png",
        linkedin: "https://www.linkedin.com/in/michael-damoah/",
        github: "https://github.com/MikolD",
        email: "mikoldamoah@hotmail.com",
        bio: "Michael is a visionary creative director whose design thinking powers every pixel of the tvOS project. With a sharp eye for aesthetics and a deep understanding of user behavior, he led the visual direction from ideation to execution. His design leadership ensured that the interface wasn’t just functional—but emotionally resonant, elegant, and bold. Michael’s talent lies in crafting digital experiences that feel human, memorable, and beautifully intuitive.",
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
        bio: "Ohene is a product designer with a passion for crafting meaningful digital experiences that not only look good—but feel right. With a background in user research, interface design, and product thinking, he brings clarity and empathy to every pixel. On the tvOS project, Ohene was instrumental in shaping user flows and wireframes into refined, high-impact interfaces. His approach blends design precision with human-centered insight—ensuring every interaction is thoughtful and intuitive.",
        color:"#FFCC73",
    },
    {
        id: 6,
        name: "Luigi Aldo",
        role: "Visual Artist",
        image: "/team/aldo.png",
        linkedin: "https://www.linkedin.com/in/aldo-di-luigi-b81b64113",
        github: "#",
        email: "aldaineredan@gmail.com",
        bio: "Luigi is a creative powerhouse with a sharp visual instinct and a deep love for expressive design. As the visual artist on the tvOS project, he brought bold personality and clarity to the brand—illustrating concepts, refining visuals, and crafting assets that resonate. From color harmony to character design, Luigi’s touch is all over the look and feel of the experience. His artistry doesn’t just decorate—it communicates.",
        color:"#76B161",
    },
]