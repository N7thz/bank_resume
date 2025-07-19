import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const InputAmount = () => {

  const id = useId()

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>
        Valor gasto
      </Label>
      <div className="relative">
        <Input
          id={id}
          className="peer ps-6 pe-12"
          placeholder="0.00"
          type="number"
        />
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
          $
        </span>
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
          BRL
        </span>
      </div>
    </div>
  )
}
