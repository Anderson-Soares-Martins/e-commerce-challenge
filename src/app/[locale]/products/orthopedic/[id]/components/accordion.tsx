import {
  Accordion as BaseAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface AccordionItemData {
  value: string;
  trigger: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
}

export function Accordion({
  items,
  type = "single",
  collapsible = true,
  className = "w-full"
}: AccordionProps) {
  return (
    <BaseAccordion type={type} collapsible={collapsible} className={className}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="font-medium text-lg">
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </BaseAccordion>
  );
}
