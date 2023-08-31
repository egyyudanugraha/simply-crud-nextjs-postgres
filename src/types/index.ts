export interface CategoryItem {
  id: string;
  name: string;
}

export interface DialogActionProps {
  name: string;
  title: string;
  description: string;
  action: (args: {
    id: string;
    name: string;
  }) => void;
  data?: CategoryItem;
}