import { LayoutIcon } from "@radix-ui/react-icons";

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "..";

export default function LayoutSwitcher({
  selectedLayout,
  layouts,
  handleLayoutChange,
  disabled,
}: {
  selectedLayout: string;
  layouts: Array<string>;
  handleLayoutChange: (layout: string) => void;
  disabled?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button variant={"ghost"} className="gap-1">
          <LayoutIcon className="h-4 w-4" />
          Layout
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Change layout</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {layouts.map((layout) => (
          <DropdownMenuCheckboxItem
            key={layout}
            className="capitalize"
            checked={layout == selectedLayout}
            onCheckedChange={() => handleLayoutChange(layout)}>
            {layout}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

