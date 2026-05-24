/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {cn} from '@/lib/utils';
import {Card} from '../ui/card';
import {useState, useEffect} from 'react';

export type Column<T extends object> = {
  key: keyof T | string;
  label: string;
  className?: string;
  headerClassName?: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  responsiveHide?: 'sm' | 'md' | 'lg' | 'xl'; // Hide column on certain breakpoints
};

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  description?: string;
  emptyMessage?: string;
  className?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  onRowClick?: (row: T, index: number) => void;
  pagination?: boolean;
  itemsPerPage?: number;
  itemsPerPageOptions?: number[];
  mobileCardView?: boolean;
  mobileRender?: (row: T, index: number) => React.ReactNode;
  isLoading?: boolean;
}

export function DataTable<T extends object>({
  columns,
  data,
  title,
  description,
  emptyMessage = 'No records found.',
  className = '',
  rowClassName = '',
  onRowClick,
  pagination = false,
  itemsPerPage = 10,
  mobileCardView = true,
  mobileRender,
  isLoading = false,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine if row is clickable
  const isInteractive = !!onRowClick;

  // Filter visible columns based on screen size
  const visibleColumns = React.useMemo(() => {
    if (!isMobile) return columns;
    return columns.filter((col) => {
      if (!col.responsiveHide) return true;
      if (col.responsiveHide === 'sm' && window.innerWidth >= 640) return true;
      if (col.responsiveHide === 'md' && window.innerWidth >= 768) return true;
      if (col.responsiveHide === 'lg' && window.innerWidth >= 1024) return true;
      if (col.responsiveHide === 'xl' && window.innerWidth >= 1280) return true;
      return false;
    });
  }, [columns, isMobile]);

  // Pagination calculations
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = pagination ? data.slice(startIndex, endIndex) : data;
  const displayData =
    isMobile && mobileCardView && mobileRender ? data : paginatedData;

  // Reset to first page when page size changes
  React.useEffect(() => setCurrentPage(1), [pageSize]);

  // Find action column if exists
  const actionColumn = columns.find((col) =>
    ['action', 'actions'].includes(String(col.key)),
  );

  // Mobile card renderer
  const renderMobileCard = (row: T, index: number) => {
    if (mobileRender) return mobileRender(row, index);

    const customRowClass =
      typeof rowClassName === 'function'
        ? rowClassName(row, index)
        : rowClassName;

    return (
      <div
        key={index}
        className={cn(
          'border rounded-lg p-4 mb-3 bg-card hover:bg-muted/20 transition-colors',
          isInteractive && 'cursor-pointer',
          customRowClass,
        )}
        onClick={() => onRowClick?.(row, index)}>
        <div className="space-y-3">
          {columns
            .filter(
              (col) =>
                col !== actionColumn &&
                !['action', 'actions'].includes(String(col.key)),
            )
            .slice(0, 3)
            .map((col) => {
              const value = (row as Record<string, any>)[col.key as string];
              const content = col.render
                ? col.render(value, row, index)
                : (value ?? '—');

              return (
                <div
                  key={String(col.key)}
                  className="flex justify-between items-start">
                  <span className="text-sm font-medium text-muted-foreground">
                    {col.label}:
                  </span>
                  <span className="text-sm text-right max-w-[60%]">
                    {content}
                  </span>
                </div>
              );
            })}

          {/* Only show "Tap for more details" if row click is enabled */}
          {columns.length > 3 && isInteractive && (
            <div className="text-xs text-muted-foreground text-center pt-2 border-t">
              Tap for more details
            </div>
          )}

          {/* Render action column at bottom */}
          {actionColumn && actionColumn.render && (
            <div
              className="pt-3 mt-3 border-t flex justify-end"
              onClick={(e) => e.stopPropagation()}>
              {actionColumn.render(
                (row as any)[actionColumn.key as string],
                row,
                index,
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className={cn('space-y-4 p-3 sm:p-4 md:p-6', className)}>
      {/* Header */}
      {(title || description) && (
        <div className="px-1 sm:px-2">
          {title && (
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}

      {/* Mobile Card View */}
      {isMobile && mobileCardView ? (
        <div className="space-y-3">
          {displayData.length > 0 ? (
            displayData.map((row, index) => renderMobileCard(row, index))
          ) : (
            <div className="h-40 flex items-center justify-center text-muted-foreground">
              {emptyMessage}
            </div>
          )}
        </div>
      ) : (
        /* Desktop Table View */
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow>
                    {visibleColumns.map((col) => (
                      <TableHead
                        key={String(col.key)}
                        className={cn(
                          'font-medium whitespace-nowrap px-3 sm:px-4 py-3 text-left text-xs sm:text-sm',
                          col.headerClassName,
                        )}>
                        {col.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {isLoading ? (
                    Array.from({length: pageSize || 5}).map((_, i) => (
                      <TableRow key={i} className="animate-pulse">
                        {visibleColumns.map((col) => (
                          <TableCell
                            key={String(col.key)}
                            className="px-3 sm:px-4 py-4">
                            <div className="h-4 bg-muted rounded w-3/4" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : displayData.length > 0 ? (
                    displayData.map((row, rowIndex) => {
                      const customRowClass =
                        typeof rowClassName === 'function'
                          ? rowClassName(row, rowIndex)
                          : rowClassName;

                      return (
                        <TableRow
                          key={rowIndex}
                          className={cn(
                            isInteractive &&
                              'cursor-pointer hover:bg-muted/60 transition-colors',
                            customRowClass,
                            'border-b',
                          )}
                          onClick={() => onRowClick?.(row, rowIndex)}>
                          {visibleColumns.map((col) => {
                            const value = (row as Record<string, any>)[
                              col.key as string
                            ];
                            const content = col.render
                              ? col.render(value, row, rowIndex)
                              : (value ?? '—');

                            return (
                              <TableCell
                                key={String(col.key)}
                                className={cn(
                                  'px-3 sm:px-4 py-3 align-top text-xs sm:text-sm',
                                  col.className,
                                )}>
                                {content}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={visibleColumns.length}
                        className="h-24 text-center text-muted-foreground px-4 py-3">
                        {emptyMessage}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
