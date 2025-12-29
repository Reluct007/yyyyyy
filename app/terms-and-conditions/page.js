import { redirect } from 'next/navigation';

// Redirect /terms-and-conditions to /terms-conditions
export default function TermsAndConditionsPage() {
  redirect('/terms-conditions');
}
