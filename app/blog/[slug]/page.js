import { redirect } from 'next/navigation';

// Redirect individual blog posts to home page since blog functionality is not implemented
export default function BlogPostPage() {
  redirect('/');
}
