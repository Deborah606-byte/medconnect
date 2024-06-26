"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type GenerateTableProps = {
  children: React.ReactNode;
  data: any[];
  tableHeaderNames: string[];
  currentPage?: number;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  dataPerPage?: number;
  showPagination?: boolean;
};

const GenerateTable = ({
  data,
  tableHeaderNames,
  currentPage,
  setCurrentPage,
  dataPerPage,
  children,
  showPagination = true,
}: GenerateTableProps) => {
  // Calculate the number of pages
  const totalPages = dataPerPage
    ? Math.ceil(data.length / dataPerPage)
    : data.length;

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    if (setCurrentPage && currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {tableHeaderNames.map((table, index) => (
              <TableHead key={index} className="text-primary-gray/40">
                {table}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>{children}</TableBody>
      </Table>

      {/* Pagination */}
      {showPagination && (
        <GenerateTablePagination
          currentPage={currentPage || 0}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

const GenerateTablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          />
        </PaginationItem>

        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              href="#"
              isActive={number === currentPage}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(number);
              }}
              className={`${
                number === currentPage
                  ? "bg-secondary-gray text-white hover:bg-secondary-gray hover:text-white"
                  : ""
              }`}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default GenerateTable;
