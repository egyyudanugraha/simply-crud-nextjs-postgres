'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import DialogAction from "@/components/custom/DialogAction";
import { CategoryItem } from "@/types";

const getCategories = async () => {
  const response = await fetch('/api/category');
  const resJson = await response.json();

  return resJson.data.categories;
}

const page = () => {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const data = await getCategories()
      setCategories(data);
      setLoading(false);
    })()
  }, []);

  const handleAdd = async ({ name }: { name: string }) => {
    const toastAdd = toast({
      title: 'Adding category',
      description: 'Please wait'
    })
    const response = await fetch('/api/category', {
      method: 'POST',
      body: JSON.stringify({
        name
      })
    })

    const resJson = await response.json();

    if(resJson.status !== 'success')
      toastAdd.update({
        id: toastAdd.id,
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: "There was a problem with your request.",
      })
    else
      setCategories([...categories, resJson.data.category]);
      toastAdd.update({
        id: toastAdd.id,
        title: 'Added category',
        description: "Add new category successfully",
      })
  }  

  const handleUpdate = async ({id, name}: CategoryItem) => {
    const toastUpdate = toast({
      title: 'Updating category',
      description: 'Please wait'
    })
    const response = await fetch(`/api/category/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name
      })
    })

    const resJson = await response.json();

    if(resJson.status !== 'success'){
      toastUpdate.update({
        id: toastUpdate.id,
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: "There was a problem with your request.",
      })
    }else{
      setCategories(categories => categories.map(category => {
        if (category.id === id) {
          return {
            id,
            name
          }
        }

        return category
      }));
      toastUpdate.update({
        id: toastUpdate.id,
        title: 'Updated category',
        description: "Category updated successfully",
      })
    }
  }  

  const handleDelete = async (id: string) => {
    const toastDelete = toast({
      title: 'Deleting category',
      description: 'Please wait...'
    })

    const response = await fetch(`/api/category/${id}`, {
      method: 'DELETE',
    });

    const resJson = await response.json();

    if(resJson.status !== 'success')
      toastDelete.update({
        id: toastDelete.id,
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: "There was a problem with your request.",
      })
    else
      setCategories(categories => categories.filter((category: any) => category.id !== id));
      toastDelete.update({
        id: toastDelete.id,
        title: 'Deleted category',
        description: "Delete category successfully",
      });
  }

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-[80%]">
      <CardHeader className="flex-row justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Category</CardTitle>
          <CardDescription>CRUD category by Yuda</CardDescription>
        </div>
        <div className="block">
          <DialogAction name="Add" title="Add category" description="Add new category" action={handleAdd} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of category.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[50px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
              </>
            ) : 
            categories.map((category: any) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <DialogAction name="Edit" 
                      title="Edit category" 
                      description="Update existing category" 
                      action={handleUpdate}
                      data={{
                        id: category.id,
                        name: category.name
                      }}
                    />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant='destructive'>Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete category 
                            <span className="font-semibold"> {category.name}</span>.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(category.id)}>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </div>
  )
}

export default page