import { redirect } from 'next/navigation';

// Redirect legacy /terms-and-conditions to current Terms route
export default function TermsAndConditionsPage() {
  redirect('/terms-of-service');
}
