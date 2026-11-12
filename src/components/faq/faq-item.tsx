import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-row items-center justify-between">
        <span className="text-xl font-bold">{question}</span>
        <button
          className="flex rounded-full p-4 transition-all hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <AiOutlineUp></AiOutlineUp>
          ) : (
            <AiOutlineDown></AiOutlineDown>
          )}
        </button>
      </div>
      {isOpen ? (
        <motion.span
          initial={{
            y: -30,
          }}
          animate={{
            y: 0,
          }}
          className="text-[#CBCBCB]">
          {answer}
        </motion.span>
      ) : null}
    </div>
  );
};

export default FAQItem;
