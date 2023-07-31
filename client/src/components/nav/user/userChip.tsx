import {UserIcon} from '@heroicons/react/24/solid';
import {Chip} from '@mui/material';
import React from 'react';

type UserChipProps = {
  onClick: () => void;
};

export default function UserChip({onClick}: UserChipProps) {
  return (
    <Chip
      onClick={onClick}
      icon={<UserIcon className="h-6" color="white" />}
      label="Sign in"
      className="h-10 w-32 rounded-full cursor-pointer border-[1px] border-solid border-gray-600 text-white hover:border-[3px] transition-all"
    />
  );
}
