"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type AccordionType = "single" | "multiple"

interface AccordionContextValue {
  type: AccordionType
  value: string | string[]
  onValueChange: (value: string) => void
  collapsible?: boolean
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion")
  }
  return context
}

interface AccordionProps {
  type: AccordionType
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  collapsible?: boolean
  className?: string
  children: React.ReactNode
}

function Accordion({
  type,
  value: controlledValue,
  defaultValue,
  onValueChange,
  collapsible = false,
  className,
  children,
  ...props
}: AccordionProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(
    defaultValue || (type === "multiple" ? [] : "")
  )

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const handleValueChange = React.useCallback(
    (itemValue: string) => {
      let newValue: string | string[]

      if (type === "multiple") {
        const currentValue = Array.isArray(value) ? value : []
        newValue = currentValue.includes(itemValue)
          ? currentValue.filter((v) => v !== itemValue)
          : [...currentValue, itemValue]
      } else {
        // For single type
        const currentValue = typeof value === "string" ? value : ""
        newValue = currentValue === itemValue && collapsible ? "" : itemValue
      }

      if (!isControlled) {
        setUncontrolledValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [type, value, collapsible, isControlled, onValueChange]
  )

  return (
    <AccordionContext.Provider
      value={{ type, value, onValueChange: handleValueChange, collapsible }}
    >
      <div data-slot="accordion" className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemContextValue {
  itemValue: string
  isOpen: boolean
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null)

function useAccordionItem() {
  const context = React.useContext(AccordionItemContext)
  if (!context) {
    throw new Error("AccordionItem components must be used within an AccordionItem")
  }
  return context
}

interface AccordionItemProps {
  value: string
  className?: string
  children: React.ReactNode
}

function AccordionItem({ value: itemValue, className, children, ...props }: AccordionItemProps) {
  const { type, value } = useAccordion()

  const isOpen = React.useMemo(() => {
    if (type === "multiple") {
      return Array.isArray(value) && value.includes(itemValue)
    }
    return value === itemValue
  }, [type, value, itemValue])

  return (
    <AccordionItemContext.Provider value={{ itemValue, isOpen }}>
      <div
        data-slot="accordion-item"
        data-state={isOpen ? "open" : "closed"}
        className={cn("border-b last:border-b-0", className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

interface AccordionTriggerProps {
  className?: string
  children: React.ReactNode
  disabled?: boolean
}

function AccordionTrigger({
  className,
  children,
  disabled,
  ...props
}: AccordionTriggerProps) {
  const { onValueChange } = useAccordion()
  const { itemValue, isOpen } = useAccordionItem()

  const handleClick = () => {
    if (!disabled) {
      onValueChange(itemValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onValueChange(itemValue)
    }
  }

  return (
    <h3 className="flex">
      <button
        type="button"
        data-slot="accordion-trigger"
        data-state={isOpen ? "open" : "closed"}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </button>
    </h3>
  )
}

interface AccordionContentProps {
  className?: string
  children: React.ReactNode
}

function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  const { isOpen } = useAccordionItem()
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState<number | undefined>(isOpen ? undefined : 0)

  React.useEffect(() => {
    if (!contentRef.current) return

    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight
      setHeight(contentHeight)
      
      // Reset to auto after animation
      const timer = setTimeout(() => {
        setHeight(undefined)
      }, 200) // Match animation duration

      return () => clearTimeout(timer)
    } else {
      // Set to current height first, then to 0 for smooth collapse
      setHeight(contentRef.current.scrollHeight)
      requestAnimationFrame(() => {
        setHeight(0)
      })
    }
  }, [isOpen])

  return (
    <div
      ref={contentRef}
      data-slot="accordion-content"
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "overflow-hidden text-sm transition-all duration-200 ease-in-out",
        className
      )}
      style={{
        height: height !== undefined ? `${height}px` : "auto",
      }}
      {...props}
    >
      <div className="pt-0 pb-4">{children}</div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }