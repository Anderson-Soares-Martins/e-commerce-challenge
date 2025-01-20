"use client";

import React, { useState, useRef } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSearchProps {
  openTo?: "right" | "left";
  moveToDown?: boolean;
}

const AnimatedSearch = ({
  openTo = "right",
  moveToDown
}: AnimatedSearchProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search value:", searchValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    if (formRef.current && !formRef.current.contains(e.relatedTarget)) {
      setIsExpanded(false);
    }
  };

  const handleClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative h-10 w-10 mr-2"
      onBlur={handleBlur}
    >
      <motion.div
        className={cn(
          "flex absolute items-center bg-accent-foreground rounded-full shadow-md h-10",
          isExpanded ? "w-60" : "w-10",
          openTo === "right" ? "left-0" : "right-0"
        )}
        animate={{
          width: isExpanded ? 240 : 40,
          top: isExpanded && moveToDown ? 40 : 0 // Ajusta a posição vertical
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 300
        }}
      >
        <motion.button
          type="button"
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100"
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search className="w-5 h-5 text-gray-600" />
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.input
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "80%" }}
              exit={{ opacity: 0, width: 0 }}
              type="text"
              placeholder="Pesquisar..."
              className="w-full outline-none bg-accent-foreground text-gray-700"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              autoFocus
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.form>
  );
};

export default AnimatedSearch;
