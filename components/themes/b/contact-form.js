"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
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
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://labubu-api.reluct007.workers.dev';

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
      <div className="w-full rounded-lg border shadow-md space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block mb-2.5 text-sm font-medium">
              Name<span className="pl-1 text-red-500">*</span>
            </label>
            <Input 
              id="name" 
              name="name" 
              type="text" 
              value={data.name} 
              onChange={onChangeHandler} 
              disabled={loading} 
              required 
            />
          </div>
          <div>
            <label htmlFor="company" className="block mb-2.5 text-sm font-medium">
              Company
            </label>
            <Input 
              id="company" 
              name="company" 
              type="text" 
              value={data.company} 
              onChange={onChangeHandler} 
              disabled={loading} 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block mb-2.5 text-sm font-medium">
              Email<span className="pl-1 text-red-500">*</span>
            </label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={data.email} 
              onChange={onChangeHandler} 
              disabled={loading} 
              required 
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2.5 text-sm font-medium">
              Phone
            </label>
            <Input 
              id="phone" 
              name="phone" 
              type="tel" 
              value={data.phone} 
              onChange={onChangeHandler} 
              disabled={loading} 
            />
          </div>
        </div>
        <div>
          <label htmlFor="quantity" className="block mb-2.5 text-sm font-medium">
            Quote Quantity
          </label>
          <Select 
            onValueChange={(value) => setData(prev => ({ ...prev, quantity: value }))} 
            value={data.quantity} 
            disabled={loading}
          >
            <SelectTrigger id="quantity">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="500">500</SelectItem>
              <SelectItem value="1000">1000</SelectItem>
              <SelectItem value="3000">3000</SelectItem>
              <SelectItem value="5000">5000</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="message" className="block mb-2.5 text-sm font-medium">
            Message<span className="pl-1 text-red-500">*</span>
          </label>
          <Textarea 
            id="message" 
            name="message" 
            value={data.message} 
            onChange={onChangeHandler} 
            className="min-h-[180px]" 
            disabled={loading} 
            required 
          />
        </div>
        <div className="flex flex-col space-y-2 pt-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Get Free Quote"}
          </Button>
          <div className="text-xs text-muted-foreground">
            View our{" "}
            <Link href={privacyUrl} className="underline hover:text-foreground">
              privacy policy
            </Link>.
          </div>
        </div>
      </div>
    </form>
  );
}
