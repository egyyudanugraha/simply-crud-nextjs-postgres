import { useState } from 'react';
import { Label } from "@radix-ui/react-label"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { DialogActionProps } from '@/types';

const DialogAction = ({ name, title, description, action, data }: DialogActionProps) => {
  const [input, setInput] = useState(data?.name || '');
  const [open, setOpen] = useState(false)

  const handleAction = () => {
    action({
      id: data?.id || '',
      name: input
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{name}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={input} onChange={(e) => setInput(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAction}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogAction