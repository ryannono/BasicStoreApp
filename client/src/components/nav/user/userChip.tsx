import {UserIcon} from '@heroicons/react/24/solid';
import {Chip} from '@mui/material';
import {useUserContext} from '../../../globals/userContext';

/**
 * A React component representing a user chip showing user-related information.
 * @component
 * @param {UserChipProps} props - The component props.
 * @param {Function} props.onClick - A function to be executed when the user chip is clicked.
 */
export default function UserChip({onClick}: UserChipProps) {
  const userContext = useUserContext();
  return (
    <Chip
      onClick={onClick}
      icon={<UserIcon className="h-6" color="white" />}
      label={
        userContext?.user?.firstName
          ? `${userContext.user.firstName} ${userContext.user.lastName}`
          : 'Sign in'
      }
      className="h-10 w-32 rounded-full cursor-pointer border-[1px] border-solid border-gray-600 text-white hover:border-[3px] transition-all"
    />
  );
}

type UserChipProps = {
  onClick: () => void;
};
