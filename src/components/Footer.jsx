export const Footer = () => {
  return (
    <footer
      className="w-full flex justify-between items-center h-8 mt-20 mx-0 bg-transparent font-medium text-tundora-700 dark:text-silver-400 tracking-wider text-sm font-lato
      "
    >
      <div className="w-1/2">
        <p className="">© Copyright 2021. All Rights Reserved.</p>
      </div>
      <div className="w-1/2">
        <ul className="flex gap-8 justify-end">
          <li className="cursor-pointer hover:underline hover:underline-offset-4">
            Terms & Conditions
          </li>
          <li className="cursor-pointer hover:underline hover:underline-offset-4">
            Privacy
          </li>
          <li className="cursor-pointer hover:underline hover:underline-offset-4">
            Support
          </li>
        </ul>
      </div>
    </footer>
  );
};
