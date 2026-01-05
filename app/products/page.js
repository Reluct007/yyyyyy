import { redirect } from 'next/navigation';

// 重定向到新的 collection 路径
export default function ProductsRedirect() {
  redirect('/collection/');
}
