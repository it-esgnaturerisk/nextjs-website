'use client';

/* eslint-disable react/function-component-definition */
import React, { ChangeEvent, FC, useState } from 'react';
import { UserType } from '@/lib/types';

interface Props {
  user: UserType;
  // changeUserName: (id: number, text: string) => void;
  // toggleIsUserDone: (id: number, done: boolean) => void;
  // deleteUserItem: (id: number) => void;
}

const UserRow: FC<Props> = ({
  user,
  // changeUserName,
  //   toggleIsUserDone,
  // deleteUserItem,
}) => {
  // State for handling editing mode
  const [editing, setEditing] = useState(false);

  // State for handling text input
  const [name, setName] = useState(user.name);

  // State for handling "done" status
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDone, setIsDone] = useState(user.elevation);

  // Event handler for text input change
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Eve handler for toggling "done" status
  //   const handleIsDone = async () => {
  //     toggleIsUserDone(user.id, !isDone);
  //     setIsDontne((prev) => !prev);
  //   };

  // Event handler for initiating the edit mode
  const handleEdit = () => {
    setEditing(true);
  };

  // Event handler for saving the edited text
  const handleSave = async () => {
    // changeUserName(user.id, name!);
    setEditing(false);
  };

  // Event handler for canceling the edit mode
  const handleCancel = () => {
    setEditing(false);
    setName(user.name);
  };

  // Event handler for deleting a user item
  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    if (confirm('Are you sure you want to delete this user?')) {
      // deleteUserItem(user.id);
    }
  };

  // Rendering the User component
  return (
    <div className="flex items-center gap-2 p-4 border-gray-200 border-solid border rounded-lg">
      {/* Checkbox for marking the user as done */}
      <input
        type="checkbox"
        className="text-blue-200 rounded-sm h-4 w-4"
        // checked={isDone}
        // onChange={handleIsDone}
      />
      {/* Input field for user text */}
      <input
        type="text"
        value={name!}
        onChange={handleTextChange}
        readOnly={!editing}
        className="outline-none read-only:border-transparent focus:border border-gray-200 rounded px-2 py-1 w-full"
      />
      {/* Action buttons for editing, saving, canceling, and deleting */}
      <div className="flex gap-1 ml-auto">
        {editing ? (
          <button
            type="button"
            onClick={handleSave}
            className="bg-green-600 text-green-50 rounded px-2 w-14 py-1"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            onClick={handleEdit}
            className="bg-blue-400 text-blue-50 rounded w-14 px-2 py-1"
          >
            Edit
          </button>
        )}
        {editing ? (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-400 w-16 text-red-50 rounded px-2 py-1"
          >
            Close
          </button>
        ) : (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-400 w-16 text-red-50 rounded px-2 py-1"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default UserRow;
