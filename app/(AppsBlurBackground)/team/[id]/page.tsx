"use client";
export const runtime = "edge";
import { engineeringTeam, designTeam } from "@/data/team";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Link } from "next-view-transitions";
import AppleTVCard from "react-apple-tv-card";
import EscapeNotice from "@/components/EscapeNotice";

export default function Page() {
  const param = useParams<{ id: string }>();
  const mergedTeam = [...engineeringTeam, ...designTeam];
  const member = mergedTeam.find((member) => member.id === Number(param.id));
  return (
    <div className="flex items-center justify-center h-svh overflow-hidden text-white bg-black/80 gradient-trans">
      <EscapeNotice className="absolute top-5 left-5 z-50" />

      {member ? (
        <div className="flex gap-10 mx-auto w-3/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
          >
            <motion.div
              style={{
                background: "linear-gradient(135deg, #101010 0%, #454545 100%)",
              }}
              className={`rounded-lg h-full flex items-end card-animate`}
            >
              <motion.div className="relative aspect-square min-w-[380px] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.5 }}
              className="text-3xl font-bold"
            >
              {member.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.6 }}
              className="border border-white/50 text-white/50 rounded-md p-1 w-fit text-xs"
            >
              {member.role}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.7 }}
              className=""
            >
              {member.bio}
            </motion.p>

            <div className="space-y-5">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.8 }}
                className="mt-10 text-2xl font-bold"
              >
                Links
              </motion.h3>
              <motion.div className="grid grid-cols-3 gap-9 max-w-2xl">
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
