import { cn } from '@/utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

interface TableCellProps extends Props {
  isHeader?: boolean;
}

const Table = ({ children, className }: Props) => {
  return <table className={cn('min-w-full', className)}>{children}</table>;
};

const TableHeader = ({ children, className }: Props) => {
  return <thead className={className}>{children}</thead>;
};

const TableBody = ({ children, className }: Props) => {
  return <tbody className={className}>{children}</tbody>;
};

const TableRow = ({ children, className }: Props) => {
  return <tr className={className}>{children}</tr>;
};

const TableCell = ({ children, isHeader = false, className }: TableCellProps) => {
  const CellTag = isHeader ? 'th' : 'td';
  return <CellTag className={className}>{children}</CellTag>;
};

export { Table, TableBody, TableCell, TableHeader, TableRow };

