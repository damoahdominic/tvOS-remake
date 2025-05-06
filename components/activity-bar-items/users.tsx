import { users } from "@/data/users";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";
import { ActivityItemsWrapper } from "../activity-items-wrapper";

export default function Users() {
    return (
        <ActivityItemsWrapper animatePresence={true}>
        <motion.div
            variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
            initial="closed"
            animate="open"
            exit="closed"
            className="grid grid-cols-2 gap-4  p-5"
            key="profile"
        >
            {users.map((user, i) => {
                return (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileFocus={{ scale: 1.05 }}
                        key={i}
                        className="relative"
                    >
                        <Image
                            src={user.image}
                            width={135}
                            height={135}
                            alt={user.name}
                            className="rounded-full"
                        />
                        {user.isActive && (
                            <Image
                                src={"/icons/checkmark.svg"}
                                width={28}
                                height={28}
                                alt={"active"}
                                className="absolute top-0 right-0"
                            />
                        )}

                        <p className="text-center">{user.name}</p>
                    </motion.div>
                );
            })}

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
                className="size-[135px] bg-black/50 rounded-full flex items-center justify-center"
            >
                <Plus size={40} />
            </motion.div>
        </motion.div>
        </ActivityItemsWrapper>
        );
}