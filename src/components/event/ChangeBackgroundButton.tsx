import Button from '../ui/Button';

interface ChangeBackgroundButtonProps {
  onClick: () => void;
}

const ChangeBackgroundButton = ({ onClick }: ChangeBackgroundButtonProps) => {
  return (
    <Button variant="tertiary" fullWidth size="md" emoji="🖼" onClick={onClick} className="h-[71px]">
      Change background
    </Button>
  );
};

export default ChangeBackgroundButton;

