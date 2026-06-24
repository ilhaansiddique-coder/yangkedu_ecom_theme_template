"use client";

import { useState } from "react";
import { MapPin, Plus, Trash2, Check } from "lucide-react";
import BackHeader from "@/components/BackHeader";
import LoginPrompt from "@/components/LoginPrompt";
import { useAuth } from "@/lib/auth";
import { useAddresses } from "@/lib/addresses";

export default function AddressesPage() {
  const { user } = useAuth();
  const { addresses, add, remove, setDefault } = useAddresses();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", line: "", city: "" });

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    add(form);
    setForm({ name: "", phone: "", line: "", city: "" });
    setShowForm(false);
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg-canvas lg:min-h-0 lg:bg-transparent">
      <BackHeader title="Addresses" />
      <h1 className="hidden pb-3 text-[22px] font-bold text-ink lg:block">Shipping Addresses</h1>

      {!user ? (
        <LoginPrompt next="/addresses" message="Log in to manage your delivery addresses." />
      ) : (
        <div className="mx-auto w-full max-w-[640px] space-y-2 p-2 lg:space-y-3 lg:p-0">
          {addresses.map((a) => (
            <div key={a.id} className="rounded-[10px] bg-white p-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-brand" />
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-ink">
                    {a.name} <span className="ml-1 font-normal text-muted">{a.phone}</span>
                    {a.isDefault && (
                      <span className="ml-2 rounded bg-pill px-1.5 py-0.5 text-[10px] font-medium text-brand">Default</span>
                    )}
                  </p>
                  <p className="mt-0.5 text-[12px] text-muted">
                    {a.line}, {a.city}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(a.id)}
                  aria-label="Delete address"
                  className="text-muted hover:text-brand"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {!a.isDefault && (
                <button
                  type="button"
                  onClick={() => setDefault(a.id)}
                  className="mt-2 flex items-center gap-1 text-[12px] text-brand"
                >
                  <Check size={14} /> Set as default
                </button>
              )}
            </div>
          ))}

          {showForm ? (
            <form onSubmit={submit} className="space-y-2 rounded-[10px] bg-white p-4">
              <div className="grid gap-2 sm:grid-cols-2">
                <input required value={form.name} onChange={set("name")} placeholder="Full name" className="h-11 rounded-lg border border-line px-3 text-[14px] outline-none focus:border-brand" />
                <input required value={form.phone} onChange={set("phone")} placeholder="Phone" className="h-11 rounded-lg border border-line px-3 text-[14px] outline-none focus:border-brand" />
              </div>
              <input required value={form.line} onChange={set("line")} placeholder="Street address" className="h-11 w-full rounded-lg border border-line px-3 text-[14px] outline-none focus:border-brand" />
              <input required value={form.city} onChange={set("city")} placeholder="City, State ZIP" className="h-11 w-full rounded-lg border border-line px-3 text-[14px] outline-none focus:border-brand" />
              <div className="flex gap-2 pt-1">
                <button type="submit" className="flex-1 rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] py-2.5 text-[14px] font-semibold text-white">
                  Save address
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-line px-5 text-[14px] text-muted">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="flex w-full items-center justify-center gap-2 rounded-[10px] border border-dashed border-brand bg-white py-3 text-[14px] font-medium text-brand"
            >
              <Plus size={18} /> Add new address
            </button>
          )}
        </div>
      )}
    </div>
  );
}
