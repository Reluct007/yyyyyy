import { redirect } from 'next/navigation';

// Redirect /blog to home page since blog functionality is not implemented
export default function BlogPage() {
  redirect('/');
}
