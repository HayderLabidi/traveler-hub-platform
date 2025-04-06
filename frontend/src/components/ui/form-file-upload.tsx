
import * as React from "react"
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UploadCloud, X } from "lucide-react"

interface FormFileUploadProps {
  className?: string
  label?: string
  onChange: (file: File | null) => void
  value?: File | string | null
  previewUrl?: string
  accept?: string
  id?: string
}

export function FormFileUpload({
  className,
  label,
  onChange,
  value,
  previewUrl,
  accept = "image/*",
  id = "file-upload",
  ...props
}: FormFileUploadProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type">) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(previewUrl || null)
  
  React.useEffect(() => {
    if (previewUrl) {
      setPreview(previewUrl)
    } else if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value)
      setPreview(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    } else if (typeof value === 'string' && value) {
      setPreview(value)
    }
  }, [value, previewUrl])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange(file)
    
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    } else {
      setPreview(null)
    }
  }

  const handleRemove = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    onChange(null)
    setPreview(null)
  }

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && <Label htmlFor={id}>{label}</Label>}
      
      {preview ? (
        <div className="relative">
          <img 
            src={preview} 
            alt="Upload preview" 
            className="w-full h-auto rounded-md object-cover max-h-60"
          />
          <Button 
            type="button" 
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 w-7 h-7"
            onClick={handleRemove}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div 
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          <UploadCloud className="h-10 w-10 text-gray-400 dark:text-gray-600 mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click to upload an image
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            SVG, PNG, JPG or GIF (max. 2MB)
          </p>
        </div>
      )}
      
      <Input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
