"use client";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../common/Button";

export default function DeleteModel({
  isOpen,
  onClose,
  id = null,
  onDelete,
  label,
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSuccess = () => {
    setLoading(false);
    onClose();
  };

  const onError = () => {
    setLoading(false);
  };

  const deleteFn = async () => {
    setLoading(true);
    dispatch(onDelete(id, onSuccess, onError));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] bg-black/50 backdrop-blur-[2px] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-[10px] border border-border shadow px-5 py-10 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-center text-heading-secondary">
          Delete {label}
        </h2>

        <p className="text-center text-base text-text">
          Are you sure you want to delete this {label}?
        </p>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
            className="px-4 py-3 cursor-pointer border border-border text-text text-[13px] rounded-md hover:bg-text-ternary/20 transition font-semibold"
          >
            Cancel
          </button>
          <Button
            onClick={deleteFn}
            loading={loading}
            text={"Delete"}
            loadingText={"Deleting..."}
            className={"py-2!"}
          />
        </div>
      </div>
    </div>
  );
}
