import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

export default function AccountSettings({ account, loading, onSavePhone }) {
  const [phone, setPhone] = useState("");
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formatForDisplay = (value) => {
    const digits = (value || "").replace(/\D/g, "");
    const trimmed = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
    if (trimmed.length < 10) return trimmed;
    return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3, 6)}-${trimmed.slice(6, 10)}`;
  };

  useEffect(() => {
    setPhone(formatForDisplay(account?.phoneNumber || ""));
    setDirty(false);
    setError("");
    setSuccess("");
  }, [account]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Enter a 10-digit number.");
      return;
    }
    setError("");
    const normalized = `+1${digits}`;
    onSavePhone(normalized);
    setSuccess("Saved.");
    setDirty(false);
  };

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Account</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-gray-900">
          Phone number
          <InputMask
            mask="(999) 999-9999"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setDirty(true);
              setError("");
              setSuccess("");
            }}
            disabled={loading}
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type="tel"
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="(555) 555-1234"
              />
            )}
          </InputMask>
        </label>
        <p className="text-xs text-gray-600">
          We only use your number to send and receive guidance.
        </p>
        {error && <p className="text-xs text-red-600">{error}</p>}
        {success && <p className="text-xs text-green-700">{success}</p>}
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-blue-900 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-950 transition disabled:opacity-70"
          disabled={loading || !dirty}
        >
          Save phone
        </button>
      </form>
    </div>
  );
}
