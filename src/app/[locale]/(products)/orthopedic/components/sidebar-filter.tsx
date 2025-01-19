"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { AiOutlineDown } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { Path, useForm } from "react-hook-form";
import { IoMdCheckmark } from "react-icons/io";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const options: SidebarItem[] = [
  {
    label: "Lançamentos",
    id: "lancamentos",
    value: "lançamentos"
  },
  {
    label: "Famílias/Tecnologias",
    id: "falimias/tecnologias",
    options: [
      {
        id: "hidrolight-neo",
        label: "Hidrolight Neo",
        value: "hidrolight-neo"
      },
      {
        id: "comfort-air",
        label: "Comfort Air",
        value: "comfort-air"
      },
      {
        id: "ortho-recovery",
        label: "Ortho Recovery",
        value: "ortho-recovery"
      }
    ]
  },
  {
    label: "Produtos",
    id: "produtos",
    options: [
      {
        id: "tornozeleira",
        label: "Tornozeleira",
        value: "tornozeleira"
      },
      {
        id: "joelheira",
        label: "Joelheira",
        value: "joelheira"
      },
      {
        id: "caneleira",
        label: "Caneleira",
        value: "caneleira"
      },
      {
        id: "cotoveleira",
        label: "Cotoveleira",
        value: "cotoveleira"
      }
    ]
  }
];

interface SidebarItem {
  label: string;
  id: Path<z.infer<typeof FilterSchema>>;
  value?: string;
  options?: {
    id: string;
    value: string;
    label: string;
  }[];
}

export const FilterSchema = z.object({
  lancamentos: z.boolean(),
  "falimias/tecnologias": z.array(z.string()),
  produtos: z.array(z.string())
});

export function SidebarFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract initial values from URL parameters
  const initialValues = {
    lancamentos: searchParams.get("lancamentos") === "true" || false,
    "falimias/tecnologias": searchParams.getAll("falimias/tecnologias") || [],
    produtos: searchParams.getAll("produtos") || []
  };

  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: initialValues
  });

  const updateURL = (filters: z.infer<typeof FilterSchema>) => {
    const params = new URLSearchParams();

    if (filters.lancamentos) {
      params.set("lancamentos", "true");
    }

    filters["falimias/tecnologias"].forEach((value) => {
      params.append("falimias/tecnologias", value);
    });

    filters.produtos.forEach((value) => {
      params.append("produtos", value);
    });

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (filters: z.infer<typeof FilterSchema>) => {
    updateURL(filters);
  };

  useEffect(() => {
    const subscription = form.watch((filters) => {
      handleFilterChange({
        lancamentos: filters.lancamentos ?? false,
        "falimias/tecnologias": (filters["falimias/tecnologias"] ?? []).filter(
          (value): value is string => value !== undefined
        ),
        produtos: (filters.produtos ?? []).filter(
          (value): value is string => value !== undefined
        )
      });
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form
        onChange={() => {}}
        className="flex flex-col divide-y divide-gray-300 h-fit rounded-lg overflow-hidden"
      >
        <h1 className="font-medium px-4 py-6 rounded-t-lg border border-b-0">
          Filtros
        </h1>

        {options.map((item) => (
          <SidebarItem key={item.label} form={form} item={item} />
        ))}
      </form>
    </Form>
  );
}

function SidebarItem({
  item,
  form
}: {
  item: SidebarItem;
  form: ReturnType<typeof useForm<z.infer<typeof FilterSchema>>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      className="group/collapsible bg-accent-foreground"
      open={open}
      onOpenChange={setOpen}
    >
      <CollapsibleTrigger asChild className="flex w-full">
        <FormField
          control={form.control}
          name={item.id}
          render={({ field }) => {
            return (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => {
                      if (item.options && item.options.length > 0) {
                        setOpen(!open);
                        return;
                      }
                      field.onChange(!field.value);
                    }}
                    className="text-base font-medium hover:text-black hover:bg-gray-300 h-full w-full py-8 rounded-none space-x-12 flex justify-between items-center"
                  >
                    <p>{item.label}</p>
                    {item.options && item.options.length > 0 ? (
                      <AiOutlineDown className="transition-transform duration-300 ease-in-out group-data-[state=open]/collapsible:rotate-180" />
                    ) : (
                      field.value && <IoMdCheckmark className="text-black" />
                    )}
                  </Button>
                </FormControl>
              </FormItem>
            );
          }}
        />
      </CollapsibleTrigger>
      {item.options && item.options.length > 0 && (
        <CollapsibleContent className="px-4 ml-2 data-[state=open]:py-4 space-y-2">
          {item.options.map((option) => (
            <FormField
              key={option.id}
              control={form.control}
              name={item.id}
              render={({ field }) => {
                const isChecked =
                  Array.isArray(field.value) &&
                  field.value.includes(option.value);
                return (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [
                                ...(Array.isArray(field.value)
                                  ? field.value
                                  : []),
                                option.value
                              ]
                            : Array.isArray(field.value)
                            ? field.value.filter(
                                (value) => value !== option.value
                              )
                            : [];
                          field.onChange(newValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal cursor-pointer">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
