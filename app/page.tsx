// app/page.tsx

// O alias '@/components/HomePage' se resolve para 'src/components/HomePage.tsx'
// Este import é um 'default import' e funciona com o 'export default'
import HomePage from "@/components/HomePage";

export default function Page() {
  return <HomePage />;
}