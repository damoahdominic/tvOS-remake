"use client";
export const runtime = "edge";
import { engineeringTeam, designTeam } from "@/data/team";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Link } from "next-view-transitions";
import AppleTVCard from "react-apple-tv-card";

export default function Page() {
  const param = useParams<{ id: string }>();
  const router = useRouter();
  const mergedTeam = [...engineeringTeam, ...designTeam];
  const member = mergedTeam.find((member) => member.id === Number(param.id));
  return (
    <div className="flex items-center justify-center min-h-svh overflow-auto text-white bg-black/80 transition-all duration-1000 p-4 sm:p-6 lg:p-8">
      <h1 className="hidden sm:block absolute top-5 left-5 z-50 font-medium text-sm text-white/60">
        Press{" "}
        <span
          className="border-2 border-white/60 px-2 py-1.5 text-xs rounded-lg cursor-pointer"
          onClick={() => router.push("/team?tab=team")}
        >
          esc
        </span>{" "}
        to go back
      </h1>

      {member ? (
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="flex-shrink-0 mx-auto lg:mx-0"
          >
            <motion.div
              style={{
                background: "linear-gradient(135deg, #101010 0%, #454545 100%)",
              }}
              className={`rounded-lg h-full flex items-end card-animate`}
            >
              <motion.div className="relative aspect-square w-64 sm:w-80 lg:w-96 xl:w-[380px] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
          <div className="space-y-3 sm:space-y-4 flex-1 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.5 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold"
            >
              {member.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.6 }}
              className="border border-white/50 text-white/50 rounded-md p-1.5 sm:p-2 w-fit text-xs sm:text-sm mx-auto lg:mx-0"
            >
              {member.role}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.7 }}
              className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {member.bio}
            </motion.p>

            <div className="space-y-4 sm:space-y-5">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.8 }}
                className="mt-8 sm:mt-10 text-xl sm:text-2xl font-bold"
              >
                Links
              </motion.h3>
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-9 max-w-2xl mx-auto lg:mx-0">
                <Link href={"mailto:" + member.email}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.9 }}
                  >
                    <AppleTVCard
                      title={"Email"}
                      autoSize={true}
                      withShadow={true}
                      rounded={false}
                      backgroundImage={"/email-card.png"}
                      className="aspect-video object-cover"
                    />
                  </motion.div>
                </Link>
                <Link href={member.linkedin} target="_blank">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 1 }}
                  >
                    <AppleTVCard
                      title={"LinkedIn"}
                      autoSize={true}
                      withShadow={true}
                      rounded={false}
                      backgroundImage={"/linkedin-card.png"}
                      className="aspect-video object-cover"
                    />
                  </motion.div>
                </Link>
                <Link href={member.github} target="_blank">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 1.1 }}
                  >
                    <AppleTVCard
                      title={"Github"}
                      autoSize={true}
                      withShadow={true}
                      rounded={false}
                      backgroundImage={"/github-card.png"}
                      className="aspect-video object-cover"
                    />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        <p>Member Not Found</p>
      )}
    </div>
  );
}