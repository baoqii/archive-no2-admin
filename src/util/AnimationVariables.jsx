const easeTransition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
};

export const Variants = {
  exit: { y: "50%", opacity: 0, easeTransition },
  enter: {
    y: "0%",
    opacity: 1,
    easeTransition,
  },
};

export const Transition = {
  type: "spring",
  mass: 0.2,
  duration: 1,
};
