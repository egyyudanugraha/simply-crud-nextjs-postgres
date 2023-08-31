'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const page = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [name, setName] = useState('');

  const handleSubmit = async () => {
    setError(false);
    setLoading(true);
    
    const response = await fetch('/api/category', {
      method: 'POST',
      body: JSON.stringify({
        name
      })
    })

    const resJson = await response.json();
    
    if (resJson.status !== 'success') {
      setError(true);
      setLoading(false);
      return;
    }
    
    route.replace('/category')
  }

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-[80%]">
      <CardHeader>
        <CardTitle>Add Category</CardTitle>
        <CardDescription>Add new category</CardDescription>
      </CardHeader>
      <CardContent>
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Name of category" />
            {error && (
              <span className="text-sm font-semibold text-red-500">This name already exsist!</span>
            )}
          </div>
        </div>
      </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href='/category'>Cancel</Link>
        </Button>
        <Button disabled={loading} onClick={handleSubmit}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : 'Save'}
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default page