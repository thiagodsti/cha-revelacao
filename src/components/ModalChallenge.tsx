import Modal from "./Modal";

interface ModalChallengeProps {
  show: boolean;
  onClick: () => void;
}
function ModalChallenge({ show, onClick }: ModalChallengeProps) {
  return (
    <Modal show={show}>
      <p>Challenge</p>
      <button onClick={onClick}>Continuar</button>
    </Modal>
  );
}
export default ModalChallenge;
