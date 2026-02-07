"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export function AddFAQDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingCategories, setExistingCategories] = useState<string[]>([]);

  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [active, setActive] = useState(true);

  // Fetch existing categories when dialog opens
  useEffect(() => {
    if (open) {
      const fetchCategories = async () => {
        const supabase = createClient();
        const { data } = await supabase
          .from("faqs")
          .select("category")
          .order("category");
        
        if (data) {
          // Get unique categories
          const uniqueCategories = [...new Set(data.map((item) => item.category))];
          setExistingCategories(uniqueCategories);
        }
      };
      fetchCategories();
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const supabase = createClient();

      const { error: insertError } = await supabase.from("faqs").insert({
        category,
        question,
        answer,
        active,
      });

      if (insertError) {
        throw insertError;
      }

      // Reset form and close dialog
      setCategory("");
      setQuestion("");
      setAnswer("");
      setActive(true);
      setOpen(false);

      // Refresh the page to show new data
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add FAQ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-500 hover:bg-brand-400 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add FAQ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New FAQ</DialogTitle>
          <DialogDescription>
            Add a new frequently asked question. Fill out the form below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category" className="text-zinc-300">
                Category
              </Label>
              <Input
                id="category"
                list="category-suggestions"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter or select a category"
                required
                className="bg-dark-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
              <datalist id="category-suggestions">
                {existingCategories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="question" className="text-zinc-300">
                Question
              </Label>
              <Input
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What is the question?"
                required
                className="bg-dark-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="answer" className="text-zinc-300">
                Answer
              </Label>
              <textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Provide the answer here..."
                required
                rows={6}
                className="flex w-full rounded-md border border-zinc-700 bg-dark-800 px-3 py-2 text-sm text-white shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="active"
                checked={active}
                onCheckedChange={(checked) => setActive(checked === true)}
                className="data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500"
              />
              <Label htmlFor="active" className="text-zinc-300 cursor-pointer">
                Active (Show on website)
              </Label>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-brand-500 hover:bg-brand-400 text-white"
            >
              {isLoading ? "Adding..." : "Add FAQ"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
