"use client";

import { AlertTriangle, X } from "lucide-react";

type ErrorModalProps = {
  open: boolean;
  title: string;
  message?: string;
  items?: string[];
  onClose: () => void;
};

export default function ErrorModal({
  open,
  title,
  message,
  items = [],
  onClose,
}: ErrorModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/55"
        onClick={onClose}
        aria-label="Close error dialog"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200"
      >
        <div className="flex items-start justify-between gap-4 p-5 border-b border-slate-100">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle size={18} className="text-red-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
              {message && (
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{message}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {items.length > 0 && (
          <div className="px-5 py-4">
            <p className="text-sm font-semibold text-slate-700 mb-2">Please complete:</p>
            <ul className="space-y-1.5 text-sm text-slate-600 list-disc pl-5">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="px-5 pb-5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl brand-primary-button px-4 py-2.5 text-sm font-semibold"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
