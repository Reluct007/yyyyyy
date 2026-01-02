"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { useState } from 'react';
import Link from 'next/link';
import axios from "axios";

export default function ContactForm({ locale = 'en' }) {
  const [data, setData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://labubu-api.vercel.app';

    try {
      const response = await axios.post(`${API_URL}/api/contact`, data);
      if (response.data.success) {
        toast.success(response.data.msg);
        setData({ name: "", company: "", email: "", phone: "", quantity: "", message: "" });
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  const privacyUrl = locale === 'en' ? '/privacy-policy' : `/${locale}/privacy-policy`;

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="w-full space-y-5 rounded-2xl border bg-card p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name<span className="text-red-500 pl-1">*</span>
            </label>
            <Input id="name" name="name" value={data.name} onChange={onChangeHandler} required disabled={loading} />
          </div>
          <div>
            <label htmlFor="company" className="block mb-2 text-sm font-medium">Company</label>
            <Input id="company" name="company" value={data.company} onChange={onChangeHandler} disabled={loading} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email<span className="text-red-500 pl-1">*</span>
            </label>
            <Input id="email" name="email" type="email" value={data.email} onChange={onChangeHandler} required disabled={loading} />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium">Phone</label>
            <Input id="phone" name="phone" type="tel" value={data.phone} onChange={onChangeHandler} disabled={loading} />
          </div>
        </div>
        <div>
          <label htmlFor="quantity" className="block mb-2 text-sm font-medium">Quantity</label>
          <Select onValueChange={(value) => setData(prev => ({ ...prev, quantity: value }))} value={data.quantity} disabled={loading}>
            <SelectTrigger id="quantity">
              <SelectValue placeholder="Select quantity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300">300</SelectItem>
              <SelectItem value="500">500</SelectItem>
              <SelectItem value="1000">1000</SelectItem>
              <SelectItem value="3000">3000</SelectItem>
              <SelectItem value="5000">5000</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="message" className="block mb-2 text-sm font-medium">
            Message<span className="text-red-500 pl-1">*</span>
          </label>
          <Textarea id="message" name="message" value={data.message} onChange={onChangeHandler} className="min-h-[180px]" required disabled={loading} />
        </div>
        <div className="flex flex-col space-y-3 pt-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Get Free Quote"}
          </Button>
          <p className="text-xs text-muted-foreground">
            View our <Link href={privacyUrl} className="underline hover:text-foreground">privacy policy</Link>.
          </p>
        </div>
      </div>
    </form>
  );
}
