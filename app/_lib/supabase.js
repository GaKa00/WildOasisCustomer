import { createClient } from "@supabase/supabase-js";

 const NEXT_PUBLIC_SUPABASE_URL = "https://eupwraqfpwjxzhzahlcl.supabase.co";
  const NEXT_PUBLIC_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1cHdyYXFmcHdqeHpoemFobGNsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTc0MjU2NSwiZXhwIjoyMDM3MzE4NTY1fQ.h3Gj1GWRGJD45c3nUslQaZ0vyNNUG3osM3C-Sb1jq0U";

    export const supabase = createClient(
      NEXT_PUBLIC_SUPABASE_URL,
   NEXT_PUBLIC_SUPABASE_KEY
    );