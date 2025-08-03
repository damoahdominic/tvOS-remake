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
        email: "ceo@300mil.com",
        bio: "With over a decade in the trenches of AI and software engineering, Dominic has the scars and wins that only come from shipping products that matter. As an O1 visa recipient who chose America as his battlefield, he's not here to play small—he's on a mission to create $300M+ in value by 2033. But this isn't about the money. It's about solving problems so real, so painful, that the market will pay anything for the solution. Dominic sees what others miss: the gaps between what technology can do and what the world desperately needs. He builds bridges across those gaps, turning possibility into inevitability. Every line of code, every pivot, every sleepless night is fuel for something bigger—products that don't just capture value, but create it from thin air. The kind of ventures that make investors wish they'd written the first check. The best entrepreneurs don't chase trends. They create them. Dominic is building tomorrow's necessities today.",
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
    {
        id: 4,
        name: "Ebenezer Owusu",
        role: "Frontend Developer",
        image: "/team/ebenezer.png",
        linkedin: "https://www.linkedin.com/in/ebenezer-owusu-239486233/",
        github: "https://github.com/Ebenezerowusu35",
        email: "oebenezer229@gmail.com",
        bio: "Ebenezer is a skilled frontend developer who brings precision and modern sensibility to every interface he touches. With expertise in React.js, Next.js, and WebGL technologies, he crafted seamless user experiences that make the tvOS project feel both intuitive and performant. His technical craftsmanship transforms complex functionality into elegant, user-centric digital experiences.",
        color:"#C4F7EC",
    },
]

export const designTeam: TeamMember[] = [
    {
        id: 5,
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
        id: 6,
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
        id: 7,
        name: "Luigi Aldo",
        role: "Visual Artist",
        image: "/team/aldo.png",
        linkedin: "https://www.linkedin.com/in/aldo-di-luigi-b81b64113",
        github: "#",
        email: "aldaineredan@gmail.com",
        bio: "Luigi is a creative powerhouse with a sharp visual instinct and a deep love for expressive design. As the visual artist on the tvOS project, he brought bold personality and clarity to the brand—illustrating concepts, refining visuals, and crafting assets that resonate. From color harmony to character design, Luigi’s touch is all over the look and feel of the experience. His artistry doesn’t just decorate—it communicates.",
        color:"#76B161",
    },
    {
        id: 8,
        name: "Sampson Adjei",
        role: "Team Manager",
        image: "/team/sampson.png",
        linkedin: "https://www.linkedin.com/in/sampson-adjei-b594002b5/",
        github: "https://github.com/Fnomer12",
        email: "skeng246@gmail.com",
        bio: "Sampson is the organizational backbone of Ddamoah Studios, bringing structure and vision to every aspect of development. As team manager, he thrives on challenging himself and pushing technological boundaries, seamlessly coordinating between innovation and execution. His passion for technology and relentless pursuit of excellence drives him to transform ambitious ideas into reality through effective leadership and collaboration.",
        color:"#76B161",
    },
]