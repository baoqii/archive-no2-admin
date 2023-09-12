import { useState, useContext } from "react";
import LogoutModal from "./LogoutModal";
import { AuthContext } from "../../contexts/AuthContext";
import { LogOut } from "react-feather";
import ErrorPopUp from "../Error/ErrorPopUp";

export const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // New state variable
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmLogout = () => {
    setIsLoggingOut(true);
    setTimeout(async () => {
      try {
        await logout();
        setIsModalOpen(false);
        setIsLoggingOut(false);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error);
        setIsLoggingOut(false);
      }
    }, 3500);
  };
  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  return (
    <>
      {errorMessage && (
        <ErrorPopUp
          error={errorMessage}
          clearErrorMessage={clearErrorMessage}
        />
      )}
      <button
        className="logoutBtn w-[22px] h-[22px]"
        onClick={handleLogout}
        aria-label="Logout"
      >
        <i className="inline-flex shrink-0 text-center">
          <LogOut size={22} />
        </i>
      </button>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirmLogout={handleConfirmLogout}
        isLoggingOut={isLoggingOut}
      />
    </>
  );
};
