"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, History, ArrowRight } from "lucide-react"
import toast from "react-hot-toast";

type Translation = {
  original: string
  translated: string
  timestamp: Date
}

export default function LanguageTranslator() {
  const [inputText, setInputText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<Translation[]>([])
  

  const translate = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    try {
      // Encode the text for URL
      const encodedText = encodeURIComponent(inputText)
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=de&dt=t&q=${encodedText}`,
      )

      if (!response.ok) throw new Error("Translation failed")

      const data = await response.json()
      // Google Translate returns an array where the first element contains the translations
      // and each translation is an array where the first element is the translated text
      const translatedText = data[0].map((item: any) => item[0]).join(" ")
      const detectedLanguage = data[2]

      setTranslatedText(translatedText)

      // Add to history
      setHistory((prev) =>
        [
          {
            original: inputText,
            translated: translatedText,
            timestamp: new Date(),
          },
          ...prev,
        ].slice(0, 10),
      )
    } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Translation failed",
    //     description: "Please try again later",
    //   })
      toast.error("Please try again later")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // toast({
    //   description: "Copied to clipboard",
    //   duration: 2000,
    // })
    toast.success("Copied to clipboard")
  }

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>English to German Translator</CardTitle>
          <CardDescription>
            Learn German by translating English text. Click the copy icon to save translations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input Section */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="input" className="text-sm font-medium">
                English Text
              </label>
              <span className="text-sm text-muted-foreground">{inputText.length}/500</span>
            </div>
            <Textarea
              id="input"
              placeholder="Enter text to translate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              maxLength={500}
              className="h-24"
            />
          </div>

          {/* Translation Controls */}
          <div className="flex gap-2">
            <Select defaultValue="de">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="de">German</SelectItem>
                {/* Add more languages here in the future */}
              </SelectContent>
            </Select>
            <Button onClick={translate} className="flex-1" disabled={isLoading || !inputText.trim()}>
              {isLoading ? "Translating..." : "Translate"}
            </Button>
          </div>

          {/* Output Section */}
          {translatedText && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">German Translation</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(translatedText)}
                  className="h-8 px-2 text-xs"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
              <Card>
                <CardContent className="p-4">
                  <p className="text-lg font-medium">{translatedText}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* History Section */}
      {history.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <History className="h-5 w-5" />
              <CardTitle>Recent Translations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {history.map((item, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-xs text-muted-foreground">{item.timestamp.toLocaleTimeString()}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(item.translated)}
                          className="h-8 px-2 text-xs"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <p className="flex-1">{item.original}</p>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <p className="flex-1 font-medium">{item.translated}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

