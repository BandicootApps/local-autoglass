"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { EditFAQDialog } from "./EditFAQDialog";

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  active: boolean;
  clicks: number;
  created_at: string;
}

interface FAQTableProps {
  faqs: FAQ[];
}

function getCategoryStyles(category: string): string {
  const categoryLower = category.toLowerCase();
  
  // Primary category colors
  if (categoryLower.includes("general")) {
    return "bg-blue-500/20 text-blue-400 border-blue-500/30";
  }
  if (categoryLower.includes("pricing") || categoryLower.includes("payment") || categoryLower.includes("cost")) {
    return "bg-green-500/20 text-green-400 border-green-500/30";
  }
  if (categoryLower.includes("service")) {
    return "bg-purple-500/20 text-purple-400 border-purple-500/30";
  }
  if (categoryLower.includes("support") || categoryLower.includes("help")) {
    return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  }
  if (categoryLower.includes("warranty") || categoryLower.includes("guarantee")) {
    return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  }
  if (categoryLower.includes("insurance") || categoryLower.includes("claim")) {
    return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
  }
  if (categoryLower.includes("booking") || categoryLower.includes("appointment")) {
    return "bg-pink-500/20 text-pink-400 border-pink-500/30";
  }
  if (categoryLower.includes("delivery") || categoryLower.includes("shipping")) {
    return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
  }
  if (categoryLower.includes("product") || categoryLower.includes("quality")) {
    return "bg-violet-500/20 text-violet-400 border-violet-500/30";
  }
  if (categoryLower.includes("technical") || categoryLower.includes("specification")) {
    return "bg-amber-500/20 text-amber-400 border-amber-500/30";
  }
  
  // Default fallback
  return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function FAQRow({ faq }: { faq: FAQ }) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(faq.active);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleActiveToggle = (checked: boolean) => {
    setIsActive(checked);
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.from("faqs").delete().eq("id", faq.id);

      if (error) {
        console.error("Failed to delete FAQ:", error);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to delete FAQ:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <tr className="hover:bg-white/[0.02] transition-colors border-b border-zinc-800">
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
              getCategoryStyles(faq.category)
            )}
          >
            {faq.category}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-white font-medium max-w-md">
          <p className="line-clamp-2">{faq.question}</p>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
          {formatDate(faq.created_at)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300 text-center font-mono">
          {faq.clicks}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <Checkbox
            checked={isActive}
            onCheckedChange={handleActiveToggle}
            className="data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400 hover:text-white"
              onClick={() => setEditDialogOpen(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-red-400"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-dark-800 border-zinc-700">
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer"
                >
                  Confirm Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400 hover:text-white"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-white/[0.01]">
          <td colSpan={6} className="px-6 py-4">
            <div className="text-sm text-zinc-300 pl-4 border-l-2 border-brand-500">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Answer</p>
              <p className="whitespace-pre-wrap">{faq.answer}</p>
            </div>
          </td>
        </tr>
      )}

      <EditFAQDialog
        faq={faq}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </>
  );
}

export function FAQTable({ faqs }: FAQTableProps) {
  if (faqs.length === 0) {
    return (
      <div className="rounded-xl glass-card p-8 text-center">
        <p className="text-zinc-400">No FAQs found. Add your first FAQ to get started.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Question
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Active
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <FAQRow key={faq.id} faq={faq} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
