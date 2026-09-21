import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase keys are JWTs and must start with "ey"
const isPlaceholder = (val) => !val || val.includes("PASTE_YOUR_");
const isValidKey = (val) => val && val.startsWith("ey");

const supabaseUrl = isPlaceholder(rawUrl) ? null : rawUrl;

// Prefer whichever key is actually a valid JWT
let supabaseKey = null;
if (isValidKey(rawKey)) {
  supabaseKey = rawKey;
} else if (isValidKey(import.meta.env.VITE_SUPABASE_ANON_KEY)) {
  supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
}

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Supabase credentials missing or invalid. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.local."
  );
}

// Provide a structurally valid dummy URL to prevent createClient from throwing a synchronous error
export const supabase = createClient(
  supabaseUrl || "https://dummy-project-not-configured.supabase.co",
  supabaseKey || "dummy-key"
);
