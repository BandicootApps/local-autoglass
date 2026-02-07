"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FAQTable, type FAQ } from "./FAQTable";

interface FAQTableWithSearchProps {
  faqs: FAQ[];
}

export function FAQTableWithSearch({ faqs }: FAQTableWithSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter((faq) => {
    const query = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <Input
          type="text"
          placeholder="Search FAQs by question, answer, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-dark-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-brand-500"
        />
      </div>
      
      {searchQuery && (
        <p className="text-sm text-zinc-400">
          Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}
        </p>
      )}

      <FAQTable faqs={filteredFaqs} />
    </div>
  );
}
