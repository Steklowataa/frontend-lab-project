"use client"

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700">
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Moja Aplikacja. Wszelkie prawa zastrzeżone.
      </p>
    </footer>
  );
};

export default Footer;
