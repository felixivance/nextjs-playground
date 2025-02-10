"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

type QuotableQuote = {
  _id: string
  content: string
  author: string
  tags: string[]
  authorSlug: string
  length: number
}

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<QuotableQuote | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fadeIn, setFadeIn] = useState(true)

  const fetchNewQuote = useCallback(async () => {
    try {
      setIsLoading(true)
      setFadeIn(false)
      setError(null)

      const response = await fetch("https://api.quotable.io/random")
      if (!response.ok) throw new Error("Failed to fetch quote")

      const data: QuotableQuote = await response.json()
      setQuote(data)
      setFadeIn(true)
    } catch (err) {
      setError("Failed to fetch quote. Please try again.")
    } finally {
      setIsLoading(false)
    }
  },[])

//   Fetch initial quote
  useEffect(() => {
    fetchNewQuote()
  }, [fetchNewQuote]) // Added fetchNewQuote to dependencies

  return (
    <div className="min-h-[300px] w-screen h-screen  mx-auto p-4 flex flex-col items-center justify-center
    bg-slate-100">
        <p className="text-2xl font-serif p-4">Quote Generator</p>
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-6">
          <div className="relative">
            <Quote className="absolute -left-2 -top-2 h-8 w-8 text-muted-foreground/40" />
            {error ? (
              <p className="text-destructive px-6">{error}</p>
            ) : (
              <blockquote
                className={cn("px-6 transition-opacity duration-500 space-y-2", fadeIn ? "opacity-100" : "opacity-0")}
              >
                {quote && (
                  <>
                    <p className="text-xl md:text-2xl font-serif text-foreground/90 leading-relaxed">{quote.content}</p>
                    <footer className="text-right">
                      <cite className="text-lg text-muted-foreground not-italic">— {quote.author}</cite>
                    </footer>
                  </>
                )}
              </blockquote>
            )}
          </div>
        </CardContent>
      </Card>

      <Button onClick={fetchNewQuote} className="mt-8" disabled={isLoading}>
        <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
        Generate New Quote
      </Button>
    </div>
  )
}

